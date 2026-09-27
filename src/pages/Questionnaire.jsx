import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { getProject } from '../api/projects'
import { submitQuestionnaire, generateMitigationStrategy, getStrategyHistory } from '../api/mitigation'

const STANDARD_OPTIONS = ['No issue', 'Minor issue', 'Moderate issue', 'Major issue', 'Critical issue']
const SCOPE_OPTIONS = ['No change', 'Minor changes', 'Moderate changes', 'Major changes', 'Severe changes']

const QUESTIONS = [
  { field: 'landAcquisition', weight: 25, options: STANDARD_OPTIONS,
    text: 'Are there delays in land acquisition, site handover, or utility shifting?' },
  { field: 'financialResult', weight: 20, options: STANDARD_OPTIONS,
    text: 'Are funds / budget releases / cash flow delays affecting execution?' },
  { field: 'approvalClearance', weight: 20, options: STANDARD_OPTIONS,
    text: 'Are approvals, clearances, or administrative decisions pending?' },
  { field: 'procurementResult', weight: 15, options: STANDARD_OPTIONS,
    text: 'Are there contractor, vendor, or procurement bottlenecks?' },
  { field: 'scopeDesign', weight: 10, options: SCOPE_OPTIONS,
    text: 'Has the project scope or design changed after sanction?' },
  { field: 'executionPace', weight: 10, options: STANDARD_OPTIONS,
    text: 'Is the execution pace slower than planned due to site issues, labor, or coordination problems?' },
  { field: 'interagencyCoordination', weight: 5, options: STANDARD_OPTIONS,
    text: 'Are there local-level or inter-agency coordination problems?' },
]

const emptyAnswers = QUESTIONS.reduce((acc, q) => ({ ...acc, [q.field]: '' }), {})

export default function Questionnaire() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [answers, setAnswers] = useState(emptyAnswers)
  const [sessionId, setSessionId] = useState(null)
  const [strategies, setStrategies] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [submittedMsg, setSubmittedMsg] = useState('')

  useEffect(() => {
    getProject(id).then(setProject).catch(() => {})
  }, [id])

  const allAnswered = QUESTIONS.every((q) => answers[q.field])

  const handleAnswer = (field, value) => setAnswers((a) => ({ ...a, [field]: value }))

  const handleSubmitQuestionnaire = async (e) => {
    e.preventDefault()
    if (!project) return
    setError('')
    setSubmitting(true)
    try {
      const res = await submitQuestionnaire({ projectName: project.name, ...answers })
      setSessionId(res.sessionId)
      setSubmittedMsg(`Questionnaire recorded as session #${res.sessionId} for this project.`)
      setStrategies([])
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit the questionnaire.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleGenerateStrategy = async () => {
    if (!project || sessionId == null) return
    setError('')
    setGenerating(true)
    try {
      const strategy = await generateMitigationStrategy({ projectName: project.name, sessionId })
      const history = await getStrategyHistory(project.name, sessionId)
      setStrategies(history.length ? history : [strategy])
    } catch (err) {
      setError(err.response?.data?.message || 'Could not generate a mitigation strategy.')
    } finally {
      setGenerating(false)
    }
  }

  if (!project) {
    return <PageShell><p className="text-sm text-navy-950/60">Loading project…</p></PageShell>
  }

  return (
    <PageShell>
      <div className="mb-1 text-xs text-navy-950/50">
        <Link to={`/projects/${id}`} className="hover:text-saffron-600">{project.name}</Link>
        <span className="mx-1.5">/</span>Risk questionnaire
      </div>
      <h1 className="mb-1 text-xl font-bold text-navy-950">Risk mitigation questionnaire</h1>
      <p className="mb-6 text-sm text-navy-950/60">
        Answer all seven questions for the current state of this project. Each
        submission opens a new session, so you can re-run this at different
        stages of progress.
      </p>

      <form onSubmit={handleSubmitQuestionnaire} className="max-w-3xl space-y-5">
        {QUESTIONS.map((q, i) => (
          <div key={q.field} className="rounded border border-navy-900/10 bg-white p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <p className="text-sm font-semibold text-navy-950">
                Q{i + 1}. {q.text}
              </p>
              <span className="shrink-0 rounded-full bg-navy-900/5 px-2 py-0.5 text-[11px] font-medium text-navy-950/50">
                weight {q.weight}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {q.options.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleAnswer(q.field, opt)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    answers[q.field] === opt
                      ? 'border-navy-900 bg-navy-900 text-white'
                      : 'border-navy-900/20 text-navy-950/70 hover:border-saffron-400'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        {error && (
          <p className="rounded border border-status-bad/30 bg-status-bad/5 px-3 py-2 text-sm text-status-bad">
            {error}
          </p>
        )}
        {submittedMsg && (
          <p className="rounded border border-status-good/30 bg-status-good/5 px-3 py-2 text-sm text-status-good">
            {submittedMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={!allAnswered || submitting}
          className="rounded bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-40"
        >
          {submitting ? 'Submitting…' : 'Submit questionnaire'}
        </button>
      </form>

      {sessionId != null && (
        <div className="mt-8 max-w-3xl rounded border border-navy-900/10 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-navy-950">
              Mitigation strategy — session #{sessionId}
            </p>
            <button
              onClick={handleGenerateStrategy}
              disabled={generating}
              className="rounded bg-saffron-500 px-4 py-2 text-xs font-bold text-white hover:bg-saffron-600 disabled:opacity-50"
            >
              {generating ? 'Generating…' : 'Ask assistant for a strategy'}
            </button>
          </div>

          {strategies.length === 0 ? (
            <p className="text-sm text-navy-950/60">
              No strategy requested yet for this session. Click the button
              above — you can ask again later if progress changes.
            </p>
          ) : (
            <div className="space-y-4">
              {strategies.map((s) => (
                <div key={s.strategyId} className="border-t border-navy-900/10 pt-4 first:border-t-0 first:pt-0">
                  <p className="mb-1 text-[11px] font-medium text-navy-950/50">
                    Strategy #{s.strategyId} · {new Date(s.generatedAt).toLocaleString()}
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-navy-950">
                    {s.mitigationStrategy}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </PageShell>
  )
}
