import { useEffect } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import useFirebaseAuth from './useFirebaseAuth';

// Reads ?purchase=success from the URL after Stripe checkout redirect
// and flips the user's hasPurchased flag. Strips the query param on success.
//
// SECURITY NOTE: this is client-trusted for now. Stripe's success_url only
// fires after a real charge, but a savvy user could craft the URL by hand.
// Replace with a Cloud Function that verifies the Stripe checkout session
// (using the session_id Stripe appends to success_url) before production.
export function useStripeSuccessHandler() {
  const { user } = useFirebaseAuth();

  useEffect(() => {
    if (!user) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('purchase') !== 'success') return;

    setDoc(
      doc(db, 'users', user.uid),
      { hasPurchased: true, purchasedAt: serverTimestamp(), updatedAt: serverTimestamp() },
      { merge: true }
    ).catch((err) => {
      // Non-fatal — entitlement just stays in trial/expired until retry.
      console.error('Failed to mark account as purchased:', err);
    });

    params.delete('purchase');
    params.delete('session_id');
    const remaining = params.toString();
    const newUrl = window.location.pathname + (remaining ? `?${remaining}` : '');
    window.history.replaceState({}, '', newUrl);
  }, [user]);
}

export default useStripeSuccessHandler;
