import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { InviteClient } from './InviteClient'
import { RevokeInviteButton } from './RevokeInviteButton'

export default async function InvitePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: owner } = await supabase
    .from('users')
    .select('role, business_id, businesses(name, join_code)')
    .eq('id', user.id)
    .single()

  if (!owner || owner.role !== 'business_owner' || !owner.business_id || !owner.businesses) {
    redirect('/dashboard') // Unauthorized
  }

  const business = Array.isArray(owner.businesses) ? owner.businesses[0] : owner.businesses
  const joinCode = business?.join_code

  if (!joinCode) {
    // Edge case if join code is missing
    return (
      <div className="max-w-[75rem] mx-auto w-full">
        <div className="p-4 bg-warning-bg text-warning-text rounded-lg">
          Join code missing for this business. Please contact support.
        </div>
      </div>
    )
  }

  // Fetch past invites
  const { data: invites } = await supabase
    .from('employee_invites')
    .select('*')
    .eq('business_id', owner.business_id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-[75rem] mx-auto w-full">
      <div className="mb-6">
        <Link href="/dashboard/team" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-text hover:text-primary transition-colors mb-4">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Team
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-1">Invite Employee</h1>
        <p className="text-muted-text">Add team members to {business.name} to track their training progress.</p>
      </div>

      <InviteClient initialJoinCode={joinCode} />

      {/* Invitation History */}
      {invites && invites.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-muted-text">history</span>
            Invitation History
          </h2>
          
          <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden shadow-level-1 hidden md:block">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-border-subtle text-xs uppercase font-semibold text-muted-text tracking-wider">
                  <th className="px-5 py-3">Email Address</th>
                  <th className="px-5 py-3">Sent Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invites.map(invite => (
                  <tr key={invite.id} className="border-b border-border-subtle last:border-b-0 hover:bg-surface-bright transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-primary">{invite.email}</td>
                    <td className="px-5 py-4 text-sm text-muted-text">{new Date(invite.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        invite.status === 'accepted' ? 'bg-success-bg text-success-text' : 
                        invite.status === 'revoked' ? 'bg-danger-bg text-danger-text' : 
                        'bg-warning-bg text-warning-text'
                      }`}>
                        {invite.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <RevokeInviteButton inviteId={invite.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Invites View */}
          <div className="md:hidden grid grid-cols-1 gap-3">
            {invites.map(invite => (
              <div key={invite.id} className="bg-surface border border-border-subtle rounded-xl p-4 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary break-all pr-4">{invite.email}</span>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                    invite.status === 'accepted' ? 'bg-success-bg text-success-text' : 
                    invite.status === 'revoked' ? 'bg-danger-bg text-danger-text' : 
                    'bg-warning-bg text-warning-text'
                  }`}>
                    {invite.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-text">
                  <span>Sent: {new Date(invite.created_at).toLocaleDateString()}</span>
                  <RevokeInviteButton inviteId={invite.id} />
                </div>
              </div>
            ))}
          </div>

        </section>
      )}

    </div>
  )
}
