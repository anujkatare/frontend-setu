import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import RiskBadge from '../components/RiskBadge'
import { getProject } from '../api/projects'
import { generateRisk, getLatestRisk } from '../api/risk'

function Field({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-navy-950/50">{label}</p>
      <p className="mt-0.5 text-sm text-navy-950">{value ?? '—'}</p>
    </div>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [risk, setRisk] = useState(null)
  const [riskError, setRiskError] = useState('')
  const [generating, setGenerating] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadRisk = () => {
    getLatestRisk(id)
      .then((r) => { setRisk(r); setRiskError('') })
      .catch(() => { setRisk(null); setRiskError('No assessment has been run for this project yet.') })
  }

  useEffect(() => {
    setLoading(true)
    getProject(id).then(setProject).finally(() => setLoading(false))
    loadRisk()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleGenerate = async () => {
    setGenerating(true)
    setRiskError('')
    try {
      const r = await generateRisk(id)
      setRisk(r)
    } catch (err) {
      setRiskError(err.response?.data?.message || 'Assessment could not be generated. The model service may be offline.')
    } finally {
      setGenerating(false)
    }
  }

  if (loading || !project) {
    return <PageShell><p className="text-sm text-navy-950/60">Loading…</p></PageShell>
  }

  return (
    <PageShell>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy-950">{project.name}</h1>
          <p className="mt-0.5 text-sm text-navy-950/60">
            {project.ministryName || 'Unassigned ministry'} · {project.sectorName || 'Unassigned sector'}
          </p>
        </div>
        <Link
          to={`/projects/${id}/questionnaire`}
          className="rounded bg-saffron-500 px-4 py-2 text-sm font-semibold text-white hover:bg-saffron-600"
        >
          Risk mitigation questionnaire
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded border border-navy-900/10 bg-white p-5 lg:col-span-2">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-navy-950/50">Project record</p>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            <Field label="Implementing agency" value={project.implementingAgency} />
            <Field label="Status" value={project.status?.replaceAll('_', ' ')} />
            <Field label="Physical progress" value={project.physicalProgressPercent != null ? `${project.physicalProgressPercent}%` : null} />
            <Field label="Approved cost" value={project.approvedCost != null ? `₹${project.approvedCost} cr` : null} />
            <Field label="Revised cost" value={project.revisedCost != null ? `₹${project.revisedCost} cr` : null} />
            <Field label="Spent so far" value={project.cumulativeExpenditure != null ? `₹${project.cumulativeExpenditure} cr` : null} />
            <Field label="Start date" value={project.startDate} />
            <Field label="Scheduled end" value={project.scheduledEndDate} />
            <Field label="Last updated" value={project.lastUpdated?.slice(0, 10)} />
          </div>
        </div>

        <div className="rounded border border-navy-900/10 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-950/50">Risk assessment</p>
            {risk && <RiskBadge level={risk.riskLevel} />}
          </div>
          {risk ? (
            <>
              <p className="text-3xl font-bold text-navy-950">{risk.riskScoreValue?.toFixed(1)}</p>
              <p className="mt-1 text-xs text-navy-950/50">Generated {new Date(risk.generatedAt).toLocaleString()}</p>
              <p className="mt-4 text-sm leading-relaxed text-navy-950/80">{risk.contributingFactors}</p>
            </>
          ) : (
            <p className="text-sm text-navy-950/60">{riskError || 'No assessment yet.'}</p>
          )}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="mt-5 w-full rounded bg-navy-900 py-2 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60"
          >
            {generating ? 'Running assessment…' : risk ? 'Re-run assessment' : 'Run assessment'}
          </button>
        </div>
      </div>
    </PageShell>
  )
}
