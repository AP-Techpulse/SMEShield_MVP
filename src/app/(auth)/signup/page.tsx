'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { signup } from '@/app/auth/actions'
import { createClient } from '@/utils/supabase/client'
import { Logo } from '@/components/ui/Logo'

function SignUpForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')
  const { t, language, setLanguage } = useLanguage()
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [preferredLang, setPreferredLang] = useState('en')
  
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
    <div className="w-full bg-surface rounded-xl shadow-xl overflow-hidden my-space-sm border border-border-subtle/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[760px]">
        {/* Left Column: Registration Form Panel */}
        <div className="lg:col-span-7 p-space-lg lg:p-space-2xl flex flex-col justify-between bg-surface">
          <div>
            {/* Header Bar */}
            <div className="flex items-center justify-between gap-space-md mb-space-xl">
              <Link href="/" className="flex items-center gap-space-xs">
                <Logo size="md" variant="horizontal" />
              </Link>
              
              {/* Language Pill Toggle */}
              <div aria-label="Interface Language Toggle" className="bg-surface-container p-1 rounded-full flex items-center shadow-inner" role="group">
                <button 
                  onClick={() => setLanguage('en')} 
                  className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all duration-150 ${language === 'en' ? 'bg-primary-container text-on-primary shadow-sm' : 'text-muted-text hover:text-on-surface'}`} 
                  type="button"
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('pcm')} 
                  className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-all duration-150 ${language === 'pcm' ? 'bg-primary-container text-on-primary shadow-sm' : 'text-muted-text hover:text-on-surface'}`} 
                  type="button"
                >
                  Pidgin
                </button>
              </div>
            </div>
            
            {/* Page Title & Reassurance Subtitle */}
            <div className="mb-space-lg">
              <h1 className="font-headline-xl text-headline-xl text-primary mb-2">
                {t('Create Your SMEShield Account', 'Open Your SMEShield Account Today')}
              </h1>
              <p className="font-body-md text-body-md text-muted-text">
                {t('Join thousands of Nigerian SMEs building their human firewall with confidence.', 'Join plenti Nigerian business owners wey dey secure their daily work and money.')}
              </p>
            </div>
            
            {error && (
              <div className="mb-space-md p-space-sm bg-danger-bg rounded-lg flex items-center gap-2 text-sm text-danger-text">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{error}</span>
              </div>
            )}
            {message && (
              <div className="mb-space-md p-space-sm bg-success-bg rounded-lg flex items-center gap-2 text-sm text-success-text">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>{message}</span>
              </div>
            )}

            {/* Registration Form */}
            <form action={signup} className="space-y-space-md">
              {/* Full Name */}
              <div>
                <label className="block font-label-md text-label-md text-primary mb-1.5" htmlFor="full_name">
                  {t('Full Name', 'Your Full Name')}
                </label>
                <div className="relative">
                  <input 
                    className="w-full h-touch-target-min px-4 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:bg-surface focus:outline-none shadow-sm transition-colors border border-transparent focus:border-border-subtle" 
                    id="full_name" 
                    name="full_name" 
                    placeholder={t('e.g. Amaka Okafor', 'e.g. Amaka Okafor')} 
                    required 
                    type="text" 
                  />
                </div>
              </div>
              
              {/* Work Email */}
              <div>
                <label className="block font-label-md text-label-md text-primary mb-1.5" htmlFor="email">
                  {t('Work Email Address', 'Your Work Email')}
                </label>
                <div className="relative">
                  <input 
                    className="w-full h-touch-target-min px-4 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:bg-surface focus:outline-none shadow-sm transition-colors border border-transparent focus:border-border-subtle" 
                    id="email" 
                    name="email" 
                    placeholder={t('e.g. amaka@brightpay.ng', 'e.g. amaka@brightpay.ng')} 
                    required 
                    type="email" 
                  />
                </div>
              </div>
              
              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-label-md text-label-md text-primary" htmlFor="password">
                    {t('Create Password', 'Set Strong Password')}
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
                <label className="block font-label-md text-label-md text-primary mb-1.5" htmlFor="confirmPassword">
                  {t('Confirm Password', 'Confirm Your Password')}
                </label>
                <div className="relative">
                  <input 
                    className="w-full h-touch-target-min px-4 pr-11 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:bg-surface focus:outline-none shadow-sm transition-colors border border-transparent focus:border-border-subtle" 
                    id="confirmPassword" 
                    name="confirmPassword"
                    placeholder={t('Re-enter your password', 'Re-enter your password')} 
                    required 
                    type={showConfirmPassword ? 'text' : 'password'} 
                  />
                  <button 
                    aria-label="Toggle confirm password view" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-primary transition-colors" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirmPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Preferred Training Language Segmented Choice */}
              <div>
                <label className="block font-label-md text-label-md text-primary mb-2">
                  {t('Preferred Training Language', 'Language We Go Dey Teach You')}
                </label>
                <div className="grid grid-cols-2 gap-space-sm">
                  <label className="cursor-pointer">
                    <input 
                      className="peer sr-only" 
                      name="preferred_language" 
                      type="radio" 
                      value="en"
                      checked={preferredLang === 'en'}
                      onChange={() => setPreferredLang('en')}
                    />
                    <div className="p-3 bg-surface-container-low rounded-lg peer-checked:bg-info-bg text-center transition-all border border-transparent peer-checked:border-info-base/20">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-secondary">menu_book</span>
                        <span className="font-body-md-semibold text-body-md-semibold text-primary">English</span>
                      </div>
                      <span className="font-label-sm text-[11px] text-muted-text block mt-0.5">Standard Nigerian English</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input 
                      className="peer sr-only" 
                      name="preferred_language" 
                      type="radio" 
                      value="pcm"
                      checked={preferredLang === 'pcm'}
                      onChange={() => setPreferredLang('pcm')}
                    />
                    <div className="p-3 bg-surface-container-low rounded-lg peer-checked:bg-info-bg text-center transition-all border border-transparent peer-checked:border-info-base/20">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-secondary">translate</span>
                        <span className="font-body-md-semibold text-body-md-semibold text-primary">Nigerian Pidgin</span>
                      </div>
                      <span className="font-label-sm text-[11px] text-muted-text block mt-0.5">Clear street-smart defence</span>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Terms of Use & Privacy Policy Mandatory Checkbox */}
              <div className="flex items-start gap-2.5 pt-space-xs">
                <input
                  id="terms_acknowledgement"
                  name="terms_acknowledgement"
                  required
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-border-subtle text-primary focus:ring-secondary/20 cursor-pointer shrink-0"
                />
                <label htmlFor="terms_acknowledgement" className="font-body-sm text-xs text-on-surface leading-relaxed cursor-pointer">
                  {language === 'pcm' ? (
                    <span>
                      I agree to the <Link href="/terms" target="_blank" className="text-secondary font-medium hover:underline">Terms of Use</Link> and acknowledge say I don read the <Link href="/privacy" target="_blank" className="text-secondary font-medium hover:underline">Privacy Policy</Link>.
                    </span>
                  ) : (
                    <span>
                      I agree to the <Link href="/terms" target="_blank" className="text-secondary font-medium hover:underline">Terms of Use</Link> and acknowledge that I have read the <Link href="/privacy" target="_blank" className="text-secondary font-medium hover:underline">Privacy Policy</Link>.
                    </span>
                  )}
                </label>
              </div>

              {/* Primary Submission Button */}
              <button 
                className="w-full h-touch-target-min bg-primary-container hover:bg-primary text-on-primary font-body-md-semibold text-body-md-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-space-xs" 
                type="submit"
              >
                <span>{t('Create Account & Continue', 'Create Account & Make We Start')}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
            
            {/* Divider */}
            <div className="relative my-space-lg flex items-center justify-center">
              <div className="w-full bg-surface-container-high h-[1px]"></div>
              <span className="absolute px-4 bg-surface font-label-sm text-label-sm text-muted-text uppercase tracking-wider">
                {t('or sign up with', 'abi use this one sign up')}
              </span>
            </div>
            
            {/* OAuth Action: Google Sign-in */}
            <div className="space-y-2">
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
                <span>{t('Sign up with Google', 'Register with Google')}</span>
              </button>
              <p className="font-body-sm text-[11px] text-muted-text text-center">
                {t(
                  'By continuing with Google, you confirm agreement to our Terms of Use and Privacy Policy.',
                  'As you dey use Google sign up, you agree to our Terms of Use and Privacy Policy.'
                )}
              </p>
            </div>
          </div>
          
          {/* Footer Navigation */}
          <div className="mt-space-lg pt-space-md bg-surface border-t border-border-subtle/50">
            <p className="font-body-md text-body-md text-center text-muted-text">
              <span>{t('Already have an account?', 'You get account already?')} </span>
              <Link className="text-secondary font-body-md-semibold text-body-md-semibold hover:underline" href="/login">
                {t('Log In', 'Sign In')}
              </Link>
            </p>
          </div>
        </div>
        
        {/* Right Column: Editorial Visual and Value Pillars Panel */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-space-lg lg:p-space-2xl text-on-primary overflow-hidden min-h-[500px] bg-primary-container">
          {/* Editorial Background with High Contrast Scrim */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('/assets/smeshield/auth/auth-signup-hero.jpg')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/90 to-primary-container/70"></div>
          
          {/* Top Status Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md border border-white/15">
              <span className="material-symbols-outlined text-[16px] text-warning-base">verified</span>
              <span className="font-label-sm text-label-sm text-white tracking-wide font-medium">Enterprise Grade SME Shielding</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-white/90 font-label-sm text-label-sm bg-success-bg/90 text-success-text px-2.5 py-1 rounded-full border border-success-base/20">
              <span className="material-symbols-outlined text-[16px] text-success-base">verified_user</span>
              <span className="font-semibold">NDPA 2023 Aligned</span>
            </div>
          </div>
          
          {/* Center / Narrative Text */}
          <div className="relative z-10 my-space-xl">
            <div className="w-12 h-1 bg-warning-base rounded-full mb-space-md"></div>
            <h2 className="font-headline-lg text-headline-lg text-white mb-space-xs leading-snug">
              {t(
                'Protection Without Fear for Nigerian Business Owners',
                'Better Protection Wey No Dey Give Fear for Naija Business'
              )}
            </h2>
            <p className="font-body-md text-body-md text-surface-container-high leading-relaxed">
              {t(
                'From Alaba to Ikeja and Port Harcourt, shield your cash flow, customer data, and POS transactions from real-world digital threats.',
                'From Alaba go Ikeja reach Port Harcourt, secure your cash, customer data, and POS terminal from fake alerts and cyber yahoo scams.'
              )}
            </p>
          </div>
          
          {/* Bottom 3 Pillars Architecture */}
          <div className="relative z-10 space-y-space-md">
            {/* Pillar 1 */}
            <div className="p-3.5 rounded-xl bg-primary-container/90 backdrop-blur-md border border-white/15 flex items-start gap-3.5 shadow-md transition-transform hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest/15 flex items-center justify-center shrink-0 text-warning-base">
                <span className="material-symbols-outlined text-[22px]">badge</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-headline-sm text-[16px] text-white font-semibold leading-tight">
                  {t('Tailored for Your Role', 'Fit Your Work Level')}
                </h3>
                <p className="font-body-sm text-[13px] text-surface-container-high mt-0.5">
                  {t('Customized playbooks for Business Owners, Frontline Staff, or Sole Traders.', 'Special training for Oga, Sales staff, or Person wey run shop by imself.')}
                </p>
              </div>
            </div>
            
            {/* Pillar 2 */}
            <div className="p-3.5 rounded-xl bg-primary-container/90 backdrop-blur-md border border-white/15 flex items-start gap-3.5 shadow-md transition-transform hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest/15 flex items-center justify-center shrink-0 text-warning-base">
                <span className="material-symbols-outlined text-[22px]">translate</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-headline-sm text-[16px] text-white font-semibold leading-tight">
                  {t('Bilingual by Design', 'Naija English & Pidgin')}
                </h3>
                <p className="font-body-sm text-[13px] text-surface-container-high mt-0.5">
                  {t('Seamlessly swap between clear Nigerian English and everyday Nigerian Pidgin anytime.', 'Switch enter Nigerian Pidgin or standard English anytime without wahala.')}
                </p>
              </div>
            </div>
            
            {/* Pillar 3 */}
            <div className="p-3.5 rounded-xl bg-primary-container/90 backdrop-blur-md border border-white/15 flex items-start gap-3.5 shadow-md transition-transform hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest/15 flex items-center justify-center shrink-0 text-warning-base">
                <span className="material-symbols-outlined text-[22px]">local_police</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-headline-sm text-[16px] text-white font-semibold leading-tight">
                  {t('Adaptive Curriculum', '15 Practice Modules')}
                </h3>
                <p className="font-body-sm text-[13px] text-surface-container-high mt-0.5">
                  {t('15 pragmatic modules tackling POS scams, fake alerts, and ransomware schemes.', 'Real steps to catch fake bank alerts, POS terminal tampering, and bad email links.')}
                </p>
              </div>
            </div>

            {/* Micro footer links */}
            <div className="pt-space-xs flex items-center justify-between text-xs text-surface-container-high font-body-sm">
              <span>© 2026 SMEShield Nigeria</span>
              <div className="flex items-center gap-3">
                <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-white transition">Terms</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-text">Loading...</div></div>}>
      <SignUpForm />
    </Suspense>
  )
}
