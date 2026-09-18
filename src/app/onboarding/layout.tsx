import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('onboarding_complete')
      .eq('id', user.id)
      .single()

    if (profile?.onboarding_complete) {
      redirect('/dashboard')
    }
  }

  return (
    <LanguageProvider>
      <div className="bg-app-bg min-h-screen">
        {children}
      </div>
    </LanguageProvider>
  )
}
