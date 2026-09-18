'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function markModuleInProgress(moduleId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Check if progress already exists
  const { data: existing } = await supabase
    .from('user_progress')
    .select('status')
    .eq('user_id', user.id)
    .eq('module_id', moduleId)
    .single()

  // Only insert if it doesn't exist
  if (!existing) {
    await supabase
      .from('user_progress')
      .insert({
        user_id: user.id,
        module_id: moduleId,
        status: 'in_progress',
      })
  }
}

export async function submitModuleQuiz(moduleId: string, passed: boolean, score: number) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const safeScore = Math.min(100, Math.max(0, Math.round(score)))

  // 1. Record the assessment result
  const { error: assessError } = await supabase
    .from('assessment_results')
    .insert({
      user_id: user.id,
      module_id: moduleId,
      score_percentage: safeScore,
      passed: passed
    })

  if (assessError) {
    console.error('Failed to record assessment_result:', assessError)
  }

  // 2. If passed, mark module as completed
  if (passed) {
    // Upsert the user_progress to completed
    const { data: existing } = await supabase
      .from('user_progress')
      .select('id')
      .eq('user_id', user.id)
      .eq('module_id', moduleId)
      .maybeSingle()
      
    if (existing) {
      await supabase
        .from('user_progress')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', existing.id)
    } else {
      await supabase
        .from('user_progress')
        .insert({
          user_id: user.id,
          module_id: moduleId,
          status: 'completed',
          completed_at: new Date().toISOString()
        })
    }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/progress')
  revalidatePath('/training')
}

