'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function removeEmployee(employeeId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Ensure caller is a business owner and get their business_id
  const { data: owner } = await supabase
    .from('users')
    .select('role, business_id')
    .eq('id', user.id)
    .single()

  if (!owner || owner.role !== 'business_owner' || !owner.business_id) {
    return { error: 'Unauthorized. Must be a business owner.' }
  }

  // Verify the employee belongs to this business
  const { data: employee, error: empError } = await supabase
    .from('users')
    .select('id, business_id')
    .eq('id', employeeId)
    .single()

  if (empError || !employee || employee.business_id !== owner.business_id) {
    return { error: 'Employee not found or not part of your business.' }
  }

  // Remove the business association
  const { error: updateError } = await supabase
    .from('users')
    .update({ business_id: null })
    .eq('id', employeeId)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/dashboard/team')
  return { success: true }
}
