import Stripe from 'stripe';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// ---------------------------------------------------------------------------
// Firebase Admin — initialise once per cold start
// ---------------------------------------------------------------------------
function getAdminDb() {
  if (!getApps().length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    initializeApp({ credential: cert(serviceAccount) });
  }
  return getFirestore();
}

// ---------------------------------------------------------------------------
// Stripe
// ---------------------------------------------------------------------------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

// ---------------------------------------------------------------------------
// Vercel serverless handler
// ---------------------------------------------------------------------------
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel exposes the raw body via req.body when you opt in (see vercel.json).
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,           // raw Buffer (requires rawBody: true in vercel.json)
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  // Only act on successful checkouts
  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true });
  }

  const session = event.data.object;

  // client_reference_id is the Firebase UID we attached in redirectToCheckout()
  const uid = session.client_reference_id;
  if (!uid) {
    console.error('checkout.session.completed missing client_reference_id', session.id);
    return res.status(400).json({ error: 'Missing client_reference_id' });
  }

  try {
    const db = getAdminDb();
    await db.doc(`users/${uid}`).set(
      {
        isPremium: true,
        premiumActivatedAt: FieldValue.serverTimestamp(),
        premiumSource: 'stripe',
        stripeSessionId: session.id,
        stripeCustomerId: session.customer ?? null,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    console.log(`Premium activated for uid=${uid} session=${session.id}`);
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Failed to activate premium for uid:', uid, err);
    return res.status(500).json({ error: 'Failed to update user record' });
  }
}
