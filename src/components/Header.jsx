import { NavLink } from 'react-router-dom'
import { Globe, Flag, RefreshCw, Clock } from 'lucide-react'

function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
      <rect width="32" height="32" rx="8" fill="#fafafa"/>
      <path d="M16 8v16" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M11 12l5 4.5-5 4.5" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 21h4" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function Header({ lastUpdated, onRefresh, loading }) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/95 backdrop-blur-md">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3.5 shrink-0">
            <Logo />
            <div className="leading-none">
              <h1 className="text-[15px] font-bold tracking-tight text-white">CTF Tracker</h1>
              <p className="text-[10px] text-neutral-600 mt-0.5 tracking-wide uppercase">Event Monitor</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-1.5 ml-auto mr-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-neutral-500 hover:text-white'
                }`
              }
            >
              <Globe className="h-4 w-4" />
              Internasional
            </NavLink>
            <NavLink
              to="/indonesia"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-neutral-500 hover:text-white'
                }`
              }
            >
              <Flag className="h-4 w-4" />
              Indonesia
            </NavLink>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <div className="hidden md:flex items-center gap-1.5 text-xs text-neutral-600 tabular-nums">
                <Clock className="h-3 w-3" />
                {lastUpdated.toLocaleTimeString('id-ID')}
              </div>
            )}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg border border-neutral-800 px-3.5 py-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-white hover:border-neutral-600 disabled:opacity-40"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <nav className="flex gap-2 pb-3 sm:hidden">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors flex-1 ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-neutral-500 hover:text-white'
              }`
            }
          >
            <Globe className="h-4 w-4" />
            Internasional
          </NavLink>
          <NavLink
            to="/indonesia"
            className={({ isActive }) =>
              `flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors flex-1 ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-neutral-500 hover:text-white'
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
