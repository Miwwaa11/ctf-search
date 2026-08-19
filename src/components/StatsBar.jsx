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
    <div className="mb-8 grid grid-cols-3 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className={`flex items-center gap-3 rounded-lg border p-4 ${
              stat.active
                ? 'border-white/20 bg-white/5'
                : 'border-neutral-800/60 bg-neutral-950'
            }`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${stat.active ? 'text-white' : 'text-neutral-700'}`} />
            <div className="leading-none">
              <div className={`text-xl font-bold font-mono tabular-nums ${stat.active ? 'text-white' : 'text-neutral-500'}`}>
                {stat.count}
              </div>
              <div className="text-[10px] text-neutral-600 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
