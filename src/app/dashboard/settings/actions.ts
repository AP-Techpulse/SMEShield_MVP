'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function updateBusinessSettings(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const name = formData.get('name') as string
  const location_state = formData.get('location_state') as string
  const employee_count = formData.get('employee_count') as string
  const business_type = formData.get('business_type') as string

  if (!name) {
    return { error: 'Please provide a business name' }
  }

  const { data: owner } = await supabase
    .from('users')
    .select('role, business_id')
    .eq('id', user.id)
    .single()

  if (!owner || owner.role !== 'business_owner' || !owner.business_id) {
    return { error: 'Unauthorized' }
  }

  // Update business details
  const { error } = await supabase
    .from('businesses')
    .update({ name, location_state, employee_count, business_type })
    .eq('id', owner.business_id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/settings')
  revalidatePath('/dashboard/profile')
  return { success: true }
}
