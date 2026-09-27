const STYLES = {
  LOW: 'bg-status-good/10 text-status-good border-status-good/30',
  MEDIUM: 'bg-status-warn/10 text-status-warn border-status-warn/30',
  HIGH: 'bg-orange-600/10 text-orange-700 border-orange-600/30',
  CRITICAL: 'bg-status-bad/10 text-status-bad border-status-bad/30',
}

export default function RiskBadge({ level }) {
  const key = (level || '').toUpperCase()
  const style = STYLES[key] || 'bg-navy-900/10 text-navy-900 border-navy-900/20'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {key || 'UNKNOWN'}
    </span>
  )
}
