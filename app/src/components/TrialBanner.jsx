import { redirectToCheckout } from '../utils/stripeCheckout';

export default function TrialBanner({ entitlement }) {
  if (!entitlement || entitlement.loading || entitlement.status === 'purchased') return null;

  if (entitlement.status === 'trial') {
    const days = entitlement.daysLeftInTrial;
    return (
      <div className="mb-6 p-4 rounded-lg border border-[rgba(251,191,36,0.3)] bg-[rgba(251,191,36,0.08)] flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-[var(--text-primary)]">
          🎁 <span className="font-semibold text-[var(--accent)]">{days} day{days === 1 ? '' : 's'} left</span> in your free trial of project folders & saved outputs.
        </div>
        <button
          onClick={redirectToCheckout}
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-lg transition-all"
        >
          Buy lifetime access
        </button>
      </div>
    );
  }

  // expired
  return (
    <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10 flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-[var(--text-primary)]">
        ⏰ Your free trial has ended. Existing projects stay visible, but new saves are locked until you upgrade.
      </div>
      <button
        onClick={redirectToCheckout}
        className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-lg transition-all"
      >
        Upgrade to unlock
      </button>
    </div>
  );
}
