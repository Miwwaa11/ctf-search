import { NavLink } from 'react-router-dom'
import { Shield, Globe, Flag, RefreshCw, Clock } from 'lucide-react'

export default function Header({ lastUpdated, onRefresh, loading }) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
              <Shield className="h-5 w-5 text-black" />
            </div>
            <div className="leading-tight">
              <h1 className="text-lg font-bold tracking-tight text-white">
                CTF Tracker
              </h1>
              <p className="text-[11px] text-neutral-500 mt-0.5">Real-time Event Monitor</p>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                }`
              }
            >
              <Globe className="h-4 w-4" />
              Internasional
            </NavLink>
            <NavLink
              to="/indonesia"
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                }`
              }
            >
              <Flag className="h-4 w-4" />
              Indonesia
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            {lastUpdated && (
              <div className="hidden md:flex items-center gap-2 text-xs text-neutral-600">
                <Clock className="h-3.5 w-3.5" />
                {lastUpdated.toLocaleTimeString('id-ID')}
              </div>
            )}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2 text-xs font-medium text-neutral-300 transition-all hover:bg-neutral-800 hover:text-white disabled:opacity-40"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        <nav className="flex gap-3 pb-3 sm:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all flex-1 ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:bg-neutral-900'
              }`
            }
          >
            <Globe className="h-4 w-4" />
            Internasional
          </NavLink>
          <NavLink
            to="/indonesia"
            className={({ isActive }) =>
              `flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all flex-1 ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:bg-neutral-900'
              }`
            }
          >
            <Flag className="h-4 w-4" />
            Indonesia
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
