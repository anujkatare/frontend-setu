import SetuMark from './SetuMark'

export default function Footer() {
  return (
    <footer className="border-t border-navy-900/10 bg-white py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-3">
          <SetuMark className="h-9 w-9" />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-navy-950">
              Ministry of Statistics and Programme Implementation
            </p>
            <p className="text-xs text-navy-950/60">Government of India</p>
          </div>
        </div>

        <p className="mt-5 text-xs text-navy-950/60">
          Built for Smart India Hackathon 2026 · Problem statement SIH26103 ·
          Prototype interface, not an official government deployment.
        </p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-navy-900/10 pt-4 text-xs font-medium text-navy-950/70">
          <span>Home</span>
          <span>Dashboard</span>
          <span>FAQs</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  )
}
