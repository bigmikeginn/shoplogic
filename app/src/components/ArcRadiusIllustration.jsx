export default function ArcRadiusIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 250" className="w-full max-w-2xl mx-auto">
        <text x="150" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Arc Geometry</text>
        <circle cx="150" cy="175" r="120" fill="none" stroke="color-mix(in srgb, var(--accent) 10%, transparent)" strokeWidth="1" strokeDasharray="5,5"/>
        <path d="M 38 122 A 120 120 0 0 1 262 122" fill="color-mix(in srgb, var(--accent) 6%, transparent)" stroke="var(--accent)" strokeWidth="2.5"/>
        <line x1="38" y1="122" x2="262" y2="122" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="5,4"/>
        <line x1="150" y1="175" x2="262" y2="122" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="5,4"/>
        <line x1="150" y1="55" x2="150" y2="122" stroke="var(--accent)" strokeWidth="1.5"/>
        <circle cx="150" cy="175" r="4" fill="var(--accent)"/>
        <text x="218" y="140" fontSize="11" fontWeight="600" fill="var(--text-muted)">Radius</text>
        <text x="158" y="90" fontSize="11" fontWeight="600" fill="var(--accent)">Height</text>
        <text x="150" y="138" fontSize="11" fontWeight="600" textAnchor="middle" fill="var(--text-muted)">Chord</text>
        <text x="150" y="38" fontSize="12" fontWeight="700" textAnchor="middle" fill="var(--accent)">Arc</text>
      </svg>
    </div>
  );
}
