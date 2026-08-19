import { useState, useEffect, useCallback, useRef } from 'react'

const CTFTIME_API = '/api/ctftime'

const useCTFEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const intervalRef = useRef(null)

  const detectIndonesian = (event) => {
    const indonesianKeywords = [
      'indonesia', 'indo', 'jakarta', 'bandung', 'surabaya', 'yogyakarta',
      'semarang', 'malang', 'medan', 'makassar', 'balikpapan', 'manado',
      'palembang', 'lampung', 'bali', 'denpasar', 'batam', 'pekanbaru',
      'aceh', 'papua', 'kalimantan', 'sulawesi', 'sumatera', 'jawa',
      'indonesian', 'idn', 'polytechnic', 'universitas',
      'institut', 'sekolah', 'sma', 'smk', 'kampus', 'mahasiswa',
      'kominfo', 'bssn', 'hackindo',
    ]
    const searchText = [
      event.title,
      event.location,
      event.description,
      event.organizers?.map(o => o.name).join(' '),
    ].join(' ').toLowerCase()

    return indonesianKeywords.some(kw => searchText.includes(kw))
  }

  const fetchEvents = useCallback(async () => {
    try {
      setError(null)

      const now = Math.floor(Date.now() / 1000)
      const oneMonthAgo = now - 30 * 24 * 3600
      const threeMonthsLater = now + 90 * 24 * 3600

      const [upcomingRes, runningRes, pastRes] = await Promise.all([
        fetch(`${CTFTIME_API}/api/v1/events/?limit=100&start=${now}&finish=${threeMonthsLater}`),
        fetch(`${CTFTIME_API}/api/v1/events/?limit=100&start=${now - 7 * 24 * 3600}&finish=${now + 7 * 24 * 3600}`),
        fetch(`${CTFTIME_API}/api/v1/events/?limit=100&start=${oneMonthAgo}&finish=${now}`),
      ])

      const upcomingData = upcomingRes.ok ? await upcomingRes.json() : []
      const runningData = runningRes.ok ? await runningRes.json() : []
      const pastData = pastRes.ok ? await pastRes.json() : []

      const allEventsRaw = [...upcomingData, ...runningData, ...pastData]

      const eventMap = new Map()
      allEventsRaw.forEach(event => {
        if (!eventMap.has(event.id)) {
          eventMap.set(event.id, event)
        }
      })

      const nowTs = Math.floor(Date.now() / 1000)
      const enrichedEvents = Array.from(eventMap.values()).map(event => {
        const startTime = typeof event.start === 'number'
          ? event.start
          : Math.floor(new Date(event.start).getTime() / 1000)
        const endTime = typeof event.finish === 'number'
          ? event.finish
          : Math.floor(new Date(event.finish).getTime() / 1000)
        let status = 'upcoming'
        let progress = 0

        if (nowTs >= startTime && nowTs <= endTime) {
          status = 'running'
          progress = ((nowTs - startTime) / (endTime - startTime)) * 100
        } else if (nowTs > endTime) {
          status = 'ended'
          progress = 100
        }

        const durationHours = (endTime - startTime) / 3600
        const location = event.location && event.location.trim() !== ''
          ? event.location
          : 'Online'

        return {
          id: event.id,
          name: event.title,
          url: event.url,
          ctftimeUrl: `https://ctftime.org/event/${event.id}`,
          format: event.format,
          formatDescription: event.format === 'Jeopardy' ? 'Jeopardy' :
            event.format === 'Attack-Defense' ? 'Attack-Defense' :
            event.format || 'Unknown',
          description: event.description || '',
          location,
          organizer: event.organizers?.[0]?.name || 'Unknown',
          organizerUrl: event.organizers?.[0]?.url || '',
          weight: event.weight || 0,
          logo: event.logo || '',
          startTime,
          endTime,
          status,
          progress: Math.min(100, Math.max(0, progress)),
          durationHours,
          participants: event.participants || 0,
          isIndonesian: detectIndonesian(event),
        }
      })

      enrichedEvents.sort((a, b) => {
        const order = { running: 0, upcoming: 1, ended: 2 }
        return order[a.status] - order[b.status] || a.startTime - b.startTime
      })

      setEvents(enrichedEvents)
      setLastUpdated(new Date())
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch CTF events:', err)
      setError('Gagal mengambil data dari CTftime API.')
      setEvents(getFallbackEvents())
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEvents()
    intervalRef.current = setInterval(fetchEvents, 5 * 60 * 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fetchEvents])

  return { events, loading, error, lastUpdated, refetch: fetchEvents }
}

function getFallbackEvents() {
  const now = Math.floor(Date.now() / 1000)
  return [
    {
      id: 'demo-1',
      name: 'Sample CTF Event',
      url: 'https://ctftime.org',
      ctftimeUrl: 'https://ctftime.org',
      format: 'Jeopardy',
      formatDescription: 'Jeopardy',
      description: 'Sample CTF event - CTftime API may be unavailable',
      location: 'Online',
      organizer: 'CTF Tracker',
      organizerUrl: '',
      weight: 0,
      logo: '',
      startTime: now + 86400,
      endTime: now + 86400 * 2,
      status: 'upcoming',
      progress: 0,
      durationHours: 24,
      participants: 0,
      isIndonesian: false,
    },
  ]
}

export default useCTFEvents
