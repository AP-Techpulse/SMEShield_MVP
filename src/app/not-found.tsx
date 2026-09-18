import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-app-bg flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface border border-border-subtle rounded-2xl p-8 shadow-level-2 text-center">
        <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-[32px] text-muted-text">explore_off</span>
        </div>
        
        <h1 className="font-serif text-2xl font-bold text-primary mb-3">
          Page Not Found
        </h1>
        
        <p className="text-on-surface-variant mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        
        <Link
          href="/dashboard"
          className="w-full h-12 flex items-center justify-center rounded-lg bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-all"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
