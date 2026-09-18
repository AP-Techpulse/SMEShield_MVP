import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get user profile to determine role
  const { data: profile } = await supabase
    .from('users')
    .select('role, onboarding_complete, full_name')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.onboarding_complete) {
    redirect('/onboarding')
  }

  // Strict role verification based on Phase A requirement
  const userRole = profile?.role as "business_owner" | "employee" | "sole_entrepreneur" | null
  
  return (
    <LanguageProvider>
      <AuthenticatedLayout userRole={userRole} userName={profile?.full_name} avatarUrl={null}>
        {children}
      </AuthenticatedLayout>
    </LanguageProvider>
  )
}
