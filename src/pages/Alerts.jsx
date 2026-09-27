import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { listAlerts, acknowledgeAlert } from '../api/alerts'

export default function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => { setLoading(true); listAlerts().then(setAlerts).finally(() => setLoading(false)) }
  useEffect(load, [])

  const handleAck = async (id) => { await acknowledgeAlert(id); load() }

  return (
    <PageShell>
      <h1 className="mb-1 text-xl font-bold text-navy-950">Alerts</h1>
      <p className="mb-5 text-sm text-navy-950/60">Projects that crossed into high or critical risk.</p>

      {loading ? (
        <p className="text-sm text-navy-950/60">Loading…</p>
      ) : alerts.length === 0 ? (
        <div className="rounded border border-dashed border-navy-900/20 bg-white px-6 py-12 text-center text-sm text-navy-950/60">
          No active alerts.
        </div>
      ) : (
        <div className="space-y-2">
          {alerts.map((a) => (
            <div key={a.alertId} className={`flex items-center justify-between rounded border-l-4 bg-white p-4 ${a.severity === 'CRITICAL' ? 'border-status-bad' : 'border-status-warn'}`}>
              <div>
                <p className="text-sm font-medium text-navy-950">
                  <Link to={`/projects/${a.projectId}`} className="hover:text-saffron-600">{a.projectName}</Link>
                </p>
                <p className="mt-0.5 text-sm text-navy-950/60">{a.message}</p>
              </div>
              <button onClick={() => handleAck(a.alertId)} className="rounded border border-navy-900/20 px-3 py-1.5 text-xs text-navy-950/70 hover:border-saffron-500">
                Acknowledge
              </button>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  )
}
