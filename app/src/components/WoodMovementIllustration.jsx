export default function WoodMovementIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 235" className="w-full max-w-2xl mx-auto">
        <text x="150" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Seasonal Expansion</text>
        <text x="105" y="43" fontSize="9" textAnchor="middle" fill="var(--text-muted)">Dry — 8% MC</text>
        <rect x="50" y="48" width="110" height="58" fill="color-mix(in srgb, var(--accent) 7%, transparent)" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <path d="M 50,64 Q 105,80 160,64" fill="none" stroke="color-mix(in srgb, var(--text-muted) 50%, transparent)" strokeWidth="0.9"/>
        <path d="M 50,75 Q 105,90 160,75" fill="none" stroke="color-mix(in srgb, var(--text-muted) 50%, transparent)" strokeWidth="0.9"/>
        <path d="M 50,86 Q 105,99 160,86" fill="none" stroke="color-mix(in srgb, var(--text-muted) 45%, transparent)" strokeWidth="0.8"/>
        <line x1="105" y1="110" x2="105" y2="145" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="3,2"/>
        <polygon points="105,148 99,136 111,136" fill="var(--text-muted)"/>
        <rect x="50" y="148" width="136" height="58" fill="color-mix(in srgb, var(--accent) 16%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <path d="M 50,164 Q 118,180 186,164" fill="none" stroke="color-mix(in srgb, var(--accent) 50%, transparent)" strokeWidth="0.9"/>
        <path d="M 50,175 Q 118,190 186,175" fill="none" stroke="color-mix(in srgb, var(--accent) 50%, transparent)" strokeWidth="0.9"/>
        <path d="M 50,186 Q 118,199 186,186" fill="none" stroke="color-mix(in srgb, var(--accent) 45%, transparent)" strokeWidth="0.8"/>
        <text x="118" y="218" fontSize="9" textAnchor="middle" fill="var(--accent)">Wet — 18% MC</text>
        <line x1="162" y1="77" x2="190" y2="77" stroke="#ef4444" strokeWidth="2"/>
        <polygon points="193,77 183,72 183,82" fill="#ef4444"/>
        <line x1="186" y1="177" x2="218" y2="177" stroke="#ef4444" strokeWidth="2"/>
        <polygon points="221,177 211,172 211,182" fill="#ef4444"/>
        <text x="230" y="74" fontSize="10" fill="#ef4444">Width</text>
        <text x="230" y="86" fontSize="10" fill="#ef4444">expands</text>
      </svg>
    </div>
  );
}
