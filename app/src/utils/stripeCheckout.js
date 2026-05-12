// Stripe checkout integration
// Get your Stripe publishable key from: https://dashboard.stripe.com/apikeys
//
// Configure your Stripe Payment Link's "After payment" success URL to
// `https://<your-domain>/?purchase=success` so useStripeSuccessHandler can
// flip hasPurchased on return. (See Stripe Dashboard → Payment Links → After
// payment → Don't show confirmation page → Redirect customers to your URL.)

export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
export const STRIPE_PRICE_ID = import.meta.env.VITE_STRIPE_PRICE_ID;

// Redirect to Stripe checkout
export async function redirectToCheckout() {
  if (!STRIPE_PUBLISHABLE_KEY || !STRIPE_PRICE_ID) {
    console.error('Stripe configuration missing. Set VITE_STRIPE_PUBLISHABLE_KEY and VITE_STRIPE_PRICE_ID in .env.local');
    return;
  }

  // For now, redirect to a Stripe checkout link
  // Once you create the Stripe product/price, you'll get a hosted checkout link
  // You can find it in Stripe Dashboard → Products → Your Product → Copy hosted checkout link

  const stripeCheckoutUrl = import.meta.env.VITE_STRIPE_CHECKOUT_URL;

  if (stripeCheckoutUrl) {
    window.location.href = stripeCheckoutUrl;
  } else {
    console.error('Stripe checkout URL not configured. Set VITE_STRIPE_CHECKOUT_URL in .env.local');
  }
}
