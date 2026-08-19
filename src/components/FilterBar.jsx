import { Search, SlidersHorizontal, X } from 'lucide-react'

const formatOptions = ['All', 'Jeopardy', 'Attack-Defense', 'Online', 'Onsite', 'Hybrid']
const statusOptions = ['All', 'Running', 'Upcoming', 'Ended']
const sortOptions = [
  { value: 'startTime', label: 'Tanggal Mulai' },
  { value: 'weight', label: 'Rating' },
  { value: 'duration', label: 'Durasi' },
  { value: 'name', label: 'Nama A-Z' },
]

export default function FilterBar({
  searchQuery, setSearchQuery,
  statusFilter, setStatusFilter,
  formatFilter, setFormatFilter,
  sortBy, setSortBy,
  totalCount, filteredCount,
}) {
  const hasFilters = searchQuery || statusFilter !== 'All' || formatFilter !== 'All'

  return (
    <div className="mb-8">
      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
        <input
          type="text"
          placeholder="Cari nama CTF, organizer, lokasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-neutral-800 bg-black py-2.5 pl-10 pr-10 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-neutral-600"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-neutral-600 mr-1">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Filter</span>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-neutral-800 bg-black px-3 py-1.5 text-xs text-neutral-400 outline-none transition-colors focus:border-neutral-600 hover:border-neutral-700"
        >
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt === 'All' ? 'Semua Status' : opt}</option>
          ))}
        </select>

        <select
          value={formatFilter}
          onChange={(e) => setFormatFilter(e.target.value)}
          className="rounded-lg border border-neutral-800 bg-black px-3 py-1.5 text-xs text-neutral-400 outline-none transition-colors focus:border-neutral-600 hover:border-neutral-700"
        >
          {formatOptions.map(opt => (
            <option key={opt} value={opt}>{opt === 'All' ? 'Semua Format' : opt}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-neutral-800 bg-black px-3 py-1.5 text-xs text-neutral-400 outline-none transition-colors focus:border-neutral-600 hover:border-neutral-700"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={() => { setSearchQuery(''); setStatusFilter('All'); setFormatFilter('All') }}
            className="inline-flex items-center gap-1 rounded-lg border border-neutral-800 px-2.5 py-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-white hover:border-neutral-600"
          >
            <X className="h-3 w-3" />
            Reset
          </button>
        )}

        <span className="ml-auto text-[11px] text-neutral-600 tabular-nums">
          {filteredCount} / {totalCount} event
        </span>
      </div>
    </div>
  )
}
