import { PlayCircle, CalendarClock, CheckCircle2 } from 'lucide-react'

export default function StatsBar({ events }) {
  const running = events.filter(e => e.status === 'running').length
  const upcoming = events.filter(e => e.status === 'upcoming').length
  const ended = events.filter(e => e.status === 'ended').length

  const stats = [
    { label: 'Running', count: running, icon: PlayCircle, active: running > 0 },
    { label: 'Upcoming', count: upcoming, icon: CalendarClock },
    { label: 'Ended', count: ended, icon: CheckCircle2 },
  ]

  return (
    <div className="mb-8 grid grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className={`flex items-center gap-4 rounded-xl border p-4 ${
              stat.active
                ? 'border-white/20 bg-white/5'
                : 'border-neutral-800 bg-neutral-950'
            }`}
          >
            <Icon className={`h-5 w-5 shrink-0 ${stat.active ? 'text-white' : 'text-neutral-600'}`} />
            <div>
              <div className={`text-2xl font-bold font-mono ${stat.active ? 'text-white' : 'text-neutral-400'}`}>
                {stat.count}
              </div>
              <div className="text-[11px] text-neutral-600 leading-tight mt-0.5">
                {stat.label}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
