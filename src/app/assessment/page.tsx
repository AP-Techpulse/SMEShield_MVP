import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { fetchBaselineQuestions } from './actions'
import AssessmentEngine from './AssessmentEngine'

export default async function AssessmentPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user profile exists (must have completed onboarding)
  const { data: profile } = await supabase
    .from('users')
    .select('id, onboarding_complete')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/onboarding')
  }

  const questions = await fetchBaselineQuestions()

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-lg bg-surface rounded-xl p-12 shadow-level-2 text-center">
          <div className="w-16 h-16 rounded-xl bg-warning-bg flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-warning-base text-4xl">quiz</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-primary mb-2">No Questions Available</h1>
          <p className="text-base text-muted-text">The assessment questions have not been set up yet. Please contact your administrator.</p>
        </div>
      </div>
    )
  }

  return <AssessmentEngine questions={questions} />
}
