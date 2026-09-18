'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export interface BaselineQuestion {
  id: string
  order_index: number
  category: string
  question_en: string
  question_pcm: string
  options_en: string[]
  options_pcm: string[]
  correct_option_index: number
  explanation_en: string | null
  explanation_pcm: string | null
}

export async function fetchBaselineQuestions(): Promise<BaselineQuestion[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('baseline_questions')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    throw new Error('Failed to load assessment questions: ' + error.message)
  }

  return data as BaselineQuestion[]
}

export async function submitAssessment(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const answersRaw = formData.get('answers') as string
  const questionsRaw = formData.get('questions') as string

  if (!answersRaw || !questionsRaw) {
    redirect('/assessment?error=' + encodeURIComponent('Missing assessment data.'))
  }

  const answers: number[] = JSON.parse(answersRaw)
  const questions: BaselineQuestion[] = JSON.parse(questionsRaw)

  const totalQuestions = questions.length
  let totalCorrect = 0
  const weakAreas: string[] = []
  const answerDetails: Array<{
    question_id: string
    category: string
    selected: number
    correct: number
    is_correct: boolean
  }> = []

  questions.forEach((q, i) => {
    const isCorrect = answers[i] === q.correct_option_index
    if (isCorrect) {
      totalCorrect++
    } else {
      if (!weakAreas.includes(q.category)) {
        weakAreas.push(q.category)
      }
    }
    answerDetails.push({
      question_id: q.id,
      category: q.category,
      selected: answers[i],
      correct: q.correct_option_index,
      is_correct: isCorrect,
    })
  })

  const scorePercentage = Math.round((totalCorrect / totalQuestions) * 100)

  const { data: result, error } = await supabase
    .from('baseline_results')
    .insert({
      user_id: user.id,
      score_percentage: scorePercentage,
      total_correct: totalCorrect,
      total_questions: totalQuestions,
      weak_areas: weakAreas,
      answers: answerDetails,
    })
    .select()
    .single()

  if (error) {
    redirect('/assessment?error=' + encodeURIComponent('Failed to save results: ' + error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/assessment/results?id=' + result.id)
}
