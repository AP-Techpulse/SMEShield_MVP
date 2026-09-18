import Link from 'next/link'

export default function NotificationsPage() {
  return (
    <div className="w-full pt-20 bg-app-bg min-h-screen">
      <div className="max-w-container-max mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col w-full gap-space-xl">
          
          {/* Breadcrumb & Header */}
          <div className="flex flex-col gap-2 pb-4 border-b border-border-subtle">
            <nav className="flex items-center gap-2 text-sm text-muted-text">
              <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary font-semibold">Notifications</span>
            </nav>
            <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">
              Notification Center
            </h1>
            <p className="text-base text-muted-text">
              Platform updates and reminders for your SMEShield account.
            </p>
          </div>

          {/* Quiet Canonical Empty State Card */}
          <div className="bg-surface rounded-2xl p-space-2xl md:p-space-3xl shadow-sm border border-border-subtle/60 flex flex-col items-center text-center max-w-2xl mx-auto w-full my-8">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-space-lg text-secondary">
              <span className="material-symbols-outlined text-[40px]">notifications_none</span>
            </div>
            
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
              You&apos;re All Caught Up
            </h2>
            <p className="text-muted-text text-base max-w-md mb-space-xl">
              There are no new notifications or training reminders at this time. You can continue learning in the Training Library.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto">
              <Link 
                href="/training" 
                className="w-full sm:w-auto h-11 px-space-xl rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-md-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                <span>Open Training Library</span>
              </Link>
              <Link 
                href="/dashboard" 
                className="w-full sm:w-auto h-11 px-space-xl rounded-lg bg-surface hover:bg-surface-container text-primary font-body-md-semibold text-sm flex items-center justify-center gap-2 border border-border-subtle transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">dashboard</span>
                <span>Back to Dashboard</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
