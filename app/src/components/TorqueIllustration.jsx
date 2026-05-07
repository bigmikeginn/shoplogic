export default function TorqueIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 230" className="w-full max-w-2xl mx-auto">
        <text x="150" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">T = Force × Distance</text>
        <circle cx="110" cy="120" r="16" fill="color-mix(in srgb, var(--text-muted) 20%, transparent)" stroke="var(--text-muted)" strokeWidth="2"/>
        <circle cx="110" cy="120" r="5" fill="var(--text-muted)"/>
        <rect x="110" y="108" width="130" height="24" rx="4" fill="color-mix(in srgb, var(--accent) 15%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <line x1="240" y1="120" x2="240" y2="178" stroke="#ef4444" strokeWidth="2.5"/>
        <polygon points="240,182 233,167 247,167" fill="#ef4444"/>
        <text x="252" y="156" fontSize="11" fill="#ef4444">F</text>
        <line x1="110" y1="150" x2="240" y2="150" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <circle cx="110" cy="150" r="2.5" fill="var(--text-muted)"/>
        <circle cx="240" cy="150" r="2.5" fill="var(--text-muted)"/>
        <text x="175" y="166" fontSize="11" textAnchor="middle" fill="var(--text-muted)">Distance (d)</text>
        <path d="M 128 100 A 32 32 0 0 0 82 136" fill="none" stroke="var(--accent)" strokeWidth="2"/>
        <polygon points="82,136 76,122 90,128" fill="var(--accent)"/>
        <text x="46" y="95" fontSize="11" fill="var(--accent)">Torque</text>
        <text x="150" y="210" fontSize="13" textAnchor="middle" fill="var(--text-muted)" fontFamily="monospace" fontWeight="600">T = F × d</text>
      </svg>
    </div>
  );
}
