export default function CompoundMiterIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 230" className="w-full max-w-2xl mx-auto">
        <text x="150" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Miter &amp; Bevel Angles</text>
        <line x1="20" y1="165" x2="280" y2="165" stroke="var(--text-muted)" strokeWidth="2"/>
        <rect x="55" y="95" width="190" height="70" fill="color-mix(in srgb, var(--accent) 10%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <line x1="128" y1="88" x2="168" y2="172" stroke="#ef4444" strokeWidth="2.5"/>
        <path d="M 128 165 A 22 22 0 0 1 148 133" fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="22" y="148" fontSize="11" fill="var(--accent)" textAnchor="start">Miter</text>
        <ellipse cx="148" cy="165" rx="28" ry="9" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <text x="148" y="200" fontSize="11" fill="var(--text-muted)" textAnchor="middle">Bevel</text>
        <text x="150" y="220" fontSize="10" textAnchor="middle" fill="var(--text-muted)">Blade = f(miter, bevel, spring angle)</text>
      </svg>
    </div>
  );
}
