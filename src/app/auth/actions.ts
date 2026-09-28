'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const headerList = await headers()
  const host = headerList.get('x-forwarded-host') || headerList.get('host') || 'sme-shield-mvp.vercel.app'
  const proto = headerList.get('x-forwarded-proto') || (process.env.NODE_ENV === 'development' ? 'http' : 'https')
  const currentOrigin = `${proto}://${host}`
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || currentOrigin

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('full_name') as string,
      },
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/signup?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')

  // If session is immediately established (e.g., email confirmation off), proceed directly to onboarding
  if (authData?.session) {
    redirect('/onboarding')
  }

  redirect('/signup?message=Check your email to confirm your account')
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient()
  const headerList = await headers()
  const host = headerList.get('x-forwarded-host') || headerList.get('host') || 'sme-shield-mvp.vercel.app'
  const proto = headerList.get('x-forwarded-proto') || (process.env.NODE_ENV === 'development' ? 'http' : 'https')
  const currentOrigin = `${proto}://${host}`
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || currentOrigin

  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/reset-password`,
  })

  if (error) {
    redirect('/forgot-password?error=' + encodeURIComponent(error.message))
  }

  redirect('/forgot-password?message=Check your email for a password reset link')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const password = formData.get('password') as string

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    redirect('/reset-password?error=' + encodeURIComponent(error.message))
  }

  redirect('/login?message=Password updated successfully. Please log in.')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
