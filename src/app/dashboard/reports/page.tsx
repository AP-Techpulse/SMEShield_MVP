import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { LanguageToggle } from '@/components/ui/language-toggle'

export default async function ReportsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch Profile and verify role
  const { data: profile } = await supabase
    .from('users')
    .select('role, business_id')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'business_owner' || !profile.business_id) {
    redirect('/dashboard')
  }

  // Fetch Business
  const { data: business } = await supabase
    .from('businesses')
    .select('name')
    .eq('id', profile.business_id)
    .single()

  // Fetch all employees in this business
  const { data: employees } = await supabase
    .from('users')
    .select('id')
    .eq('business_id', profile.business_id)

  const employeeIds = employees?.map(e => e.id) || []

  // Fetch all assessment results for the team (Quizzes)
  const { data: assessmentResults } = await supabase
    .from('assessment_results')
    .select('passed')
    .in('user_id', employeeIds)

  // Fetch baseline results for the team
  const { data: baselineResults } = await supabase
    .from('baseline_results')
    .select('weak_areas')
    .in('user_id', employeeIds)

  // Calculate Quiz Stats
  const totalQuizzes = assessmentResults?.length || 0
  const passedQuizzes = assessmentResults?.filter(r => r.passed).length || 0
  const failedQuizzes = totalQuizzes - passedQuizzes
  const passRate = totalQuizzes > 0 ? Math.round((passedQuizzes / totalQuizzes) * 100) : 0

  // Calculate Weak Area Frequencies
  const weakAreaCounts: Record<string, number> = {}
  baselineResults?.forEach(result => {
    result.weak_areas?.forEach((area: string) => {
      weakAreaCounts[area] = (weakAreaCounts[area] || 0) + 1
    })
  })

  // Sort weak areas by frequency descending
  const topWeakAreas = Object.entries(weakAreaCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const formatCategory = (cat: string) => {
    return cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-app-bg flex flex-col">
      <header className="sticky top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(26,43,72,0.04)]">
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

      <main className="flex-1 py-8">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="w-10 h-10 rounded-lg hover:bg-surface-container flex items-center justify-center transition-colors text-muted-text hover:text-primary shrink-0">
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-1">
                  Analytics & Reports
                </h1>
                <p className="text-muted-text">
                  Data overview for {business?.name}
                </p>
              </div>
            </div>
            
            <a 
              href="/api/export-csv"
              download
              className="h-11 px-6 rounded-lg bg-surface border border-border-subtle hover:bg-surface-container-low text-primary font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export Compliance CSV
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Quiz Pass Rate Card */}
            <div className="bg-surface border border-border-subtle rounded-xl p-6 shadow-level-1">
              <h2 className="font-serif text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Team Quiz Performance
              </h2>
              
              <div className="flex items-end justify-between mb-8">
                <span className="text-5xl font-bold text-primary">{passRate}%</span>
                <span className="text-sm font-semibold text-muted-text mb-1">Average Pass Rate</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-success-text">Passed Quizzes</span>
                    <span>{passedQuizzes}</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-success-base rounded-full"
                      style={{ width: `${totalQuizzes > 0 ? (passedQuizzes / totalQuizzes) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-danger-text">Failed Quizzes</span>
                    <span>{failedQuizzes}</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-danger-base rounded-full"
                      style={{ width: `${totalQuizzes > 0 ? (failedQuizzes / totalQuizzes) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Systemic Weak Areas Card */}
            <div className="bg-surface border border-border-subtle rounded-xl p-6 shadow-level-1">
              <h2 className="font-serif text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-warning-base">radar</span>
                Systemic Weak Areas
              </h2>
              
              {topWeakAreas.length > 0 ? (
                <div className="space-y-4">
                  {topWeakAreas.map(([area, count]) => {
                    const percentage = Math.round((count / employeeIds.length) * 100)
                    return (
                      <div key={area}>
                        <div className="flex justify-between text-sm font-medium mb-1">
                          <span className="text-primary">{formatCategory(area)}</span>
                          <span className="text-muted-text">{percentage}% of team</span>
                        </div>
                        <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-warning-base rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-text text-sm">
                  Not enough data collected yet. Ask your team to complete their baseline assessments.
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
