import { redirectToCheckout } from '../utils/stripeCheckout';

export default function UpgradeModal({ onClose, source = 'premium features' }) {
  const handleCheckout = async () => {
    await redirectToCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="max-w-md w-full p-8 rounded-lg border border-[var(--border-light)] bg-[var(--bg-primary)]">
        <p className="text-sm font-semibold text-[var(--accent)] mb-3">Premium feature</p>
        <h2 className="text-2xl font-bold mb-4">Keep your project workspace unlocked</h2>
        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
          {source} are available during your 14-day trial. Upgrade to keep using project folders
          and saved outputs after the trial ends.
        </p>

        <div className="mb-6 p-4 rounded-lg border border-[rgba(251,191,36,0.2)] bg-[rgba(251,191,36,0.08)]">
          <p className="text-sm text-[var(--text-secondary)]">
            Your one-time purchase is the upgrade path for premium workspace features with no
            subscription. Secure purchase confirmation still needs to be finalized before launch.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCheckout}
            className="flex-1 py-3 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-xl hover:shadow-[var(--accent)]/50 transition-all"
          >
            Upgrade for $29
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 font-semibold rounded-lg border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
