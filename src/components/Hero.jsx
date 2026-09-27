export default function Hero() {
  return (
    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-sky-600 sm:h-80">
      {/* Ambient moving glow */}
      <div className="absolute -left-20 top-0 h-72 w-72 animate-pulse-slow rounded-full bg-saffron-500/20 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-64 w-64 animate-pulse-slow rounded-full bg-sky-400/20 blur-3xl [animation-delay:1.5s]" />

      {/* Skyline + bridge illustration */}
      <svg
        viewBox="0 0 1200 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full opacity-80"
      >
        <rect x="60" y="150" width="50" height="140" fill="#0E1B5E" opacity="0.5" />
        <rect x="130" y="110" width="40" height="180" fill="#0E1B5E" opacity="0.6" />
        <rect x="190" y="170" width="55" height="120" fill="#0E1B5E" opacity="0.5" />
        <rect x="980" y="130" width="45" height="160" fill="#0E1B5E" opacity="0.5" />
        <rect x="1040" y="90" width="38" height="200" fill="#0E1B5E" opacity="0.6" />
        <rect x="1100" y="160" width="50" height="130" fill="#0E1B5E" opacity="0.5" />

        {/* Bridge deck */}
        <path d="M150 260 H1050" stroke="#F5A94E" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M150 260 C 350 90, 850 90, 1050 260"
          fill="none"
          stroke="#3FB6E8"
          strokeWidth="3"
          className="animate-draw"
        />
        {[220, 320, 420, 520, 620, 720, 820, 920, 1020].map((x, i) => (
          <line
            key={x}
            x1={x}
            y1="260"
            x2={x}
            y2={260 - Math.sin(((x - 150) / 900) * Math.PI) * 165}
            stroke="#3FB6E8"
            strokeWidth="1.5"
            opacity="0.6"
          />
        ))}
      </svg>

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold tracking-wide text-white sm:text-5xl">SETU</h1>
        <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
          Setu — a bridge between data and decisions. Real-time monitoring of
          central sector infrastructure projects costing ₹150 crore and above.
        </p>
      </div>
    </div>
  )
}
