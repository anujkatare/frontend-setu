import CountUp from './CountUp'

export default function KpiStat({ icon, label, value, numeric = true }) {
  return (
    <div className="group flex items-center gap-3 rounded p-2 transition-colors hover:bg-navy-900/[0.03]">
      <span className="kpi-icon transition-transform group-hover:scale-110">{icon}</span>
      <div>
        <p className="text-xs font-medium text-navy-950/60">{label}</p>
        <p className="text-lg font-bold text-navy-950">
          {numeric ? <CountUp value={value} /> : value}
        </p>
      </div>
    </div>
  )
}
