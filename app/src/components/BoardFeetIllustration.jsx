export default function BoardFeetIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto">
        {/* Title */}
        <text x="200" y="25" fontSize="14" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">
          How Board Feet Works
        </text>

        {/* 3D board illustration */}
        {/* Front face */}
        <rect x="80" y="100" width="160" height="90" fill="color-mix(in srgb, var(--accent) 15%, transparent)" stroke="var(--accent)" strokeWidth="2"/>

        {/* Top face (3D perspective) */}
        <polygon points="80,100 95,85 255,85 240,100" fill="color-mix(in srgb, var(--accent) 25%, transparent)" stroke="var(--accent)" strokeWidth="2"/>

        {/* Right face (3D perspective) */}
        <polygon points="240,100 255,85 255,175 240,190" fill="color-mix(in srgb, var(--accent) 10%, transparent)" stroke="var(--accent)" strokeWidth="2"/>

        {/* Dimension lines - Width */}
        <g>
          <line x1="80" y1="210" x2="240" y2="210" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3,3"/>
          <circle cx="80" cy="210" r="3" fill="var(--text-secondary)"/>
          <circle cx="240" cy="210" r="3" fill="var(--text-secondary)"/>
          <text x="160" y="230" fontSize="12" fill="var(--text-secondary)" fontWeight="500" textAnchor="middle">Width</text>
        </g>

        {/* Dimension lines - Height (Thickness) */}
        <g>
          <line x1="50" y1="100" x2="50" y2="190" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3,3"/>
          <circle cx="50" cy="100" r="3" fill="var(--text-secondary)"/>
          <circle cx="50" cy="190" r="3" fill="var(--text-secondary)"/>
          <text x="25" y="148" fontSize="12" fill="var(--text-secondary)" fontWeight="500" textAnchor="middle">
            <tspan x="25" dy="0">Thick</tspan>
            <tspan x="25" dy="14">ness</tspan>
          </text>
        </g>

        {/* Quantity indicator */}
        <g>
          <circle cx="320" cy="120" r="25" fill="color-mix(in srgb, var(--accent) 20%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
          <text x="320" y="128" fontSize="16" fontWeight="700" fill="var(--accent)" textAnchor="middle">Qty</text>
        </g>

        {/* Bottom explanation */}
        <text x="200" y="270" fontSize="13" fill="var(--text-primary)" textAnchor="middle" fontWeight="600">
          Board Feet
        </text>
      </svg>
    </div>
  );
}
