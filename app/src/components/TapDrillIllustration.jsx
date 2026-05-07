export default function TapDrillIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 250" className="w-full max-w-2xl mx-auto">
        <text x="150" y="16" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Thread Tap &amp; Clearance Sizes</text>
        <text x="150" y="30" fontSize="10" textAnchor="middle" fill="var(--accent)">Tap Ø</text>
        <line x1="131" y1="38" x2="169" y2="38" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="131" y1="33" x2="131" y2="43" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="169" y1="33" x2="169" y2="43" stroke="var(--accent)" strokeWidth="1.5"/>
        <rect x="75" y="48" width="150" height="145" fill="color-mix(in srgb, var(--text-muted) 10%, transparent)" stroke="var(--text-muted)" strokeWidth="2"/>
        <rect x="131" y="48" width="38" height="145" fill="var(--bg-primary)"/>
        <polyline points="131,48 123,57 131,66 123,75 131,84 123,93 131,102 123,111 131,120 123,129 131,138 123,147 131,156 123,165 131,174 123,183 131,192 131,193" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
        <polyline points="169,48 177,57 169,66 177,75 169,84 177,93 169,102 177,111 169,120 177,129 169,138 177,147 169,156 177,165 169,174 177,183 169,192 169,193" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
        <line x1="75" y1="208" x2="225" y2="208" stroke="var(--text-muted)" strokeWidth="1.5"/>
        <line x1="75" y1="203" x2="75" y2="213" stroke="var(--text-muted)" strokeWidth="1.5"/>
        <line x1="225" y1="203" x2="225" y2="213" stroke="var(--text-muted)" strokeWidth="1.5"/>
        <text x="150" y="230" fontSize="10" textAnchor="middle" fill="var(--text-muted)">Clearance Ø</text>
      </svg>
    </div>
  );
}
