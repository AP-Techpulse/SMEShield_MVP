'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function regenerateJoinCode() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: owner } = await supabase
    .from('users')
    .select('role, business_id')
    .eq('id', user.id)
    .single()

  if (!owner || owner.role !== 'business_owner' || !owner.business_id) {
    return { error: 'Unauthorized' }
  }

  // Generate new 6-digit code
  const newCode = Math.floor(100000 + Math.random() * 900000).toString()

  const { error } = await supabase
    .from('businesses')
    .update({ join_code: newCode })
    .eq('id', owner.business_id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/team/invite')
  revalidatePath('/dashboard/settings')
  return { success: true, joinCode: newCode }
}

export async function sendEmployeeInvite(email: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: owner } = await supabase
    .from('users')
    .select('role, business_id, full_name, businesses(name, join_code)')
    .eq('id', user.id)
    .single()

  if (!owner || owner.role !== 'business_owner' || !owner.business_id || !owner.businesses) {
    return { error: 'Unauthorized' }
  }

  const business = Array.isArray(owner.businesses) ? owner.businesses[0] : owner.businesses
  const joinCode = business?.join_code

  if (!joinCode) {
    return { error: 'Business join code missing. Please regenerate it.' }
  }

  // Check if invite already exists
  const { data: existing } = await supabase
    .from('employee_invites')
    .select('id')
    .eq('business_id', owner.business_id)
    .eq('email', email)
    .single()

  if (existing) {
    return { error: 'An invitation has already been sent to this email.' }
  }

  // Insert to DB
  const { error: insertError } = await supabase
    .from('employee_invites')
    .insert({
      business_id: owner.business_id,
      email: email,
      status: 'pending'
    })

  if (insertError) {
    return { error: insertError.message }
  }

  // Send via Brevo
  if (process.env.BREVO_API_KEY) {
    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'SMEShield', email: 'paularuah2024@gmail.com' },
          to: [{ email }],
          subject: `You have been invited to join ${business.name} on SMEShield`,
          htmlContent: `
            <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
              <h2>Join your team on SMEShield</h2>
              <p>${owner.full_name} has invited you to complete cybersecurity training for ${business.name}.</p>
              <p>To join, sign up for an Employee account and enter the following Join Code when prompted:</p>
              <div style="background-color: #f0f3ff; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                ${joinCode}
              </div>
              <p>Go to <a href="https://smeshield.com/onboarding">SMEShield</a> to get started.</p>
            </div>
          `
        })
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error('Brevo error:', errorText)
        
        // Delete the pending invite since it failed to send
        await supabase.from('employee_invites').delete().eq('business_id', owner.business_id).eq('email', email)
        
        return { error: `Failed to send email via Brevo: ${errorText}` }
      }
    } catch (e) {
      console.error('Email send failed:', e)
    }
  } else {
    console.warn('BREVO_API_KEY not found. Email not sent, but invite recorded in DB.')
  }

  revalidatePath('/dashboard/team/invite')
  revalidatePath('/dashboard/team')
  return { success: true }
}

export async function revokeInvite(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: owner } = await supabase
    .from('users')
    .select('role, business_id')
    .eq('id', user.id)
    .single()

  if (!owner || owner.role !== 'business_owner' || !owner.business_id) {
    return { error: 'Unauthorized' }
  }

  // Verify the invite belongs to this business before deleting
  const { error } = await supabase
    .from('employee_invites')
    .delete()
    .eq('id', id)
    .eq('business_id', owner.business_id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/team/invite')
  revalidatePath('/dashboard/team')
  return { success: true }
}
