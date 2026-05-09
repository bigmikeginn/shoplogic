export default function ShelfSagIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 235" className="w-full max-w-2xl mx-auto">
        <text x="150" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Deflection &amp; Load Limits</text>
        <rect x="26" y="75" width="14" height="95" fill="var(--bg-tertiary)" stroke="var(--text-muted)" strokeWidth="1"/>
        <rect x="260" y="75" width="14" height="95" fill="var(--bg-tertiary)" stroke="var(--text-muted)" strokeWidth="1"/>
        <path d="M 26 78 Q 150 126 274 78" fill="color-mix(in srgb, var(--accent) 10%, transparent)" stroke="var(--accent)" strokeWidth="2.5"/>
        <line x1="26" y1="78" x2="274" y2="78" stroke="color-mix(in srgb, var(--accent) 25%, transparent)" strokeWidth="1.5" strokeDasharray="5,4"/>
        <line x1="150" y1="38" x2="150" y2="99" stroke="#ef4444" strokeWidth="2"/>
        <polygon points="150,103 143,90 157,90" fill="#ef4444"/>
        <text x="163" y="62" fontSize="11" fill="#ef4444">Load</text>
        <line x1="200" y1="78" x2="200" y2="98" stroke="var(--text-muted)" strokeWidth="1.5"/>
        <circle cx="200" cy="78" r="2.5" fill="var(--text-muted)"/>
        <circle cx="200" cy="98" r="2.5" fill="var(--text-muted)"/>
        <text x="212" y="91" fontSize="11" fill="var(--text-muted)">δ sag</text>
        <line x1="50" y1="188" x2="250" y2="188" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <circle cx="50" cy="188" r="2.5" fill="var(--text-muted)"/>
        <circle cx="250" cy="188" r="2.5" fill="var(--text-muted)"/>
        <text x="150" y="205" fontSize="11" textAnchor="middle" fill="var(--text-muted)">Span</text>
      </svg>
    </div>
  );
}
