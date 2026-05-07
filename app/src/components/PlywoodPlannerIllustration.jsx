export default function PlywoodPlannerIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 340 240" className="w-full max-w-2xl mx-auto">
        <text x="170" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Sheet Layout Optimization</text>
        <rect x="30" y="30" width="280" height="180" fill="color-mix(in srgb, var(--accent) 5%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <text x="10" y="123" fontSize="10" textAnchor="middle" fill="var(--text-muted)" transform="rotate(-90,10,123)">48"</text>
        <text x="170" y="222" fontSize="10" textAnchor="middle" fill="var(--text-muted)">96"</text>
        <rect x="30" y="30" width="130" height="88" fill="color-mix(in srgb, var(--accent) 18%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <text x="95" y="78" fontSize="11" textAnchor="middle" fill="var(--accent)">Piece 1</text>
        <rect x="164" y="30" width="146" height="88" fill="color-mix(in srgb, var(--accent) 12%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <text x="237" y="78" fontSize="11" textAnchor="middle" fill="var(--accent)">Piece 2</text>
        <rect x="30" y="122" width="100" height="88" fill="color-mix(in srgb, var(--accent) 18%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <text x="80" y="168" fontSize="11" textAnchor="middle" fill="var(--accent)">Piece 3</text>
        <rect x="134" y="122" width="100" height="88" fill="color-mix(in srgb, var(--accent) 12%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <text x="184" y="168" fontSize="11" textAnchor="middle" fill="var(--accent)">Piece 4</text>
        <rect x="238" y="122" width="72" height="88" fill="color-mix(in srgb, var(--text-muted) 6%, transparent)" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="4,3"/>
        <text x="274" y="168" fontSize="10" textAnchor="middle" fill="var(--text-muted)">waste</text>
      </svg>
    </div>
  );
}
