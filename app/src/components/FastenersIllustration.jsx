export default function FastenersIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 230" className="w-full max-w-2xl mx-auto">
        <text x="150" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Screw &amp; Bolt Sizing</text>
        <polygon points="105,32 195,32 205,55 95,55" fill="color-mix(in srgb, var(--accent) 20%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <line x1="140" y1="32" x2="140" y2="55" stroke="var(--bg-primary)" strokeWidth="5"/>
        <line x1="160" y1="32" x2="160" y2="55" stroke="var(--bg-primary)" strokeWidth="5"/>
        <rect x="137" y="55" width="26" height="28" fill="color-mix(in srgb, var(--accent) 20%, transparent)" stroke="var(--accent)" strokeWidth="1.5"/>
        <polyline points="137,83 130,90 137,97 130,104 137,111 130,118 137,125 130,132 137,139 130,146 137,153 130,160 137,167 150,174 163,167 156,160 163,153 156,146 163,139 156,132 163,125 156,118 163,111 156,104 163,97 156,90 163,83 163,83 137,83" fill="color-mix(in srgb, var(--accent) 12%, transparent)" stroke="var(--accent)" strokeWidth="1.2"/>
        <line x1="180" y1="32" x2="180" y2="174" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <circle cx="180" cy="32" r="2.5" fill="var(--text-muted)"/>
        <circle cx="180" cy="174" r="2.5" fill="var(--text-muted)"/>
        <text x="192" y="108" fontSize="11" fill="var(--text-muted)">Length</text>
        <line x1="130" y1="192" x2="170" y2="192" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <circle cx="130" cy="192" r="2.5" fill="var(--text-muted)"/>
        <circle cx="170" cy="192" r="2.5" fill="var(--text-muted)"/>
        <text x="150" y="210" fontSize="11" textAnchor="middle" fill="var(--text-muted)">Diameter</text>
      </svg>
    </div>
  );
}
