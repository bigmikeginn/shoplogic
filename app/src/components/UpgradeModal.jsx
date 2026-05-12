import { redirectToCheckout } from '../utils/stripeCheckout';

export default function UpgradeModal({ onClose, title = 'Upgrade to keep going', message }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-md w-full p-8 rounded-lg border border-[var(--border-light)] bg-[var(--bg-primary)]">
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          {message ?? 'Your free 2-week trial of project folders and saved outputs has ended. Upgrade once and keep them forever — no subscription.'}
        </p>
        <div className="flex gap-3">
          <button
            onClick={redirectToCheckout}
            className="flex-1 py-3 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-xl hover:shadow-[var(--accent)]/50 transition-all"
          >
            Buy lifetime access
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
