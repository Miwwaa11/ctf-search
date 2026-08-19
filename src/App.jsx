import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import InternationalPage from './pages/InternationalPage'
import IndonesiaPage from './pages/IndonesiaPage'
import useCTFEvents from './hooks/useCTFEvents'

function App() {
  const { events, loading, error, lastUpdated, refetch } = useCTFEvents()

  return (
    <div className="min-h-screen bg-black">
      <Header
        lastUpdated={lastUpdated}
        onRefresh={refetch}
        loading={loading}
      />

      <main className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10">
        <Routes>
          <Route
            path="/"
            element={
              <InternationalPage
                events={events}
                loading={loading}
                error={error}
                lastUpdated={lastUpdated}
                onRefresh={refetch}
              />
            }
          />
          <Route
            path="/indonesia"
            element={
              <IndonesiaPage
                events={events}
                loading={loading}
                error={error}
                lastUpdated={lastUpdated}
                onRefresh={refetch}
              />
            }
          />
        </Routes>
      </main>

      <footer className="border-t border-neutral-800 py-8 mt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 flex items-center justify-between text-xs text-neutral-600">
          <span>CTF Event Tracker</span>
          <span>Data from CTftime.org</span>
        </div>
      </footer>
    </div>
  )
}

export default App
