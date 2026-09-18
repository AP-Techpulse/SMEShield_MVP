'use server'

import { createClient } from '@/utils/supabase/server'

export interface ModuleData {
  id: string
  order_index: number
  title_en: string
  title_pcm: string
  content_en: string
  content_pcm: string
  threat_category: string
  business_type_tags: string[]
  description_en?: string
  description_pcm?: string
  estimated_duration?: number
  image_url?: string
  learning_objectives_en?: string[]
  learning_objectives_pcm?: string[]
  key_takeaways_en?: string[]
  key_takeaways_pcm?: string[]
  scenario_en?: {
    situation: string
    warning_signs: string[]
    risky_action: string
    safe_action: string
    explanation: string
  }
  scenario_pcm?: {
    situation: string
    warning_signs: string[]
    risky_action: string
    safe_action: string
    explanation: string
  }
  // These will be calculated
  relevance_score?: number
  is_weak_area?: boolean
  is_business_relevant?: boolean
  status?: 'not_started' | 'in_progress' | 'completed'
}

export async function getRecommendedModules(): Promise<{ recommended: ModuleData[]; completed: ModuleData[]; allOthers: ModuleData[] }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // 1. Fetch user profile to get business_id and role
  const { data: profile } = await supabase
    .from('users')
    .select('business_id, role')
    .eq('id', user.id)
    .single()

  let userBusinessType = ''
  
  if (profile?.business_id) {
    const { data: business } = await supabase
      .from('businesses')
      .select('business_type')
      .eq('id', profile.business_id)
      .single()
    if (business) {
      userBusinessType = business.business_type
    }
  }

  // 1b. Map the Onboarding UI business type string to the DB module tags
  const BUSINESS_TYPE_MAPPING: Record<string, string> = {
    pos: 'Retail & General Trade',
    tech: 'Tech & Telecom',
    school: 'Education & Training',
    fashion: 'Art, Beauty & Fashion',
    food: 'Agriculture & Food',
    retail: 'Retail & General Trade',
    professional: 'Professional Services',
    general: 'all'
  }

  const mappedBusinessTag = BUSINESS_TYPE_MAPPING[userBusinessType] || 'all'

  // 2. Fetch the user's latest baseline assessment to get weak areas
  const { data: baselineResult } = await supabase
    .from('baseline_results')
    .select('weak_areas')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const weakAreas: string[] = baselineResult?.weak_areas || []

  // 3. Fetch all modules
  const { data: modulesData } = await supabase
    .from('modules')
    .select('*')
    .order('order_index', { ascending: true })

  const allModules: ModuleData[] = modulesData || []

  // 4. Fetch user progress (to know which are completed)
  const { data: progressData } = await supabase
    .from('user_progress')
    .select('module_id, status')
    .eq('user_id', user.id)

  const progressMap = new Map<string, 'not_started' | 'in_progress' | 'completed'>()
  progressData?.forEach(p => progressMap.set(p.module_id, p.status))

  // 5. Calculate scores
  const scoredModules = allModules.map(module => {
    let score = 10 // Base score

    const isWeakArea = weakAreas.includes(module.threat_category)
    const isBusinessRelevant = mappedBusinessTag === 'all' || (module.business_type_tags && module.business_type_tags.includes(mappedBusinessTag))

    if (isWeakArea) score += 20
    if (isBusinessRelevant) score += 10

    return {
      ...module,
      relevance_score: score,
      is_weak_area: isWeakArea,
      is_business_relevant: isBusinessRelevant,
      status: progressMap.get(module.id) || 'not_started'
    }
  })

  // 6. Separate and Sort
  const completed = scoredModules.filter(m => m.status === 'completed')
  const notCompleted = scoredModules.filter(m => m.status !== 'completed')

  // Sort: High score first. If tie, preserve order_index (ascending).
  notCompleted.sort((a, b) => {
    if (b.relevance_score! !== a.relevance_score!) {
      return b.relevance_score! - a.relevance_score!
    }
    return a.order_index - b.order_index
  })

  // Top 4 go to recommended, rest to allOthers
  const recommended = notCompleted.slice(0, 4)
  const allOthers = notCompleted.slice(4)

  return { recommended, completed, allOthers }
}
