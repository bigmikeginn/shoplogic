export function SchematicStyle() {
  return (
    <svg viewBox="0 0 400 300" className="w-full max-w-2xl mx-auto">
      {/* Grid background */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border-lighter)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="400" height="300" fill="var(--bg-secondary)" />
      <rect width="400" height="300" fill="url(#grid)" opacity="0.5" />

      {/* Title */}
      <text x="200" y="25" fontSize="14" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">
        Board Feet Calculation
      </text>

      {/* Three boards stacked */}
      {[0, 35, 70].map((offset) => (
        <g key={offset}>
          {/* Board */}
          <rect x="60" y={100 + offset} width="140" height="20" fill="none" stroke="var(--text-primary)" strokeWidth="1.5"/>

          {/* Thickness dimension */}
          {offset === 0 && (
            <>
              <line x1="40" y1="100" x2="40" y2="120" stroke="var(--accent)" strokeWidth="1"/>
              <line x1="35" y1="100" x2="45" y1="100" stroke="var(--accent)" strokeWidth="1"/>
              <line x1="35" y1="120" x2="45" y1="120" stroke="var(--accent)" strokeWidth="1"/>
              <text x="20" y="112" fontSize="11" fill="var(--accent)" fontWeight="500">T</text>
            </>
          )}
        </g>
      ))}

      {/* Width dimension */}
      <line x1="60" y1="185" x2="200" y2="185" stroke="var(--accent)" strokeWidth="1"/>
      <line x1="60" y1="180" x2="60" y2="190" stroke="var(--accent)" strokeWidth="1"/>
      <line x1="200" y1="180" x2="200" y2="190" stroke="var(--accent)" strokeWidth="1"/>
      <text x="125" y="205" fontSize="11" fill="var(--accent)" fontWeight="500" textAnchor="middle">Width</text>

      {/* Length dimension */}
      <line x1="220" y1="80" x2="220" y2="170" stroke="var(--accent)" strokeWidth="1"/>
      <line x1="215" y1="80" x2="225" y2="80" stroke="var(--accent)" strokeWidth="1"/>
      <line x1="215" y1="170" x2="225" y2="170" stroke="var(--accent)" strokeWidth="1"/>
      <text x="245" y="130" fontSize="11" fill="var(--accent)" fontWeight="500" textAnchor="start">Length</text>

      {/* Formula */}
      <text x="200" y="260" fontSize="12" fill="var(--text-secondary)" textAnchor="middle" fontFamily="monospace">
        (Qty × T × W × L) ÷ 144 = Board Feet
      </text>
    </svg>
  );
}

export function GeometricStyle() {
  return (
    <svg viewBox="0 0 400 300" className="w-full max-w-2xl mx-auto">
      {/* Background */}
      <rect width="400" height="300" fill="var(--bg-secondary)" />

      {/* Title */}
      <text x="200" y="25" fontSize="14" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">
        Board Feet Calculation
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
        <text x="30" y="150" fontSize="12" fill="var(--text-secondary)" fontWeight="500" textAnchor="middle" transform="rotate(-90 30 150)">Thickness</text>
      </g>

      {/* Quantity indicator */}
      <g>
        <circle cx="320" cy="120" r="25" fill="color-mix(in srgb, var(--accent) 20%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <text x="320" y="128" fontSize="16" fontWeight="700" fill="var(--accent)" textAnchor="middle">Qty</text>
      </g>

      {/* Result indicator */}
      <text x="200" y="270" fontSize="13" fill="var(--text-primary)" textAnchor="middle" fontWeight="600">
        Board Feet
      </text>
    </svg>
  );
}

export function AnnotatedStyle() {
  return (
    <svg viewBox="0 0 400 300" className="w-full max-w-2xl mx-auto">
      {/* Background */}
      <rect width="400" height="300" fill="var(--bg-secondary)" />

      {/* Title */}
      <text x="200" y="25" fontSize="14" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">
        Board Feet Calculation
      </text>

      {/* Main board illustration */}
      <rect x="100" y="90" width="140" height="70" fill="color-mix(in srgb, var(--accent) 8%, transparent)" stroke="var(--text-secondary)" strokeWidth="2"/>

      {/* Thickness annotation - left side */}
      <g>
        <line x1="85" y1="90" x2="85" y2="160" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="80" y1="90" x2="90" y2="90" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="80" y1="160" x2="90" y2="160" stroke="var(--accent)" strokeWidth="1.5"/>
        <path d="M 70 120 L 80 125 L 80 115 Z" fill="var(--accent)"/>
        <text x="45" y="128" fontSize="12" fontWeight="600" fill="var(--accent)">Thickness</text>
      </g>

      {/* Width annotation - bottom */}
      <g>
        <line x1="100" y1="180" x2="240" y2="180" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="100" y1="175" x2="100" y2="185" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="240" y1="175" x2="240" y2="185" stroke="var(--accent)" strokeWidth="1.5"/>
        <path d="M 170 195 L 165 185 L 175 185 Z" fill="var(--accent)"/>
        <text x="170" y="220" fontSize="12" fontWeight="600" fill="var(--accent)" textAnchor="middle">Width</text>
      </g>

      {/* Length annotation - right side */}
      <g>
        <line x1="260" y1="90" x2="260" y2="160" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="255" y1="90" x2="265" y2="90" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="255" y1="160" x2="265" y2="160" stroke="var(--accent)" strokeWidth="1.5"/>
        <path d="M 275 120 L 265 125 L 265 115 Z" fill="var(--accent)"/>
        <text x="300" y="128" fontSize="12" fontWeight="600" fill="var(--accent)">Length</text>
      </g>

      {/* Quantity badge */}
      <g>
        <rect x="310" y="100" width="50" height="40" rx="4" fill="color-mix(in srgb, var(--accent) 20%, transparent)" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="335" y="120" fontSize="14" fontWeight="700" fill="var(--accent)" textAnchor="middle">×</text>
        <text x="335" y="135" fontSize="11" fontWeight="600" fill="var(--accent)" textAnchor="middle">Qty</text>
      </g>

      {/* Bottom label */}
      <text x="200" y="270" fontSize="13" fill="var(--text-primary)" textAnchor="middle" fontWeight="600">
        Multiply dimensions to find board feet
      </text>
    </svg>
  );
}
