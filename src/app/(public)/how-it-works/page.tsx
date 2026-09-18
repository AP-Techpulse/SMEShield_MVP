'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

interface TourStep {
  step: string
  titleEn: string
  titlePcm: string
  descriptionEn: string
  descriptionPcm: string
  screenshot: string
  badge: string
  details: string[]
}

const TOUR_STEPS: TourStep[] = [
  {
    step: '01',
    badge: 'Frictionless Registration',
    titleEn: 'Create Your Account in Under 60 Seconds',
    titlePcm: 'Open Your Account Fast Fast',
    descriptionEn: 'Get started with business email and password or instant Google OAuth. No enterprise credit cards, complex IT contracts, or software downloads required.',
    descriptionPcm: 'Register with your work email or Google. No need for credit card or heavy software download.',
    screenshot: '/assets/smeshield/tour/step-1-signup.png',
    details: [
      'Email/password with real-time password strength meter',
      'One-click Google OAuth authentication',
      'Bilingual interface toggle available at all times',
    ],
  },
  {
    step: '02',
    badge: 'Three-Tier Architecture',
    titleEn: 'Select Your Operational Role',
    titlePcm: 'Pick How You Dey Work',
    descriptionEn: 'SMEShield adapts its workflow to your organizational structure: Business Owner, Frontline Employee, or Independent Sole Entrepreneur.',
    descriptionPcm: 'Choose whether you be Business Owner, Staff weh get oga, or Sole Trader weh run shop by yourself.',
    screenshot: '/assets/smeshield/tour/step-2-role.png',
    details: [
      'Business Owner: Team oversight, 6-digit join codes, compliance exports',
      'Employee: Connect to employer workspace, personalized lessons',
      'Sole Entrepreneur: Tailored POS agent, trader, and freelance tracks',
    ],
  },
  {
    step: '03',
    badge: 'Workspace Architecture',
    titleEn: 'Set Up Your Business Workspace & Join Code',
    titlePcm: 'Create Your Business Space & Staff Code',
    descriptionEn: 'Business owners create a dedicated company workspace and generate persistent 6-digit invitation codes so employees can join with zero corporate bureaucracy.',
    descriptionPcm: 'Owners create company space and get 6-digit code weh staff go use enter directly.',
    screenshot: '/assets/smeshield/tour/step-3-onboarding.png',
    details: [
      'Automatic 6-digit persistent join code generation',
      'Custom business sector profiling (Retail, POS Agency, Tech, Logistics)',
      'Multi-tenant database isolation powered by PostgreSQL RLS',
    ],
  },
  {
    step: '04',
    badge: 'Initial Calibration',
    titleEn: 'Take the Baseline Diagnostic Assessment',
    titlePcm: 'Do Quick Baseline Security Check',
    descriptionEn: 'A short 5-question baseline diagnostic identifies your initial cyber awareness gaps across fake alerts, phishing, password security, and social engineering.',
    descriptionPcm: 'Answer 5 quick question to know where you strong and where you need training.',
    screenshot: '/assets/smeshield/tour/step-4-diagnostic.png',
    details: [
      'Calculates your initial Baseline Awareness Score (0–100%)',
      'Establishes pre-intervention benchmarks for academic measurement',
      'Pinpoints vulnerable habits without punitive penalties',
    ],
  },
  {
    step: '05',
    badge: 'Central Command',
    titleEn: 'Explore Your Role-Specific Dashboard',
    titlePcm: 'See Your Security Dashboard',
    descriptionEn: 'Review your Human Firewall Score (HFS), track module completions, inspect prioritized focus areas, and monitor team readiness in real time.',
    descriptionPcm: 'Check your Human Firewall Score, lessons weh remain, and how your business dey safe.',
    screenshot: '/assets/smeshield/tour/step-5-dashboard.png',
    details: [
      'Live Human Firewall Score: (Completion × 35%) + (Quiz Avg × 65%)',
      'Team roster overview and NDPA compliance audit export for owners',
      'Clear identification of strongest areas and priority threat focus',
    ],
  },
  {
    step: '06',
    badge: 'Deterministic Logic',
    titleEn: 'Receive Adaptive Module Recommendations',
    titlePcm: 'Get Lessons Weh Fit Your Business Gaps',
    descriptionEn: 'Our deterministic rule engine combines your business vertical with your diagnostic weak areas to recommend the highest-priority threat modules.',
    descriptionPcm: 'Our rule system check your business type and test answers to queue the right lessons.',
    screenshot: '/assets/smeshield/tour/step-6-recommendations.png',
    details: [
      'Zero AI hallucination: 100% deterministic weighting algorithm',
      'Dynamic reordering based on completed and failed assessment topics',
      'Full 15-module curriculum accessible at any time',
    ],
  },
  {
    step: '07',
    badge: 'Bilingual Micro-Learning',
    titleEn: 'Engage with Culturally-Grounded Lessons',
    titlePcm: 'Learn with Real Nigerian Scenarios',
    descriptionEn: 'Read bite-sized lessons with practical Nigerian scenarios: fake credit alerts, POS reversal tricks, WhatsApp CEO fraud, and SIM swaps in English or Nigerian Pidgin.',
    descriptionPcm: 'Enjoy simple lessons with everyday Naija market examples for clear English or Pidgin.',
    screenshot: '/assets/smeshield/tour/step-7-lesson.png',
    details: [
      '1-click live toggle between English and Nigerian Pidgin',
      'Frontline checklists: 3-step verification rules before releasing goods',
      'Real-world red flags analyzing authentic fraudulent screenshots',
    ],
  },
  {
    step: '08',
    badge: 'Verification & Certification',
    titleEn: 'Pass Quizzes & Verify Your Human Firewall Score',
    titlePcm: 'Pass Quiz & Collect Your Verified Pass',
    descriptionEn: 'Test your vigilance with 5 scenario-based questions per module. Scoring 80% or higher earns instant pass badges and elevates your Human Firewall resilience.',
    descriptionPcm: 'Answer 5 practice questions, score 80%+ to pass, and build your Human Firewall defense.',
    screenshot: '/assets/smeshield/tour/step-8-quiz-hfs.png',
    details: [
      '75 rigorous bilingual questions across the 15-module syllabus',
      'Instant pedagogical rationale and explanation for every answer',
      'Verifiable awareness certificates aligned with NDPA 2023 guidelines',
    ],
  },
]

