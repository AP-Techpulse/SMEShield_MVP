import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import QuizEngine from './QuizEngine'
import { LanguageToggle } from '@/components/ui/language-toggle'

interface Props {
  params: Promise<{ id: string }>
}

export default async function QuizPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch module and its quiz question
  const { data: moduleData } = await supabase
    .from('modules')
    .select('id, title_en, title_pcm')
    .eq('id', id)
    .single()

  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('module_id', id)
    .order('created_at', { ascending: true })

  if (!moduleData || !questions || questions.length === 0) {
    redirect('/training')
  }

  return (
    <div className="min-h-screen bg-app-bg flex flex-col">
      <header className="sticky top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(26,43,72,0.04)]">
        <div className="h-16 max-w-[48rem] mx-auto px-4 flex items-center justify-between">
          <Link href={`/training/${id}`} className="w-10 h-10 -ml-2 rounded-lg hover:bg-surface-container flex items-center justify-center transition-colors text-muted-text hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="max-w-[48rem] mx-auto px-4 md:px-8">
          <div className="bg-surface rounded-2xl p-6 md:p-10 shadow-level-1 border border-border-subtle">
            <QuizEngine 
              questions={questions} 
            />
          </div>
        </div>
      </main>
    </div>
  )
}
