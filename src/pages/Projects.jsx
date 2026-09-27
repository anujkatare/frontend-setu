import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import RiskBadge from '../components/RiskBadge'
import { listProjects } from '../api/projects'
import { getLatestRisk } from '../api/risk'

export default function Projects() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listProjects()
      .then(async (projects) => {
        const withRisk = await Promise.all(
          projects.map(async (p) => {
            try {
              const risk = await getLatestRisk(p.projectId)
              return { ...p, risk }
            } catch {
              return { ...p, risk: null }
            }
          }),
        )
        setRows(withRisk)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageShell>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold text-navy-950">Projects</h1>
        <Link
          to="/projects/new"
          className="rounded bg-saffron-500 px-4 py-2 text-sm font-semibold text-white hover:bg-saffron-600"
        >
          + New project
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-navy-950/60">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="rounded border border-dashed border-navy-900/20 bg-white px-6 py-12 text-center text-sm text-navy-950/60">
          No projects yet. Add the first one to start monitoring it.
        </div>
      ) : (
        <div className="overflow-hidden rounded border border-navy-900/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-900/5 text-navy-950/60">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Ministry</th>
                <th className="px-4 py-3 font-medium">Sector</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.projectId} className="border-t border-navy-900/5 transition-colors hover:bg-navy-900/[0.02]">
                  <td className="px-4 py-3">
                    <Link to={`/projects/${p.projectId}`} className="font-medium text-navy-950 hover:text-saffron-600">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-navy-950/70">{p.ministryName || '—'}</td>
                  <td className="px-4 py-3 text-navy-950/70">{p.sectorName || '—'}</td>
                  <td className="px-4 py-3 text-navy-950/70">{p.status?.replaceAll('_', ' ')}</td>
                  <td className="px-4 py-3">
                    {p.risk ? <RiskBadge level={p.risk.riskLevel} /> : <span className="text-xs text-navy-950/50">Not assessed</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageShell>
  )
}
