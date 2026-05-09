export default function GoldenRatioIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 320 240" className="w-full max-w-2xl mx-auto">
        <text x="160" y="16" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">φ = 1.618…</text>
        <rect x="18" y="28" width="260" height="160" fill="none" stroke="var(--accent)" strokeWidth="2"/>
        <rect x="18" y="28" width="160" height="160" fill="color-mix(in srgb, var(--accent) 12%, transparent)" stroke="var(--accent)" strokeWidth="1.5"/>
        <rect x="178" y="28" width="100" height="100" fill="color-mix(in srgb, var(--accent) 7%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <rect x="178" y="128" width="60" height="60" fill="color-mix(in srgb, var(--accent) 5%, transparent)" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4,2"/>
        <rect x="238" y="128" width="40" height="40" fill="color-mix(in srgb, var(--accent) 4%, transparent)" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="3,2"/>
        <rect x="238" y="168" width="40" height="20" fill="color-mix(in srgb, var(--accent) 3%, transparent)" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="3,2"/>
        <text x="98" y="118" fontSize="40" textAnchor="middle" fill="color-mix(in srgb, var(--accent) 20%, transparent)" fontStyle="italic">φ</text>
        <line x1="18" y1="200" x2="177" y2="200" stroke="var(--accent)" strokeWidth="1"/>
        <line x1="18" y1="196" x2="18" y2="204" stroke="var(--accent)" strokeWidth="1"/>
        <line x1="177" y1="196" x2="177" y2="204" stroke="var(--accent)" strokeWidth="1"/>
        <text x="98" y="216" fontSize="11" textAnchor="middle" fill="var(--accent)">1</text>
        <line x1="181" y1="200" x2="278" y2="200" stroke="var(--text-muted)" strokeWidth="1"/>
        <line x1="181" y1="196" x2="181" y2="204" stroke="var(--text-muted)" strokeWidth="1"/>
        <line x1="278" y1="196" x2="278" y2="204" stroke="var(--text-muted)" strokeWidth="1"/>
        <text x="230" y="216" fontSize="11" textAnchor="middle" fill="var(--text-muted)">0.618</text>
        <text x="160" y="232" fontSize="10" textAnchor="middle" fill="var(--text-muted)">Each remaining rectangle shares the same proportion</text>
      </svg>
    </div>
  );
}
