'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, createAdminClient } from '@/utils/supabase/server'

function generateJoinCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient()
  const supabaseAdmin = await createAdminClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const role = formData.get('role') as string
  const fullName = formData.get('full_name') as string || user.user_metadata?.full_name || ''

  if (role === 'business_owner') {
    const businessName = formData.get('business_name') as string
    const businessType = formData.get('business_type') as string
    const location = formData.get('location') as string
    const employeeCount = formData.get('employee_count') as string
    const joinCode = generateJoinCode()

    // Create the business
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .insert({
        name: businessName,
        business_type: businessType,
        location: location,
        employee_count: employeeCount,
        join_code: joinCode,
      })
      .select()
      .single()

    if (businessError) {
      redirect('/onboarding?error=' + encodeURIComponent(businessError.message))
    }

    // Create user profile
    const { error: userError } = await supabaseAdmin
      .from('users')
      .upsert({
        id: user.id,
        role: 'business_owner',
        business_id: business.id,
        full_name: fullName,
        onboarding_complete: true,
      }, { onConflict: 'id' })

    if (userError) {
      redirect('/onboarding?error=' + encodeURIComponent(userError.message))
    }

  } else if (role === 'employee') {
    const rawJoinCode = formData.get('join_code') as string
    const joinCode = (rawJoinCode || '').trim().replace(/\D/g, '').slice(0, 6)

    // Find business by join code using admin client to prevent RLS permission false negatives
    const { data: business, error: lookupError } = await supabaseAdmin
      .from('businesses')
      .select('id, name')
      .eq('join_code', joinCode)
      .single()

    if (lookupError || !business) {
      console.error('[Onboarding] Join code lookup failed:', { joinCode, lookupError, business })
      redirect('/onboarding?error=' + encodeURIComponent('Invalid join code. Please check with your employer.'))
    }

    // Create user profile as employee using admin client
    const { error: userError } = await supabaseAdmin
      .from('users')
      .upsert({
        id: user.id,
        role: 'employee',
        business_id: business.id,
        full_name: fullName,
        onboarding_complete: true,
      }, { onConflict: 'id' })

    if (userError) {
      redirect('/onboarding?error=' + encodeURIComponent(userError.message))
    }

    // If an invite was pending for this employee's email, mark it accepted
    if (user.email) {
      await supabaseAdmin
        .from('employee_invites')
        .update({ status: 'accepted' })
        .eq('business_id', business.id)
        .eq('email', user.email)
    }

  } else if (role === 'sole_entrepreneur') {
    const businessType = formData.get('business_type') as string

    // Create user profile without a business
    const { error: userError } = await supabaseAdmin
      .from('users')
      .upsert({
        id: user.id,
        role: 'sole_entrepreneur',
        full_name: fullName,
        onboarding_complete: true,
      }, { onConflict: 'id' })

    if (userError) {
      redirect('/onboarding?error=' + encodeURIComponent(userError.message))
    }

    // Optionally create a personal business entry for tracking
    if (businessType) {
      const { data: business } = await supabaseAdmin
        .from('businesses')
        .insert({
          name: fullName + "'s Business",
          business_type: businessType,
        })
        .select()
        .single()

      if (business) {
        await supabaseAdmin
          .from('users')
          .update({ business_id: business.id })
          .eq('id', user.id)
      }
    }
  }

  revalidatePath('/', 'layout')
  redirect('/assessment')
}
