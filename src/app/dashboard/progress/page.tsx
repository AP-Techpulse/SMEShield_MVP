import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function ProgressDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch Profile & Business
  const { data: profile } = await supabase
    .from('users')
    .select('full_name, business_id, role, businesses(name, business_type, location_state)')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile) redirect('/login')

  const role = profile.role
  const businessName = (profile.businesses as { name?: string } | null)?.name || 'Your Business'

  // If Business Owner, fetch team-wide metrics
  let teamEmployees: Array<{
    id: string
    full_name: string
    user_progress?: Array<{ status: string; module_id: string }>
    assessment_results?: Array<{ score_percentage: number; passed: boolean }>
  }> = []

  let teamReadiness = 0
  let teamAvgQuiz = 0
  let employeesNeedingAttention: typeof teamEmployees = []

  if (role === 'business_owner' && profile.business_id) {
    const { data: emps } = await supabase
      .from('users')
      .select('id, full_name, user_progress(status, module_id), assessment_results(score_percentage, passed)')
      .eq('business_id', profile.business_id)
      .eq('role', 'employee')

    if (emps) {
      teamEmployees = emps
      const totalPossible = emps.length * 15
      const totalCompleted = emps.reduce((sum, emp) => {
        return sum + (emp.user_progress?.filter(p => p.status === 'completed').length || 0)
      }, 0)

      teamReadiness = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0

      const allScores: number[] = []
      emps.forEach(emp => {
        emp.assessment_results?.forEach(r => {
          if (typeof r.score_percentage === 'number') allScores.push(r.score_percentage)
        })
      })
      teamAvgQuiz = allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0

      // Employees needing attention: 0 completed modules
      employeesNeedingAttention = emps.filter(emp => {
        const c = emp.user_progress?.filter(p => p.status === 'completed').length || 0
        return c === 0
      })
    }
  }

  // Fetch individual learner data (for Employee and Sole Entrepreneur, and personal owner training track)
  const { data: baselineResult } = await supabase
    .from('baseline_results')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const weakAreas: string[] = baselineResult?.weak_areas || []

  // Fetch individual Module Progress
  const { data: userProgress } = await supabase
    .from('user_progress')
    .select('*, modules(title_en, order_index, threat_category)')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })

  // Fetch individual Assessment Results (Quizzes)
  const { data: quizResults } = await supabase
    .from('assessment_results')
    .select('*, modules(title_en, order_index, threat_category)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch all 15 modules for curriculum checklist
  const { data: allModules } = await supabase
    .from('modules')
    .select('id, title_en, order_index, threat_category')
    .order('order_index')

  const completedModules = userProgress?.filter(p => p.status === 'completed') || []
  const totalCompleted = completedModules.length
  const totalQuizzes = quizResults?.length || 0
  const averageScore = totalQuizzes > 0 
    ? Math.round(quizResults!.reduce((acc, q) => acc + q.score_percentage, 0) / totalQuizzes)
    : 0

  const baselineScore = typeof baselineResult?.score_percentage === 'number'
    ? baselineResult.score_percentage
    : null
  const completionPercentage = Math.round((totalCompleted / 15) * 100)

  // ─── Human Firewall Score (approved formula) ─────────────────────────────
  // HFS = (completion_percentage × 0.35) + (average_completed_module_quiz_score × 0.65)
  // Baseline Awareness Score = initial assessment score
  // Current Human Firewall Score = current training/assessment state
  // Awareness Improvement = Current Human Firewall Score - Baseline Awareness Score (only when baseline & module completed)
  // ────────────────────────────────────────────────────────────────────────────
  const humanFirewallScore = Math.round(
    (completionPercentage * 0.35) + (averageScore * 0.65)
  )
  const hasCompletedModules = totalCompleted > 0
  const hasBaseline = typeof baselineScore === 'number'
  const awarenessImprovement = (hasBaseline && hasCompletedModules)
    ? humanFirewallScore - baselineScore
    : null

  const awarenessLevel: 'Developing' | 'Aware' | 'Strong' | 'Highly Aware' = 
    humanFirewallScore >= 85 ? 'Highly Aware' :
    humanFirewallScore >= 70 ? 'Strong' :
    humanFirewallScore >= 50 ? 'Aware' : 'Developing'

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* ------------------------------------------------------------- */}
      {/* 1. BUSINESS OWNER PROGRESS VIEW                                */}
      {/* ------------------------------------------------------------- */}
      {role === 'business_owner' ? (
        <div className="flex flex-col gap-space-xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-border-subtle">
            <div className="max-w-2xl">
              <nav className="flex items-center gap-2 text-sm text-muted-text mb-2">
                <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-primary font-semibold">Team Training Progress</span>
              </nav>
              <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight">
                Team Training & Readiness
              </h1>
              <p className="text-base text-muted-text mt-1">
                Overview of training completion and quiz validation across your staff at {businessName}.
              </p>
            </div>
            <Link 
              href="/dashboard/team" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold transition-colors shadow-sm self-start md:self-auto"
            >
              <span className="material-symbols-outlined text-[18px]">group</span>
              <span>Manage Team Roster</span>
            </Link>
          </div>

          {/* Team Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            <div className="bg-surface rounded-xl p-space-md shadow-sm border border-border-subtle/60 flex flex-col justify-between">
              <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Enrolled Staff</span>
              <span className="font-display-hero text-display-hero text-primary my-2">{teamEmployees.length}</span>
              <span className="text-xs text-muted-text">Active training accounts</span>
            </div>

            <div className="bg-surface rounded-xl p-space-md shadow-sm border border-border-subtle/60 flex flex-col justify-between">
              <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Staff Completed</span>
              <span className="font-display-hero text-display-hero text-primary my-2">{teamReadiness}%</span>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: `${teamReadiness}%` }}></div>
              </div>
            </div>

            <div className="bg-surface rounded-xl p-space-md shadow-sm border border-border-subtle/60 flex flex-col justify-between">
              <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Team Quiz Average</span>
              <span className="font-display-hero text-display-hero text-primary my-2">
                {teamAvgQuiz > 0 ? `${teamAvgQuiz}%` : '---'}
              </span>
              <span className="text-xs text-muted-text">Passing threshold: 80%</span>
            </div>

            <div className="bg-surface rounded-xl p-space-md shadow-sm border border-border-subtle/60 flex flex-col justify-between">
              <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Requires Attention</span>
              <span className={`font-display-hero text-display-hero my-2 ${employeesNeedingAttention.length > 0 ? 'text-warning-text' : 'text-primary'}`}>
                {employeesNeedingAttention.length}
              </span>
              <span className="text-xs text-muted-text">Staff with 0 completed modules</span>
            </div>
          </div>

          {/* Employees Needing Attention Section */}
          <div className="bg-surface rounded-xl p-space-lg shadow-sm border border-border-subtle/60 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-md text-headline-md text-primary">Employees Requiring Coaching</h2>
                <p className="font-body-sm text-body-sm text-muted-text mt-0.5">
                  Staff who have not yet started or finished their first security training module.
                </p>
              </div>
              <Link href="/dashboard/team" className="text-secondary hover:text-primary font-semibold text-sm">
                View all team members →
              </Link>
            </div>

            {employeesNeedingAttention.length === 0 ? (
              <div className="py-8 text-center bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-success-base text-3xl mb-1">check_circle</span>
                <p className="text-sm font-semibold text-primary">All employees are actively making progress.</p>
              </div>
            ) : (
              <div className="divide-y divide-border-subtle/60">
                {employeesNeedingAttention.map(emp => (
                  <div key={emp.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary font-semibold text-sm">
                        {emp.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-body-md-semibold text-body-md text-primary">{emp.full_name}</span>
                        <span className="text-xs text-muted-text block">0 of 15 modules completed</span>
                      </div>
                    </div>
                    <Link 
                      href={`/dashboard/team/${emp.id}`} 
                      className="text-xs font-semibold text-secondary hover:underline self-start sm:self-auto"
                    >
                      View Employee Progress →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Business Owner Personal Cybersecurity Progress & Checklist */}
          <div className="bg-surface rounded-xl p-space-lg shadow-sm border border-border-subtle/60 flex flex-col gap-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-border-subtle/40">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary font-label-sm text-label-sm font-semibold mb-1">
                  <span className="material-symbols-outlined text-xs">shield_person</span>
                  <span>Owner Defense Track</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-primary">Your Personal Training Checklist</h2>
                <p className="font-body-sm text-body-sm text-muted-text mt-0.5">
                  Your executive cybersecurity training curriculum, quiz validations, and module status across all 15 topics.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg border border-border-subtle/40">
                  <span className="text-xs text-muted-text uppercase font-semibold">Your HFS:</span>
                  <span className="text-sm font-bold text-primary">{humanFirewallScore}%</span>
                  <span className={`inline-flex items-center px-2 py-0.2 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    awarenessLevel === 'Highly Aware' ? 'bg-success-bg text-success-text' :
                    awarenessLevel === 'Strong' ? 'bg-secondary-fixed/50 text-secondary' :
                    awarenessLevel === 'Aware' ? 'bg-info-bg text-info-text' :
                    'bg-surface-container-high text-muted-text'
                  }`}>
                    {awarenessLevel}
                  </span>
                </div>
                <Link href="/training" className="text-secondary hover:text-primary font-semibold text-xs inline-flex items-center gap-1">
                  <span>Open Library</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            <CurriculumChecklist 
              allModules={allModules} 
              userProgress={userProgress} 
              quizResults={quizResults} 
            />
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* 2. LEARNER (EMPLOYEE & SOLE ENTREPRENEUR) PROGRESS VIEW        */
        /* ------------------------------------------------------------- */
        <div className="flex flex-col gap-space-xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-border-subtle">
            <div className="max-w-2xl">
              <nav className="flex items-center gap-2 text-sm text-muted-text mb-2">
                <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-primary font-semibold">Training Progress</span>
              </nav>
              <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight">
                {role === 'sole_entrepreneur' ? 'Merchant Cybersecurity Progress' : 'Personal Training Progress'}
              </h1>
              <p className="text-base text-muted-text mt-1">
                {role === 'sole_entrepreneur'
                  ? 'Track your cybersecurity awareness, completed modules, and verified quiz scores.'
                  : `Track your threat readiness and completed training modules at ${businessName}.`}
              </p>
            </div>
            <Link 
              href="/training" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold transition-colors shadow-sm self-start md:self-auto"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span>Continue Training</span>
            </Link>
          </div>

          {/* Metric Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Current Human Firewall Score */}
            <div className="bg-surface rounded-xl p-space-md shadow-sm border border-border-subtle/60 flex flex-col justify-between">
              <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Current Human Firewall</span>
              <div className="flex flex-col gap-1 my-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display-hero text-display-hero text-primary">{humanFirewallScore}%</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    awarenessLevel === 'Highly Aware' ? 'bg-success-bg text-success-text border border-success-base/30' :
                    awarenessLevel === 'Strong' ? 'bg-secondary-fixed/50 text-secondary border border-secondary/30' :
                    awarenessLevel === 'Aware' ? 'bg-info-bg text-info-text border border-info-base/30' :
                    'bg-surface-container-high text-muted-text border border-border-subtle'
                  }`}>
                    {awarenessLevel}
                  </span>
                  {awarenessImprovement !== null ? (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      awarenessImprovement >= 0 ? 'text-success-text bg-success-bg' : 'text-warning-text bg-warning-bg'
                    }`}>
                      {awarenessImprovement >= 0 ? `+${awarenessImprovement}% Improvement` : `${awarenessImprovement}% Improvement`}
                    </span>
                  ) : null}
                </div>
                {awarenessImprovement === null && (
                  <span className="text-xs text-muted-text">
                    {totalCompleted === 0
                      ? 'Complete your first training module to measure improvement.'
                      : 'Baseline not completed.'}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-text">35% Completion + 65% Quiz Mastery</span>
            </div>

            {/* Baseline Awareness Score */}
            <div className="bg-surface rounded-xl p-space-md shadow-sm border border-border-subtle/60 flex flex-col justify-between">
              <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Baseline Awareness Score</span>
              <span className="font-display-hero text-display-hero text-primary my-2">
                {baselineScore !== null ? `${baselineScore}%` : '---'}
              </span>
              <span className="text-xs text-muted-text">
                {baselineScore !== null ? 'Initial assessment diagnostic' : 'Baseline not completed.'}
              </span>
            </div>

            {/* Completed */}
            <div className="bg-surface rounded-xl p-space-md shadow-sm border border-border-subtle/60 flex flex-col justify-between">
              <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Completed Modules</span>
              <span className="font-display-hero text-display-hero text-primary my-2">{totalCompleted} / 15</span>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden mb-1">
                <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
              </div>
              <span className="text-xs text-muted-text">35% weight ({completionPercentage}%)</span>
            </div>

            {/* Quiz Average */}
            <div className="bg-surface rounded-xl p-space-md shadow-sm border border-border-subtle/60 flex flex-col justify-between">
              <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Quiz Average</span>
              <span className="font-display-hero text-display-hero text-primary my-2">
                {averageScore > 0 ? `${averageScore}%` : '---'}
              </span>
              <span className="text-xs text-muted-text">65% weight • {quizResults?.filter(q => q.passed).length || 0} passed of {totalQuizzes} attempts</span>
            </div>
          </div>

          {/* Focus Areas (from baseline) */}
          {weakAreas.length > 0 && (
            <div className="bg-surface rounded-xl p-space-md shadow-sm border border-warning-base/30 bg-warning-bg/20 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-warning-text font-semibold text-sm">
                <span className="material-symbols-outlined text-lg">crisis_alert</span>
                <span>Priority Focus Areas from Your Diagnostic</span>
              </div>
              <p className="text-xs text-muted-text">
                Your initial assessment flagged the following categories for extra practice:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {weakAreas.map((area, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-surface text-primary border border-border-subtle text-xs font-semibold">
                    {area.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Modules Progress Breakdown */}
          <div className="bg-surface rounded-xl p-space-lg shadow-sm border border-border-subtle/60 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-md text-headline-md text-primary">Curriculum Modules (15)</h2>
                <p className="font-body-sm text-body-sm text-muted-text mt-0.5">
                  Track progress, review lessons, and retake quizzes to increase your score.
                </p>
              </div>
              <Link href="/training" className="text-secondary hover:text-primary font-semibold text-sm inline-flex items-center gap-1">
                <span>Open Training Library</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            <CurriculumChecklist 
              allModules={allModules} 
              userProgress={userProgress} 
              quizResults={quizResults} 
            />
          </div>
        </div>
      )}
    </div>
  )
}

function CurriculumChecklist({
  allModules,
  userProgress,
  quizResults,
}: {
  allModules: Array<{ id: string; title_en: string; order_index: number; threat_category: string | null }> | null
  userProgress: Array<{ module_id: string; status: string }> | null
  quizResults: Array<{ module_id: string; score_percentage: number; passed: boolean }> | null
}) {
  return (
    <div className="divide-y divide-border-subtle/60">
      {allModules?.map(mod => {
        const progressRecord = userProgress?.find(p => p.module_id === mod.id)
        const isCompleted = progressRecord?.status === 'completed'
        const isInProgress = progressRecord?.status === 'in_progress'
        const quiz = quizResults?.find(q => q.module_id === mod.id)

        return (
          <div key={mod.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                isCompleted 
                  ? 'bg-success-bg text-success-text border border-success-base/30' 
                  : isInProgress 
                  ? 'bg-info-bg text-info-text border border-info-base/30' 
                  : 'bg-surface-container text-muted-text border border-border-subtle'
              }`}>
                <span className="material-symbols-outlined text-[18px]">
                  {isCompleted ? 'check' : isInProgress ? 'timelapse' : 'lock_open'}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-muted-text uppercase">Module {String(mod.order_index).padStart(2, '0')}</span>
                  {mod.threat_category && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container-low text-muted-text border border-border-subtle/50">
                      {mod.threat_category.replace(/_/g, ' ')}
                    </span>
                  )}
                </div>
                <h4 className="font-body-md-semibold text-body-md text-primary leading-tight mt-0.5 truncate">{mod.title_en}</h4>
              </div>
            </div>

            <div className="flex items-center gap-space-sm self-start sm:self-center shrink-0 flex-wrap">
              {quiz ? (
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  quiz.passed 
                    ? 'bg-success-bg text-success-text border border-success-base/30' 
                    : 'bg-warning-bg text-warning-text border border-warning-base/30'
                }`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {quiz.passed ? 'verified' : 'refresh'}
                  </span>
                  <span>Quiz: {quiz.score_percentage}% {quiz.passed ? 'Passed' : 'Needs Retake'}</span>
                </span>
              ) : isCompleted ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-success-text bg-success-bg border border-success-base/30 px-2.5 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  <span>Lesson Completed</span>
                </span>
              ) : isInProgress ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-info-text bg-info-bg border border-info-base/30 px-2.5 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">timelapse</span>
                  <span>In Progress</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-muted-text bg-surface-container-low border border-border-subtle/60 px-2.5 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">radio_button_unchecked</span>
                  <span>Not Started</span>
                </span>
              )}

              <div className="flex items-center gap-1.5 ml-1">
                {isCompleted || quiz ? (
                  <>
                    <Link 
                      href={`/training/${mod.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-surface-container-low hover:bg-surface-container text-primary text-xs font-semibold border border-border-subtle transition-colors"
                      title="Review the lesson material"
                    >
                      <span className="material-symbols-outlined text-[14px]">menu_book</span>
                      <span>Review Lesson</span>
                    </Link>
                    <Link 
                      href={`/training/${mod.id}/quiz`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-colors shadow-sm"
                      title="Retake the quiz to improve your score"
                    >
                      <span className="material-symbols-outlined text-[14px]">quiz</span>
                      <span>Retake Quiz</span>
                    </Link>
                  </>
                ) : isInProgress ? (
                  <>
                    <Link 
                      href={`/training/${mod.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                      <span>Continue</span>
                    </Link>
                    <Link 
                      href={`/training/${mod.id}/quiz`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-surface-container-low hover:bg-surface-container text-primary text-xs font-semibold border border-border-subtle transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">quiz</span>
                      <span>Take Quiz</span>
                    </Link>
                  </>
                ) : (
                  <Link 
                    href={`/training/${mod.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-colors shadow-sm"
                  >
                    <span>Start Module</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
