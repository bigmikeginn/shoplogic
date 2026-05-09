export default function BoardFeetIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 460 270" className="w-full max-w-2xl mx-auto">

        {/* Title */}
        <text x="200" y="20" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">
          How Board Feet Works
        </text>

        {/* Board: Length runs left→right, Width is the face height, Thickness is the 3D depth */}

        {/* Front face: Length × Width */}
        <rect x="70" y="48" width="250" height="72"
          fill="color-mix(in srgb, var(--accent) 15%, transparent)"
          stroke="var(--accent)" strokeWidth="2"/>

        {/* Top face: Length × Thickness (depth going up-right) */}
        <polygon points="70,48 92,30 342,30 320,48"
          fill="color-mix(in srgb, var(--accent) 25%, transparent)"
          stroke="var(--accent)" strokeWidth="2"/>

        {/* Right face: Width × Thickness */}
        <polygon points="320,48 342,30 342,102 320,120"
          fill="color-mix(in srgb, var(--accent) 8%, transparent)"
          stroke="var(--accent)" strokeWidth="2"/>

        {/* LENGTH — bottom dashed line, clearly spanning the long direction */}
        <line x1="70" y1="140" x2="320" y2="140" stroke="var(--text-secondary)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <circle cx="70" cy="140" r="3" fill="var(--text-secondary)"/>
        <circle cx="320" cy="140" r="3" fill="var(--text-secondary)"/>
        <text x="195" y="158" fontSize="12" fontWeight="600" textAnchor="middle" fill="var(--text-secondary)">Length</text>

        {/* WIDTH — left dashed line, spanning the face height */}
        <line x1="45" y1="48" x2="45" y2="120" stroke="var(--text-secondary)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <circle cx="45" cy="48" r="3" fill="var(--text-secondary)"/>
        <circle cx="45" cy="120" r="3" fill="var(--text-secondary)"/>
        <text x="22" y="88" fontSize="12" fontWeight="600" textAnchor="middle" fill="var(--text-secondary)">Width</text>

        {/* THICKNESS — diagonal line on top-right showing depth */}
        <line x1="320" y1="48" x2="342" y2="30" stroke="var(--text-secondary)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <circle cx="320" cy="48" r="3" fill="var(--text-secondary)"/>
        <circle cx="342" cy="30" r="3" fill="var(--text-secondary)"/>
        <text x="348" y="25" fontSize="12" fontWeight="600" textAnchor="start" fill="var(--text-secondary)">Thickness</text>

        {/* Formula as a fraction */}
        <text x="200" y="198" fontSize="12" textAnchor="middle" fill="var(--text-secondary)" fontFamily="monospace">
          Qty × Thickness × Width × Length
        </text>
        <line x1="90" y1="210" x2="310" y2="210" stroke="var(--border-light)" strokeWidth="1.5"/>
        <text x="200" y="230" fontSize="12" textAnchor="middle" fill="var(--text-secondary)" fontFamily="monospace">144</text>
        <text x="318" y="220" fontSize="12" textAnchor="start" fill="var(--text-secondary)" fontFamily="monospace">= Board Feet</text>

      </svg>
    </div>
  );
}
