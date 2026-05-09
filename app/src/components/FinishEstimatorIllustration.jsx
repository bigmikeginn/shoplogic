export default function FinishEstimatorIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 360 230" className="w-full max-w-2xl mx-auto">
        <text x="165" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Surface Area → Coverage</text>
        <rect x="30" y="35" width="175" height="130" fill="color-mix(in srgb, var(--accent) 8%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <line x1="30" y1="57" x2="205" y2="57" stroke="color-mix(in srgb, var(--accent) 18%, transparent)" strokeWidth="1"/>
        <line x1="30" y1="79" x2="205" y2="79" stroke="color-mix(in srgb, var(--accent) 18%, transparent)" strokeWidth="1"/>
        <line x1="30" y1="101" x2="205" y2="101" stroke="color-mix(in srgb, var(--accent) 18%, transparent)" strokeWidth="1"/>
        <line x1="30" y1="123" x2="205" y2="123" stroke="color-mix(in srgb, var(--accent) 18%, transparent)" strokeWidth="1"/>
        <line x1="30" y1="145" x2="205" y2="145" stroke="color-mix(in srgb, var(--accent) 18%, transparent)" strokeWidth="1"/>
        <line x1="30" y1="178" x2="205" y2="178" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <circle cx="30" cy="178" r="2.5" fill="var(--text-muted)"/>
        <circle cx="205" cy="178" r="2.5" fill="var(--text-muted)"/>
        <text x="117" y="194" fontSize="11" textAnchor="middle" fill="var(--text-muted)">Length</text>
        <line x1="15" y1="35" x2="15" y2="165" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <circle cx="15" cy="35" r="2.5" fill="var(--text-muted)"/>
        <circle cx="15" cy="165" r="2.5" fill="var(--text-muted)"/>
        <text x="8" y="104" fontSize="11" textAnchor="middle" fill="var(--text-muted)" transform="rotate(-90,8,104)">Width</text>
        <ellipse cx="300" cy="80" rx="30" ry="10" fill="color-mix(in srgb, var(--accent) 30%, transparent)" stroke="var(--accent)" strokeWidth="1.5"/>
        <rect x="270" y="80" width="60" height="55" fill="color-mix(in srgb, var(--accent) 15%, transparent)" stroke="var(--accent)" strokeWidth="1.5"/>
        <ellipse cx="300" cy="135" rx="30" ry="10" fill="color-mix(in srgb, var(--accent) 12%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <text x="300" y="153" fontSize="10" textAnchor="middle" fill="var(--accent)">Finish</text>
        <text x="300" y="165" fontSize="9" textAnchor="middle" fill="var(--text-muted)">coverage</text>
      </svg>
    </div>
  );
}
