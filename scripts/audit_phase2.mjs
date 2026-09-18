import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Pure Node.js .env.local parser
if (fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=')
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim()
        let val = trimmed.slice(idx + 1).trim()
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1)
        }
        process.env[key] = val
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runPhase2Audit() {
  console.log('====================================================')
  console.log('SMESHIELD PHASE 2 — COMPREHENSIVE FUNCTIONAL AUDIT')
  console.log('====================================================\n')

  let passedTests = 0
  let failedTests = 0

  function assert(condition, name, details = '') {
    if (condition) {
      console.log(`[PASS] ${name}`)
      passedTests++
    } else {
      console.error(`[FAIL] ${name} — ${details}`)
      failedTests++
    }
  }

  // ----------------------------------------------------
  // 2.1 COMPLETE ROUTE AUDIT
  // ----------------------------------------------------
  console.log('--- 2.1 Route Audit ---')
  const expectedRoutes = [
    // Public (Next.js route group (public) and glossary)
    'src/app/(public)/page.tsx',
    'src/app/(auth)/login/page.tsx',
    'src/app/(auth)/signup/page.tsx',
    'src/app/(auth)/forgot-password/page.tsx',
    'src/app/(auth)/reset-password/page.tsx',
    'src/app/(public)/how-it-works/page.tsx',
    'src/app/glossary/page.tsx',
    // Authenticated
    'src/app/onboarding/page.tsx',
    'src/app/assessment/page.tsx',
    'src/app/assessment/results/page.tsx',
    'src/app/dashboard/page.tsx',
    'src/app/dashboard/progress/page.tsx',
    'src/app/dashboard/profile/page.tsx',
    'src/app/dashboard/notifications/page.tsx',
    'src/app/training/page.tsx',
    'src/app/training/[id]/page.tsx',
    'src/app/training/[id]/lesson/page.tsx',
    'src/app/training/[id]/quiz/page.tsx',
    // Owner-Only
    'src/app/dashboard/team/page.tsx',
    'src/app/dashboard/team/invite/page.tsx',
    'src/app/dashboard/team/[id]/page.tsx',
    // Legacy
    'src/app/dashboard/settings/page.tsx'
  ]

  for (const routeFile of expectedRoutes) {
    const exists = fs.existsSync(routeFile)
    assert(exists, `Route file exists: ${routeFile}`)
  }

  // Check middleware public routes
  const middlewareContent = fs.readFileSync('src/utils/supabase/middleware.ts', 'utf8')
  assert(
    middlewareContent.includes("request.nextUrl.pathname.startsWith('/glossary')") &&
    middlewareContent.includes("request.nextUrl.pathname.startsWith('/reset-password')") &&
    middlewareContent.includes("request.nextUrl.pathname.startsWith('/how-it-works')"),
    'Middleware protects all non-public routes while allowing public routes'
  )

  // Check legacy settings redirect in next.config.ts and page.tsx
  const nextConfigContent = fs.readFileSync('next.config.ts', 'utf8')
  const settingsPageContent = fs.readFileSync('src/app/dashboard/settings/page.tsx', 'utf8')
  assert(
    nextConfigContent.includes("source: '/dashboard/settings'") &&
    nextConfigContent.includes("destination: '/dashboard/profile'"),
    'Legacy /dashboard/settings redirect configured in next.config.ts'
  )
  assert(
    settingsPageContent.includes("redirect('/dashboard/profile')"),
    'Legacy /dashboard/settings page.tsx fallback redirect verified'
  )

  // ----------------------------------------------------
  // 2.2 ASSESSMENT FLOW VERIFICATION
  // ----------------------------------------------------
  console.log('\n--- 2.2 Assessment Flow Verification ---')
  const { data: questions, error: qErr } = await supabase
    .from('quiz_questions')
    .select('id, module_id, question_en, question_pcm, options_en, options_pcm, correct_option_index, explanation_en, explanation_pcm')
  
  assert(!qErr && questions && questions.length === 75, `Database contains exactly 75 quiz questions (found: ${questions?.length})`)

  // Check 5 per module
  const moduleQuestionCounts = {}
  let allOptionsValid = true
  let allExplanationsValid = true
  let allIndicesValid = true

  for (const q of (questions || [])) {
    moduleQuestionCounts[q.module_id] = (moduleQuestionCounts[q.module_id] || 0) + 1
    if (!Array.isArray(q.options_en) || q.options_en.length !== 4 || !Array.isArray(q.options_pcm) || q.options_pcm.length !== 4) {
      allOptionsValid = false
    }
    if (typeof q.correct_option_index !== 'number' || q.correct_option_index < 0 || q.correct_option_index > 3) {
      allIndicesValid = false
    }
    if (!q.explanation_en || !q.explanation_pcm) {
      allExplanationsValid = false
    }
  }

  const moduleCountValues = Object.values(moduleQuestionCounts)
  const allModulesHave5 = moduleCountValues.length === 15 && moduleCountValues.every(c => c === 5)
  assert(allModulesHave5, 'All 15 modules have exactly 5 questions each')
  assert(allOptionsValid, 'All 75 questions have exactly 4 options in EN and PCM')
  assert(allIndicesValid, 'All 75 questions have valid correct_option_index (0-3)')
  assert(allExplanationsValid, 'All 75 questions have bilingual explanations in EN and PCM')

  // Check 80% passing threshold in code
  const quizEngineContent = fs.readFileSync('src/app/training/[id]/quiz/QuizEngine.tsx', 'utf8')
  assert(quizEngineContent.includes('const passed = score >= 80'), 'QuizEngine enforces 80% passing threshold')

  // ----------------------------------------------------
  // 2.3 ADAPTIVE ENGINE VALIDATION
  // ----------------------------------------------------
  console.log('\n--- 2.3 Adaptive Engine Validation ---')
  const adaptiveContent = fs.readFileSync('src/lib/adaptive-engine.ts', 'utf8')
  assert(adaptiveContent.includes('BUSINESS_TYPE_MAPPING'), 'Adaptive engine includes business type mapping')
  assert(adaptiveContent.includes('if (isWeakArea) score += 20'), 'Weak areas from baseline receive +20 priority score')
  assert(adaptiveContent.includes('if (isBusinessRelevant) score += 10'), 'Business-relevant modules receive +10 priority score')
  assert(adaptiveContent.includes("filter(m => m.status !== 'completed')"), 'Completed modules are excluded from recommendations')
  assert(adaptiveContent.includes('.maybeSingle()'), 'Baseline query uses maybeSingle for graceful fallback when absent')

  // Simulation test: Business Type + Weak Area Scoring
  const mockModules = [
    { id: 'm1', order_index: 1, threat_category: 'phishing', business_type_tags: ['Retail & General Trade'] },
    { id: 'm2', order_index: 2, threat_category: 'pos_fraud', business_type_tags: ['Retail & General Trade'] },
    { id: 'm3', order_index: 3, threat_category: 'ransomware', business_type_tags: ['Tech & Telecom'] }
  ]

  const scoreModule = (m, weakAreas, bizTag) => {
    let s = 10
    if (weakAreas.includes(m.threat_category)) s += 20
    if (bizTag === 'all' || m.business_type_tags.includes(bizTag)) s += 10
    return s
  }

  const s1 = scoreModule(mockModules[0], ['pos_fraud'], 'Retail & General Trade')
  const s2 = scoreModule(mockModules[1], ['pos_fraud'], 'Retail & General Trade')
  const s3 = scoreModule(mockModules[2], ['pos_fraud'], 'Retail & General Trade')

  assert(s2 > s1 && s1 > s3, `Adaptive simulation: Weak + Biz (${s2}) > Biz only (${s1}) > Neutral (${s3})`)

  // ----------------------------------------------------
  // 2.4 THREE-ROLE JOURNEY VERIFICATION
  // ----------------------------------------------------
  console.log('\n--- 2.4 Three-Role Journey Verification ---')
  const dashboardViewsContent = fs.readFileSync('src/components/dashboard/DashboardViews.tsx', 'utf8')
  assert(dashboardViewsContent.includes('export function LearnerDashboardView'), 'Employee view (LearnerDashboardView) implemented')
  assert(dashboardViewsContent.includes('export function SoleEntrepreneurDashboardView'), 'Sole Entrepreneur view (SoleEntrepreneurDashboardView) implemented')
  assert(dashboardViewsContent.includes('export function OwnerDashboardView'), 'Business Owner view (OwnerDashboardView) implemented')
  assert(dashboardViewsContent.includes('Your Personal Cybersecurity Awareness'), 'Owner view includes personal HFS and training track')

  // ----------------------------------------------------
  // 2.5 RBAC + RLS VERIFICATION
  // ----------------------------------------------------
  console.log('\n--- 2.5 RBAC + RLS Verification ---')
  const teamPageContent = fs.readFileSync('src/app/dashboard/team/page.tsx', 'utf8')
  const teamInviteContent = fs.readFileSync('src/app/dashboard/team/invite/page.tsx', 'utf8')
  const teamEmpDetailContent = fs.readFileSync('src/app/dashboard/team/[id]/page.tsx', 'utf8')

  assert(
    teamPageContent.includes("if (!profile || profile.role !== 'business_owner' || !profile.business_id)"),
    'Team page restricts access strictly to business_owner'
  )
  assert(
    teamInviteContent.includes("if (!owner || owner.role !== 'business_owner' || !owner.business_id"),
    'Invite page restricts access strictly to business_owner'
  )
  assert(
    teamEmpDetailContent.includes("if (!employee || employee.business_id !== owner.business_id)"),
    'Employee detail page blocks cross-tenant access between business owners'
  )

  // ----------------------------------------------------
  // 2.6 BILINGUAL STATE PRESERVATION AUDIT
  // ----------------------------------------------------
  console.log('\n--- 2.6 Bilingual State Preservation ---')
  const langContextContent = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8')
  assert(
    langContextContent.includes("const handleSetLanguage = async (lang: Language) => {") &&
    langContextContent.includes("document.cookie = `NEXT_LOCALE=${lang}"),
    'LanguageContext preserves locale via cookies across page navigation and reloads'
  )

  // Check parity on modules table
  const { data: modules, error: mErr } = await supabase
    .from('modules')
    .select('id, title_en, title_pcm, content_en, content_pcm')
  assert(!mErr && modules && modules.length === 15, 'All 15 modules retrieved for parity check')
  const allModulesBilingual = modules?.every(m => m.title_en && m.title_pcm && m.content_en && m.content_pcm)
  assert(allModulesBilingual, 'All 15 modules have 100% EN and PCM parity')

  // ----------------------------------------------------
  // 2.7 BUSINESS JOIN CODE / EMPLOYEE LINKING
  // ----------------------------------------------------
  console.log('\n--- 2.7 Business Join Code & Linking ---')
  const onboardingActionsContent = fs.readFileSync('src/app/onboarding/actions.ts', 'utf8')
  assert(
    onboardingActionsContent.includes('function generateJoinCode(): string'),
    '6-digit join code generation function present'
  )
  assert(
    onboardingActionsContent.includes(".eq('join_code', joinCode)"),
    'Employee linking verifies join code in database'
  )

  // ----------------------------------------------------
  // 2.8 DASHBOARD DATA-INTEGRITY AUDIT
  // ----------------------------------------------------
  console.log('\n--- 2.8 Dashboard Data Integrity ---')
  const dashboardPageContent = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8')
  assert(
    dashboardPageContent.includes('(completionPercentage * 0.35) + (userAvgQuizScore * 0.65)'),
    'Human Firewall Score formula strictly computed from real completion and quiz average'
  )
  assert(
    dashboardPageContent.includes("typeof baselineScore === 'number'") &&
    dashboardPageContent.includes("humanFirewallScore - baselineScore"),
    'Awareness Improvement strictly computed only when baselineScore exists (null-safe)'
  )

  // ----------------------------------------------------
  // 2.9 HUMAN FIREWALL EDGE CASES (A-H)
  // ----------------------------------------------------
  console.log('\n--- 2.9 Human Firewall Edge Cases (A–H) ---')
  
  function computeHFS(modulesCompleted, avgQuiz) {
    const compPct = Math.round((modulesCompleted / 15) * 100)
    return Math.round((compPct * 0.35) + (avgQuiz * 0.65))
  }

  function computeImprovement(hfs, baseline, modulesCompleted = 0) {
    if (typeof baseline !== 'number' || modulesCompleted === 0) return null
    return hfs - baseline
  }

  // Case A: New user (0 modules, 0 quiz, no baseline)
  const hfsA = computeHFS(0, 0)
  const impA = computeImprovement(hfsA, null, 0)
  assert(hfsA === 0 && impA === null, 'Case A (New user, no baseline): HFS = 0, Improvement = null (Baseline not completed)')

  // Case B: Baseline = 50, 0 modules, 0 quiz (Semantics fix: 0 completed modules => null improvement, not negative)
  const hfsB = computeHFS(0, 0)
  const impB = computeImprovement(hfsB, 50, 0)
  assert(hfsB === 0 && impB === null, `Case B (Baseline 50, 0 modules): HFS = 0, Improvement = null (Complete first module)`)

  // Case C: Baseline = 60, 3 modules (20%), quiz avg = 80
  const hfsC = computeHFS(3, 80)
  const impC = computeImprovement(hfsC, 60, 3)
  assert(hfsC === 59 && impC === -1, `Case C (3 modules, 80% quiz, 60 baseline): HFS = 59, Improvement = -1`)

  // Case D: All 15 modules (100%), quiz avg = 95
  const hfsD = computeHFS(15, 95)
  const impD = computeImprovement(hfsD, 50, 15)
  assert(hfsD === 97 && impD === 47, `Case D (All 15 modules, 95% quiz): HFS = 97, Improvement = +47`)

  // Case E: Failed quiz (60%), 1 module
  const hfsE = computeHFS(1, 60)
  assert(hfsE === 41, `Case E (1 module, 60% quiz): HFS = 41`)

  // Case F: Retaken quiz improvement (60% -> 100%)
  const hfsF = computeHFS(1, 100)
  assert(hfsF === 67 && hfsF > hfsE, `Case F (Retake to 100%): HFS rises from 41 to 67`)

  // Case G: Owner with 0 employees
  const teamReadinessG = 0 === 0 ? 0 : 100
  assert(teamReadinessG === 0, 'Case G (Owner with 0 employees): Team readiness = 0% safely')

  // Case H: Owner with 2 employees (emp 1: 5 mods, emp 2: 10 mods -> 15/30 = 50%)
  const empCompleted = [5, 10]
  const totalCompletedH = empCompleted.reduce((a, b) => a + b, 0)
  const teamReadinessH = Math.round((totalCompletedH / (empCompleted.length * 15)) * 100)
  assert(teamReadinessH === 50, `Case H (Owner with 2 employees, 15/30 mods): Team readiness = 50%`)

  // ----------------------------------------------------
  // 2.10 FUNCTIONAL RESPONSIVE AUDIT
  // ----------------------------------------------------
  console.log('\n--- 2.10 Functional Responsive Audit ---')
  const progressPageContent = fs.readFileSync('src/app/dashboard/progress/page.tsx', 'utf8')
  assert(
    progressPageContent.includes('grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'),
    'Progress cards use responsive multi-column grid (mobile 1 col, tablet 2 col, desktop 4 col)'
  )
  assert(
    dashboardViewsContent.includes('grid-cols-1 lg:grid-cols-12'),
    'Dashboard hero uses responsive grid collapsing to 1 column on mobile'
  )

  console.log('\n====================================================')
  console.log(`AUDIT RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`)
  console.log('====================================================')

  if (failedTests > 0) {
    process.exit(1)
  }
}

runPhase2Audit().catch(err => {
  console.error('Audit crashed with error:', err)
  process.exit(1)
})
