import { useEffect, useMemo, useState } from 'react'
import TopHeader from '../components/TopHeader'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import MinistrySectorTabs from '../components/MinistrySectorTabs'
import KpiStat from '../components/KpiStat'
import RiskBadge from '../components/RiskBadge'
import { IconProjects, IconCost, IconExpenditure, IconAlert, IconCalendar, IconBuilding } from '../components/icons'
import { listProjects } from '../api/projects'
import { listAlerts } from '../api/alerts'
import { getDashboardSummary } from '../api/dashboard'

function groupBy(projects, key) {
  const map = new Map()
  for (const p of projects) {
    const name = p[key] || 'Unassigned'
    if (!map.has(name)) map.set(name, { name, count: 0, totalCost: 0 })
    const g = map.get(name)
    g.count += 1
    g.totalCost += Number(p.approvedCost || 0)
  }
  return Array.from(map.values()).sort((a, b) => b.totalCost - a.totalCost)
}

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [alerts, setAlerts] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([listProjects(), listAlerts(), getDashboardSummary()])
      .then(([p, a, s]) => {
        setProjects(p)
        setAlerts(a)
        setSummary(s)
      })
      .catch(() =>
        setError('Could not reach the monitoring backend. Confirm it is running on port 8080.'),
      )
      .finally(() => setLoading(false))
  }, [])

  const ministryGroups = useMemo(() => groupBy(projects, 'ministryName'), [projects])
  const sectorGroups = useMemo(() => groupBy(projects, 'sectorName'), [projects])
  const totalApprovedCost = useMemo(
    () => projects.reduce((sum, p) => sum + Number(p.approvedCost || 0), 0),
    [projects],
  )
  const completedCount = projects.filter((p) => p.status === 'COMPLETED').length

  return (
    <div className="min-h-screen bg-slate-50">
      <TopHeader />
      <Hero />

      {error && (
        <p className="mx-auto mt-6 max-w-7xl rounded border border-status-bad/30 bg-status-bad/5 px-4 py-3 text-sm text-status-bad">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <MinistrySectorTabs ministryGroups={ministryGroups} sectorGroups={sectorGroups} />

          <section className="mx-auto max-w-7xl px-6 pb-10">
            <p className="mb-3 text-lg font-bold text-navy-950">
              Portfolio Summary{' '}
              <span className="text-sm font-normal text-navy-950/50">
                (as of {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })})
              </span>
            </p>

            <div className="overflow-hidden rounded border border-navy-900/10 bg-white">
              <div className="bg-navy-900 px-5 py-2.5 text-sm font-bold text-white">
                All Project Details
              </div>
              <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
                <KpiStat icon={<IconProjects />} label="Project Count (No.)" value={summary?.totalProjects ?? 0} />
                <KpiStat
                  icon={<IconCost />}
                  label="Approved Cost (₹ Cr)"
                  value={totalApprovedCost.toLocaleString('en-IN')}
                />
                <KpiStat
                  icon={<IconExpenditure />}
                  label="On Track (No.)"
                  value={summary?.projectsByStatus?.ON_TRACK ?? 0}
                />
                <KpiStat
                  icon={<IconAlert />}
                  label="Active Alerts (No.)"
                  value={summary?.activeAlertsCount ?? 0}
                />
                <KpiStat
                  icon={<IconAlert />}
                  label="Critical Alerts (No.)"
                  value={summary?.criticalAlertsCount ?? 0}
                />
                <KpiStat icon={<IconCalendar />} label="Completed (No.)" value={completedCount} />
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 pb-10">
            <p className="mb-3 text-lg font-bold text-navy-950">Highest Risk Projects</p>
            <div className="overflow-hidden rounded border border-navy-900/10 bg-white">
              {summary?.topRiskProjects?.length ? (
                <table className="w-full text-left text-sm">
                  <thead className="bg-navy-900/5 text-navy-950/60">
                    <tr>
                      <th className="px-5 py-3 font-medium">Project</th>
                      <th className="px-5 py-3 font-medium">Risk Score</th>
                      <th className="px-5 py-3 font-medium">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.topRiskProjects.map((p) => (
                      <tr key={p.projectId} className="border-t border-navy-900/5">
                        <td className="px-5 py-3 font-medium text-navy-950">{p.name}</td>
                        <td className="px-5 py-3 text-navy-950/70">{p.riskScoreValue?.toFixed(1)}</td>
                        <td className="px-5 py-3">
                          <RiskBadge level={p.riskLevel} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="px-5 py-8 text-center text-sm text-navy-950/60">
                  No projects have been assessed for risk yet.
                </p>
              )}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 pb-14">
            <p className="mb-3 text-lg font-bold text-navy-950">Active Alerts</p>
            {alerts.length === 0 ? (
              <div className="rounded border border-dashed border-navy-900/20 bg-white px-5 py-8 text-center text-sm text-navy-950/60">
                No active alerts across the portfolio.
              </div>
            ) : (
              <div className="space-y-2">
                {alerts.slice(0, 6).map((a) => (
                  <div
                    key={a.alertId}
                    className={`flex items-center gap-3 rounded border-l-4 bg-white px-4 py-3 text-sm ${
                      a.severity === 'CRITICAL' ? 'border-status-bad' : 'border-status-warn'
                    }`}
                  >
                    <IconBuilding className="text-navy-900/50" />
                    <div>
                      <span className="font-medium text-navy-950">{a.projectName}</span>
                      <span className="ml-2 text-navy-950/60">{a.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {loading && <p className="px-6 py-10 text-center text-sm text-navy-950/60">Loading dashboard…</p>}

      <Footer />
    </div>
  )
}
