import { format, fromUnixTime } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import {
  Clock, MapPin, Users, ExternalLink, Trophy, Swords,
  CheckCircle2, PlayCircle, CalendarClock, Star, Timer,
  Link2
} from 'lucide-react'

const statusConfig = {
  running: {
    label: 'Running',
    icon: PlayCircle,
    badgeClass: 'border-white/30 bg-white/10 text-white',
    dotClass: 'bg-white',
  },
  upcoming: {
    label: 'Upcoming',
    icon: CalendarClock,
    badgeClass: 'border-neutral-700 bg-neutral-900 text-neutral-400',
    dotClass: 'bg-neutral-500',
  },
  ended: {
    label: 'Ended',
    icon: CheckCircle2,
    badgeClass: 'border-neutral-800 bg-neutral-950 text-neutral-600',
    dotClass: 'bg-neutral-600',
  },
}

function formatDuration(hours) {
  if (hours < 1) return `${Math.round(hours * 60)}m`
  if (hours < 24) return `${Math.round(hours)}h`
  const days = Math.floor(hours / 24)
  const remainH = Math.round(hours % 24)
  return remainH > 0 ? `${days}d ${remainH}h` : `${days}d`
}

function formatWeight(weight) {
  if (!weight || weight === 0) return '-'
  if (weight >= 100) return '100'
  return weight.toFixed(1)
}

function getWeightColor(weight) {
  if (!weight || weight === 0) return 'text-neutral-700'
  if (weight >= 100) return 'text-white'
  if (weight >= 50) return 'text-neutral-300'
  return 'text-neutral-500'
}

function getTimeUntil(timestamp) {
  const now = Math.floor(Date.now() / 1000)
  const diff = timestamp - now
  const absDiff = Math.abs(diff)
  const isPast = diff < 0

  if (absDiff < 60) return isPast ? 'selesai' : 'mulai!'
  if (absDiff < 3600) {
    const mins = Math.floor(absDiff / 60)
    return isPast ? `${mins}m lalu` : `${mins}m lagi`
  }
  if (absDiff < 86400) {
    const hours = Math.floor(absDiff / 3600)
    const mins = Math.floor((absDiff % 3600) / 60)
    return isPast ? `${hours}j ${mins}m lalu` : `${hours}j ${mins}m lagi`
  }
  const days = Math.floor(absDiff / 86400)
  const hours = Math.floor((absDiff % 86400) / 3600)
  return isPast ? `${days}h ${hours}j lalu` : `${days}h ${hours}j lagi`
}

export default function EventCard({ event, isIndonesian }) {
  const config = statusConfig[event.status]
  const StatusIcon = config.icon
  const startDt = fromUnixTime(event.startTime)
  const endDt = fromUnixTime(event.endTime)

  const dayName = format(startDt, 'EEEE', { locale: idLocale })
  const startDate = format(startDt, 'dd MMM', { locale: idLocale })
  const startTime = format(startDt, 'HH:mm', { locale: idLocale })
  const endDate = format(endDt, 'dd MMM', { locale: idLocale })
  const endTime = format(endDt, 'HH:mm', { locale: idLocale })
  const sameDay = format(startDt, 'yyyy-MM-dd') === format(endDt, 'yyyy-MM-dd')

  return (
    <div
      className={`group relative rounded-xl border p-5 transition-colors duration-150 ${
        event.status === 'running'
          ? 'border-white/20 bg-white/[0.03] running-glow'
          : 'border-neutral-800/80 bg-neutral-950 hover:border-neutral-700'
      }`}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-[3px] text-[11px] font-medium ${config.badgeClass}`}>
            {event.status === 'running' && (
              <span className={`h-1.5 w-1.5 rounded-full ${config.dotClass} animate-pulse`} />
            )}
            <StatusIcon className="h-3 w-3" />
            {isIndonesian
              ? (config.label === 'Running' ? 'Berjalan' : config.label === 'Upcoming' ? 'Akan Datang' : 'Selesai')
              : config.label}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-neutral-800 bg-black px-2.5 py-[3px] text-[11px] text-neutral-500">
            {event.format === 'Attack-Defense' ? <Swords className="h-3 w-3" /> : <Trophy className="h-3 w-3" />}
            {event.formatDescription}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Star className={`h-3 w-3 ${getWeightColor(event.weight)}`} />
          <span className={`text-xs font-bold font-mono ${getWeightColor(event.weight)}`}>
            {formatWeight(event.weight)}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-semibold text-white leading-snug mb-4 group-hover:text-neutral-200 transition-colors">
        {event.name}
      </h3>

      {/* Time */}
      <div className="rounded-lg bg-black/60 border border-neutral-800/60 p-4 mb-4">
        <div className="flex items-center gap-2 mb-2.5">
          <Clock className="h-3.5 w-3.5 text-neutral-500" />
          <span className="text-xs font-medium text-neutral-400">{dayName}</span>
          <span className="text-neutral-800">|</span>
          <Timer className="h-3 w-3 text-neutral-600" />
          <span className="text-[11px] text-neutral-500">{formatDuration(event.durationHours)}</span>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
          <div>
            <span className="text-[10px] text-neutral-600 uppercase tracking-wider">Mulai</span>
            <p className="text-sm text-neutral-200 font-mono mt-0.5">{startDate} {startTime}</p>
          </div>
          <div>
            <span className="text-[10px] text-neutral-600 uppercase tracking-wider">Selesai</span>
            <p className="text-sm text-neutral-200 font-mono mt-0.5">
              {sameDay ? endTime : `${endDate} ${endTime}`}
            </p>
          </div>
        </div>

        {/* Running progress */}
        {event.status === 'running' && (
          <div className="mt-3 pt-3 border-t border-neutral-800/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-neutral-500">{getTimeUntil(event.endTime)} tersisa</span>
              <span className="text-[11px] font-mono font-semibold text-white">{event.progress.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-1000"
                style={{ width: `${event.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upcoming countdown */}
        {event.status === 'upcoming' && (
          <div className="mt-3 pt-3 border-t border-neutral-800/60">
            <span className="text-[11px] text-neutral-500">Mulai {getTimeUntil(event.startTime)}</span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {event.location && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-500">
            <MapPin className="h-3 w-3" />
            {event.location}
          </span>
        )}
        {event.participants > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-500">
            <Users className="h-3 w-3" />
            {event.participants}
          </span>
        )}
        <span className="rounded-md bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-600">
          {event.organizer}
        </span>
      </div>

      {/* Description */}
      {event.description && (
        <p className="text-xs text-neutral-600 leading-relaxed mb-5 line-clamp-2">
          {event.description.replace(/<[^>]*>/g, '').substring(0, 150)}
        </p>
      )}

      {/* Links */}
      <div className="flex items-center gap-2.5 pt-1">
        {event.ctftimeUrl && (
          <a
            href={event.ctftimeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-[11px] font-medium text-black transition-colors hover:bg-neutral-200"
          >
            <ExternalLink className="h-3 w-3" />
            CTftime
          </a>
        )}
        {event.url && event.url !== event.ctftimeUrl && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 px-3.5 py-1.5 text-[11px] font-medium text-neutral-400 transition-colors hover:text-white hover:border-neutral-600"
          >
            <Link2 className="h-3 w-3" />
            Website
          </a>
        )}
      </div>
    </div>
  )
}
