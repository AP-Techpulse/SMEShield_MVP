import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout'

export default async function TrainingLayout({
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
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  const userRole = profile?.role as "business_owner" | "employee" | "sole_entrepreneur" | null

  return (
    <LanguageProvider>
      <AuthenticatedLayout userRole={userRole} userName={profile?.full_name}>
        {children}
      </AuthenticatedLayout>
    </LanguageProvider>
  )
}
