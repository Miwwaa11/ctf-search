import { useState, useMemo } from 'react'
import EventCard from '../components/EventCard'
import FilterBar from '../components/FilterBar'
import StatsBar from '../components/StatsBar'
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/StatusComponents'
import { Flag, Info } from 'lucide-react'

export default function IndonesiaPage({ events, loading, error, lastUpdated: _lastUpdated, onRefresh }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [formatFilter, setFormatFilter] = useState('All')
  const [sortBy, setSortBy] = useState('startTime')

  const filteredEvents = useMemo(() => {
    let filtered = events.filter(e => e.isIndonesian)

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q) ||
        e.location?.toLowerCase().includes(q) ||
        e.formatDescription.toLowerCase().includes(q)
      )
    }

    if (statusFilter !== 'All') {
      const statusMap = { Running: 'running', Upcoming: 'upcoming', Ended: 'ended' }
      filtered = filtered.filter(e => e.status === statusMap[statusFilter])
    }

    if (formatFilter !== 'All') {
      filtered = filtered.filter(e =>
        e.formatDescription.toLowerCase().includes(formatFilter.toLowerCase()) ||
        e.format?.toLowerCase().includes(formatFilter.toLowerCase())
      )
    }

    const sortFn = {
      startTime: (a, b) => {
        const statusOrder = { running: 0, upcoming: 1, ended: 2 }
        if (statusOrder[a.status] !== statusOrder[b.status]) {
          return statusOrder[a.status] - statusOrder[b.status]
        }
        return a.startTime - b.startTime
      },
      weight: (a, b) => (b.weight || 0) - (a.weight || 0),
      duration: (a, b) => b.durationHours - a.durationHours,
      name: (a, b) => a.name.localeCompare(b.name),
    }

    return filtered.sort(sortFn[sortBy] || sortFn.startTime)
  }, [events, searchQuery, statusFilter, formatFilter, sortBy])

  const indonesianEvents = events.filter(e => e.isIndonesian)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={onRefresh} />

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
            <Flag className="h-5 w-5 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">CTF Indonesia</h2>
            <p className="text-sm text-neutral-500">
              Event CTF nasional Indonesia
            </p>
          </div>
        </div>

        {indonesianEvents.length === 0 && !loading && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-5">
            <Info className="h-5 w-5 text-neutral-500 mt-0.5 shrink-0" />
            <div className="text-sm leading-relaxed">
              <p className="font-medium text-neutral-400 mb-2">Deteksi Event Indonesia</p>
              <p className="text-neutral-600">
                Event Indonesia dideteksi berdasarkan keyword seperti nama kota, universitas, dan organisasi Indonesia.
                Beberapa event mungkin tidak terdeteksi jika tidak menggunakan keyword tersebut.
              </p>
            </div>
          </div>
        )}
      </div>

      <StatsBar events={indonesianEvents} />

      <FilterBar
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        formatFilter={formatFilter} setFormatFilter={setFormatFilter}
        sortBy={sortBy} setSortBy={setSortBy}
        totalCount={indonesianEvents.length}
        filteredCount={filteredEvents.length}
      />

      {filteredEvents.length === 0 ? (
        <EmptyState
          message={
            indonesianEvents.length === 0
              ? "Belum ada event CTF Indonesia yang terdeteksi"
              : "Tidak ada event yang sesuai filter"
          }
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="animate-slide-in"
              style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
            >
              <EventCard event={event} isIndonesian={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
