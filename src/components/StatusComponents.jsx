import { Loader2, AlertTriangle, WifiOff } from 'lucide-react'

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <Loader2 className="h-10 w-10 animate-spin text-neutral-500 mb-5" />
      <p className="text-base text-neutral-400">Memuat event CTF...</p>
      <p className="text-sm text-neutral-700 mt-2">Mengambil data dari CTftime API</p>
    </div>
  )
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <AlertTriangle className="h-10 w-10 text-neutral-500 mb-5" />
      <p className="text-base text-neutral-300 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-xl border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all"
        >
          Coba Lagi
        </button>
      )}
    </div>
  )
}

export function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <WifiOff className="h-10 w-10 text-neutral-700 mb-5" />
      <p className="text-base text-neutral-500">{message}</p>
    </div>
  )
}
