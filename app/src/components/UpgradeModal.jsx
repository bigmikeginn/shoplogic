export default function UpgradeModal({ onClose, onCheckout, source = 'premium features' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-lg border border-[var(--border-light)] bg-[var(--bg-primary)]">
        <p className="text-sm font-semibold text-[var(--accent)] mb-3">Premium feature</p>
        <h2 className="text-2xl font-bold mb-4">Keep your project workspace unlocked</h2>
        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
          {source} are available during your 14-day trial. Upgrade once to keep using project
          folders and saved outputs — no subscription.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCheckout}
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