export default function HowItWorksPage() {
  const { t } = useLanguage()

  return (
    <div className="w-full bg-app-bg py-space-3xl">
      <div className="max-w-container-max mx-auto px-space-lg lg:px-space-xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-label-sm text-muted-text mb-space-lg">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <span className="text-primary font-medium">How It Works</span>
        </div>

        {/* Hero Section */}
        <header className="max-w-3xl mb-space-3xl">
          <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm mb-space-sm">
            <span className="material-symbols-outlined text-[16px] text-secondary">explore</span>
            <span>Complete Platform Walkthrough</span>
          </div>
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-primary-container leading-tight tracking-tight mb-space-md">
            {t('How SMEShield Builds Your Human Firewall', 'How SMEShield Dey Build Your Security Protection')}
          </h1>
          <p className="font-body-lg text-body-lg text-muted-text leading-relaxed">
            {t(
              'Walk through the exact 8-step journey from onboarding to certified vigilance. See how SMEShield equips Nigerian business owners, employees, and sole entrepreneurs against daily social engineering scams.',
              'Follow the 8 simple steps from registration reach certified protection. See how SMEShield dey help business owners, staff, and sole traders defeat scam.'
            )}
          </p>
        </header>

        {/* Guided Tour Timeline Steps */}
        <div className="space-y-space-3xl">
          {TOUR_STEPS.map((tourStep, index) => {
            const isEven = index % 2 === 1
            return (
              <section 
                key={tourStep.step}
                className="bg-surface rounded-2xl border border-border-subtle shadow-sm overflow-hidden p-space-xl lg:p-space-2xl"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center ${isEven ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Text Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:col-start-7' : ''}`}>
                    <div className="flex items-center gap-space-sm mb-space-sm">
                      <span className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-headline-sm font-bold text-sm">
                        {tourStep.step}
                      </span>
                      <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-semibold bg-surface-container-low px-2.5 py-1 rounded-md">
                        {tourStep.badge}
                      </span>
                    </div>

                    <h2 className="font-headline-xl text-headline-xl text-primary-container mb-space-xs">
                      {t(tourStep.titleEn, tourStep.titlePcm)}
                    </h2>

                    <p className="font-body-md text-on-surface-variant mb-space-md leading-relaxed">
                      {t(tourStep.descriptionEn, tourStep.descriptionPcm)}
                    </p>

                    <div className="space-y-2 pt-space-xs border-t border-border-subtle/80 mb-space-lg">
                      {tourStep.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">check_circle</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-space-xs">
                      <Link 
                        href="/signup" 
                        className="inline-flex items-center gap-2 font-label-md text-sm text-secondary font-semibold hover:underline"
                      >
                        <span>{t('Experience this step in the app', 'Try this step for the app')}</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>

                  {/* Screenshot Mockup Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:col-start-1' : ''}`}>
                    <div className="rounded-xl overflow-hidden border border-border-subtle/80 bg-surface-container-lowest shadow-md">
                      {/* Browser Window Chrome */}
                      <div className="bg-surface-container-low px-4 py-2 border-b border-border-subtle flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-border-subtle"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-border-subtle"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-border-subtle"></span>
                        </div>
                        <div className="mx-auto text-[11px] font-mono text-muted-text truncate max-w-[200px]">
                          smeshield.ng/app
                        </div>
                      </div>
                      <div className="relative aspect-[16/10] w-full bg-surface-container">
                        <Image
                          src={tourStep.screenshot}
                          alt={`${tourStep.titleEn} platform screenshot`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </div>

        {/* Final CTA Banner */}
        <section className="mt-space-3xl bg-primary-container text-on-primary rounded-2xl p-space-2xl md:p-space-3xl relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-headline-xl text-3xl text-on-primary font-bold mb-space-sm">
              {t('Ready to Strengthen Your Business Security?', 'Ready to Protect Your Business from Scams?')}
            </h2>
            <p className="font-body-md text-surface-container-high mb-space-xl leading-relaxed">
              {t(
                'Join thousands of Nigerian SMEs, retail merchants, and agency banking operators building daily frontline vigilance.',
                'Join thousands of Nigerian SMEs and shops weh dey build daily protection against cyber scams.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-space-md">
              <Link
                href="/signup"
                className="h-12 px-space-xl inline-flex items-center justify-center gap-2 bg-warning-base text-tertiary font-semibold rounded-lg hover:bg-warning-base/90 transition shadow-md"
              >
                <span>{t('Start Free Training', 'Start Free Training')}</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
              <Link
                href="/login"
                className="h-12 px-space-lg inline-flex items-center justify-center gap-2 bg-surface-container-lowest/10 text-on-primary rounded-lg hover:bg-surface-container-lowest/20 transition border border-white/10"
              >
                <span>{t('Log In to Account', 'Log In to Account')}</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
