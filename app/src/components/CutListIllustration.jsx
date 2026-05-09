export default function CutListIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 320 220" className="w-full max-w-2xl mx-auto">
        <text x="160" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Optimized Cut Sequence</text>
        <rect x="20" y="85" width="280" height="55" fill="color-mix(in srgb, var(--accent) 8%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <line x1="105" y1="78" x2="105" y2="147" stroke="#ef4444" strokeWidth="2"/>
        <line x1="185" y1="78" x2="185" y2="147" stroke="#ef4444" strokeWidth="2"/>
        <line x1="240" y1="78" x2="240" y2="147" stroke="#ef4444" strokeWidth="2"/>
        <text x="62" y="117" fontSize="13" fontWeight="700" textAnchor="middle" fill="var(--accent)">A</text>
        <text x="145" y="117" fontSize="13" fontWeight="700" textAnchor="middle" fill="var(--accent)">B</text>
        <text x="212" y="117" fontSize="13" fontWeight="700" textAnchor="middle" fill="var(--accent)">C</text>
        <rect x="240" y="85" width="60" height="55" fill="color-mix(in srgb, var(--text-muted) 6%, transparent)" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3,3"/>
        <text x="270" y="117" fontSize="10" textAnchor="middle" fill="var(--text-muted)">off-cut</text>
        <line x1="20" y1="162" x2="300" y2="162" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <circle cx="20" cy="162" r="2.5" fill="var(--text-muted)"/>
        <circle cx="300" cy="162" r="2.5" fill="var(--text-muted)"/>
        <text x="160" y="178" fontSize="11" textAnchor="middle" fill="var(--text-muted)">Stock Length</text>
      </svg>
    </div>
  );
}
