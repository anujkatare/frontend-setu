import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import {
  listMinistries, listSectors, createMinistry, createSector, createProject,
} from '../api/projects'

const empty = {
  name: '', ministryId: '', sectorId: '', implementingAgency: '',
  approvedCost: '', revisedCost: '', cumulativeExpenditure: '',
  startDate: '', scheduledEndDate: '', physicalProgressPercent: '',
}

export default function NewProject() {
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [ministries, setMinistries] = useState([])
  const [sectors, setSectors] = useState([])
  const [newMinistry, setNewMinistry] = useState('')
  const [newSector, setNewSector] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const refresh = () => {
    listMinistries().then(setMinistries).catch(() => {})
    listSectors().then(setSectors).catch(() => {})
  }
  useEffect(refresh, [])

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const addMinistry = async () => {
    if (!newMinistry.trim()) return
    const m = await createMinistry({ name: newMinistry.trim() })
    setNewMinistry('')
    refresh()
    setForm((f) => ({ ...f, ministryId: m.ministryId }))
  }
  const addSector = async () => {
    if (!newSector.trim()) return
    const s = await createSector({ name: newSector.trim() })
    setNewSector('')
    refresh()
    setForm((f) => ({ ...f, sectorId: s.sectorId }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = {
        ...form,
        ministryId: form.ministryId ? Number(form.ministryId) : null,
        sectorId: form.sectorId ? Number(form.sectorId) : null,
        approvedCost: form.approvedCost ? Number(form.approvedCost) : null,
        revisedCost: form.revisedCost ? Number(form.revisedCost) : null,
        cumulativeExpenditure: form.cumulativeExpenditure ? Number(form.cumulativeExpenditure) : null,
        physicalProgressPercent: form.physicalProgressPercent ? Number(form.physicalProgressPercent) : null,
      }
      const created = await createProject(payload)
      navigate(`/projects/${created.projectId}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit the project.')
    } finally {
      setSaving(false)
    }
  }

  const inputCls = "mt-1 w-full rounded border border-navy-900/20 bg-white px-3 py-2 text-sm outline-none focus:border-saffron-500"

  return (
    <PageShell>
      <h1 className="mb-5 text-xl font-bold text-navy-950">Submit project</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 rounded border border-navy-900/10 bg-white p-6">
        <div>
          <label className="text-xs font-medium text-navy-950/70">Project name</label>
          <input required value={form.name} onChange={update('name')} className={inputCls} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-navy-950/70">Ministry</label>
            <select value={form.ministryId} onChange={update('ministryId')} className={inputCls}>
              <option value="">Select ministry</option>
              {ministries.map((m) => <option key={m.ministryId} value={m.ministryId}>{m.name}</option>)}
            </select>
            <div className="mt-1.5 flex gap-1.5">
              <input value={newMinistry} onChange={(e) => setNewMinistry(e.target.value)} placeholder="Add new ministry"
                className="flex-1 rounded border border-navy-900/15 bg-white px-2 py-1 text-xs outline-none focus:border-saffron-500" />
              <button type="button" onClick={addMinistry} className="rounded border border-navy-900/20 px-2 text-xs text-navy-950/70 hover:border-saffron-500">Add</button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-navy-950/70">Sector</label>
            <select value={form.sectorId} onChange={update('sectorId')} className={inputCls}>
              <option value="">Select sector</option>
              {sectors.map((s) => <option key={s.sectorId} value={s.sectorId}>{s.name}</option>)}
            </select>
            <div className="mt-1.5 flex gap-1.5">
              <input value={newSector} onChange={(e) => setNewSector(e.target.value)} placeholder="Add new sector"
                className="flex-1 rounded border border-navy-900/15 bg-white px-2 py-1 text-xs outline-none focus:border-saffron-500" />
              <button type="button" onClick={addSector} className="rounded border border-navy-900/20 px-2 text-xs text-navy-950/70 hover:border-saffron-500">Add</button>
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-navy-950/70">Implementing agency</label>
          <input value={form.implementingAgency} onChange={update('implementingAgency')} className={inputCls} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-navy-950/70">Approved cost (₹ cr)</label>
            <input type="number" step="0.01" required value={form.approvedCost} onChange={update('approvedCost')} className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-medium text-navy-950/70">Revised cost (₹ cr)</label>
            <input type="number" step="0.01" value={form.revisedCost} onChange={update('revisedCost')} className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-medium text-navy-950/70">Spent so far (₹ cr)</label>
            <input type="number" step="0.01" value={form.cumulativeExpenditure} onChange={update('cumulativeExpenditure')} className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-navy-950/70">Start date</label>
            <input type="date" value={form.startDate} onChange={update('startDate')} className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-medium text-navy-950/70">Scheduled end date</label>
            <input type="date" value={form.scheduledEndDate} onChange={update('scheduledEndDate')} className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-medium text-navy-950/70">Physical progress (%)</label>
            <input type="number" step="0.1" min="0" max="100" value={form.physicalProgressPercent} onChange={update('physicalProgressPercent')} className={inputCls} />
          </div>
        </div>

        {error && <p className="rounded border border-status-bad/30 bg-status-bad/5 px-3 py-2 text-xs text-status-bad">{error}</p>}

        <button type="submit" disabled={saving} className="rounded bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60">
          {saving ? 'Submitting…' : 'Submit project'}
        </button>
      </form>
    </PageShell>
  )
}
