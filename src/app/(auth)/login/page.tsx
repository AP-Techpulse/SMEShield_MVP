'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { login } from '@/app/auth/actions'
import { createClient } from '@/utils/supabase/client'
import { Logo } from '@/components/ui/Logo'

function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')
  const { t, language, setLanguage } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)

  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault()
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: 'select_account',
        },
      },
    })
  }

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto my-auto">
      <div className="w-full bg-surface rounded-xl shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] border border-border-subtle/60">
        {/* Left Column: Form Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between p-space-lg md:p-space-xl lg:p-space-2xl bg-surface">
          {/* Top Bar: Brand & Bilingual Language Toggle */}
          <div className="flex items-center justify-between gap-space-sm pb-space-lg">
            <Link href="/" className="flex items-center gap-space-xs">
              <Logo size="md" variant="horizontal" />
            </Link>
            
            {/* Pill Language Toggle */}
            <div aria-label="Language selection" className="inline-flex items-center bg-surface-container-low p-1 rounded-full border border-border-subtle h-touch-target-min" role="group">
              <button 
                className={`px-3 h-full rounded-full text-label-sm font-label-sm transition-all duration-150 flex items-center justify-center ${language === 'en' ? 'bg-primary text-on-primary shadow-sm' : 'text-muted-text hover:text-on-surface'}`} 
                onClick={() => setLanguage('en')} 
                type="button"
                aria-pressed={language === 'en'}
              >
                English
              </button>
              <button 
                className={`px-3 h-full rounded-full text-label-sm font-label-sm transition-all duration-150 flex items-center justify-center ${language === 'pcm' ? 'bg-primary text-on-primary shadow-sm' : 'text-muted-text hover:text-on-surface'}`} 
                onClick={() => setLanguage('pcm')} 
                type="button"
                aria-pressed={language === 'pcm'}
              >
                Pidgin
              </button>
            </div>
          </div>
          
          {/* Main Login Section */}
          <div className="flex flex-col my-auto max-w-md w-full mx-auto py-space-sm">
            <header className="mb-space-lg">
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                {t('Welcome Back to SMEShield', 'Welcome Back to SMEShield')}
              </h1>
              <p className="font-body-md text-body-md text-muted-text mt-space-xxs">
                {t('Access your cybersecurity modules and team compliance records.', 'Check your cyber protection lessons and how your staff dey perform.')}
              </p>
            </header>
            
            {error && (
              <div className="mb-4 p-3 bg-danger-bg rounded-lg flex items-center gap-2 text-sm text-danger-text">
                <span className="material-symbols-outlined text-lg">error</span>
                <span>{error}</span>
              </div>
            )}
            {message && (
              <div className="mb-4 p-3 bg-success-bg rounded-lg flex items-center gap-2 text-sm text-success-text">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                <span>{message}</span>
              </div>
            )}

            <form action={login} className="flex flex-col gap-space-md">
              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-primary" htmlFor="email">
                  {t('Email Address', 'Business Email Address')}
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-muted-text pointer-events-none text-xl">
                    mail
                  </span>
                  <input 
                    autoComplete="email" 
                    className="w-full h-12 pl-11 pr-4 bg-surface text-on-surface placeholder:text-muted-text rounded-lg border border-border-subtle focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition text-body-md" 
                    id="email" 
                    name="email"
                    placeholder={t('e.g. amaka@brightpay.ng', 'e.g. amaka@brightpay.ng')} 
                    required 
                    type="email" 
                  />
                </div>
              </div>
              
              {/* Password Input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-primary" htmlFor="password">
                  {t('Password', 'Your Password')}
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-muted-text pointer-events-none text-xl">
                    lock
                  </span>
                  <input 
                    autoComplete="current-password" 
                    className="w-full h-12 pl-11 pr-12 bg-surface text-on-surface placeholder:text-muted-text rounded-lg border border-border-subtle focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition text-body-md" 
                    id="password" 
                    name="password"
                    placeholder={t('Enter your password', 'Put your password here')} 
                    required 
                    type={showPassword ? 'text' : 'password'} 
                  />
                  <button 
                    aria-label="Toggle password visibility" 
                    className="absolute right-2 w-10 h-10 flex items-center justify-center text-muted-text hover:text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" 
                    onClick={() => setShowPassword(!showPassword)} 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Utilities Row: Remember me + Forgot Password */}
              <div className="flex items-center justify-between gap-space-xs pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input className="w-4 h-4 rounded border-border-subtle text-primary focus:ring-secondary/30 accent-primary" type="checkbox" />
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {t('Remember me', 'Keep me signed in')}
                  </span>
                </label>
                <Link className="font-label-md text-label-md text-secondary hover:underline focus:outline-none focus:ring-2 focus:ring-secondary/20 rounded" href="/forgot-password">
                  {t('Forgot Password?', 'You forget password?')}
                </Link>
              </div>
              
              {/* Primary Submit Action */}
              <button 
                className="w-full h-12 mt-2 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary active:bg-primary transition shadow-sm flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-secondary" 
                type="submit"
              >
                <span>{t('Log In', 'Enter Dashboard')}</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </form>
            
            {/* Or Continue With Divider */}
            <div className="relative flex py-space-md items-center">
              <div className="flex-grow border-t border-border-subtle"></div>
              <span className="flex-shrink mx-4 font-label-sm text-label-sm text-muted-text uppercase tracking-wider">
                {t('or continue with', 'abi use this one')}
              </span>
              <div className="flex-grow border-t border-border-subtle"></div>
            </div>
            
            {/* OAuth Action: Google Sign-in */}
            <button 
              onClick={handleGoogleSignIn}
              className="w-full h-12 bg-surface hover:bg-surface-container-low text-on-surface border border-border-subtle rounded-lg font-label-md text-label-md flex items-center justify-center gap-3 transition focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm" 
              type="button"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" fill="#4285F4"></path>
                <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
                <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z" fill="#FBBC05"></path>
                <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
              </svg>
              <span>{t('Continue with Google', 'Continue with Google')}</span>
            </button>
            
            {/* Employee Quick Join Prompt */}
            <div className="mt-space-md p-space-sm bg-info-bg rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-info-text text-xl shrink-0">pin</span>
                <p className="font-body-sm text-body-sm text-on-surface truncate">
                  {t('Received a 6-digit code from your employer?', 'Your oga send you 6-digit staff code?')}
                </p>
              </div>
              <Link className="font-label-sm text-label-sm text-info-text hover:underline whitespace-nowrap" href="/signup?mode=employee">
                {t('Sign up as employee', 'Register as staff')}
              </Link>
            </div>
          </div>
          
          {/* Left Column Bottom Links */}
          <div className="pt-space-md flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle/80">
            <p className="font-body-sm text-body-sm text-muted-text">
              <span>{t("Don't have an account?", "You never register before?")}</span>
              <Link className="font-label-md text-label-md text-secondary hover:underline ml-1" href="/signup">
                {t('Sign Up', 'Open Account')}
              </Link>
            </p>
            <span className="font-label-sm text-[11px] text-muted-text flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-success-base">verified_user</span>
              Tier-1 Bank Grade Security
            </span>
          </div>
        </div>
        
        {/* Right Column: Editorial Brand Panel */}
        <div className="hidden lg:flex lg:col-span-6 relative bg-primary-container overflow-hidden flex-col justify-between p-space-2xl text-on-primary">
          {/* Background Image with High Contrast Gradient */}
          <div 
            aria-hidden="true" 
            className="absolute inset-0 w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('/assets/smeshield/auth/auth-login-hero.jpg')" }}
          ></div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/85 to-primary-container/70"></div>
          
          {/* Top Badge / Header inside Brand Panel */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-on-primary border border-white/15 shadow-xs">
              <span className="material-symbols-outlined text-base text-warning-base">shield</span>
              <span className="font-label-sm text-label-sm tracking-wide font-medium">SMEShield Enterprise Portal</span>
            </div>
            {/* NDPA 2023 Compliance Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success-bg text-success-text shadow-xs border border-success-base/20">
              <span className="material-symbols-outlined text-sm text-success-base">verified</span>
              <span className="font-label-sm text-label-sm font-semibold">NDPA 2023 Compliant</span>
            </div>
          </div>
          
          {/* Central Editorial Protection Card */}
          <div className="relative z-10 my-auto py-space-xl">
            <div className="bg-primary-container/90 backdrop-blur-md p-space-xl rounded-xl border border-white/15 shadow-2xl max-w-lg">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest/15 flex items-center justify-center text-on-primary mb-space-md">
                <span className="material-symbols-outlined text-2xl text-warning-base">security</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg leading-snug text-on-primary mb-space-sm">
                {t(
                  "“Protection Without Fear: Equipping Nigerian frontline businesses against daily digital threats.”",
                  "“Protection Weh No Dey Cause Panic: Helping every Nigerian business dey safe from digital thief.”"
                )}
              </h2>
              <p className="font-body-md text-body-md text-surface-container-high leading-relaxed mb-space-lg">
                {t(
                  "Practical defense guides, automated staff risk assessments, and zero-panic incident support designed specifically for local trade, POS, and digital commerce.",
                  "Clear steps weh simple to follow, staff security checks, and fast help when wahala happen for POS and bank transfers."
                )}
              </p>
              <div className="pt-space-md border-t border-white/15 flex items-center gap-3">
                <div className="flex -space-x-2 shrink-0">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-on-secondary font-label-sm text-xs ring-2 ring-primary-container">LA</span>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-tertiary-container text-tertiary-fixed font-label-sm text-xs ring-2 ring-primary-container">KN</span>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-high text-primary-container font-label-sm text-xs ring-2 ring-primary-container">PH</span>
                </div>
                <p className="font-body-sm text-body-sm text-surface-container-high leading-tight">
                  {t(
                    "Trusted by retail, POS, and trade enterprises across Lagos, Kano, and Port Harcourt.",
                    "Retail, POS, and market traders for Lagos, Kano, and Port Harcourt dey trust am."
                  )}
                </p>
              </div>
            </div>
          </div>
          
          {/* Panel Footer Footnote */}
          <div className="relative z-10 flex items-center justify-between text-xs text-surface-container-high font-body-sm">
            <span>© 2026 SMEShield Nigeria. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-on-primary transition">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-on-primary transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-text">Loading...</div></div>}>
      <LoginForm />
    </Suspense>
  )
}
