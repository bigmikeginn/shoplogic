export default function TrialBanner({
  status,
  trialDaysLeft = 0,
  onUpgrade,
  className = '',
}) {
  if (status !== 'trial' && status !== 'expired' && status !== 'premium') {
    return null;
  }

  let title = 'Project folders and saved outputs are unlocked';
  let body = 'Your premium workspace features are active.';
  let accentClasses = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';

  if (status === 'trial') {
    title = `${trialDaysLeft} day${trialDaysLeft === 1 ? '' : 's'} left in your free trial`;
    body = 'Project folders and saved outputs are available during your 14-day trial.';
    accentClasses = 'border-[rgba(251,191,36,0.3)] bg-[rgba(251,191,36,0.08)] text-[var(--accent)]';
  }

  if (status === 'expired') {
    title = 'Your free trial has ended';
    body = 'Upgrade to keep using project folders and saved outputs.';
    accentClasses = 'border-red-500/30 bg-red-500/10 text-red-300';
  }

  return (
    <div className={`rounded-lg border p-4 ${accentClasses} ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">{body}</p>
        </div>
        {(status === 'trial' || status === 'expired') && onUpgrade && (
          <button
            onClick={onUpgrade}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-lg hover:shadow-[var(--accent)]/30 transition-all"
          >
            Upgrade
          </button>
        )}
      </div>
    </div>
  );
}
