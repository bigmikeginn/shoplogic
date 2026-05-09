export default function BoltCircleIllustration() {
  return (
    <div className="mt-8 pt-8 border-t border-[var(--border-light)]">
      <svg viewBox="0 0 280 260" className="w-full max-w-2xl mx-auto">
        <text x="140" y="18" fontSize="13" fontWeight="600" textAnchor="middle" fill="var(--text-primary)">PCD Hole Layout</text>
        <circle cx="140" cy="140" r="95" fill="color-mix(in srgb, var(--text-muted) 5%, transparent)" stroke="var(--text-muted)" strokeWidth="1.5"/>
        <circle cx="140" cy="140" r="90" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5,4"/>
        <circle cx="140" cy="140" r="4" fill="var(--accent)"/>
        <circle cx="140" cy="50" r="9" fill="color-mix(in srgb, var(--accent) 20%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <circle cx="218" cy="95" r="9" fill="color-mix(in srgb, var(--accent) 20%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <circle cx="218" cy="185" r="9" fill="color-mix(in srgb, var(--accent) 20%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <circle cx="140" cy="230" r="9" fill="color-mix(in srgb, var(--accent) 20%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <circle cx="62" cy="185" r="9" fill="color-mix(in srgb, var(--accent) 20%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <circle cx="62" cy="95" r="9" fill="color-mix(in srgb, var(--accent) 20%, transparent)" stroke="var(--accent)" strokeWidth="2"/>
        <line x1="50" y1="140" x2="230" y2="140" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3,3"/>
        <text x="140" y="156" fontSize="11" textAnchor="middle" fill="var(--text-muted)">PCD</text>
        <line x1="140" y1="50" x2="218" y2="95" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3,3"/>
        <text x="196" y="62" fontSize="10" fill="var(--text-muted)">Chord</text>
      </svg>
    </div>
  );
}
