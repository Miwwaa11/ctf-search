import { Loader2, AlertTriangle, WifiOff } from 'lucide-react'

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <Loader2 className="h-8 w-8 animate-spin text-neutral-600 mb-4" />
      <p className="text-sm text-neutral-400">Memuat event CTF...</p>
      <p className="text-xs text-neutral-700 mt-1.5">Mengambil data dari CTftime API</p>
    </div>
  )
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <AlertTriangle className="h-8 w-8 text-neutral-600 mb-4" />
      <p className="text-sm text-neutral-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg border border-neutral-800 px-4 py-2 text-xs font-medium text-neutral-400 transition-colors hover:text-white hover:border-neutral-600"
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
      <WifiOff className="h-8 w-8 text-neutral-800 mb-4" />
      <p className="text-sm text-neutral-600">{message}</p>
    </div>
  )
}
