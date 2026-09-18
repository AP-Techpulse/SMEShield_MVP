'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-app-bg flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface border border-border-subtle rounded-2xl p-8 shadow-level-2 text-center">
        <div className="w-16 h-16 bg-danger-bg rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-[32px] text-danger-base">error</span>
        </div>
        
        <h1 className="font-serif text-2xl font-bold text-primary mb-3">
          Something went wrong
        </h1>
        
        <p className="text-on-surface-variant mb-8 leading-relaxed">
          We encountered an unexpected error. Don&apos;t worry, your progress is saved.
        </p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full h-12 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-all"
          >
            Try again
          </button>
          <Link
            href="/dashboard"
            className="w-full h-12 flex items-center justify-center rounded-lg bg-surface border border-border-subtle hover:bg-surface-container-low text-primary font-semibold text-sm transition-all"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
