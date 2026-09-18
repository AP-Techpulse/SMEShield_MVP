import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { LanguageToggle } from '@/components/ui/language-toggle'

export default async function CertificatePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch Profile
  const { data: profile } = await supabase
    .from('users')
    .select('full_name, business_id')
    .eq('id', user.id)
    .single()

  // Fetch Business
  let businessName = 'Independent Professional'
  if (profile?.business_id) {
    const { data: business } = await supabase
      .from('businesses')
      .select('name')
      .eq('id', profile.business_id)
      .single()
    if (business) businessName = business.name
  }

  // Fetch Completed Modules
  const { data: completedProgress } = await supabase
    .from('user_progress')
    .select('id, completed_at')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })

  const totalModules = 15
  const completedCount = completedProgress?.length || 0
  const isUnlocked = completedCount >= totalModules

  // For visual styling, we get the date of the last completed module
  const completionDate = completedProgress?.[0]?.completed_at 
    ? new Date(completedProgress[0].completed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen bg-app-bg flex flex-col print:bg-white">
      <header className="sticky top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(26,43,72,0.04)] print:hidden">
        <div className="h-16 max-w-[75rem] mx-auto px-4 lg:px-8 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-11 flex items-center justify-center shrink-0">
              <svg className="w-full h-full" fill="none" viewBox="0 0 44 52" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2C34 2 42 7.5 42 22C42 37 28 47 22 50C16 47 2 37 2 22C2 7.5 10 2 22 2Z" fill="#031632" />
                <path d="M22 8L34 22H26V35H18V22H10L22 8Z" fill="#0060ac" />
                <circle cx="22" cy="22" fill="#ffb955" r="3.5" />
              </svg>
            </div>
            <span className="font-serif text-lg font-bold text-primary tracking-tight">SMEShield</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 flex items-center justify-center p-4">
        {!isUnlocked ? (
          <div className="max-w-md w-full bg-surface border border-border-subtle rounded-2xl p-8 shadow-level-2 text-center print:hidden">
            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[32px] text-muted-text">lock</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-primary mb-3">Certificate Locked</h1>
            <p className="text-on-surface-variant mb-6">
              You have completed <strong className="text-primary">{completedCount} out of {totalModules}</strong> training modules. Complete all modules to unlock your official SMEShield Cyber Awareness Certificate.
            </p>
            <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-warning-base transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${(completedCount / totalModules) * 100}%` }}
              />
            </div>
            <Link href="/dashboard" className="inline-flex h-12 px-8 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm items-center justify-center gap-2 shadow-sm transition-all w-full">
              Continue Training
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto">
            {/* Action Bar */}
            <div className="flex justify-end mb-6 print:hidden">
              <button 
                onClick={() => window.print()}
                className="h-11 px-6 rounded-lg bg-surface border border-border-subtle hover:bg-surface-container-low text-primary font-semibold text-sm flex items-center gap-2 shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                Print / Save PDF
              </button>
            </div>

            {/* The Certificate Canvas */}
            <div className="relative aspect-[1.414/1] w-full bg-white shadow-level-2 overflow-hidden border border-border-subtle print:border-none print:shadow-none p-12 md:p-24 flex flex-col items-center text-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-white to-surface-container-low">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-primary rounded-tl-3xl opacity-20 m-8"></div>
              <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-warning-base rounded-tr-3xl opacity-20 m-8"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-warning-base rounded-bl-3xl opacity-20 m-8"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-primary rounded-br-3xl opacity-20 m-8"></div>

              {/* Logo Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <svg className="w-3/4 h-3/4" fill="none" viewBox="0 0 44 52" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2C34 2 42 7.5 42 22C42 37 28 47 22 50C16 47 2 37 2 22C2 7.5 10 2 22 2Z" fill="#031632" />
                </svg>
              </div>

              {/* Content */}
              <div className="z-10 relative">
                <div className="w-16 h-20 mx-auto mb-8">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 44 52" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2C34 2 42 7.5 42 22C42 37 28 47 22 50C16 47 2 37 2 22C2 7.5 10 2 22 2Z" fill="#1A2B48" />
                    <path d="M22 8L34 22H26V35H18V22H10L22 8Z" fill="#4A90E2" />
                    <circle cx="22" cy="22" fill="#F5A623" r="3.5" />
                  </svg>
                </div>
                
                <h3 className="uppercase tracking-[0.2em] font-semibold text-muted-text text-sm mb-4">Certificate of Completion</h3>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary mb-12">Cybersecurity Awareness</h1>
                
                <p className="text-on-surface-variant text-lg mb-4 italic">This is to proudly certify that</p>
                <h2 className="text-4xl font-bold text-primary border-b-2 border-primary/20 pb-2 inline-block min-w-[300px] mb-8">
                  {profile?.full_name}
                </h2>
                
                <p className="text-on-surface-variant max-w-xl mx-auto leading-relaxed mb-16">
                  Has successfully completed all required fundamental cybersecurity training modules, demonstrating a strong commitment to protecting <strong>{businessName}</strong> from digital threats.
                </p>

                <div className="flex items-end justify-between w-full max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="border-b border-muted-text/30 pb-2 mb-2 w-32 font-bold text-primary">
                      {completionDate}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-muted-text font-semibold">Date</div>
                  </div>

                  <div className="w-24 h-24">
                    {/* A decorative seal */}
                    <div className="w-full h-full rounded-full border-4 border-warning-base bg-warning-base/10 flex items-center justify-center transform -rotate-12">
                      <span className="material-symbols-outlined text-warning-base text-[40px]">verified</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="border-b border-muted-text/30 pb-2 mb-2 w-32 font-serif font-bold text-primary italic text-xl">
                      SMEShield
                    </div>
                    <div className="text-xs uppercase tracking-wider text-muted-text font-semibold">Authorized</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
