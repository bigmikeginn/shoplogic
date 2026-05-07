export default function JoinerySpacingIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 320 220" className="w-full max-w-2xl mx-auto">
        <text x="160" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Even Joint Spacing</text>
        <rect x="20" y="70" width="280" height="70" fill="color-mix(in srgb, var(--accent) 7%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <rect x="62" y="70" width="10" height="70" fill="color-mix(in srgb, var(--accent) 40%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <rect x="117" y="70" width="10" height="70" fill="color-mix(in srgb, var(--accent) 40%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <rect x="172" y="70" width="10" height="70" fill="color-mix(in srgb, var(--accent) 40%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <rect x="227" y="70" width="10" height="70" fill="color-mix(in srgb, var(--accent) 40%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <line x1="72" y1="158" x2="117" y2="158" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="3,2"/>
        <circle cx="72" cy="158" r="2.5" fill="var(--text-muted)"/>
        <circle cx="117" cy="158" r="2.5" fill="var(--text-muted)"/>
        <text x="94" y="174" fontSize="11" textAnchor="middle" fill="var(--text-muted)">Spacing</text>
        <line x1="20" y1="158" x2="62" y2="158" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3,2"/>
        <text x="41" y="174" fontSize="10" textAnchor="middle" fill="var(--text-muted)">margin</text>
      </svg>
    </div>
  );
}
