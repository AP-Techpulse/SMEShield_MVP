'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface TourStep {
  step: string
  id: string
  badge: string
  route: string
  roleTarget: string
  titleEn: string
  titlePcm: string
  descriptionEn: string
  descriptionPcm: string
  details: string[]
  blueprintIcon: string
  blueprintFeatures: string[]
}

const TOUR_STEPS: TourStep[] = [
  {
    step: '01',
    id: 'TOUR-01',
    badge: 'Frictionless Registration',
    route: '/signup',
    roleTarget: 'Public / New User',
    titleEn: 'Create Your Account in Under 60 Seconds',
    titlePcm: 'Open Your Account Fast Fast',
    descriptionEn: 'Get started with business email and password or instant Google OAuth. Features client-side password strength validation and statutory NDPA 2023 terms acknowledgement.',
    descriptionPcm: 'Register with your work email or Google. E get password strength meter and clear privacy terms.',
    details: [
      'Email/password with real-time password strength meter (4 tiers)',
      'One-click Google OAuth authentication gateway',
      'Mandatory unticked terms agreement and NDPA privacy acknowledgement',
    ],
    blueprintIcon: 'badge',
    blueprintFeatures: [
      'Email & Password Input Fields',
      'Real-Time Security Strength Meter',
      'Required Terms & NDPA Privacy Checkbox',
      'Google OAuth Alternative Button'
    ]
  },
  {
    step: '02',
    id: 'TOUR-02',
    badge: 'Three-Tier Architecture',
    route: '/onboarding',
    roleTarget: 'All Roles (Step 1)',
    titleEn: 'Select Your Operational Role',
    titlePcm: 'Pick How You Dey Work',
    descriptionEn: 'SMEShield adapts its workflow to your organizational structure: Business Owner, Frontline Employee, or Independent Sole Entrepreneur.',
    descriptionPcm: 'Choose whether you be Business Owner, Staff weh get oga, or Sole Trader weh run shop by yourself.',
    details: [
      'Business Owner: Team oversight, 6-digit join codes, compliance exports',
      'Employee: Connect to employer workspace, personalized lessons',
      'Sole Entrepreneur: Tailored POS agent, trader, and freelance tracks',
    ],
    blueprintIcon: 'group',
    blueprintFeatures: [
      'Role 1: Business Owner (Multi-Staff Workspace)',
      'Role 2: Employee (Company Member via Join Code)',
      'Role 3: Sole Entrepreneur (Independent POS/Trader)',
      'Sector Selector (Retail, Logistics, Agency Banking)'
    ]
  },
  {
    step: '03',
    id: 'TOUR-03',
    badge: 'Workspace Architecture',
    route: '/dashboard/team',
    roleTarget: 'Business Owner',
    titleEn: 'Set Up Your Business Workspace & Join Code',
    titlePcm: 'Create Your Business Space & Staff Code',
    descriptionEn: 'Business owners create a dedicated company workspace and generate persistent 6-digit invitation codes so employees can join with zero corporate bureaucracy.',
    descriptionPcm: 'Owners create company space and get 6-digit code weh staff go use enter directly.',
    details: [
      'Automatic 6-digit persistent join code generation',
      'Custom business sector profiling (Retail, POS Agency, Tech, Logistics)',
      'Multi-tenant database isolation powered by PostgreSQL RLS',
    ],
    blueprintIcon: 'corporate_fare',
    blueprintFeatures: [
      'Business Trading Name & Headcount Setup',
      'Persistent 6-Digit Alphanumeric Join Code',
      'Employee Roster & Invitation Key Provisioning',
      'PostgreSQL RLS Tenant Isolation Guard'
    ]
  },
  {
    step: '04',
    id: 'TOUR-04',
    badge: 'Initial Calibration',
    route: '/assessment',
    roleTarget: 'All Roles (Diagnostic)',
    titleEn: 'Take the Baseline Diagnostic Assessment',
    titlePcm: 'Do Quick Baseline Security Check',
    descriptionEn: 'A short 5-question baseline diagnostic identifies your initial cyber awareness gaps across fake alerts, phishing, password security, and social engineering.',
    descriptionPcm: 'Answer 5 quick question to know where you strong and where you need training.',
    details: [
      'Calculates your initial Baseline Awareness Score (0–100%)',
      'Establishes pre-intervention benchmarks for academic measurement',
      'Pinpoints vulnerable habits without punitive penalties',
    ],
    blueprintIcon: 'fact_check',
    blueprintFeatures: [
      '5 Realistic Nigerian Threat Scenarios',
      'Diagnostic Weak-Area Categorization',
      'Baseline Awareness Score Persistence',
      'Seed Data for Rule-Based Recommendation'
    ]
  },
  {
    step: '05',
    id: 'TOUR-05',
    badge: 'Central Command',
    route: '/dashboard',
    roleTarget: 'Role-Specific View',
    titleEn: 'Explore Your Role-Specific Dashboard',
    titlePcm: 'See Your Security Dashboard',
    descriptionEn: 'Review your Human Firewall Score (HFS), track module completions, inspect prioritized focus areas, and monitor team readiness in real time.',
    descriptionPcm: 'Check your Human Firewall Score, lessons weh remain, and how your business dey safe.',
    details: [
      'Live Human Firewall Score: (Completion × 35%) + (Quiz Avg × 65%)',
      'Team roster overview and NDPA compliance audit export for owners',
      'Clear identification of strongest areas and priority threat focus',
    ],
    blueprintIcon: 'analytics',
    blueprintFeatures: [
      'Radial Human Firewall Score Meter (0–100%)',
      'Four Awareness Tiers (Developing to Highly Aware)',
      'Owner Defense Track vs Team Readiness Dial',
      'Strongest Area & Priority Reinforcement Badges'
    ]
  },
  {
    step: '06',
    id: 'TOUR-06',
    badge: 'Deterministic Logic',
    route: '/dashboard/progress',
    roleTarget: 'Learner Experience',
    titleEn: 'Receive Adaptive Module Recommendations',
    titlePcm: 'Get Lessons Weh Fit Your Business Gaps',
    descriptionEn: 'Our deterministic rule engine combines your business vertical with your diagnostic weak areas to recommend the highest-priority threat modules.',
    descriptionPcm: 'Our rule system check your business type and test answers to queue the right lessons.',
    details: [
      'Zero AI hallucination: 100% deterministic weighting algorithm',
      'Dynamic reordering based on completed and failed assessment topics',
      'Full 15-module curriculum accessible at any time',
    ],
    blueprintIcon: 'tune',
    blueprintFeatures: [
      '+20 Weight for Baseline Weak Areas',
      '+10 Weight for Business Vertical Relevance',
      'Exclusion of Completed/Passed Modules',
      'Tie-Breaking via Standard Curriculum Index'
    ]
  },
  {
    step: '07',
    id: 'TOUR-07',
    badge: 'Bilingual Micro-Learning',
    route: '/training/1/lesson',
    roleTarget: 'Learner Experience',
    titleEn: 'Engage with Culturally-Grounded Lessons',
    titlePcm: 'Learn with Real Nigerian Scenarios',
    descriptionEn: 'Read bite-sized lessons with practical Nigerian scenarios: fake credit alerts, POS reversal tricks, WhatsApp CEO fraud, and SIM swaps in English or Nigerian Pidgin.',
    descriptionPcm: 'Enjoy simple lessons with everyday Naija market examples for clear English or Pidgin.',
    details: [
      '1-click live toggle between English and Nigerian Pidgin',
      'Frontline checklists: 3-step verification rules before releasing goods',
      'Real-world red flags analyzing authentic fraudulent screenshots',
    ],
    blueprintIcon: 'translate',
    blueprintFeatures: [
      'Instant English ↔ Nigerian Pidgin Live Toggle',
      '3-Step Frontline Physical Defense Checklist',
      'Authentic Local Market & Agency Scenarios',
      'Red Flag Analysis with Verified Assets'
    ]
  },
  {
    step: '08',
    id: 'TOUR-08',
    badge: 'Verification & Certification',
    route: '/training/1/quiz',
    roleTarget: 'Assessment Engine',
    titleEn: 'Pass Quizzes & Verify Your Human Firewall Score',
    titlePcm: 'Pass Quiz & Collect Your Verified Pass',
    descriptionEn: 'Test your vigilance with 5 scenario-based questions per module. Scoring 80% or higher earns instant pass badges and elevates your Human Firewall resilience.',
    descriptionPcm: 'Answer 5 practice questions, score 80%+ to pass, and build your Human Firewall defense.',
    details: [
      '75 rigorous bilingual questions across the 15-module syllabus',
      'Instant pedagogical rationale and explanation for every answer',
      'Verifiable awareness certificates aligned with NDPA 2023 guidelines',
    ],
    blueprintIcon: 'workspace_premium',
    blueprintFeatures: [
      '5 Scenario Questions per Module (75 Total)',
      'Strict 80% Passing Mastery Threshold',
      'Instant Pedagogical Rationale Modal',
      'Timestamped NDPA Awareness Certificate'
    ]
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
                      <span className="font-mono text-[11px] text-muted-text bg-surface-container-lowest px-2 py-0.5 rounded border border-border-subtle">
                        {tourStep.id}
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

                    <div className="pt-space-xs flex items-center gap-4">
                      <Link 
                        href={tourStep.route} 
                        className="inline-flex items-center gap-2 font-label-md text-sm text-secondary font-semibold hover:underline"
                      >
                        <span>{t('View in Application', 'View for App')}</span>
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      </Link>
                      <span className="text-xs text-muted-text font-mono">
                        Route: {tourStep.route}
                      </span>
                    </div>
                  </div>

                  {/* Neutral Illustrated Blueprint Frame (Replacing Obsolete Stitch Mockups) */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:col-start-1' : ''}`}>
                    <div className="rounded-xl overflow-hidden border border-border-subtle/80 bg-surface-container-lowest shadow-md">
                      {/* Browser Window Chrome */}
                      <div className="bg-surface-container-low px-4 py-2 border-b border-border-subtle flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-border-subtle"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-border-subtle"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-border-subtle"></span>
                        </div>
                        <div className="text-[11px] font-mono text-muted-text truncate max-w-[200px]">
                          smeshield.ng{tourStep.route}
                        </div>
                        <span className="text-[10px] uppercase font-mono tracking-wider bg-surface-container-high px-2 py-0.5 rounded text-primary font-medium">
                          {tourStep.roleTarget}
                        </span>
                      </div>

                      {/* Technical Architecture & UI Blueprint Frame */}
                      <div className="p-space-lg bg-surface-container/30 border-dashed border border-border-subtle/70 m-space-md rounded-lg flex flex-col justify-between min-h-[260px]">
                        <div>
                          <div className="flex items-center justify-between mb-space-sm">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-secondary text-[24px]">{tourStep.blueprintIcon}</span>
                              <span className="font-label-md font-semibold text-primary-container text-sm">Interface Schema: Step {tourStep.step}</span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-warning-text bg-warning-bg px-2 py-0.5 rounded border border-warning-base/20">
                              <span className="material-symbols-outlined text-[13px]">pending</span>
                              <span>Screenshot Pending Manual Capture</span>
                            </span>
                          </div>

                          <div className="space-y-1.5 mt-space-md">
                            {tourStep.blueprintFeatures.map((feat, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-on-surface-variant font-mono bg-surface p-2 rounded border border-border-subtle/50">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-space-md pt-space-xs border-t border-border-subtle/50 flex items-center justify-between text-[11px] text-muted-text">
                          <span>Target Asset: <code className="font-mono text-primary font-semibold">{tourStep.id.toLowerCase()}.png</code></span>
                          <span>Viewport: Desktop 1440×900 / Mobile 390×844</span>
                        </div>
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
                'Join forward-thinking Nigerian SMEs, retail merchants, and agency banking operators building daily frontline vigilance.',
                'Join Nigerian SMEs and shops weh dey build daily protection against cyber scams.'
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
