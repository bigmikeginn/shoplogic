export default function WoodDatabaseIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 240" className="w-full max-w-2xl mx-auto">
        <text x="150" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Species Reference</text>
        <rect x="112" y="168" width="26" height="46" fill="rgba(120,60,20,0.5)" stroke="#92400e" strokeWidth="1.5"/>
        <polyline points="78,118 125,48 172,118" fill="rgba(34,197,94,0.12)" stroke="#4ade80" strokeWidth="1.5"/>
        <polyline points="72,140 125,78 178,140" fill="rgba(34,197,94,0.14)" stroke="#4ade80" strokeWidth="1.5"/>
        <polygon points="125,108 66,168 184,168" fill="rgba(34,197,94,0.16)" stroke="#4ade80" strokeWidth="1.5"/>
        <circle cx="222" cy="88" r="38" fill="color-mix(in srgb, var(--accent) 4%, transparent)" stroke="var(--accent)" strokeWidth="2.5"/>
        <line x1="251" y1="117" x2="272" y2="138" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round"/>
        <clipPath id="glassClip2">
          <circle cx="222" cy="88" r="35"/>
        </clipPath>
        <circle cx="222" cy="88" r="22" fill="none" stroke="color-mix(in srgb, var(--accent) 35%, transparent)" strokeWidth="1.5" clipPath="url(#glassClip2)"/>
        <circle cx="222" cy="88" r="10" fill="none" stroke="color-mix(in srgb, var(--accent) 50%, transparent)" strokeWidth="1.5" clipPath="url(#glassClip2)"/>
        <circle cx="222" cy="88" r="4" fill="color-mix(in srgb, var(--accent) 55%, transparent)" clipPath="url(#glassClip2)"/>
      </svg>
    </div>
  );
}
