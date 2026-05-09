export default function GearRatioIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 300 240" className="w-full max-w-2xl mx-auto">
        <text x="150" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">Teeth, RPM &amp; Speed</text>
        <circle cx="95" cy="120" r="68" fill="color-mix(in srgb, var(--accent) 6%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <circle cx="95" cy="120" r="10" fill="var(--accent)"/>
        <circle cx="95" cy="52" r="6" fill="color-mix(in srgb, var(--accent) 30%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <circle cx="95" cy="188" r="6" fill="color-mix(in srgb, var(--accent) 30%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <circle cx="27" cy="120" r="6" fill="color-mix(in srgb, var(--accent) 30%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <circle cx="163" cy="120" r="6" fill="color-mix(in srgb, var(--accent) 30%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <circle cx="48" cy="71" r="6" fill="color-mix(in srgb, var(--accent) 30%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <circle cx="48" cy="169" r="6" fill="color-mix(in srgb, var(--accent) 30%, transparent)" stroke="var(--accent)" strokeWidth="1"/>
        <circle cx="215" cy="120" r="40" fill="color-mix(in srgb, var(--text-muted) 6%, transparent)" stroke="var(--text-muted)" strokeWidth="2"/>
        <circle cx="215" cy="120" r="6" fill="var(--text-muted)"/>
        <circle cx="215" cy="78" r="5" fill="color-mix(in srgb, var(--text-muted) 30%, transparent)" stroke="var(--text-muted)" strokeWidth="1"/>
        <circle cx="215" cy="162" r="5" fill="color-mix(in srgb, var(--text-muted) 30%, transparent)" stroke="var(--text-muted)" strokeWidth="1"/>
        <circle cx="257" cy="120" r="5" fill="color-mix(in srgb, var(--text-muted) 30%, transparent)" stroke="var(--text-muted)" strokeWidth="1"/>
        <text x="95" y="208" fontSize="10" textAnchor="middle" fill="var(--accent)">Driver — 24T</text>
        <text x="215" y="175" fontSize="10" textAnchor="middle" fill="var(--text-muted)">Driven — 12T</text>
        <text x="155" y="228" fontSize="11" textAnchor="middle" fill="var(--text-muted)">Ratio = 24:12 = 2:1</text>
      </svg>
    </div>
  );
}
