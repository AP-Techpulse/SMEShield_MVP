'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { forgotPassword } from '@/app/auth/actions'

function ForgotPasswordForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')
  const { t, language, setLanguage } = useLanguage()

  // If a success message is passed from the server action, we show it,
  // otherwise we show the form.
  const isSuccess = !!message

  return (
    <div className="relative w-full max-w-xl mx-auto py-space-xl flex flex-col items-center">
      {/* Top Bar: Logo & Language Toggle */}
      <div className="w-full flex items-center justify-between px-space-xs mb-space-lg">
        <Link href="/" className="flex items-center gap-space-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="SMEShield Logo" className="h-10 w-auto object-contain" src="/assets/smeshield/icons/logo.svg" />
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
        
        {isSuccess ? (
          /* Feedback Success State */
          <div className="flex flex-col items-center text-center py-space-md">
            <div className="w-14 h-14 rounded-full bg-success-bg text-success-base flex items-center justify-center mb-space-md">
              <span className="material-symbols-outlined text-3xl">mark_email_read</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-primary mb-space-xs">
              {t('Reset Link Sent', 'Link Don Dey Road')}
            </h2>
            <p className="font-body-md text-body-md text-muted-text max-w-sm mb-space-lg">
              {message}
            </p>
            <Link 
              href="/forgot-password" 
              className="px-space-lg py-2.5 bg-surface text-primary border border-border-subtle hover:bg-surface-container-low font-body-md-semibold text-body-md rounded-lg transition-colors inline-block"
            >
              Resend or use another email
            </Link>
          </div>
        ) : (
          <>
            {/* Header & Icon Badge */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-info-bg flex items-center justify-center text-secondary mb-space-md shadow-sm">
                <span className="material-symbols-outlined text-3xl">key_vertical</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mb-space-xs">
                {t('Reset Your Password', 'Change Your Password')}
              </h1>
              <p className="font-body-md text-body-md text-muted-text max-w-md">
                {t(
                  "Enter the email address registered with your SMEShield organization or personal account. We will send you a secure verification link.",
                  "Put the email address wey you use register your SMEShield company or personal account. We go send you secure link sharp-sharp."
                )}
              </p>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-danger-bg rounded-lg flex items-center gap-2 text-sm text-danger-text">
                <span className="material-symbols-outlined text-lg">error</span>
                <span>{error}</span>
              </div>
            )}
            
            {/* Recovery Form */}
            <form action={forgotPassword} className="mt-space-xl flex flex-col gap-space-lg">
              {/* Input Group */}
              <div className="flex flex-col gap-space-xxs">
                <label className="font-label-md text-label-md text-on-surface flex items-center justify-between" htmlFor="email">
                  <span>{t('Work or Personal Email', 'Office or Personal Email')}</span>
                  <span className="text-label-sm font-label-sm text-muted-text font-normal">Registered address</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-xl">alternate_email</span>
                  </div>
                  <input 
                    autoComplete="email" 
                    className="w-full pl-11 pr-4 py-3 bg-surface text-on-surface font-body-md text-body-md rounded-lg border border-border-subtle transition-all duration-150 placeholder:text-outline-variant focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20" 
                    id="email" 
                    name="email"
                    placeholder="e.g. amaka@brightpay.ng" 
                    required 
                    type="email" 
                  />
                </div>
                {/* Instruction helper note */}
                <div className="flex items-start gap-2 mt-1.5 p-space-sm rounded-lg bg-surface-container-low text-on-surface-variant text-body-sm font-body-sm">
                  <span className="material-symbols-outlined text-base text-secondary mt-0.5 shrink-0">info</span>
                  <span>{t('For employees enrolled via 6-digit business codes, use the email provided during signup.', 'For staff wey register through 6-digit business code, use the exact email address wey you take register.')}</span>
                </div>
              </div>
              
              {/* Primary Action CTA */}
              <div className="flex flex-col gap-space-md pt-space-xs">
                <button 
                  className="w-full min-h-[48px] px-space-lg py-3.5 bg-primary-container text-on-primary hover:bg-primary font-body-md-semibold text-body-md-semibold rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-space-xs active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary" 
                  type="submit"
                >
                  <span>{t('Send Reset Link', 'Send Me Reset Link')}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
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
          </>
        )}
      </div>
      
      {/* Security & Institutional Trust Footer */}
      <div className="w-full max-w-md text-center mt-space-lg flex flex-col items-center gap-space-xxs">
        <div className="flex items-center justify-center gap-1.5 text-muted-text text-body-sm font-body-sm">
          <span className="material-symbols-outlined text-base text-success-base">verified_user</span>
          <span>Secured by Nigerian Banking & SME Data Protocols</span>
        </div>
        <p className="text-body-sm font-body-sm text-muted-text">
          {t('Need assistance? Reach out to our Lagos / Abraka support team or contact your business owner.', 'You need help? Holla our Lagos / Abraka support people or contact your business oga.')}
        </p>
      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-text">Loading...</div></div>}>
      <ForgotPasswordForm />
    </Suspense>
  )
}
