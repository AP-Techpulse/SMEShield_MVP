import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { EmployeeRemoveButton } from './EmployeeRemoveButton'
import { RevokeInviteButton } from './invite/RevokeInviteButton'

export default async function TeamPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('role, business_id, businesses(join_code)')
    .eq('id', user.id)
    .single()

  const businessJoinCode = (profile?.businesses as { join_code?: string } | null)?.join_code || '---'

  if (!profile || profile.role !== 'business_owner' || !profile.business_id) {
    redirect('/dashboard') // Or an unauthorized page
  }

  // Fetch employees
  const { data: employees } = await supabase
    .from('users')
    .select('id, full_name, role, user_progress(status, module_id), assessment_results(score_percentage, passed)')
    .eq('business_id', profile.business_id)
    .eq('role', 'employee')

  // Fetch invites
  const { data: invites } = await supabase
    .from('employee_invites')
    .select('*')
    .eq('business_id', profile.business_id)
    .order('created_at', { ascending: false })

  const hasEmployeesOrInvites = (employees && employees.length > 0) || (invites && invites.length > 0)
  
  const pendingInvites = invites ? invites.filter(i => i.status === 'pending').length : 0

  let avgQuizScore = 0
  let totalQuizzes = 0
  if (employees) {
    for (const emp of employees) {
      if (emp.assessment_results) {
        emp.assessment_results.forEach((r: { score_percentage: number }) => {
          avgQuizScore += r.score_percentage
          totalQuizzes += 1
        })
      }
    }
  }
  const overallQuizMastery = totalQuizzes > 0 ? Math.round(avgQuizScore / totalQuizzes) : 0

  return (
    <div className="max-w-[75rem] mx-auto w-full px-space-lg py-space-xl flex flex-col gap-space-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
        <div className="flex flex-col gap-space-xs max-w-2xl">
          <div className="flex items-center gap-space-xs text-muted-text font-label-sm text-label-sm">
            <Link href="/dashboard" className="hover:text-primary-container transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-on-surface font-body-md-semibold text-body-md-semibold">Employee Roster</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-primary-container tracking-tight mt-space-xxs">
            Employee Training Roster & Management
          </h1>
          <p className="font-body-md text-body-md text-muted-text">
            Monitor your staff&apos;s defensive training pacing, verified quiz mastery, and provide supportive coaching interventions.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-space-sm self-start md:self-auto">
          <button className="h-12 px-space-md bg-surface shadow-sm rounded-lg flex items-center gap-space-sm group hover:bg-surface-container-low transition-colors focus:outline-none">
            <div className="flex flex-col text-left">
              <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider text-[11px] leading-none">Business Join Code</span>
              <span className="font-body-md-semibold text-body-md-semibold text-primary-container tracking-wide">{businessJoinCode}</span>
            </div>
            <span className="material-symbols-outlined text-muted-text group-hover:text-primary-container transition-colors text-[20px]">content_copy</span>
          </button>
          <Link href="/dashboard/team/invite" className="h-12 px-space-lg rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-space-xs shadow-md hover:bg-primary transition-colors focus:outline-none">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span>+ Invite Employee</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
        <div className="md:col-span-4 bg-surface rounded-xl p-space-md shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-info-bg text-info-text flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[26px]">group</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-md text-headline-md text-primary-container">{employees?.length || 0}</span>
                <span className="font-label-sm text-label-sm text-muted-text font-normal">Active Team Members</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 bg-surface rounded-xl p-space-md shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-warning-bg text-warning-text flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[26px]">forward_to_inbox</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-primary-container truncate">{pendingInvites} Invitation{pendingInvites !== 1 ? 's' : ''} Pending</span>
              <span className="font-body-sm text-body-sm text-muted-text truncate">Awaiting onboarding</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 bg-surface rounded-xl p-space-md shadow-sm flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-success-bg text-success-text flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[26px]">shield_person</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-muted-text">Average Quiz Score</span>
            <span className="font-headline-md text-headline-md text-success-text">{overallQuizMastery}%</span>
          </div>
        </div>
      </div>

      {!hasEmployeesOrInvites ? (
        <div className="bg-surface rounded-xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center text-primary-container mb-4">
            <span className="material-symbols-outlined text-[32px]">groups</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-primary mb-2">No employees yet</h3>
          <p className="text-muted-text max-w-md mb-6">
            Invite your employees using a join code or email invitation to track their cybersecurity training progress.
          </p>
          <Link 
            href="/dashboard/team/invite" 
            className="inline-flex items-center gap-2 px-6 h-12 bg-primary-container text-on-primary rounded-lg text-sm font-semibold hover:bg-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            Invite Your First Employee
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-space-xl">
          {employees && employees.length > 0 && (
            <div className="bg-surface rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[56rem]">
                  <thead>
                    <tr className="bg-app-bg">
                      <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider">Employee</th>
                      <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider">Training Progress</th>
                      <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider">Average Score</th>
                      <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider">Status</th>
                      <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-transparent">
                    {employees.map(employee => {
                      const completedCount = employee.user_progress?.filter((p: { status: string }) => p.status === 'completed').length || 0
                      
                      const assessments = employee.assessment_results || []
                      const avgScore = assessments.length > 0 
                        ? Math.round(assessments.reduce((acc: number, curr: { score_percentage: number }) => acc + curr.score_percentage, 0) / assessments.length)
                        : null

                      const needsAttention = completedCount === 0
                      const progressPercentage = Math.round((completedCount / 15) * 100)

                      return (
                        <tr key={employee.id} className="hover:bg-surface-container-low transition-colors group">
                          <td className="py-space-lg px-space-lg">
                            <div className="flex items-center gap-space-md">
                              <div className="relative flex-shrink-0">
                                <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container font-bold text-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                                  {employee.full_name?.charAt(0).toUpperCase() || 'E'}
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success-base shadow-[0_0_0_2px_#ffffff]"></span>
                              </div>
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-space-xs">
                                  <span className="font-body-md-semibold text-body-md-semibold text-primary-container truncate">
                                    {employee.full_name || 'Unnamed Staff'}
                                  </span>
                                </div>
                                <span className="font-body-sm text-body-sm text-muted-text truncate">
                                  Frontline Employee Defender
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-space-lg px-space-lg">
                            <div className="flex flex-col gap-space-xxs w-44">
                              <div className="flex items-center justify-between font-label-sm text-label-sm">
                                <span className="text-primary-container font-body-md-semibold">{progressPercentage}%</span>
                                <span className="text-muted-text">{completedCount}/15 Modules</span>
                              </div>
                              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                                <div className="bg-success-base h-full rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-space-lg px-space-lg">
                            <div className="flex items-center gap-1.5">
                              <span className={`font-body-md-semibold text-body-md-semibold ${avgScore === null ? 'text-muted-text' : avgScore >= 80 ? 'text-success-text' : 'text-warning-text'}`}>
                                {avgScore !== null ? `${avgScore}%` : 'N/A'}
                              </span>
                              {avgScore !== null && avgScore >= 80 && <span className="material-symbols-outlined text-success-base text-[16px]">verified</span>}
                            </div>
                          </td>
                          <td className="py-space-lg px-space-lg">
                            {needsAttention ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-warning-bg text-warning-text font-label-sm text-label-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-warning-base"></span> Action Required
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success-bg text-success-text font-label-sm text-label-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-success-base"></span> Active Learning
                              </span>
                            )}
                          </td>
                          <td className="py-space-lg px-space-lg text-right">
                            <div className="flex items-center justify-end gap-space-sm opacity-0 group-hover:opacity-100 transition-opacity">
                              <Link 
                                href={`/dashboard/team/${employee.id}`} 
                                className="h-9 px-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-primary-container font-label-sm text-label-sm transition-colors flex items-center justify-center"
                              >
                                View Profile
                              </Link>
                              <div className="scale-90 origin-right">
                                <EmployeeRemoveButton employeeId={employee.id} employeeName={employee.full_name || ''} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pending Invites List */}
          {invites && invites.length > 0 && (
            <div className="bg-surface rounded-xl shadow-sm overflow-hidden flex flex-col mt-space-lg">
              <div className="p-space-lg border-b border-border-subtle bg-surface-container-lowest">
                <h2 className="font-headline-sm text-headline-sm text-primary-container">Pending Invitations</h2>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-app-bg">
                      <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider">Email Address</th>
                      <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider">Sent Date</th>
                      <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider">Status</th>
                      <th className="py-space-md px-space-lg font-label-sm text-label-sm text-muted-text uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-transparent">
                    {invites.map(invite => (
                      <tr key={invite.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="py-space-lg px-space-lg">
                          <span className="font-body-md-semibold text-body-md-semibold text-primary-container">
                            {invite.email}
                          </span>
                        </td>
                        <td className="py-space-lg px-space-lg">
                          <span className="font-body-sm text-body-sm text-muted-text">
                            {new Date(invite.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-space-lg px-space-lg">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                            invite.status === 'accepted' ? 'bg-success-bg text-success-text' : 
                            invite.status === 'revoked' ? 'bg-danger-bg text-danger-text' : 
                            'bg-warning-bg text-warning-text'
                          }`}>
                            {invite.status}
                          </span>
                        </td>
                        <td className="py-space-lg px-space-lg text-right">
                          <RevokeInviteButton inviteId={invite.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
