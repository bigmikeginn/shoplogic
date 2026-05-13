const STRIPE_CHECKOUT_URL = import.meta.env.VITE_STRIPE_CHECKOUT_URL;

/**
 * Redirect to the Stripe hosted checkout page.
 * @param {string} [uid] - Firebase UID attached as client_reference_id so the
 *   webhook can identify which user completed the purchase.
 */
export function redirectToCheckout(uid) {
  if (!STRIPE_CHECKOUT_URL) {
    console.error('Stripe checkout URL not configured. Set VITE_STRIPE_CHECKOUT_URL in .env.local');
    return;
  }

  const url = new URL(STRIPE_CHECKOUT_URL);
  if (uid) {
    url.searchParams.set('client_reference_id', uid);
  }

  window.location.href = url.toString();
}
