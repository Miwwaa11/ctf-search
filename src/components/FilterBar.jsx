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
    <div className="mb-8 space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
        <input
          type="text"
          placeholder="Cari nama CTF, organizer, lokasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-neutral-800 bg-neutral-950 py-3 pl-12 pr-12 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-neutral-600 focus:ring-1 focus:ring-neutral-700"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filter</span>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs text-neutral-300 outline-none transition-all focus:border-neutral-600 hover:border-neutral-700"
        >
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt === 'All' ? 'Semua Status' : opt}</option>
          ))}
        </select>

        <select
          value={formatFilter}
          onChange={(e) => setFormatFilter(e.target.value)}
          className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs text-neutral-300 outline-none transition-all focus:border-neutral-600 hover:border-neutral-700"
        >
          {formatOptions.map(opt => (
            <option key={opt} value={opt}>{opt === 'All' ? 'Semua Format' : opt}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs text-neutral-300 outline-none transition-all focus:border-neutral-600 hover:border-neutral-700"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={() => { setSearchQuery(''); setStatusFilter('All'); setFormatFilter('All') }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs font-medium text-neutral-300 transition-all hover:bg-neutral-800 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
            Reset
          </button>
        )}

        <div className="ml-auto text-xs text-neutral-600">
          {filteredCount} / {totalCount} event
        </div>
      </div>
    </div>
  )
}
