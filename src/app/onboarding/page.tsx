'use client'

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { completeOnboarding } from './actions'
import { createClient } from '@/utils/supabase/client'

const BUSINESS_TYPES = [
  { id: 'pos', icon: 'point_of_sale', name: 'POS / Agent Banking', description: 'High cash volume, terminal handovers, card skimming, fake SMS alert scams.', modules: 'Modules 02 & 07 Prioritized' },
  { id: 'tech', icon: 'desktop_windows', name: 'Cybercafé & Tech Centre', description: 'Shared client workstations, public USB malware, open Wi-Fi risks.', modules: 'Modules 05 & 10 Prioritized' },
  { id: 'school', icon: 'school', name: 'Private School & Academy', description: 'School fee payment diversion, student database NDPA compliance, WhatsApp group hijack.', modules: 'Modules 04 & 06 Prioritized' },
  { id: 'fashion', icon: 'styler', name: 'Fashion & Tailoring Hub', description: 'Instagram DM impersonation, supplier wire diversion, fake proof-of-payment.', modules: 'Modules 02 & 12 Prioritized' },
  { id: 'food', icon: 'restaurant', name: 'Food, Bakery & Restaurant', description: 'POS cashier handover, fake bank transfer receipts during peak lunch rush.', modules: 'Modules 01 & 02 Prioritized' },
  { id: 'retail', icon: 'storefront', name: 'Retail / Supermarket', description: 'Inventory theft, supplier invoice hijacking, staff credential sharing.', modules: 'Modules 07 & 11 Prioritized' },
  { id: 'professional', icon: 'business_center', name: 'Professional Services', description: 'Business Email Compromise (BEC), client data breach, PDF invoice tampering.', modules: 'Modules 03 & 11 Prioritized' },
  { id: 'general', icon: 'corporate_fare', name: 'Other / General SME', description: 'Foundational baseline cyber hygiene covering all 15 core Nigerian threat categories.', modules: 'Comprehensive Track' },
]

const ROLES = [
  {
    id: 'business_owner',
    icon: 'corporate_fare',
    title: 'Business Owner',
    titlePcm: 'Business Owner',
    description: 'I own or manage a business and want to protect my team with cybersecurity training.',
    descriptionPcm: 'I get business and I wan protect my workers with cyber training.',
    badge: 'Team Oversight',
    features: ['Create workspace & generate 6-digit employee codes', 'Monitor team compliance & vulnerability scores', 'Download NDPA 2023 audit certificates'],
    featuresPcm: ['Create workspace & generate 6-digit employee code', 'Monitor team compliance & vulnerability scores', 'Download NDPA 2023 audit certificate'],
  },
  {
    id: 'employee',
    icon: 'badge',
    title: 'Employee',
    titlePcm: 'Employee',
    description: 'My employer gave me a 6-digit code to join their cybersecurity training program.',
    descriptionPcm: 'My oga give me 6-digit code to join the cyber training program.',
    badge: 'Frontline Staff',
    features: ['Join with your employer\'s 6-digit code', 'Complete interactive threat simulations', 'Earn personal verified certificates'],
    featuresPcm: ['Join with your employer 6-digit code', 'Complete interactive threat simulations', 'Earn personal verified certificate'],
  },
  {
    id: 'sole_entrepreneur',
    icon: 'storefront',
    title: 'Sole Entrepreneur',
    titlePcm: 'Sole Entrepreneur',
    description: 'I work independently — POS agent, freelancer, or solo trader — and want to protect myself and my customers.',
    descriptionPcm: 'I dey work alone — POS agent, freelancer, or market trader — and I wan protect myself and my customers.',
    badge: 'Independent',
    features: ['100% self-paced mobile-friendly lessons', 'POS reversal fraud & SIM swap simulations', 'Personal compliance certificate'],
    featuresPcm: ['100% self-paced lessons on phone', 'POS reversal fraud & SIM swap simulations', 'Personal compliance certificate'],
  },
]

