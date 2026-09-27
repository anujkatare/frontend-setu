import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SetuMark from '../components/SetuMark'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not sign in. Check your credentials.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm rounded border border-navy-900/10 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <SetuMark className="h-10 w-10" />
          <div>
            <p className="text-sm font-bold text-navy-950">SETU</p>
            <p className="text-[11px] text-navy-950/60">MoSPI, Government of India</p>
          </div>
        </div>

        <h1 className="mt-6 text-xl font-bold text-navy-950">Sign in</h1>
        <p className="mt-1 text-sm text-navy-950/60">
          Access the infrastructure monitoring dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-navy-950/70">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded border border-navy-900/20 px-3 py-2 text-sm outline-none focus:border-saffron-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-navy-950/70">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded border border-navy-900/20 px-3 py-2 text-sm outline-none focus:border-saffron-500"
            />
          </div>

          {error && (
            <p className="rounded border border-status-bad/30 bg-status-bad/5 px-3 py-2 text-xs text-status-bad">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-navy-900 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-navy-950/60">
          New here?{' '}
          <Link to="/register" className="font-medium text-saffron-600 underline underline-offset-2">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
