'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { resetPassword } from '@/app/auth/actions'
import { Logo } from '@/components/ui/Logo'

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { t, language, setLanguage } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState('')

  const calculateStrength = (pwd: string) => {
    let score = 0
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd) || pwd.length >= 12) score++
    return score
  }
  
  const score = calculateStrength(password)
  
  const getStrengthLabel = () => {
    if (password.length === 0) return { text: "Level: Empty", color: "text-muted-text" }
    if (score <= 1) return { text: "Weak — Add mixed case & numbers", color: "text-warning-text" }
    if (score === 2) return { text: "Moderate — Add symbols or length", color: "text-warning-text" }
    if (score === 3) return { text: "Good — Meets standard", color: "text-secondary" }
    return { text: "Strong Human Firewall", color: "text-success-text" }
  }
  
  const getBarClass = (index: number) => {
    if (password.length === 0) return "bg-surface-variant"
    if (score <= 1) return index === 0 ? "bg-warning-base" : "bg-surface-variant"
    if (score === 2) return index <= 1 ? "bg-warning-base" : "bg-surface-variant"
    if (score === 3) return index <= 2 ? "bg-secondary-container" : "bg-surface-variant"
    return "bg-success-base"
  }

  return (
    <div className="relative w-full max-w-xl mx-auto py-space-xl flex flex-col items-center">
      {/* Top Bar: Logo & Language Toggle */}
      <div className="w-full flex items-center justify-between px-space-xs mb-space-lg">
        <Link href="/" className="flex items-center gap-space-xs">
          <Logo size="md" variant="horizontal" />
        </Link>
        {/* Language Toggle Pill */}
        <div aria-label="Language selection" className="flex items-center p-1 rounded-full bg-surface shadow-sm border border-border-subtle" role="radiogroup">
          <button 
            role="radio"
            aria-checked={language === 'en'} 
            className={`px-space-md py-1.5 rounded-full text-label-sm font-label-sm transition-all duration-150 ${language === 'en' ? 'bg-primary text-on-primary shadow-sm' : 'text-muted-text hover:text-on-surface'}`} 
            onClick={() => setLanguage('en')} 
            type="button"
          >
            English
          </button>
          <button 
            role="radio"
            aria-checked={language === 'pcm'} 
            className={`px-space-md py-1.5 rounded-full text-label-sm font-label-sm transition-all duration-150 ${language === 'pcm' ? 'bg-primary text-on-primary shadow-sm' : 'text-muted-text hover:text-on-surface'}`} 
            onClick={() => setLanguage('pcm')} 
            type="button"
          >
            Pidgin
          </button>
        </div>
      </div>
      
      {/* Main Recovery Card */}
      <div className="w-full bg-surface rounded-xl p-space-xl md:p-space-2xl shadow-sm border border-border-subtle relative overflow-hidden">
        {/* Subtle Brand Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-secondary-container"></div>
        
        {/* Header & Icon Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-info-bg flex items-center justify-center text-secondary mb-space-md shadow-sm">
            <span className="material-symbols-outlined text-3xl">key</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mb-space-xs">
            {t('Set New Password', 'Change Your Password')}
          </h1>
          <p className="font-body-md text-body-md text-muted-text max-w-md">
            {t(
              "Choose a strong, unique password for your account. Make sure it's something you can remember.",
              "Choose strong password for your account. Make sure say na wetin you go remember."
            )}
          </p>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-danger-bg rounded-lg flex items-center gap-2 text-sm text-danger-text">
            <span className="material-symbols-outlined text-lg">error</span>
            <span>{error}</span>
          </div>
        )}
        
        {/* Reset Form */}
        <form action={resetPassword} className="mt-space-xl flex flex-col gap-space-md">
          {/* New Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-label-md text-label-md text-primary" htmlFor="password">
                {t('New Password', 'New Strong Password')}
              </label>
              <span className="font-label-sm text-label-sm text-muted-text">
                Requires 8+ chars
              </span>
            </div>
            <div className="relative">
              <input 
                className="w-full h-touch-target-min px-4 pr-11 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:bg-surface focus:outline-none shadow-sm transition-colors border border-transparent focus:border-border-subtle" 
                id="password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('At least 8 characters, letters & numbers', 'At least 8 characters, letters & numbers')} 
                required 
                minLength={8}
                type={showPassword ? 'text' : 'password'} 
              />
              <button 
                aria-label="Toggle password view" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-primary transition-colors" 
                onClick={() => setShowPassword(!showPassword)} 
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {/* Interactive Dynamic Strength Indicators */}
            <div className="mt-2 space-y-1.5">
              <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                <div className={`rounded-full transition-colors duration-200 ${getBarClass(0)}`}></div>
                <div className={`rounded-full transition-colors duration-200 ${getBarClass(1)}`}></div>
                <div className={`rounded-full transition-colors duration-200 ${getBarClass(2)}`}></div>
                <div className={`rounded-full transition-colors duration-200 ${getBarClass(3)}`}></div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-label-sm text-[11px] font-semibold uppercase tracking-wider ${getStrengthLabel().color}`}>
                  {getStrengthLabel().text}
                </span>
              </div>
            </div>
          </div>
          
          {/* Confirm Password */}
          <div>
            <label className="block font-label-md text-label-md text-primary mb-1.5" htmlFor="confirm_password">
              {t('Confirm New Password', 'Confirm Your Password')}
            </label>
            <div className="relative">
              <input 
                className="w-full h-touch-target-min px-4 pr-11 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:bg-surface focus:outline-none shadow-sm transition-colors border border-transparent focus:border-border-subtle" 
                id="confirm_password" 
                name="confirm_password"
                placeholder={t('Re-enter your new password', 'Type your new password again')} 
                required 
                type={showConfirm ? 'text' : 'password'} 
              />
              <button 
                aria-label="Toggle confirm password view" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-primary transition-colors" 
                onClick={() => setShowConfirm(!showConfirm)} 
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showConfirm ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>
          
          {/* Primary Action CTA */}
          <div className="flex flex-col gap-space-md pt-space-xs mt-2">
            <button 
              className="w-full min-h-[48px] px-space-lg py-3.5 bg-primary-container text-on-primary hover:bg-primary font-body-md-semibold text-body-md-semibold rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-space-xs active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary" 
              type="submit"
            >
              <span>{t('Update Password', 'Update Password')}</span>
              <span className="material-symbols-outlined text-lg">check</span>
            </button>
            {/* Back Navigation */}
            <div className="text-center">
              <Link className="inline-flex items-center gap-1.5 text-secondary hover:text-primary transition-colors font-body-md-semibold text-body-md-semibold focus:outline-none" href="/login">
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                <span>{t('Back to Log In', 'Go Back To Log In')}</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
      
      {/* Security & Institutional Trust Footer */}
      <div className="w-full max-w-md text-center mt-space-lg flex flex-col items-center gap-space-xxs">
        <div className="flex items-center justify-center gap-1.5 text-muted-text text-body-sm font-body-sm">
          <span className="material-symbols-outlined text-base text-success-base">verified_user</span>
          <span>Secured by Nigerian Banking & SME Data Protocols</span>
        </div>
        <p className="text-body-sm font-body-sm text-muted-text">
          {t('Need assistance? Reach out to our Lagos / Abraka support team.', 'You need help? Holla our Lagos / Abraka support people.')}
        </p>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-text">Loading...</div></div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