function OnboardingWizard() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { t } = useLanguage()

  const [step, setStep] = useState(1)
  const [role, setRole] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [location, setLocation] = useState('')
  const [employeeCount, setEmployeeCount] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [fullName, setFullName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = role === 'employee' ? 2 : 3
  const progress = Math.round((step / totalSteps) * 100)

  const router = useRouter()
  const supabase = createClient()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const formData = new FormData()
    formData.set('role', role)
    formData.set('full_name', fullName)
    formData.set('business_type', businessType)
    formData.set('business_name', businessName)
    formData.set('location', location)
    formData.set('employee_count', employeeCount)
    formData.set('join_code', joinCode)
    await completeOnboarding(formData)
  }

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(26,43,72,0.04)]">
        <div className="h-16 max-w-[75rem] mx-auto px-4 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-11 flex items-center justify-center shrink-0">
              <svg className="w-full h-full" fill="none" viewBox="0 0 44 52" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2C34 2 42 7.5 42 22C42 37 28 47 22 50C16 47 2 37 2 22C2 7.5 10 2 22 2Z" fill="#031632" />
                <path d="M22 8L34 22H26V35H18V22H10L22 8Z" fill="#0060ac" />
                <circle cx="22" cy="22" fill="#ffb955" r="3.5" />
              </svg>
            </div>
            <span className="font-serif text-lg font-bold text-primary tracking-tight">SMEShield</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <button 
              onClick={handleSignOut} 
              disabled={isSigningOut}
              className="flex items-center text-sm text-on-surface-variant hover:text-on-surface font-semibold transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined mr-1 text-[20px]">close</span>
              {isSigningOut ? t('Exiting...', 'Exiting...') : t('Exit', 'Exit')}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-16 min-h-screen bg-app-bg">
        <div className="max-w-container-max mx-auto px-4 lg:px-8 py-8 w-full">
          <div className="w-full flex flex-col">
          {/* Progress Header */}
          <div className="flex flex-col gap-3 mb-8 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary-container text-on-primary text-xs font-semibold shadow-sm">
                  {t(`Step ${step} of ${totalSteps}`, `Step ${step} of ${totalSteps}`)}
                </span>
                <span className="text-sm font-semibold text-muted-text">
                  {step === 1 && t('Role Selection', 'Role Selection')}
                  {step === 2 && role === 'employee' && t('Join Code', 'Join Code')}
                  {step === 2 && role !== 'employee' && t('Business Classification', 'Business Classification')}
                  {step === 3 && t('Business Details', 'Business Details')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-text">Progress</span>
                <div className="w-36 h-2 rounded-full bg-surface-variant overflow-hidden">
                  <div className="h-full bg-secondary transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-xs font-semibold text-primary">{progress}%</span>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-danger-bg rounded-lg flex items-center gap-2 text-sm text-danger-text">
                <span className="material-symbols-outlined text-lg">error</span>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* ─── STEP 1: Role Selection ─── */}
          {step === 1 && (
            <div>
              <div className="max-w-3xl mb-8">
                <h1 className="font-serif text-[30px] md:text-[44px] font-bold text-primary tracking-tight leading-tight">
                  {t('How Would You Like to Use SMEShield?', 'How You Wan Use SMEShield?')}
                </h1>
                <p className="text-lg text-muted-text mt-2">
                  {t(
                    'Select your role to receive a customized onboarding experience tailored to your specific business responsibilities.',
                    'Choose your role so we fit give you the right experience for your business.'
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => { setRole(r.id); setStep(2); }}
                    className={`text-left bg-surface rounded-xl p-8 shadow-level-1 flex flex-col justify-between hover:shadow-level-2 transition-all group cursor-pointer ${
                      role === r.id ? 'ring-2 ring-secondary bg-info-bg/30' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-[26px]">{r.icon}</span>
                        </div>
                        <span className="bg-surface-container-low px-3 py-1 rounded-full text-xs font-semibold text-primary-container">{r.badge}</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-primary-container mb-2 group-hover:text-secondary transition-colors">
                        {t(r.title, r.titlePcm)}
                      </h3>
                      <p className="text-sm text-muted-text mb-6">{t(r.description, r.descriptionPcm)}</p>
                      <ul className="space-y-2.5 mb-6">
                        {(t(r.features.join('||'), r.featuresPcm.join('||'))).split('||').map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="material-symbols-outlined text-secondary text-lg mt-0.5">check</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="h-11 w-full flex items-center justify-center gap-2 text-sm font-semibold bg-surface-container-low text-primary-container rounded-lg group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                      <span>{t('Select Role', 'Select Role')}</span>
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── STEP 2 (Employee): Join Code ─── */}
          {step === 2 && role === 'employee' && (
            <div className="max-w-xl mx-auto w-full">
              <div className="mb-8 text-center">
                <h1 className="font-serif text-[28px] md:text-[36px] font-bold text-primary tracking-tight leading-tight">
                  {t('Enter Your Employer\'s Join Code', 'Enter Your Employer Join Code')}
                </h1>
                <p className="text-base md:text-lg text-muted-text mt-2">
                  {t(
                    'Your employer should have shared a persistent 6-digit code. Enter it below to join their cybersecurity workspace.',
                    'Your oga suppose don share 6-digit code. Put am below to join their cyber workspace.'
                  )}
                </p>
              </div>

              <div className="w-full">
                <div className="bg-surface rounded-xl p-8 shadow-level-1">
                  <div className="flex flex-col gap-1.5 mb-6">
                    <label className="text-sm font-semibold text-primary" htmlFor="full_name">
                      {t('Your Full Name', 'Your Full Name')}
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-muted-text pointer-events-none text-xl">person</span>
                      <input
                        id="full_name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        type="text"
                        required
                        placeholder={t('e.g. Amaka Okafor', 'e.g. Amaka Okafor')}
                        className="w-full h-12 pl-11 pr-4 bg-surface text-on-surface placeholder:text-muted-text rounded-lg border border-border-subtle focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition text-base"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 mb-6">
                    <label className="text-sm font-semibold text-primary" htmlFor="join_code">
                      {t('6-Digit Join Code', '6-Digit Join Code')}
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-muted-text pointer-events-none text-xl">pin</span>
                      <input
                        id="join_code"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        required
                        placeholder="• • • • • •"
                        className="w-full h-14 pl-11 pr-4 bg-surface text-on-surface placeholder:text-muted-text rounded-lg border border-border-subtle focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition text-2xl tracking-[0.5em] font-mono text-center"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-info-bg rounded-lg flex items-start gap-2 text-sm text-info-text mb-6">
                    <span className="material-symbols-outlined text-lg mt-0.5">info</span>
                    <span>{t('The join code was shared by your employer or supervisor. If you haven\'t received one, please contact your manager.', 'Your oga or supervisor suppose don share this code. If you no get am, contact your manager.')}</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="h-12 px-6 bg-surface-container-low text-primary-container rounded-lg text-sm font-semibold hover:bg-surface-container transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-lg">arrow_back</span>
                      <span>{t('Back', 'Back')}</span>
                    </button>
                    <button
                      type="button"
                      disabled={joinCode.length !== 6 || !fullName || isSubmitting}
                      onClick={handleSubmit}
                      className="flex-1 h-12 bg-primary-container text-on-primary rounded-lg text-sm font-semibold hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{isSubmitting ? t('Joining...', 'Joining...') : t('Join Workspace', 'Join Workspace')}</span>
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 2 (Owner/Sole): Business Type Selection ─── */}
          {step === 2 && role !== 'employee' && (
            <div>
              <div className="max-w-3xl mb-8">
                <h1 className="font-serif text-[30px] md:text-[44px] font-bold text-primary tracking-tight leading-tight">
                  {t('Select Your Business Operating Sector', 'Select Your Business Sector')}
                </h1>
                <p className="text-lg text-muted-text mt-2">
                  {t(
                    'SMEShield uses a deterministic rule engine to prioritize threat simulations based on how your business receives funds and operates daily.',
                    'SMEShield go use your business type to show you the correct threat lessons based on how your business dey operate.'
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {BUSINESS_TYPES.map((bt) => (
                  <button
                    key={bt.id}
                    type="button"
                    onClick={() => setBusinessType(bt.id)}
                    className={`text-left cursor-pointer group rounded-xl p-4 transition-all duration-200 bg-surface shadow-[0_1px_3px_rgba(26,43,72,0.06)] hover:shadow-[0_8px_20px_rgba(26,43,72,0.08)] relative flex flex-col justify-between ${
                      businessType === bt.id ? 'ring-2 ring-secondary bg-info-bg/30' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${
                          businessType === bt.id ? 'bg-primary-container text-on-primary' : 'bg-surface-container-high text-primary'
                        }`}>
                          <span className="material-symbols-outlined text-[24px]">{bt.icon}</span>
                        </div>
                        {businessType === bt.id && (
                          <div className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 bg-success-bg text-success-text text-xs font-semibold">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            <span>Selected</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-primary group-hover:text-secondary transition-colors">{bt.name}</h3>
                      <p className="text-xs text-muted-text mt-1 leading-relaxed">{bt.description}</p>
                    </div>
                    <div className="mt-3 pt-2 flex flex-col gap-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-text">Curriculum Focus</span>
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-surface-container text-xs font-semibold text-primary">
                        <span className="material-symbols-outlined text-[14px] text-secondary">verified_user</span>
                        <span>{bt.modules}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-12 px-6 bg-surface-container-low text-primary-container rounded-lg text-sm font-semibold hover:bg-surface-container transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                  <span>{t('Back', 'Back')}</span>
                </button>
                <button
                  type="button"
                  disabled={!businessType}
                  onClick={() => setStep(3)}
                  className="h-12 px-8 bg-primary-container text-on-primary rounded-lg text-sm font-semibold hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <span>{t('Continue', 'Continue')}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* ─── STEP 3: Business Details ─── */}
          {step === 3 && (
            <div className="max-w-2xl mx-auto w-full">
              <div className="mb-8 text-center">
                <h1 className="font-serif text-[28px] md:text-[36px] font-bold text-primary tracking-tight leading-tight">
                  {role === 'business_owner'
                    ? t('Set Up Your Business Workspace', 'Set Up Your Business Workspace')
                    : t('Confirm Your Details', 'Confirm Your Details')
                  }
                </h1>
                <p className="text-base md:text-lg text-muted-text mt-2">
                  {role === 'business_owner'
                    ? t('Provide your business details to create a protected workspace. A persistent 6-digit employee join code will be generated automatically.', 'Put your business details to create workspace. We go generate 6-digit employee join code automatically.')
                    : t('Confirm your name to complete setup and start your personalized training.', 'Confirm your name to complete setup and start your training.')
                  }
                </p>
              </div>

              <div className="w-full">
                <div className="bg-surface rounded-xl p-8 shadow-level-1 space-y-5">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-primary" htmlFor="full_name_step3">
                      {t('Full Name', 'Your Full Name')}
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-muted-text pointer-events-none text-xl">person</span>
                      <input
                        id="full_name_step3"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        type="text"
                        required
                        placeholder={t('e.g. Amaka Okafor', 'e.g. Amaka Okafor')}
                        className="w-full h-12 pl-11 pr-4 bg-surface text-on-surface placeholder:text-muted-text rounded-lg border border-border-subtle focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition text-base"
                      />
                    </div>
                  </div>

                  {/* Business Owner specific fields */}
                  {role === 'business_owner' && (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-primary" htmlFor="business_name">
                          {t('Business Name', 'Business Name')}
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3.5 text-muted-text pointer-events-none text-xl">business</span>
                          <input
                            id="business_name"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            type="text"
                            required
                            placeholder={t('e.g. BrightPay Ventures', 'e.g. BrightPay Ventures')}
                            className="w-full h-12 pl-11 pr-4 bg-surface text-on-surface placeholder:text-muted-text rounded-lg border border-border-subtle focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition text-base"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-primary" htmlFor="location">
                          {t('Business Location', 'Business Location')}
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3.5 text-muted-text pointer-events-none text-xl">location_on</span>
                          <select
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full h-12 pl-11 pr-4 bg-surface text-on-surface rounded-lg border border-border-subtle focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition text-base appearance-none"
                          >
                            <option value="">{t('Select state', 'Select state')}</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Abuja">Abuja (FCT)</option>
                            <option value="Rivers">Rivers</option>
                            <option value="Kano">Kano</option>
                            <option value="Oyo">Oyo</option>
                            <option value="Delta">Delta</option>
                            <option value="Enugu">Enugu</option>
                            <option value="Kaduna">Kaduna</option>
                            <option value="Ogun">Ogun</option>
                            <option value="Anambra">Anambra</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-primary" htmlFor="employee_count">
                          {t('Number of Employees', 'Number of Workers')}
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3.5 text-muted-text pointer-events-none text-xl">groups</span>
                          <select
                            id="employee_count"
                            value={employeeCount}
                            onChange={(e) => setEmployeeCount(e.target.value)}
                            className="w-full h-12 pl-11 pr-4 bg-surface text-on-surface rounded-lg border border-border-subtle focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition text-base appearance-none"
                          >
                            <option value="">{t('Select range', 'Select range')}</option>
                            <option value="1-5">1–5 {t('employees', 'workers')}</option>
                            <option value="6-20">6–20 {t('employees', 'workers')}</option>
                            <option value="21-50">21–50 {t('employees', 'workers')}</option>
                            <option value="51+">51+ {t('employees', 'workers')}</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Info card */}
                  <div className="p-3 bg-success-bg rounded-lg flex items-start gap-2 text-sm text-success-text">
                    <span className="material-symbols-outlined text-lg mt-0.5">verified_user</span>
                    <span>
                      {role === 'business_owner'
                        ? t('A persistent 6-digit join code will be auto-generated for your employees after setup.', 'We go automatically generate 6-digit code for your workers after setup.')
                        : t('Your personalized training track will begin immediately after completion.', 'Your training go start immediately after setup.')
                      }
                    </span>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="h-12 px-6 bg-surface-container-low text-primary-container rounded-lg text-sm font-semibold hover:bg-surface-container transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-lg">arrow_back</span>
                      <span>{t('Back', 'Back')}</span>
                    </button>
                    <button
                      type="button"
                      disabled={
                        !fullName ||
                        (role === 'business_owner' && (!businessName || !location || !employeeCount)) ||
                        isSubmitting
                      }
                      onClick={handleSubmit}
                      className="flex-1 h-12 bg-primary-container text-on-primary rounded-lg text-sm font-semibold hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{isSubmitting ? t('Setting up...', 'Setting up...') : t('Complete Setup', 'Complete Setup')}</span>
                      <span className="material-symbols-outlined text-lg">check</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </main>
    </>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-text">Loading...</div></div>}>
      <OnboardingWizard />
    </Suspense>
  )
}
