import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { sendChatQuery } from '../api/chatbot'
import { listProjects } from '../api/projects'

export default function Assistant() {
  const [searchParams] = useSearchParams()
  const [projects, setProjects] = useState([])
  const [projectId, setProjectId] = useState(searchParams.get('projectId') || '')
  const [sessionId, setSessionId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { listProjects().then(setProjects).catch(() => {}) }, [])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const startNew = () => { setSessionId(null); setMessages([]) }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const question = input.trim()
    setInput('')
    setMessages((m) => [...m, { sender: 'USER', content: question }])
    setSending(true)
    try {
      const res = await sendChatQuery({ sessionId, projectId: projectId ? Number(projectId) : null, question })
      setSessionId(res.sessionId)
      setMessages((m) => [...m, { sender: 'BOT', content: res.answer }])
    } catch (err) {
      setMessages((m) => [...m, { sender: 'BOT', content: err.response?.data?.message || 'Could not answer that just now.' }])
    } finally {
      setSending(false)
    }
  }

  return (
    <PageShell withFooter={false}>
      <div className="flex h-[calc(100vh-220px)] flex-col">
        <h1 className="mb-1 text-xl font-bold text-navy-950">Assistant</h1>
        <p className="mb-4 text-sm text-navy-950/60">Ask about a project's status, cost trends, or overall risk.</p>

        <div className="mb-4 flex gap-2">
          <select
            value={projectId}
            onChange={(e) => { setProjectId(e.target.value); startNew() }}
            className="rounded border border-navy-900/20 bg-white px-3 py-2 text-sm outline-none focus:border-saffron-500"
          >
            <option value="">General question (no project)</option>
            {projects.map((p) => <option key={p.projectId} value={p.projectId}>{p.name}</option>)}
          </select>
          <button onClick={startNew} className="rounded border border-navy-900/20 px-3 py-2 text-xs text-navy-950/70 hover:border-saffron-500">
            New conversation
          </button>
        </div>

        <div className="flex-1 overflow-y-auto rounded border border-navy-900/10 bg-white p-5">
          {messages.length === 0 ? (
            <p className="text-sm text-navy-950/60">
              Ask something like "What is the risk level of this project and why?"
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] whitespace-pre-wrap rounded px-4 py-2.5 text-sm ${m.sender === 'USER' ? 'bg-navy-900 text-white' : 'border border-navy-900/10 bg-slate-50 text-navy-950'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the assistant…"
            className="flex-1 rounded border border-navy-900/20 bg-white px-3 py-2.5 text-sm outline-none focus:border-saffron-500"
          />
          <button type="submit" disabled={sending} className="rounded bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60">
            {sending ? 'Sending…' : 'Send'}
          </button>
        </form>
      </div>
    </PageShell>
  )
}
