import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default async function AssessmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    const { data: assessment } = await supabase
      .from('baseline_results')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (assessment) {
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
