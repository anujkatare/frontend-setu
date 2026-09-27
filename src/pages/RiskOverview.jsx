import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import RiskBadge from '../components/RiskBadge'
import { listProjects } from '../api/projects'
import { getLatestRisk, generateRisk } from '../api/risk'

export default function RiskOverview() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [runningId, setRunningId] = useState(null)

  const load = async () => {
    setLoading(true)
    const projects = await listProjects()
    const withRisk = await Promise.all(
      projects.map(async (p) => {
        try { return { project: p, risk: await getLatestRisk(p.projectId) } }
        catch { return { project: p, risk: null } }
      }),
    )
    withRisk.sort((a, b) => (b.risk?.riskScoreValue || 0) - (a.risk?.riskScoreValue || 0))
    setRows(withRisk)
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const runAssessment = async (projectId) => {
    setRunningId(projectId)
    try { await generateRisk(projectId); await load() } finally { setRunningId(null) }
  }

  return (
    <PageShell>
      <h1 className="mb-1 text-xl font-bold text-navy-950">Risk register</h1>
      <p className="mb-5 text-sm text-navy-950/60">Latest assessment for every project, ranked by risk.</p>

      {loading ? (
        <p className="text-sm text-navy-950/60">Loading…</p>
      ) : (
        <div className="overflow-hidden rounded border border-navy-900/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-900/5 text-navy-950/60">
              <tr>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Level</th>
                <th className="px-4 py-3 font-medium">Last assessed</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ project, risk }) => (
                <tr key={project.projectId} className="border-t border-navy-900/5">
                  <td className="px-4 py-3">
                    <Link to={`/projects/${project.projectId}`} className="font-medium text-navy-950 hover:text-saffron-600">
                      {project.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-navy-950/70">{risk ? risk.riskScoreValue?.toFixed(1) : '—'}</td>
                  <td className="px-4 py-3">{risk ? <RiskBadge level={risk.riskLevel} /> : <span className="text-xs text-navy-950/50">Not assessed</span>}</td>
                  <td className="px-4 py-3 text-navy-950/60">{risk ? new Date(risk.generatedAt).toLocaleDateString() : '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => runAssessment(project.projectId)}
                      disabled={runningId === project.projectId}
                      className="rounded border border-navy-900/20 px-3 py-1 text-xs text-navy-950/70 hover:border-saffron-500 disabled:opacity-50"
                    >
                      {runningId === project.projectId ? 'Running…' : risk ? 'Re-run' : 'Run'}
                    </button>
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
