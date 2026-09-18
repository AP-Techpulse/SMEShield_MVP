import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { getRecommendedModules } from '@/lib/adaptive-engine'
import { LearnerDashboardView, OwnerDashboardView, SoleEntrepreneurDashboardView } from '@/components/dashboard/DashboardViews'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Profile is already checked in layout, but we fetch it for the greeting.
  const { data: profile } = await supabase
    .from('users')
    .select('*, businesses(name, business_type, location_state, join_code)')
    .eq('id', user.id)
    .single()

  if (!profile) return null

  if (profile.businesses) {
    const biz = profile.businesses as { name?: string; business_type?: string; location_state?: string; join_code?: string }
    profile.business_name = biz.name || profile.business_name
    profile.business_type = biz.business_type || profile.business_type
    profile.location = biz.location_state || profile.location
    profile.business_join_code = biz.join_code
  }

  // Fetch recommendations
  const { recommended, completed, allOthers } = await getRecommendedModules()

  let activeEmployeesCount = 0
  let teamReadiness = 0
  let pendingInvitesCount = 0
  let quizMastery = 0
  let needsAttentionCount = 0
  
  if (profile.role === 'business_owner' && profile.business_id) {
    const { data: employees } = await supabase
      .from('users')
      .select('id, full_name, user_progress(status, module_id), assessment_results(score_percentage, passed)')
      .eq('business_id', profile.business_id)
      .eq('role', 'employee')

    if (employees) {
      activeEmployeesCount = employees.length
      if (employees.length > 0) {
        const totalCompleted = employees.reduce((sum, emp) => {
          return sum + (emp.user_progress?.filter((p: { status: string }) => p.status === 'completed').length || 0)
        }, 0)
        
        // 15 modules per employee
        const maxPossible = employees.length * 15
        teamReadiness = Math.round((totalCompleted / maxPossible) * 100)

        // Real quiz mastery across employees
        const allScores: number[] = []
        employees.forEach(emp => {
          if (emp.assessment_results && Array.isArray(emp.assessment_results)) {
            emp.assessment_results.forEach((r: { score_percentage: number }) => {
              if (typeof r.score_percentage === 'number') allScores.push(r.score_percentage)
            })
          }
        })
        if (allScores.length > 0) {
          quizMastery = Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
        }

        // Needs attention: employees who have 0 completed modules
        needsAttentionCount = employees.filter(emp => {
          const completedCount = emp.user_progress?.filter((p: { status: string }) => p.status === 'completed').length || 0
          return completedCount === 0
        }).length
      }
    }

    const { count: pendingCount } = await supabase
      .from('employee_invites')
      .select('id', { count: 'exact', head: true })
      .eq('business_id', profile.business_id)
      .eq('status', 'pending')

    pendingInvitesCount = pendingCount || 0
  }

  // ─── Human Firewall Score (approved formula) ─────────────────────────────
  // HFS = (completion_percentage × 0.35) + (avg_completed_module_quiz_score × 0.65)
  // Baseline Awareness Score = initial assessment score (unchanged)
  // Awareness Improvement = HFS - Baseline Awareness Score
  // ────────────────────────────────────────────────────────────────────────────
  const { data: baselineResult } = await supabase
    .from('baseline_results')
    .select('score_percentage, weak_areas')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data: ownQuizzes } = await supabase
    .from('assessment_results')
    .select('score_percentage, passed, module_id, modules(threat_category, title_en)')
    .eq('user_id', user.id)

  const baselineScore = typeof baselineResult?.score_percentage === 'number'
    ? baselineResult.score_percentage
    : null
  const totalModules = 15
  const completionPercentage = Math.round((completed.length / totalModules) * 100)
  const userAvgQuizScore = ownQuizzes && ownQuizzes.length > 0
    ? Math.round(ownQuizzes.reduce((acc, q) => acc + q.score_percentage, 0) / ownQuizzes.length)
    : 0

  // Human Firewall Score: represents current cybersecurity awareness and training performance
  // HFS = (completion_percentage × 0.35) + (average_completed_module_quiz_score × 0.65)
  const humanFirewallScore = Math.round(
    (completionPercentage * 0.35) + (userAvgQuizScore * 0.65)
  )
  // Awareness Improvement: only calculate when both a valid baseline AND at least one completed module exist
  const hasCompletedModules = completed.length > 0
  const hasBaseline = typeof baselineScore === 'number'
  const awarenessImprovement = (hasBaseline && hasCompletedModules)
    ? humanFirewallScore - baselineScore
    : null

  // ─── Phase 3.1: Awareness Level & Topic Analytics ─────────────────────────
  const awarenessLevel: 'Developing' | 'Aware' | 'Strong' | 'Highly Aware' = 
    humanFirewallScore >= 85 ? 'Highly Aware' :
    humanFirewallScore >= 70 ? 'Strong' :
    humanFirewallScore >= 50 ? 'Aware' : 'Developing'

  // Threat Category Performance Analytics
  const categoryScores: Record<string, { total: number; count: number }> = {}
  if (ownQuizzes && ownQuizzes.length > 0) {
    ownQuizzes.forEach(q => {
      const cat = (q.modules as { threat_category?: string } | null)?.threat_category
      if (cat && typeof q.score_percentage === 'number') {
        if (!categoryScores[cat]) categoryScores[cat] = { total: 0, count: 0 }
        categoryScores[cat].total += q.score_percentage
        categoryScores[cat].count += 1
      }
    })
  }

  const scoredCategories = Object.entries(categoryScores).map(([cat, val]) => ({
    category: cat,
    avgScore: Math.round(val.total / val.count)
  })).sort((a, b) => b.avgScore - a.avgScore)

  let strongestArea: string | null = null
  let weakestArea: string | null = null

  if (scoredCategories.length > 0) {
    strongestArea = `${scoredCategories[0].category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} (${scoredCategories[0].avgScore}%)`
    if (scoredCategories.length > 1) {
      const lowest = scoredCategories[scoredCategories.length - 1]
      weakestArea = `${lowest.category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} (${lowest.avgScore}%)`
    } else if (scoredCategories[0].avgScore < 80) {
      weakestArea = `${scoredCategories[0].category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} (${scoredCategories[0].avgScore}%)`
    }
  }

  if (!weakestArea && baselineResult?.weak_areas && Array.isArray(baselineResult.weak_areas) && baselineResult.weak_areas.length > 0) {
    weakestArea = baselineResult.weak_areas[0].replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  }

  return (
    <div className="max-w-container-max mx-auto px-space-lg py-space-xl w-full">
      {profile.role === 'business_owner' && (
        <OwnerDashboardView 
          profile={profile} 
          recommended={recommended} 
          allOthers={allOthers} 
          completed={completed} 
          teamReadiness={teamReadiness} 
          activeEmployeesCount={activeEmployeesCount} 
          pendingInvitesCount={pendingInvitesCount}
          quizMastery={quizMastery}
          needsAttentionCount={needsAttentionCount}
          baselineScore={baselineScore}
          completionPercentage={completionPercentage}
          avgQuizScore={userAvgQuizScore}
          humanFirewallScore={humanFirewallScore}
          awarenessImprovement={awarenessImprovement}
          awarenessLevel={awarenessLevel}
          strongestArea={strongestArea}
          weakestArea={weakestArea}
        />
      )}
      {profile.role === 'sole_entrepreneur' && (
        <SoleEntrepreneurDashboardView 
          profile={profile} 
          recommended={recommended} 
          allOthers={allOthers} 
          completed={completed} 
          baselineScore={baselineScore}
          completionPercentage={completionPercentage}
          avgQuizScore={userAvgQuizScore}
          humanFirewallScore={humanFirewallScore}
          awarenessImprovement={awarenessImprovement}
          awarenessLevel={awarenessLevel}
          strongestArea={strongestArea}
          weakestArea={weakestArea}
        />
      )}
      {profile.role === 'employee' && (
        <LearnerDashboardView 
          profile={profile} 
          recommended={recommended} 
          allOthers={allOthers} 
          completed={completed} 
          baselineScore={baselineScore}
          completionPercentage={completionPercentage}
          avgQuizScore={userAvgQuizScore}
          humanFirewallScore={humanFirewallScore}
          awarenessImprovement={awarenessImprovement}
          awarenessLevel={awarenessLevel}
          strongestArea={strongestArea}
          weakestArea={weakestArea}
        />
      )}
    </div>
  )
}
