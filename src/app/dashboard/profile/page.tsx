import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { ProfileForm } from './ProfileForm'
import Link from 'next/link'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('full_name, role, preferred_language, business_id')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')

  let businessData: {
    name: string
    location_state?: string
    employee_count?: string
    business_type?: string
  } | null = null

  if (profile.role === 'business_owner' && profile.business_id) {
    const { data: b } = await supabase
      .from('businesses')
      .select('name, location_state, employee_count, business_type')
      .eq('id', profile.business_id)
      .maybeSingle()

    if (b) {
      businessData = b
    }
  }

  return (
    <div className="w-full pt-20 bg-app-bg min-h-screen">
      <div className="max-w-container-max mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col w-full gap-space-xl">
          {/* Breadcrumb & Header */}
          <div className="flex flex-col gap-2 pb-4 border-b border-border-subtle">
            <nav className="flex items-center gap-2 text-sm text-muted-text">
              <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary font-semibold">Profile & Settings</span>
            </nav>
            <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">
              Profile & Account Settings
            </h1>
            <p className="text-base text-muted-text">
              Manage your personal details, preferred dialect, account security, and business information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
            {/* Main Form (Personal Profile + Business Settings if Owner + Security) */}
            <div className="lg:col-span-8 flex flex-col gap-space-xl">
              <ProfileForm 
                initialName={profile?.full_name || ''} 
                email={user.email || ''} 
                role={profile?.role || ''} 
                preferredLanguage={profile?.preferred_language || 'en'}
                userId={user.id}
                business={businessData}
              />
            </div>

            {/* Sidebar Cards */}
            <div className="lg:col-span-4 flex flex-col gap-space-lg">
              <div className="bg-surface rounded-xl p-space-lg shadow-sm border border-border-subtle/60">
                <div className="w-10 h-10 rounded-full bg-info-bg text-info-text flex items-center justify-center mb-space-sm">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <h3 className="font-label-lg text-label-lg text-primary mb-space-xs font-semibold">Personal Identification</h3>
                <p className="font-body-sm text-body-sm text-muted-text">
                  Your full name is used to identify your completed training milestones and individual progress records.
                </p>
              </div>

              <div className="bg-surface rounded-xl p-space-lg shadow-sm border border-border-subtle/60">
                <div className="w-10 h-10 rounded-full bg-success-bg text-success-text flex items-center justify-center mb-space-sm">
                  <span className="material-symbols-outlined text-[20px]">shield</span>
                </div>
                <h3 className="font-label-lg text-label-lg text-primary mb-space-xs font-semibold">Account Security</h3>
                <p className="font-body-sm text-body-sm text-muted-text">
                  Your password protects your access. For security, never share your login credentials with colleagues or customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
