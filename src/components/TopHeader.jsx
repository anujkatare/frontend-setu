import { Link, NavLink, useNavigate } from 'react-router-dom'
import SetuMark from './SetuMark'
import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/risk', label: 'Risk Register' },
  { to: '/alerts', label: 'Alerts' },
  { to: '/assistant', label: 'Assistant' },
]

export default function TopHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <div className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-3">
            <SetuMark className="h-11 w-11" />
            <div className="leading-tight">
              <p className="text-[15px] font-semibold text-navy-950">
                Ministry of Statistics and Programme Implementation
              </p>
              <p className="text-xs text-navy-950/60">Government of India</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {user && (
              <>
                <Link
                  to="/projects/new"
                  className="rounded bg-saffron-500 px-4 py-2 text-xs font-bold tracking-wide text-white transition-colors hover:bg-saffron-600"
                >
                  ADD PROJECT / UPDATE
                </Link>
                <Link
                  to="/risk"
                  className="rounded bg-navy-900 px-4 py-2 text-xs font-bold tracking-wide text-white transition-colors hover:bg-navy-800"
                >
                  REPORTS
                </Link>
              </>
            )}
            {user ? (
              <div className="ml-2 flex items-center gap-3 border-l border-navy-900/10 pl-3">
                <span className="hidden text-sm text-navy-950/70 sm:inline">{user.name}</span>
                <button
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  className="text-xs font-medium text-navy-900/60 underline underline-offset-2 hover:text-saffron-600"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="ml-2 flex items-center gap-2 border-l border-navy-900/10 pl-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-navy-950/70 hover:text-saffron-600"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="rounded bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-800"
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {user && (
        <div className="bg-sky-500">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6 text-sm font-medium text-white">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `border-b-[3px] px-4 py-3 transition-colors ${
                    isActive
                      ? 'border-saffron-400 bg-white/10'
                      : 'border-transparent hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
