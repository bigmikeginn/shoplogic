export default function BoardFeetIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 500 350" className="w-full max-w-2xl mx-auto">
        {/* Title */}
        <text x="250" y="25" fontSize="14" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">
          How Board Feet Works
        </text>

        {/* 3D board illustration */}
        {/* Front face */}
        <rect x="100" y="80" width="160" height="90" fill="color-mix(in srgb, var(--accent) 15%, transparent)" stroke="var(--accent)" strokeWidth="2"/>

        {/* Top face (3D perspective) */}
        <polygon points="100,80 115,65 275,65 260,80" fill="color-mix(in srgb, var(--accent) 25%, transparent)" stroke="var(--accent)" strokeWidth="2"/>

        {/* Right face (3D perspective) */}
        <polygon points="260,80 275,65 275,155 260,170" fill="color-mix(in srgb, var(--accent) 10%, transparent)" stroke="var(--accent)" strokeWidth="2"/>

        {/* Dimension lines - Width (bottom) */}
        <g>
          <line x1="100" y1="190" x2="260" y2="190" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3,3"/>
          <circle cx="100" cy="190" r="3" fill="var(--text-secondary)"/>
          <circle cx="260" cy="190" r="3" fill="var(--text-secondary)"/>
          <text x="180" y="215" fontSize="12" fill="var(--text-secondary)" fontWeight="500" textAnchor="middle">Width</text>
        </g>

        {/* Dimension lines - Thickness (left) */}
        <g>
          <line x1="70" y1="80" x2="70" y2="170" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3,3"/>
          <circle cx="70" cy="80" r="3" fill="var(--text-secondary)"/>
          <circle cx="70" cy="170" r="3" fill="var(--text-secondary)"/>
          <text x="40" y="130" fontSize="12" fill="var(--text-secondary)" fontWeight="500" textAnchor="middle">
            <tspan x="40" dy="0">Thick</tspan>
            <tspan x="40" dy="14">ness</tspan>
          </text>
        </g>

        {/* Dimension lines - Length (top back diagonal) */}
        <g>
          <line x1="100" y1="80" x2="115" y2="65" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3,3"/>
          <circle cx="100" cy="80" r="3" fill="var(--accent)"/>
          <circle cx="115" cy="65" r="3" fill="var(--accent)"/>
          <text x="95" y="50" fontSize="12" fill="var(--accent)" fontWeight="500" textAnchor="end">Length</text>
        </g>

        {/* Quantity indicator */}
        <g>
          <circle cx="400" cy="100" r="28" fill="color-mix(in srgb, var(--accent) 20%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
          <text x="400" y="108" fontSize="18" fontWeight="700" fill="var(--accent)" textAnchor="middle">Qty</text>
        </g>

        {/* Formula section */}
        <g>
          <text x="250" y="250" fontSize="12" fill="var(--text-secondary)" textAnchor="middle" fontFamily="monospace">
            Qty × Thickness × Width × Length
          </text>
          <text x="250" y="275" fontSize="12" fill="var(--text-secondary)" textAnchor="middle" fontFamily="monospace">
            ÷ 144 = Board Feet
          </text>
        </g>
      </svg>
    </div>
  );
}
