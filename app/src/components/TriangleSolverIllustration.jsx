export default function TriangleSolverIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 240" className="w-full max-w-2xl mx-auto">
        <text x="150" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Sides, Angles &amp; Area</text>
        <polygon points="50,200 250,200 150,50" fill="color-mix(in srgb, var(--accent) 8%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <text x="222" y="130" fontSize="15" fontWeight="700" fill="var(--accent)" fontStyle="italic">a</text>
        <text x="68" y="130" fontSize="15" fontWeight="700" fill="var(--text-muted)" fontStyle="italic">b</text>
        <text x="150" y="218" fontSize="15" fontWeight="700" textAnchor="middle" fill="var(--text-muted)" fontStyle="italic">c</text>
        <text x="150" y="44" fontSize="12" fontWeight="600" textAnchor="middle" fill="var(--accent)">A</text>
        <text x="36" y="200" fontSize="12" fontWeight="600" textAnchor="end" fill="var(--text-muted)">B</text>
        <text x="264" y="200" fontSize="12" fontWeight="600" fill="var(--text-muted)">C</text>
        <path d="M 156 62 A 14 14 0 0 1 144 62" fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
        <path d="M 64 188 A 14 14 0 0 1 60 198" fill="none" stroke="var(--text-muted)" strokeWidth="1.5"/>
        <path d="M 240 188 A 14 14 0 0 0 244 198" fill="none" stroke="var(--text-muted)" strokeWidth="1.5"/>
        <line x1="150" y1="50" x2="150" y2="200" stroke="color-mix(in srgb, var(--accent) 20%, transparent)" strokeWidth="1" strokeDasharray="4,3"/>
      </svg>
    </div>
  );
}
