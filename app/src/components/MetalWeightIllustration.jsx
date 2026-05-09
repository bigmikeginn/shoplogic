export default function MetalWeightIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 230" className="w-full max-w-2xl mx-auto">
        <text x="150" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Stock Weight by Shape</text>
        <circle cx="65" cy="85" r="38" fill="color-mix(in srgb, var(--text-muted) 15%, transparent)" stroke="var(--text-muted)" strokeWidth="2"/>
        <text x="65" y="136" fontSize="10" textAnchor="middle" fill="var(--text-muted)">Round</text>
        <rect x="112" y="47" width="76" height="76" fill="color-mix(in srgb, var(--text-muted) 15%, transparent)" stroke="var(--text-muted)" strokeWidth="2"/>
        <text x="150" y="136" fontSize="10" textAnchor="middle" fill="var(--text-muted)">Square</text>
        <rect x="206" y="62" width="74" height="38" fill="color-mix(in srgb, var(--text-muted) 15%, transparent)" stroke="var(--text-muted)" strokeWidth="2"/>
        <text x="243" y="115" fontSize="10" textAnchor="middle" fill="var(--text-muted)">Flat</text>
        <text x="150" y="165" fontSize="11" textAnchor="middle" fill="var(--text-muted)" fontFamily="monospace">Area × Length × Density</text>
        <line x1="55" y1="175" x2="245" y2="175" stroke="var(--border-light)" strokeWidth="1"/>
        <text x="150" y="194" fontSize="11" textAnchor="middle" fill="var(--text-muted)" fontFamily="monospace">= Weight (lb / kg)</text>
      </svg>
    </div>
  );
}
