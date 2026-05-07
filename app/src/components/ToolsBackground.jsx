export default function ToolsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        className="w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
              .tool-icon {
                opacity: 0.03;
                transition: opacity 0.3s ease;
              }

              @keyframes float-slow {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(5deg); }
              }

              @keyframes float-slower {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-15px) rotate(-5deg); }
              }

              .float-slow { animation: float-slow 8s ease-in-out infinite; }
              .float-slower { animation: float-slower 12s ease-in-out infinite; }
            `}
          </style>
        </defs>

        {/* Saw Blades */}
        <g className="tool-icon float-slow" style={{ animationDelay: '0s' }} transform="translate(150, 100) rotate(-15)">
          <circle cx="0" cy="0" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {[...Array(24)].map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const x1 = Math.cos(angle) * 32;
            const y1 = Math.sin(angle) * 32;
            const x2 = Math.cos(angle) * 38;
            const y2 = Math.sin(angle) * 38;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" />;
          })}
        </g>

        {/* Hammer */}
        <g className="tool-icon float-slower" style={{ animationDelay: '2s' }} transform="translate(1450, 250) rotate(25)">
          {/* Handle */}
          <rect x="-3" y="-35" width="6" height="45" rx="3" fill="currentColor" />
          {/* Head */}
          <rect x="-12" y="-45" width="24" height="15" rx="2" fill="currentColor" />
          <rect x="-10" y="-33" width="8" height="8" rx="1" fill="currentColor" />
        </g>

        {/* Screwdriver */}
        <g className="tool-icon float-slow" style={{ animationDelay: '4s' }} transform="translate(300, 600) rotate(-35)">
          {/* Handle */}
          <rect x="-5" y="0" width="10" height="50" rx="5" fill="currentColor" />
          {/* Blade */}
          <path d="M -3 0 L 3 0 L 2 -15 L -2 -15 Z" fill="currentColor" />
          {/* Grip lines */}
          {[...Array(5)].map((_, i) => (
            <line key={i} x1="-4" y1={8 + i * 8} x2="4" y2={8 + i * 8} stroke="currentColor" strokeWidth="0.5" />
          ))}
        </g>

        {/* Wrench */}
        <g className="tool-icon float-slower" style={{ animationDelay: '6s' }} transform="translate(1200, 150) rotate(45)">
          <path d="M -20 -5 Q 0 -5 10 -15 Q 15 -20 20 -18 Q 15 -8 8 0 L 15 8 Q 10 5 5 12 Q -10 25 -25 20 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="-22" cy="-5" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="18" cy="-15" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>

        {/* Pliers */}
        <g className="tool-icon float-slow" style={{ animationDelay: '1s' }} transform="translate(850, 700) rotate(-20)">
          <path d="M -10 -25 L -15 5 L -5 10 L 0 -20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 10 -25 L 15 5 L 5 10 L 0 -20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="0" cy="-18" r="3" fill="currentColor" />
        </g>

        {/* Level */}
        <g className="tool-icon float-slower" style={{ animationDelay: '3s' }} transform="translate(500, 250) rotate(10)">
          <rect x="-35" y="-6" width="70" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="-20" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </g>

        {/* Drill Bit */}
        <g className="tool-icon float-slow" style={{ animationDelay: '5s' }} transform="translate(1350, 550) rotate(60)">
          <rect x="-2" y="-40" width="4" height="40" fill="currentColor" />
          <path d="M -4 2 L -6 5 L 0 8 L 6 5 L 4 2 Z" fill="currentColor" />
          <path d="M -3 -38 L 0 -45 L 3 -38 Z" fill="currentColor" />
        </g>

        {/* Allen Key/Hex Wrench */}
        <g className="tool-icon float-slower" style={{ animationDelay: '0.5s' }} transform="translate(700, 150) rotate(-50)">
          <path d="M 0 -30 L 20 -15 L 20 5 L 0 20 L -20 5 L -20 -15 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="0" y1="-30" x2="0" y2="20" stroke="currentColor" strokeWidth="1.5" />
        </g>

        {/* Tape Measure */}
        <g className="tool-icon float-slow" style={{ animationDelay: '3.5s' }} transform="translate(200, 450) rotate(20)">
          <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * 24;
            const y = Math.sin(angle) * 24;
            return <line key={i} x1="0" y1="0" x2={x} y2={y} stroke="currentColor" strokeWidth="1" />;
          })}
        </g>

        {/* Chisel */}
        <g className="tool-icon float-slower" style={{ animationDelay: '2.5s' }} transform="translate(1100, 750) rotate(-65)">
          <rect x="-3" y="-40" width="6" height="40" fill="currentColor" />
          <path d="M -6 0 L 6 0 L 3 8 L -3 8 Z" fill="currentColor" />
          <rect x="-5" y="-45" width="10" height="6" rx="1" fill="currentColor" />
        </g>

        {/* Square/Ruler */}
        <g className="tool-icon float-slow" style={{ animationDelay: '1.5s' }} transform="translate(950, 400) rotate(35)">
          <rect x="-25" y="-8" width="50" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="-8" y="8" width="16" height="30" fill="none" stroke="currentColor" strokeWidth="2" />
          {[...Array(5)].map((_, i) => (
            <line key={i} x1={-20 + i * 10} y1="-7" x2={-20 + i * 10} y2="-2} stroke="currentColor" strokeWidth="1" />
          ))}
        </g>

        {/* Clamp */}
        <g className="tool-icon float-slower" style={{ animationDelay: '4.5s' }} transform="translate(400, 750) rotate(15)">
          <path d="M -15 -15 L -15 15 L -5 15 L -5 -15 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 15 -15 Q 5 0 15 15" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </g>

        {/* Precision Square Corner Detail */}
        <g className="tool-icon float-slow" style={{ animationDelay: '2s' }} transform="translate(1500, 600) rotate(25)">
          <path d="M -20 20 L -20 -20 L 20 -20 L 20 0 L 10 0 L 10 10 L 0 10 L 0 20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>

        {/* Add subtle glow effect in center */}
        <radialGradient id="centerGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <circle cx="800" cy="450" r="600" fill="url(#centerGlow)" />
      </svg>
    </div>
  );
}
