export default function BFPricingIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 230" className="w-full max-w-2xl mx-auto">
        <text x="150" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Cost with Waste &amp; Tax</text>
        <rect x="25" y="50" width="200" height="65" fill="color-mix(in srgb, var(--accent) 10%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <text x="115" y="87" fontSize="14" fontWeight="700" textAnchor="middle" fill="var(--accent)">12.5 BF</text>
        <rect x="185" y="50" width="40" height="65" fill="color-mix(in srgb, var(--text-muted) 10%, transparent)" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3,3"/>
        <text x="205" y="87" fontSize="9" textAnchor="middle" fill="var(--text-muted)">waste</text>
        <circle cx="260" cy="75" r="22" fill="color-mix(in srgb, var(--accent) 15%, transparent)" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="260" y="72" fontSize="9" textAnchor="middle" fill="var(--text-muted)">$/BF</text>
        <text x="260" y="86" fontSize="12" textAnchor="middle" fill="var(--accent)" fontWeight="700">8.50</text>
        <text x="150" y="148" fontSize="11" textAnchor="middle" fill="var(--text-muted)" fontFamily="monospace">BF × $/BF × (1 + waste%)</text>
        <line x1="35" y1="158" x2="265" y2="158" stroke="var(--border-light)" strokeWidth="1"/>
        <text x="150" y="176" fontSize="11" textAnchor="middle" fill="var(--text-muted)" fontFamily="monospace">× (1 + tax%) = Total</text>
      </svg>
    </div>
  );
}
