import { useState, useMemo } from 'react'
import EventCard from '../components/EventCard'
import FilterBar from '../components/FilterBar'
import StatsBar from '../components/StatsBar'
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/StatusComponents'

export default function EventsPage({ events, loading, error, lastUpdated: _lastUpdated, onRefresh }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [formatFilter, setFormatFilter] = useState('All')
  const [sortBy, setSortBy] = useState('startTime')

  const filteredEvents = useMemo(() => {
    let filtered = events.filter(e => !e.isIndonesian)

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

  const internationalEvents = events.filter(e => !e.isIndonesian)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={onRefresh} />

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Internasional CTF Events</h2>
        <p className="text-sm text-neutral-500">
          Event CTF dari seluruh dunia
        </p>
      </div>

      <StatsBar events={internationalEvents} />

      <FilterBar
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        formatFilter={formatFilter} setFormatFilter={setFormatFilter}
        sortBy={sortBy} setSortBy={setSortBy}
        totalCount={internationalEvents.length}
        filteredCount={filteredEvents.length}
      />

      {filteredEvents.length === 0 ? (
        <EmptyState message="Tidak ada event yang sesuai filter" />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="animate-slide-in"
              style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
            >
              <EventCard event={event} isIndonesian={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
