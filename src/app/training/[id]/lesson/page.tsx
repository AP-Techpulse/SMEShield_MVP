import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import LessonViewer from '../LessonViewer'

interface Props {
  params: Promise<{ id: string }>
}

export default async function LessonPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: moduleData, error } = await supabase
    .from('modules')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !moduleData) {
    redirect('/training')
  }

  return <LessonViewer moduleData={moduleData} />
}
