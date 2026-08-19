import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import InternationalPage from './pages/InternationalPage'
import IndonesiaPage from './pages/IndonesiaPage'
import useCTFEvents from './hooks/useCTFEvents'

function App() {
  const { events, loading, error, lastUpdated, refetch } = useCTFEvents()

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        lastUpdated={lastUpdated}
        onRefresh={refetch}
        loading={loading}
      />

      <main className="mx-auto max-w-[1200px] px-6 lg:px-8 py-10">
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

      <footer className="border-t border-neutral-900 py-8 mt-16">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8 flex items-center justify-between text-[11px] text-neutral-700">
          <span>CTF Tracker</span>
          <span>CTftime.org</span>
        </div>
      </footer>
    </div>
  )
}

export default App
