'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { MetricCounter, FadeInText } from '@/components/ui/MetricCounter'
import { createClient } from '@/utils/supabase/client'

export default function LandingPage() {
  const { t } = useLanguage()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthenticated(!!data.user)
    })
  }, [])

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full -mt-20 overflow-hidden bg-primary-container text-on-primary min-h-[90vh] flex flex-col justify-center">
        {/* Background Image with High-Depth Gradient Overlay */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: "url('/assets/smeshield/hero/hero-storytelling.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container/95 via-primary-container/85 to-primary-container/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent"></div>
        
        {/* Hero Content Container */}
        <div className="relative max-w-container-max mx-auto px-space-lg lg:px-space-xl pt-28 pb-16 flex flex-col items-start z-10 w-full">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest/15 backdrop-blur-md px-space-md py-space-xxs rounded-full mb-space-lg shadow-sm border border-white/10">
            <span className="material-symbols-outlined text-[16px] text-warning-base">verified</span>
            <span className="font-label-md text-label-md text-surface-container-lowest tracking-wide font-medium">
              {t('Bilingual Cybersecurity Training Built for Nigeria', 'Bilingual Cybersecurity Training Built for Nigeria')}
            </span>
          </div>
          
          {/* Main Headline */}
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero max-w-4xl text-on-primary leading-tight tracking-tight mb-space-lg">
            {t('Protect Your Business From Scams, Fraud & Account Takeover', 'Protect Your Business From Scam, Fake Alert & Cyber Wahala')}
          </h1>
          
          {/* Subtitle */}
          <p className="font-body-lg text-body-lg text-surface-container-high max-w-2xl mb-space-2xl leading-relaxed">
            {t(
              'Practical, bite-sized cybersecurity training designed specifically for Nigerian SMEs, POS agents, and retail shops. Available in clear English and authentic Nigerian Pidgin with zero complex jargon.',
              'Short-short cyber training weh dey for Nigerian SMEs, POS agents, and shops. E dey for clear English and real Nigerian Pidgin, no big-big grammar.'
            )}
          </p>
          
          {/* CTA Action Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md w-full sm:w-auto mb-space-3xl">
            <Link 
              href={isAuthenticated ? "/dashboard" : "/signup"} 
              className="h-12 min-h-touch-target-min px-space-xl inline-flex items-center justify-center gap-space-xs font-label-md text-label-md bg-warning-base text-tertiary font-semibold rounded-lg hover:bg-warning-base/90 transition-all shadow-md active:scale-95"
            >
              <span>{isAuthenticated ? t('Go to Dashboard', 'Go to Dashboard') : t('Start Free Training', 'Start Free Training')}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
            <Link href="#how-it-works" className="h-12 min-h-touch-target-min px-space-lg inline-flex items-center justify-center gap-space-xs font-label-md text-label-md text-on-primary bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 rounded-lg transition-colors backdrop-blur-sm border border-white/10">
              <span className="material-symbols-outlined text-[20px]">info</span>
              <span>{t('Learn How It Works', 'See How E Dey Work')}</span>
            </Link>
          </div>
          
          {/* Trust Badges Bar */}
          <div className="w-full pt-space-lg bg-surface-container-lowest/10 backdrop-blur-md rounded-xl px-space-lg py-space-md grid grid-cols-1 md:grid-cols-3 gap-space-md border border-white/10">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center text-secondary-fixed">
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
              </div>
              <div>
                <div className="font-label-md text-label-md text-on-primary">{t('NDPA 2023 Aligned', 'NDPA 2023 Aligned')}</div>
                <div className="font-body-sm text-body-sm text-surface-container-high">{t('Full local compliance standards', 'Full local compliance standards')}</div>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center text-secondary-fixed">
                <span className="material-symbols-outlined text-[22px]">layers</span>
              </div>
              <div>
                <div className="font-label-md text-label-md text-on-primary">{t('15 Real-World Modules', '15 Real-World Modules')}</div>
                <div className="font-body-sm text-body-sm text-surface-container-high">{t('Targeted against local cyber schemes', 'Targeted against local cyber schemes')}</div>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center text-secondary-fixed">
                <span className="material-symbols-outlined text-[22px]">psychology</span>
              </div>
              <div>
                <div className="font-label-md text-label-md text-on-primary">{t('Rule-Based Adaptive', 'Rule-Based Adaptive')}</div>
                <div className="font-body-sm text-body-sm text-surface-container-high">{t('Personalized micro-learning track', 'Personalized micro-learning track')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Reality & Problem Section */}
      <section className="w-full bg-app-bg py-space-3xl">
        <div className="max-w-container-max mx-auto px-space-lg lg:px-space-xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-space-xxs text-secondary font-label-md text-label-md uppercase tracking-wider mb-space-xs">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <span>{t('Real Local Ground Realities', 'Real Local Ground Realities')}</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-primary-container">
                {t('The Cyber Reality for Nigerian Small Businesses', 'The Cyber Reality for Nigerian Small Business')}
              </h2>
            </div>
            <p className="font-body-md text-body-md text-muted-text max-w-md">
              {t(
                'Cybercrime in Nigeria is not high-tech Hollywood hacking—it targets human trust through everyday communication channels like WhatsApp, SMS, and direct banking alerts.',
                'Cybercrime for Nigeria no be Hollywood film—e dey target human trust through WhatsApp, SMS, and bank alert.'
              )}
            </p>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-2xl">
            {/* Stat 1 */}
            <div className="bg-surface rounded-xl p-space-xl shadow-sm flex flex-col justify-between border border-border-subtle/50">
              <div>
                <div className="w-12 h-12 rounded-lg bg-danger-bg flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-danger-base text-[26px]">cell_merge</span>
                </div>
                <div className="font-headline-xl text-4xl text-danger-text font-bold mb-space-xs">
                  <MetricCounter endValue={86} suffix="%" />
                </div>
                <div className="font-headline-sm text-headline-sm text-primary-container mb-space-xs">
                  {t('Social Engineering Entry', 'Social Engineering Entry')}
                </div>
                <p className="font-body-sm text-body-sm text-muted-text">
                  {t(
                    'Of Nigerian SME cyber incidents begin with human manipulation: fraudulent SMS credit alerts, phishing WhatsApp voice calls, or impersonated vendors.',
                    'Of Nigerian SME cyber wahala start from human manipulation: fake SMS alert, phishing WhatsApp call, or vendor weh no be real.'
                  )}
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm bg-surface-container-low px-space-sm py-space-xxs rounded-md flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-danger-text text-[16px]">info</span>
                <span className="font-label-sm text-label-sm text-danger-text">{t('Primary threat vector in 2026', 'Primary threat vector in 2026')}</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-surface rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-warning-bg flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-warning-base text-[26px]">payments</span>
                </div>
                <div className="font-headline-xl text-4xl text-warning-text font-bold mb-space-xs">
                  <MetricCounter endValue={48} isCurrency={true} prefix="₦" suffix="M" />
                </div>
                <div className="font-headline-sm text-headline-sm text-primary-container mb-space-xs">
                  {t('Average Capital Depletion', 'Average Capital Depletion')}
                </div>
                <p className="font-body-sm text-body-sm text-muted-text">
                  {t(
                    'Reported financial loss per successful invoice diversion, fake banking proof-of-payment, or unauthorized reversal scheme hitting retail hubs.',
                    'Money weh people lose from fake invoice, fake payment proof, and unauthorized reversal for retail.'
                  )}
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm bg-surface-container-low px-space-sm py-space-xxs rounded-md flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-warning-text text-[16px]">trending_up</span>
                <span className="font-label-sm text-label-sm text-warning-text">{t('Directly impacts operational payroll', 'E dey affect company salary')}</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-surface rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-info-bg flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-info-base text-[26px]">timer</span>
                </div>
                <div className="font-headline-xl text-4xl text-info-text font-bold mb-space-xs">
                  <FadeInText>&lt; 3 min</FadeInText>
                </div>
                <div className="font-headline-sm text-headline-sm text-primary-container mb-space-xs">
                  {t('Staff Vulnerability Window', 'Staff Vulnerability Window')}
                </div>
                <p className="font-body-sm text-body-sm text-muted-text">
                  {t(
                    'Average time it takes for an untrained shop clerk or POS terminal operator to approve an unauthorized transaction or surrender credentials to a fake bank agent.',
                    'Time weh e dey take untrained shop person or POS operator to approve fake transaction or give password to scammer.'
                  )}
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm bg-surface-container-low px-space-sm py-space-xxs rounded-md flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-info-text text-[16px]">bolt</span>
                <span className="font-label-sm text-label-sm text-info-text">{t('Fast response requires muscle memory', 'Quick response need practice')}</span>
              </div>
            </div>
          </div>

          {/* Narrative & Team Card Overlap */}
          <div className="bg-surface rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 p-space-xl lg:p-space-2xl flex flex-col justify-center">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xxs bg-info-bg text-info-text rounded-full w-max mb-space-md">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-label-sm text-label-sm">{t('Our Guiding Principle', 'Our Guiding Principle')}</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-primary-container mb-space-md">
                {t(
                  'Protection Without Fear: Moving Past Technical Terror Into Daily Staff Vigilance',
                  'Protection Without Fear: Moving Past Technical Terror Into Daily Staff Vigilance'
                )}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
                {t(
                  'Most cybersecurity training makes everyday employees feel anxious, helpless, or overwhelmed by foreign jargon. At SMEShield, we treat human attention as a professional skill that can be easily nurtured through respectful, relatable, and culturally resonant coaching.',
                  'Most cyber training dey make workers fear, feel helpless, or confused by big-big grammar. For SMEShield, we treat human attention as skill weh fit grow through coaching weh e dey respect and relate to people.'
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-md">
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary-container">{t('No Tech Jargon', 'No Big Grammar')}</h4>
                    <p className="font-body-sm text-body-sm text-muted-text">{t('Concepts explained using physical market analogies and authentic day-to-day operations.', 'We explain things with market example and everyday work.')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary-container">{t('Actionable Checklists', 'Simple Checklists')}</h4>
                    <p className="font-body-sm text-body-sm text-muted-text">{t('Simple 3-step verification flows before tapping approve on any banking platform.', '3-step check before you approve any bank transfer.')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Modern professional Nigerian SME office meeting" className="absolute inset-0 w-full h-full object-cover" src="/assets/smeshield/avatars/portrait.jpg" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/80 to-transparent p-space-md text-on-primary">
                <p className="font-label-sm text-label-sm">{t('Collaborative Security Review • Victoria Island, Lagos', 'Collaborative Security Review • Victoria Island, Lagos')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full bg-surface py-space-3xl" id="how-it-works">
        <div className="max-w-container-max mx-auto px-space-lg lg:px-space-xl">
          <div className="text-center max-w-2xl mx-auto mb-space-3xl">
            <div className="inline-flex items-center gap-space-xxs text-secondary font-label-md text-label-md uppercase tracking-wider mb-space-xs">
              <span className="material-symbols-outlined text-[18px]">alt_route</span>
              <span>{t('Simple 3-Step Pathway', 'Simple 3-Step Pathway')}</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary-container mb-space-sm">
              {t('How SMEShield Trains Your Frontline Staff', 'How SMEShield Dey Train Your Staff')}
            </h2>
            <p className="font-body-md text-body-md text-muted-text">
              {t(
                'Zero complex deployments or enterprise software downloads. Get your entire team certified and vigilant in minutes.',
                'No complex setup or big software download. Your team go dey ready in minutes.'
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl relative">
            {/* Step 1 */}
            <div className="bg-surface-container-low rounded-xl p-space-xl flex flex-col relative group hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-headline-md mb-space-lg shadow-sm">01</div>
              <h3 className="font-headline-sm text-headline-sm text-primary-container mb-space-xs">
                {t('Register Business or Staff Profile', 'Register Business or Staff Profile')}
              </h3>
              <p className="font-body-sm text-body-sm text-muted-text mb-space-md leading-relaxed">
                {t(
                  "Create an owner account or enter your company's persistent 6-digit invitation code. Sole entrepreneurs can immediately begin with personal accounts.",
                  "Create owner account or enter your company 6-digit code. If you dey work alone, you fit start immediately."
                )}
              </p>
              <div className="mt-auto bg-surface rounded-lg p-space-sm flex items-center gap-space-sm shadow-xs">
                <span className="material-symbols-outlined text-secondary text-[22px]">badge</span>
                <span className="font-label-sm text-label-sm text-primary-container">{t('Role-specific access in under 60 seconds', 'Access in under 60 seconds')}</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-low rounded-xl p-space-xl flex flex-col relative group hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-secondary text-on-secondary flex items-center justify-center font-headline-md text-headline-md mb-space-lg shadow-sm">02</div>
              <h3 className="font-headline-sm text-headline-sm text-primary-container mb-space-xs">
                {t('Get Adaptive Threat Modules', 'Get Your Own Threat Modules')}
              </h3>
              <p className="font-body-sm text-body-sm text-muted-text mb-space-md leading-relaxed">
                {t(
                  'Our deterministic rule engine profiles your business operations—POS agent, retail inventory, or digital office—to generate an accurate high-priority threat syllabus.',
                  'Our system go check your business type—POS, retail, or office—to give you the correct threat lessons.'
                )}
              </p>
              <div className="mt-auto bg-surface rounded-lg p-space-sm flex items-center gap-space-sm shadow-xs">
                <span className="material-symbols-outlined text-secondary text-[22px]">tune</span>
                <span className="font-label-sm text-label-sm text-primary-container">{t('15 customized scenario-based modules', '15 customized modules')}</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-low rounded-xl p-space-xl flex flex-col relative group hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-headline-md mb-space-lg shadow-sm">03</div>
              <h3 className="font-headline-sm text-headline-sm text-primary-container mb-space-xs">
                {t('Complete Scenarios & Track Vigilance', 'Do Scenarios & Track Progress')}
              </h3>
              <p className="font-body-sm text-body-sm text-muted-text mb-space-md leading-relaxed">
                {t(
                  'Staff practice spotting genuine vs. fake bank SMS slips, phishing WhatsApp calls, and invoice scams in English or Pidgin, verified with instant quiz certificates.',
                  'Staff go practice how to spot fake bank SMS, phishing WhatsApp call, and invoice scam for English or Pidgin, with instant quiz certificate.'
                )}
              </p>
              <div className="mt-auto bg-surface rounded-lg p-space-sm flex items-center gap-space-sm shadow-xs">
                <span className="material-symbols-outlined text-success-base text-[22px]">workspace_premium</span>
                <span className="font-label-sm text-label-sm text-primary-container">{t('Instant downloadable compliance pass', 'Instant compliance certificate')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="w-full bg-app-bg py-space-3xl" id="features">
        <div className="max-w-container-max mx-auto px-space-lg lg:px-space-xl">
          <div className="text-center max-w-2xl mx-auto mb-space-2xl">
            <div className="inline-flex items-center gap-space-xxs text-secondary font-label-md text-label-md uppercase tracking-wider mb-space-xs">
              <span className="material-symbols-outlined text-[18px]">group</span>
              <span>{t('Tailored Architecture', 'Tailored Architecture')}</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary-container mb-space-sm">
              {t('Built for Every Nigerian Business Structure', 'Built for Every Nigerian Business Structure')}
            </h2>
            <p className="font-body-md text-body-md text-muted-text">
              {t(
                'Whether you govern a multi-branch enterprise, operate a neighborhood cash POS kiosk, or run your own freelance consultancy.',
                'Whether you get company with branches, run POS shop, or dey freelance.'
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
            {/* Card 1: Business Owner */}
            <div className="bg-surface rounded-xl p-space-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[26px]">corporate_fare</span>
                  </div>
                  <span className="bg-surface-container-low px-space-sm py-space-xxs rounded-full font-label-sm text-label-sm text-primary-container">{t('Team Oversight', 'Team Oversight')}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary-container mb-space-xs">{t('Business Owner', 'Business Owner')}</h3>
                <p className="font-body-sm text-body-sm text-muted-text mb-space-lg">
                  {t(
                    'Full control over company threat posture. Create your business workspace (e.g. BrightPay Ventures), generate persistent 6-digit staff join codes, and dispatch Brevo-powered invitations.',
                    'Full control over company security. Create your business workspace, generate 6-digit staff code, and send invitations.'
                  )}
                </p>
                <ul className="space-y-space-sm mb-space-lg">
                  <li className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    <span>{t('Automated 6-digit employee onboarding codes', 'Automated 6-digit employee code')}</span>
                  </li>
                  <li className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    <span>{t('Team risk scores & completion dashboards', 'Team risk scores & dashboard')}</span>
                  </li>
                  <li className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    <span>{t('One-click NDPA 2023 employee compliance export', 'One-click NDPA 2023 compliance export')}</span>
                  </li>
                </ul>
              </div>
              <Link href="/signup" className="h-11 min-h-touch-target-min w-full inline-flex items-center justify-center gap-space-xs font-label-md text-label-md bg-primary-container text-on-primary rounded-lg hover:bg-primary transition-colors">
                <span>{t('Register as Business Owner', 'Register as Business Owner')}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>

            {/* Card 2: Employee */}
            <div className="bg-surface rounded-xl p-space-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-lg bg-secondary text-on-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[26px]">badge</span>
                  </div>
                  <span className="bg-surface-container-low px-space-sm py-space-xxs rounded-full font-label-sm text-label-sm text-secondary">{t('Frontline Staff', 'Frontline Staff')}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary-container mb-space-xs">{t('Employee', 'Employee')}</h3>
                <p className="font-body-sm text-body-sm text-muted-text mb-space-lg">
                  {t(
                    "Join your company's protection ring using the 6-digit key provided by your manager. Complete interactive simulations tailored to your specific workstation and daily duties.",
                    "Join your company protection ring with the 6-digit key weh your manager give you. Complete training weh match your daily work."
                  )}
                </p>
                <ul className="space-y-space-sm mb-space-lg">
                  <li className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    <span>{t('Quick join without tedious corporate setup', 'Quick join, no long thing')}</span>
                  </li>
                  <li className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    <span>{t('Interactive fake alert & screenshot detection', 'Learn to spot fake alert & screenshot')}</span>
                  </li>
                  <li className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    <span>{t('Personal verified certificate of completion', 'Your own verified certificate')}</span>
                  </li>
                </ul>
              </div>
              <Link href="/signup" className="h-11 min-h-touch-target-min w-full inline-flex items-center justify-center gap-space-xs font-label-md text-label-md bg-surface-container-low text-primary-container rounded-lg hover:bg-surface-container transition-colors">
                <span>{t('Join with 6-Digit Code', 'Join with 6-Digit Code')}</span>
                <span className="material-symbols-outlined text-[18px]">key</span>
              </Link>
            </div>

            {/* Card 3: Sole Entrepreneur */}
            <div className="bg-surface rounded-xl p-space-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[26px]">storefront</span>
                  </div>
                  <span className="bg-surface-container-low px-space-sm py-space-xxs rounded-full font-label-sm text-label-sm text-primary-container">{t('Independent', 'Independent')}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary-container mb-space-xs">{t('Sole Entrepreneur', 'Sole Entrepreneur')}</h3>
                <p className="font-body-sm text-body-sm text-muted-text mb-space-lg">
                  {t(
                    'Designed specifically for POS terminal banking agents, direct market traders, social commerce vendors, and independent digital professionals protecting customer finances solo.',
                    'Made for POS agents, market traders, social media sellers, and freelancers weh dey protect customer money.'
                  )}
                </p>
                <ul className="space-y-space-sm mb-space-lg">
                  <li className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    <span>{t('Specialized POS reversal fraud simulations', 'POS reversal fraud simulations')}</span>
                  </li>
                  <li className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    <span>{t('SIM swap and mobile banking lockdown protocols', 'SIM swap and mobile banking protection')}</span>
                  </li>
                  <li className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    <span>{t('100% self-paced micro lessons on mobile', '100% self-paced lessons on phone')}</span>
                  </li>
                </ul>
              </div>
              <Link href="/signup" className="h-11 min-h-touch-target-min w-full inline-flex items-center justify-center gap-space-xs font-label-md text-label-md bg-surface-container-low text-primary-container rounded-lg hover:bg-surface-container transition-colors">
                <span>{t('Start Solo Training', 'Start Solo Training')}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights (Bento Grid) */}
      <section className="w-full bg-surface py-space-3xl">
        <div className="max-w-container-max mx-auto px-space-lg lg:px-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
            <div>
              <div className="inline-flex items-center gap-space-xxs text-secondary font-label-md text-label-md uppercase tracking-wider mb-space-xs">
                <span className="material-symbols-outlined text-[18px]">star</span>
                <span>{t('Platform Capabilities', 'Platform Capabilities')}</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-primary-container">
                {t('Engineered for Nigerian SME Reality', 'Engineered for Nigerian SME Reality')}
              </h2>
            </div>
            <p className="font-body-md text-body-md text-muted-text max-w-md">
              {t(
                'Every tool, interactive scenario, and feedback indicator is benchmarked against current scam techniques witnessed in Alaba, Computer Village, and nationwide financial hubs.',
                'Every tool and scenario dey based on real scam weh dey happen for Alaba, Computer Village, and everywhere.'
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg">
            {/* Feature 1: First-Class Pidgin & English Parity (Col 7) */}
            <div className="md:col-span-7 bg-surface-container-low rounded-xl p-space-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">translate</span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface px-space-sm py-space-xxs rounded-full text-secondary">{t('Zero Degradation', 'Zero Degradation')}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary-container mb-space-xs">
                  {t('First-Class Pidgin & English Parity', 'First-Class Pidgin & English Parity')}
                </h3>
                <p className="font-body-sm text-body-sm text-muted-text max-w-xl mb-space-lg leading-relaxed">
                  {t(
                    'Pidgin is not an afterthought or rough auto-translation. All 15 modules are natively authored with full cultural context, clear terminology, and voice nuances so every apprentice or shop worker absorbs security protocols instantly.',
                    'Pidgin no be afterthought or rough translation. All 15 modules dey written with full cultural context and clear talk so every worker go understand quick.'
                  )}
                </p>
              </div>
              <div className="bg-surface rounded-lg p-space-md shadow-xs">
                <div className="flex items-center justify-between mb-space-xs border-b border-border-subtle pb-space-xxs">
                  <span className="font-label-sm text-label-sm text-muted-text uppercase">{t('Live Language Parity', 'Live Language Parity')}</span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">{t('1-Click Toggle', '1-Click Toggle')}</span>
                </div>
                <div className="space-y-space-xs pt-space-xs">
                  <div className="font-body-sm text-body-sm text-on-surface">
                    <span className="font-semibold text-primary-container">English:</span> &quot;Always verify payment credits directly in your official banking application, not via customer-presented SMS receipts.&quot;
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    <span className="font-semibold text-secondary">Pidgin:</span> &quot;No follow customer talk see alert enter. Check your original bank app with your own hand before you release market.&quot;
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Rule-Based Adaptive Learning (Col 5) */}
            <div className="md:col-span-5 bg-surface-container-low rounded-xl p-space-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-10 h-10 rounded-lg bg-secondary text-on-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">hub</span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface px-space-sm py-space-xxs rounded-full text-primary-container">{t('Deterministic Engine', 'Deterministic Engine')}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary-container mb-space-xs">
                  {t('Rule-Based Adaptive Learning', 'Rule-Based Adaptive Learning')}
                </h3>
                <p className="font-body-sm text-body-sm text-muted-text mb-space-lg leading-relaxed">
                  {t(
                    'No unpredictable AI hallucination. Our deterministic logic assesses diagnostic answers and dynamically schedules refresher scenarios for staff members exhibiting vulnerable habits.',
                    'No AI wahala. Our system check answers and automatically schedule refresher training for staff weh need am.'
                  )}
                </p>
              </div>
              <div className="bg-surface rounded-lg p-space-md space-y-space-xs shadow-xs">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface">{t('Invoice Fraud Readiness', 'Invoice Fraud Readiness')}</span>
                  <span className="text-warning-text font-semibold">{t('Needs Refresher (40%)', 'Needs Refresher (40%)')}</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-warning-base rounded-full" style={{ width: '40%' }}></div>
                </div>
                <p className="font-body-sm text-xs text-muted-text pt-space-xxs">{t('Adaptive trigger: Auto-queued Module 4 scenario', 'Auto-queued Module 4 scenario')}</p>
              </div>
            </div>

            {/* Feature 3: Interactive Practical Quizzes (Col 5) */}
            <div className="md:col-span-5 bg-surface-container-low rounded-xl p-space-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">quiz</span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface px-space-sm py-space-xxs rounded-full text-success-text">{t('Instant Feedback', 'Instant Feedback')}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary-container mb-space-xs">
                  {t('Hands-On Simulation Quizzes', 'Hands-On Simulation Quizzes')}
                </h3>
                <p className="font-body-sm text-body-sm text-muted-text mb-space-lg leading-relaxed">
                  {t(
                    'Staff interact with high-fidelity visual representations of fake Zenith or Access bank alerts, cloned WhatsApp business accounts, and altered bank transfer receipts.',
                    'Staff go see fake Zenith/Access bank alert, cloned WhatsApp account, and altered transfer receipt.'
                  )}
                </p>
              </div>
              <div className="bg-success-bg p-space-sm rounded-lg flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-success-base text-[24px]">verified</span>
                <div>
                  <div className="font-label-sm text-label-sm text-success-text font-semibold">{t('Real-Time Logic Breakdown', 'Real-Time Logic Breakdown')}</div>
                  <div className="font-body-sm text-xs text-success-text">{t('Highlights exact inconsistencies in sender headers and timestamps', 'Shows the exact fake part of the message')}</div>
                </div>
              </div>
            </div>

            {/* Feature 4: Staff Roster Management (Col 7) */}
            <div className="md:col-span-7 bg-surface-container-low rounded-xl p-space-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-10 h-10 rounded-lg bg-secondary text-on-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">groups_3</span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface px-space-sm py-space-xxs rounded-full text-primary-container">{t('Business Command', 'Business Command')}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary-container mb-space-xs">
                  {t('Staff Roster & Vulnerability Matrix', 'Staff Roster & Vulnerability Matrix')}
                </h3>
                <p className="font-body-sm text-body-sm text-muted-text max-w-xl mb-space-md leading-relaxed">
                  {t(
                    'Inspect who completed their weekly 10-minute micro-training, identify branch locations susceptible to SIM swap attempts, and download audit-ready compliance certificates.',
                    'Check who do their weekly training, see which branch dey vulnerable, and download compliance certificate.'
                  )}
                </p>
              </div>
              <div className="bg-surface rounded-lg p-space-md shadow-xs space-y-space-sm">
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <div className="flex items-center gap-space-xs">
                    <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-xs font-semibold">BA</div>
                    <div>
                      <div className="font-semibold text-primary-container">BrightPay - Ikeja Branch</div>
                      <div className="text-xs text-muted-text">{t('8 Staff Members Enrolled', '8 Staff Members Enrolled')}</div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 bg-success-bg text-success-text px-space-xs py-0.5 rounded text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-base"></span>
                    <span>92% Vigilance Index</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final High-Impact CTA Section */}
      <section className="w-full bg-surface py-space-3xl relative">
        <div className="max-w-container-max mx-auto px-space-lg lg:px-space-xl">
          <div className="relative text-on-primary rounded-2xl p-space-2xl md:p-space-3xl overflow-hidden shadow-lg bg-gradient-to-r from-primary-container via-[#1b345e] to-[#0f1d35] animate-liquid-gradient">
            <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
            <div className="absolute -left-16 -bottom-16 w-96 h-96 rounded-full bg-warning-base/10 blur-3xl pointer-events-none"></div>
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest/15 px-space-md py-space-xxs rounded-full mb-space-md">
                <span className="material-symbols-outlined text-warning-base text-[18px]">security</span>
                <span className="font-label-sm text-label-sm text-on-primary">{t('Empower Your People Today', 'Empower Your People Today')}</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl md:text-3xl text-on-primary mb-space-md font-bold">
                {t('Start Protecting Your Business Today', 'Start Protecting Your Business Today')}
              </h2>
              <p className="font-body-lg text-body-lg text-surface-container-high mb-space-2xl leading-relaxed">
                {t(
                  'Zero expensive subscriptions. No complex IT installation. Empower your counter staff and office team to become your firm\'s most resilient human firewall.',
                  'No expensive subscription. No complex IT installation. Make your staff become your business strongest protection.'
                )}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md">
                <Link 
                  href={isAuthenticated ? "/dashboard" : "/signup"} 
                  className="h-12 min-h-touch-target-min px-space-xl inline-flex items-center justify-center gap-space-xs font-label-md text-label-md bg-warning-base text-tertiary font-semibold rounded-lg hover:bg-warning-base/90 transition-all shadow-md active:scale-95"
                >
                  <span>{isAuthenticated ? t('Go to Dashboard', 'Go to Dashboard') : t('Start Free Training', 'Start Free Training')}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>
                <Link href="/signup" className="h-12 min-h-touch-target-min px-space-lg inline-flex items-center justify-center gap-space-xs font-label-md text-label-md text-on-primary bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 rounded-lg transition-colors backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[20px]">pin</span>
                  <span>{t('Join With Business Code', 'Join With Business Code')}</span>
                </Link>
              </div>
              <div className="mt-space-xl flex flex-wrap items-center gap-space-lg text-surface-container-high font-body-sm text-body-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-success-base text-[18px]">check_circle</span>
                  <span>{t('No credit card required', 'No credit card required')}</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-success-base text-[18px]">check_circle</span>
                  <span>{t('Native Pidgin & English modules', 'Native Pidgin & English modules')}</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-success-base text-[18px]">check_circle</span>
                  <span>{t('NDPA compliant certificate', 'NDPA compliant certificate')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
