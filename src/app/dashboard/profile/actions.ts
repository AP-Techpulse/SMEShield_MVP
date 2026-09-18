'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const fullName = formData.get('fullName') as string
  const password = formData.get('password') as string
  const avatarUrl = formData.get('avatarUrl') as string
  const preferredLanguage = formData.get('preferredLanguage') as string

  const updates: Record<string, string> = {}
  if (fullName) updates.full_name = fullName
  if (avatarUrl) updates.avatar_url = avatarUrl
  if (preferredLanguage) updates.preferred_language = preferredLanguage

  if (Object.keys(updates).length > 0) {
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)

    if (error) {
      return { error: error.message }
    }
    
    // Also update in auth metadata
    const metadataUpdates: Record<string, string> = {}
    if (fullName) metadataUpdates.full_name = fullName
    await supabase.auth.updateUser({ data: metadataUpdates })
  }

  if (password) {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      return { error: error.message }
    }
  }

  revalidatePath('/dashboard/profile')
  revalidatePath('/', 'layout')
  
  return { success: true }
}
