import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { EmployeeRemoveButton } from '../EmployeeRemoveButton'

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: employeeId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: owner } = await supabase
    .from('users')
    .select('role, business_id')
    .eq('id', user.id)
    .single()

  if (!owner || owner.role !== 'business_owner' || !owner.business_id) {
    redirect('/dashboard')
  }

  // Fetch employee details
  const { data: employee } = await supabase
    .from('users')
    .select('id, full_name, role, created_at, business_id, user_progress(status, module_id, completed_at), assessment_results(module_id, score_percentage, passed)')
    .eq('id', employeeId)
    .single()

  if (!employee || employee.business_id !== owner.business_id) {
    redirect('/dashboard/team')
  }

  // Fetch modules
  const { data: modules } = await supabase
    .from('modules')
    .select('id, title_en, order_index, threat_category')
    .order('order_index')

  const completedProgress = employee.user_progress?.filter((p: { status: string }) => p.status === 'completed') || []
  const assessments = employee.assessment_results || []
  
  const avgScore = assessments.length > 0 
    ? Math.round(assessments.reduce((acc: number, curr: { score_percentage: number }) => acc + curr.score_percentage, 0) / assessments.length)
    : null

  const progressPercentage = Math.round((completedProgress.length / 15) * 100)
  const employeeHFS = Math.round((progressPercentage * 0.35) + ((avgScore ?? 0) * 0.65))
  
  // Risk Indicator was not in Phase 3F logic, defaulting to generic status
  const isNeedsAttention = completedProgress.length === 0

  const joinDate = new Date(employee.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const employeeIdShort = employee.id.substring(0, 8).toUpperCase()

  return (
    <div className="max-w-[75rem] mx-auto w-full px-space-lg py-space-xl flex flex-col gap-space-xl">
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center gap-space-xs text-muted-text font-label-sm text-label-sm mb-space-sm">
          <Link href="/dashboard" className="hover:text-primary-container transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/dashboard/team" className="hover:text-primary-container transition-colors">Employee Roster</Link>
          <span>/</span>
          <span className="text-on-surface font-body-md-semibold text-body-md-semibold">{employee.full_name}</span>
        </div>

        <div className="inline-flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xxs rounded-full text-on-surface-variant font-label-sm text-label-sm self-start">
          <span className="material-symbols-outlined text-info-base text-[18px]">verified</span>
          <span>Verified Identity Profile — Employee ID: <span className="font-mono text-primary font-bold">{employeeIdShort}</span></span>
        </div>

        <div className="relative bg-surface rounded-xl shadow-sm p-space-lg md:p-space-xl overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-space-xl">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-lg relative z-10">
            <div className="relative">
              <div className="w-24 h-24 rounded-xl bg-primary-container text-on-primary-container font-bold text-4xl flex items-center justify-center flex-shrink-0 shadow-sm">
                {employee.full_name?.charAt(0).toUpperCase() || 'E'}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-success-base text-on-primary w-7 h-7 rounded-full flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[16px]">shield</span>
              </div>
            </div>
            <div className="flex flex-col gap-space-xxs">
              <div className="flex flex-wrap items-center gap-space-xs">
                <h1 className="font-headline-lg text-headline-lg text-primary-container">{employee.full_name}</h1>
                <span className="inline-flex items-center gap-1 bg-success-bg text-success-text px-space-xs py-space-xxs rounded-full font-label-sm text-label-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-success-base"></span>
                  Active Defender
                </span>
              </div>
              <p className="font-body-md-semibold text-body-md text-on-surface-variant">Frontline Employee Defender</p>
              <div className="flex flex-wrap items-center gap-x-space-md gap-y-space-xxs text-muted-text font-body-sm text-body-sm pt-space-xxs">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-outline">calendar_today</span>
                  Joined {joinDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm relative z-10">
            <div className="relative">
              <EmployeeRemoveButton employeeId={employee.id} employeeName={employee.full_name} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="bg-surface rounded-xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-muted-text">Module Coverage</span>
              <span className="bg-secondary-fixed/50 text-secondary font-label-sm text-label-sm px-space-xs py-space-xxs rounded-md">
                {progressPercentage}% Finished
              </span>
            </div>
            <div className="flex items-center gap-space-md my-space-xs">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" fill="none" r="48" stroke="#E4E7EC" strokeLinecap="round" strokeWidth="10"></circle>
                  <circle className="transition-all duration-1000 ease-out" cx="60" cy="60" fill="none" r="48" stroke="#a7c8ff" strokeDasharray="301.6" strokeDashoffset={301.6 * (1 - (progressPercentage/100))} strokeLinecap="round" strokeWidth="10"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-headline-sm text-headline-sm text-primary">{progressPercentage}%</span>
                </div>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-primary">{completedProgress.length} of 15</div>
                <div className="font-body-sm text-body-sm text-muted-text">Core Modules Done</div>
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-muted-text">Quiz Mastery</span>
              <span className="bg-success-bg text-success-text font-label-sm text-label-sm px-space-xs py-space-xxs rounded-md flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span> High Avg
              </span>
            </div>
            <div className="flex items-end gap-space-xs">
              <span className="font-display-sm text-display-sm text-primary-container leading-none">{avgScore !== null ? avgScore : '--'}%</span>
              <span className="font-body-md text-body-md text-muted-text mb-1">Average</span>
            </div>
            <p className="font-body-sm text-body-sm text-muted-text line-clamp-2">
              Based on {assessments.length} completed threat simulations and first-pass assessments.
            </p>
          </div>

          <div className="bg-surface rounded-xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-muted-text">Risk Indicator</span>
            </div>
            <div className="flex items-start gap-space-sm">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isNeedsAttention ? 'bg-warning-bg text-warning-text' : 'bg-success-bg text-success-text'}`}>
                <span className="material-symbols-outlined text-[24px]">
                  {isNeedsAttention ? 'warning' : 'gpp_good'}
                </span>
              </div>
              <div>
                <div className={`font-headline-sm text-headline-sm ${isNeedsAttention ? 'text-warning-text' : 'text-success-text'}`}>
                  {isNeedsAttention ? 'Action Required' : 'Active Learning'}
                </div>
                <div className="font-body-sm text-body-sm text-muted-text mt-0.5">
                  {isNeedsAttention ? 'Employee has not completed any modules.' : 'Engaged in cybersecurity training.'}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-muted-text">Human Firewall Score</span>
              <span className="bg-info-bg text-info-text font-label-sm text-label-sm px-space-xs py-space-xxs rounded-md flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[14px]">shield</span> Formula
              </span>
            </div>
            <div className="flex items-end gap-space-xs">
              <span className="font-display-sm text-display-sm text-primary-container leading-none">{employeeHFS}%</span>
              <span className="font-body-md text-body-md text-muted-text mb-1">Awareness & Training</span>
            </div>
            <p className="font-body-sm text-body-sm text-muted-text line-clamp-2">
              (Coverage: {progressPercentage}% × 0.35) + (Quiz Avg: {avgScore !== null ? `${avgScore}%` : '0%'} × 0.65)
            </p>
          </div>
        </div>

        <div className="bg-surface rounded-xl shadow-sm overflow-hidden flex flex-col mt-space-lg">
          <div className="p-space-lg border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
            <div className="flex flex-col">
              <h2 className="font-headline-md text-headline-md text-primary-container">Training History & Diagnostics</h2>
              <p className="font-body-sm text-body-sm text-muted-text">Detailed breakdown of module completion and assessment scores.</p>
            </div>
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[56rem]">
              <thead>
                <tr className="bg-app-bg">
                  <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider">Module</th>
                  <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider">Status</th>
                  <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider">Diagnostic Score</th>
                  <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider text-right">Date Completed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {modules?.map(mod => {
                  const prog = employee.user_progress?.find((p: { module_id: string, status: string, completed_at?: string }) => p.module_id === mod.id)
                  const result = assessments.find((a: { module_id: string, score_percentage: number }) => a.module_id === mod.id)
                  
                  const isCompleted = prog?.status === 'completed'
                  const score = result?.score_percentage

                  return (
                    <tr key={mod.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-space-md px-space-lg">
                        <div className="flex items-center gap-space-sm">
                          <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${isCompleted ? 'bg-surface-container-low text-primary-container' : 'bg-surface-container text-muted-text'}`}>
                            <span className="material-symbols-outlined text-[18px]">
                              {mod.threat_category ? 'shield' : 'school'}
                            </span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-body-md-semibold text-body-md-semibold text-on-surface truncate">
                              Module {mod.order_index}: {mod.title_en}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-space-md px-space-lg">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success-bg text-success-text font-label-sm text-label-sm">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            Finished
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-text"></span>
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-space-md px-space-lg">
                        {score !== undefined ? (
                          <div className="flex items-center gap-1.5">
                            <span className={`font-body-md-semibold text-body-md-semibold ${score >= 80 ? 'text-success-text' : 'text-warning-text'}`}>
                              {score}%
                            </span>
                            {score >= 80 ? (
                              <span className="material-symbols-outlined text-success-base text-[16px]">verified</span>
                            ) : (
                              <span className="material-symbols-outlined text-warning-text text-[16px]">warning</span>
                            )}
                          </div>
                        ) : (
                          <span className="font-body-sm text-body-sm text-muted-text">—</span>
                        )}
                      </td>
                      <td className="py-space-md px-space-lg text-right text-muted-text font-body-sm text-body-sm">
                        {isCompleted && prog?.completed_at ? new Date(prog.completed_at).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
