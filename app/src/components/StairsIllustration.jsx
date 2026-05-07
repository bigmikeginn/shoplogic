export default function StairsIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 230" className="w-full max-w-2xl mx-auto">
        <text x="150" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Rise, Run &amp; Stringer</text>
        <polyline points="25,205 25,165 80,165 80,125 135,125 135,85 190,85 190,45 260,45" fill="none" stroke="var(--accent)" strokeWidth="2.5"/>
        <rect x="25" y="165" width="55" height="40" fill="color-mix(in srgb, var(--accent) 8%, transparent)"/>
        <rect x="80" y="125" width="55" height="40" fill="color-mix(in srgb, var(--accent) 8%, transparent)"/>
        <rect x="135" y="85" width="55" height="40" fill="color-mix(in srgb, var(--accent) 8%, transparent)"/>
        <line x1="10" y1="165" x2="10" y2="205" stroke="var(--text-muted)" strokeWidth="1.5"/>
        <circle cx="10" cy="165" r="2.5" fill="var(--text-muted)"/>
        <circle cx="10" cy="205" r="2.5" fill="var(--text-muted)"/>
        <text x="10" y="188" fontSize="10" textAnchor="middle" fill="var(--text-muted)" transform="rotate(-90,10,188)">Rise</text>
        <line x1="25" y1="218" x2="80" y2="218" stroke="var(--text-muted)" strokeWidth="1.5"/>
        <circle cx="25" cy="218" r="2.5" fill="var(--text-muted)"/>
        <circle cx="80" cy="218" r="2.5" fill="var(--text-muted)"/>
        <text x="52" y="230" fontSize="10" textAnchor="middle" fill="var(--text-muted)">Run</text>
        <line x1="25" y1="205" x2="260" y2="45" stroke="color-mix(in srgb, var(--accent) 30%, transparent)" strokeWidth="1.5" strokeDasharray="5,4"/>
        <text x="175" y="148" fontSize="10" fill="color-mix(in srgb, var(--accent) 60%, transparent)" transform="rotate(-34,175,148)">Stringer</text>
      </svg>
    </div>
  );
}
