export default function SetuMark({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="31" stroke="#0E1B5E" strokeWidth="1.5" fill="#FFFFFF" />
      <path
        d="M10 40c4-14 10-20 22-20s18 6 22 20"
        stroke="#0E1B5E"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M10 40h44" stroke="#0E1B5E" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 40v6M24 40v6M32 40v6M40 40v6M48 40v6" stroke="#0E1B5E" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M18 26c3-2 7-3 14-3s11 1 14 3"
        stroke="#EF9127"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
