export default function MetricConverterIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 340 230" className="w-full max-w-2xl mx-auto">
        <text x="170" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Unit Conversion</text>
        <rect x="30" y="50" width="280" height="36" fill="color-mix(in srgb, var(--accent) 10%, transparent)" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="18" y="72" fontSize="10" textAnchor="end" fill="var(--accent)">in</text>
        <line x1="30" y1="50" x2="30" y2="86" stroke="var(--accent)" strokeWidth="1"/>
        <line x1="100" y1="50" x2="100" y2="86" stroke="var(--accent)" strokeWidth="1"/>
        <line x1="170" y1="50" x2="170" y2="86" stroke="var(--accent)" strokeWidth="1"/>
        <line x1="240" y1="50" x2="240" y2="86" stroke="var(--accent)" strokeWidth="1"/>
        <line x1="310" y1="50" x2="310" y2="86" stroke="var(--accent)" strokeWidth="1"/>
        <text x="30" y="46" fontSize="10" textAnchor="middle" fill="var(--text-muted)">0</text>
        <text x="100" y="46" fontSize="10" textAnchor="middle" fill="var(--text-muted)">1"</text>
        <text x="170" y="46" fontSize="10" textAnchor="middle" fill="var(--text-muted)">2"</text>
        <text x="240" y="46" fontSize="10" textAnchor="middle" fill="var(--text-muted)">3"</text>
        <line x1="170" y1="89" x2="170" y2="106" stroke="var(--text-muted)" strokeWidth="1.5"/>
        <polygon points="170,109 164,97 176,97" fill="var(--text-muted)"/>
        <text x="180" y="102" fontSize="10" fill="var(--text-muted)">1" = 25.4 mm</text>
        <rect x="30" y="112" width="280" height="36" fill="rgba(99,102,241,0.1)" stroke="#818cf8" strokeWidth="1.5"/>
        <text x="18" y="134" fontSize="10" textAnchor="end" fill="#818cf8">mm</text>
        <line x1="30" y1="112" x2="30" y2="148" stroke="#818cf8" strokeWidth="1"/>
        <line x1="57" y1="112" x2="57" y2="148" stroke="#818cf8" strokeWidth="0.5"/>
        <line x1="84" y1="112" x2="84" y2="148" stroke="#818cf8" strokeWidth="1"/>
        <line x1="111" y1="112" x2="111" y2="148" stroke="#818cf8" strokeWidth="0.5"/>
        <line x1="138" y1="112" x2="138" y2="148" stroke="#818cf8" strokeWidth="1"/>
        <line x1="192" y1="112" x2="192" y2="148" stroke="#818cf8" strokeWidth="1"/>
        <line x1="246" y1="112" x2="246" y2="148" stroke="#818cf8" strokeWidth="1"/>
        <line x1="300" y1="112" x2="300" y2="148" stroke="#818cf8" strokeWidth="1"/>
        <text x="30" y="160" fontSize="10" textAnchor="middle" fill="var(--text-muted)">0</text>
        <text x="84" y="160" fontSize="10" textAnchor="middle" fill="var(--text-muted)">20</text>
        <text x="138" y="160" fontSize="10" textAnchor="middle" fill="var(--text-muted)">40</text>
        <text x="192" y="160" fontSize="10" textAnchor="middle" fill="var(--text-muted)">60</text>
        <text x="246" y="160" fontSize="10" textAnchor="middle" fill="var(--text-muted)">80</text>
      </svg>
    </div>
  );
}
