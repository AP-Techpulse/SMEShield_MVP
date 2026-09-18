import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ModuleOverviewPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: moduleData, error } = await supabase
    .from('modules')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !moduleData) {
    redirect('/training')
  }

  // Get user profile to determine business type for adaptive context
  const { data: profile } = await supabase
    .from('users')
    .select('business_id')
    .eq('id', user.id)
    .single()

  let userBusinessType = 'General'
  if (profile?.business_id) {
    const { data: business } = await supabase
      .from('businesses')
      .select('business_type')
      .eq('id', profile.business_id)
      .single()
    if (business) userBusinessType = business.business_type
  }

  // Fetch baseline results to see if this is a weak area
  const { data: baselineResult } = await supabase
    .from('baseline_results')
    .select('weak_areas')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const weakAreas: string[] = baselineResult?.weak_areas || []
  const isWeakArea = weakAreas.includes(moduleData.threat_category)

  // Get user progress for this module
  const { data: progress } = await supabase
    .from('user_progress')
    .select('status')
    .eq('user_id', user.id)
    .eq('module_id', id)
    .single()

  const status = progress?.status || 'not_started'

  let buttonText = 'Start Module'
  let progressPercentage = 0
  if (status === 'in_progress') {
    buttonText = 'Continue Module'
    progressPercentage = 50
  }
  if (status === 'completed') {
    buttonText = 'Review Module'
    progressPercentage = 100
  }

  const langCookie = (await headers()).get('cookie')?.split('; ').find(row => row.startsWith('NEXT_LOCALE='))?.split('=')[1] || 'en'
  const isPcm = langCookie === 'pcm'

  const title = isPcm ? moduleData.title_pcm : moduleData.title_en
  const description = isPcm ? moduleData.description_pcm : moduleData.description_en
  const learningObjectives = isPcm ? moduleData.learning_objectives_pcm : moduleData.learning_objectives_en
  
  // Provide defaults if null
  const safeObjectives = learningObjectives || []

  // Derived sections for the syllabus
  const syllabus = [
    { title: isPcm ? 'Core Concept' : 'Core Concept', desc: isPcm ? 'Wetin be the main point' : 'The fundamental principles of this threat.' },
    { title: isPcm ? 'Real-world Scenario' : 'Real-world Scenario', desc: isPcm ? 'How e dey happen for real life' : 'Practical example based on Nigerian workplace realities.' },
    { title: isPcm ? 'Key Takeaways' : 'Key Takeaways', desc: isPcm ? 'Wetin to hold tight' : 'Actionable steps to prevent this attack.' },
    { title: isPcm ? 'Knowledge Check' : 'Knowledge Check', desc: isPcm ? 'Test yourself' : 'A short quiz to verify your understanding.' }
  ]

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-container-max mx-auto px-4 lg:px-8 py-8 lg:py-12">
        
        {/* Top Breadcrumb & Metadata Utility */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-text">
            <Link href="/training" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">school</span>
              Training Library
            </Link>
            <span className="text-outline-variant select-none">/</span>
            <span className="font-semibold text-primary line-clamp-1">Module {moduleData.order_index}: {title}</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px] text-secondary">translate</span>
            <span className="">Available in English & Pidgin</span>
          </div>
        </div>

        {/* Top Hero Card (Editorial Split Banner) */}
        <section className="bg-surface rounded-xl shadow-sm overflow-hidden mb-12 border border-border-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Text & Action Column */}
            <div className="lg:col-span-7 p-6 lg:p-12 flex flex-col justify-between">
              <div>
                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-xs font-semibold">
                    <span className="material-symbols-outlined text-[14px]">category</span>
                    {moduleData.threat_category?.toUpperCase() || 'GENERAL'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    {moduleData.estimated_duration || 5} mins total
                  </span>
                  {isWeakArea && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-danger-bg text-danger-text text-xs font-semibold">
                      <span className="material-symbols-outlined text-[14px]">priority_high</span>
                      High Exposure Threat
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h1 className="font-serif text-3xl lg:text-[32px] lg:leading-[42px] text-primary font-bold tracking-tight mb-3">
                  Module {moduleData.order_index}: {title}
                </h1>
                <p className="text-lg text-muted-text max-w-2xl mb-8">
                  {description}
                </p>

                {/* Progress Snapshot Bar */}
                <div className="bg-surface-container-low rounded-lg p-4 mb-8">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-primary flex items-center gap-1.5 font-semibold">
                      <span className="material-symbols-outlined text-[18px] text-secondary">sync</span>
                      Course Progress: {progressPercentage}% Complete
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Actions Row */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link 
                  href={`/training/${id}/lesson`}
                  className="h-12 px-8 rounded-lg bg-primary-container text-on-primary font-semibold shadow-sm hover:bg-primary transition-all flex items-center justify-center gap-2"
                >
                  <span className="">{buttonText}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>
                {status === 'completed' && (
                  <Link 
                    href={`/training/${id}/lesson`}
                    className="h-12 px-6 rounded-lg bg-surface text-primary font-semibold shadow-sm border border-border-subtle hover:bg-surface-container-low transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">replay</span>
                    <span className="">Restart Module</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Canonical Image Banner Column */}
            <div className="lg:col-span-5 relative bg-primary-container min-h-[320px] lg:min-h-full">
              {moduleData.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt={title} className="w-full h-full object-cover" src={moduleData.image_url} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-container text-primary-fixed">
                  <span className="material-symbols-outlined text-[80px] opacity-50">security</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent pointer-events-none"></div>
              <div className="absolute top-4 right-4 bg-surface px-3 py-1.5 rounded-full shadow-sm border border-border-subtle flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success-base animate-pulse"></span>
                <span className="text-xs font-semibold text-primary">Practical Workplace Simulation</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-surface shadow-md border border-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">store</span>
                  <span className="text-sm font-semibold text-primary truncate">Real Scenario: {moduleData.threat_category}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Adaptive Recommendation Context Box */}
        {isWeakArea && (
          <div className="rounded-xl bg-info-bg p-6 mb-12 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">recommend</span>
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold text-primary">Why This Module is Prioritized For You</h2>
                  <span className="px-2 py-0.5 rounded-full bg-warning-bg text-warning-text text-xs font-semibold">Diagnostic Alert</span>
                </div>
                <p className="text-base text-info-text leading-relaxed">
                  Based on your {userBusinessType} sector and baseline diagnostic, <strong className="text-primary font-semibold">{moduleData.threat_category} was flagged for reinforcement</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Layout (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Objectives & Lesson Syllabus (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Learning Objectives */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-2xl font-bold text-primary">What You Will Master</h2>
                <span className="text-xs font-semibold text-muted-text">{safeObjectives.length} Practical Core Outcomes</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {safeObjectives.length > 0 ? safeObjectives.map((obj: string, i: number) => (
                  <div key={i} className="bg-surface rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-border-subtle">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-surface-container-high text-secondary flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      </div>
                      <h3 className="font-semibold text-primary mb-1">Outcome {i + 1}</h3>
                      <p className="text-sm text-muted-text">{obj}</p>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full p-4 text-center text-muted-text bg-surface rounded-xl border border-border-subtle">
                    Objectives loading...
                  </div>
                )}
              </div>
            </section>

            {/* Course Syllabus / Lessons Breakdown */}
            <section className="bg-surface rounded-xl p-6 shadow-sm border border-border-subtle">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-primary">Syllabus Breakdown</h2>
                  <p className="text-sm text-muted-text">Step-by-step counter practicals with short scenario checkpoints.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-semibold">
                  4 Micro-Lessons
                </span>
              </div>
              <div className="space-y-3">
                {syllabus.map((item, idx) => {
                  // Determine status styling based on overall module progress
                  let itemStatus = 'locked'
                  if (status === 'completed') itemStatus = 'completed'
                  else if (status === 'in_progress' && idx === 0) itemStatus = 'completed'
                  else if (status === 'in_progress' && idx === 1) itemStatus = 'in_progress'
                  else if (status === 'not_started' && idx === 0) itemStatus = 'in_progress'

                  return (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors 
                        ${itemStatus === 'completed' ? 'bg-surface-container-low hover:bg-surface-container' : 
                          itemStatus === 'in_progress' ? 'bg-info-bg shadow-sm' : 
                          'bg-surface-container-lowest opacity-70 border border-border-subtle'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5
                          ${itemStatus === 'completed' ? 'bg-success-bg text-success-text' : 
                            itemStatus === 'in_progress' ? 'bg-secondary text-on-secondary' : 
                            'bg-surface-container text-muted-text'}`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {itemStatus === 'completed' ? 'check' : itemStatus === 'in_progress' ? 'play_arrow' : 'lock'}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold uppercase tracking-wider 
                              ${itemStatus === 'in_progress' ? 'text-info-text' : 'text-muted-text'}`}>
                              Step {idx + 1} {itemStatus === 'in_progress' && '• Current'}
                            </span>
                          </div>
                          <h3 className={`font-semibold ${itemStatus === 'locked' ? 'text-on-surface-variant' : 'text-primary'}`}>
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-text">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          {/* Right Column: Countertop Field Note & Practical Tools (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Field Note Card (Countertop Golden Rule) */}
            <div className="bg-primary text-on-primary rounded-xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none"></div>
              <div className="flex items-center gap-2 text-tertiary-fixed mb-3">
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
                <span className="text-xs font-semibold uppercase tracking-wider">Countertop Golden Rule</span>
              </div>
              <blockquote className="font-serif text-lg font-bold text-on-primary mb-4 leading-snug">
                {isPcm ? '"Shine your eyes well well before you drop goods."' : '"Always verify directly through your own authorized channels."'}
              </blockquote>
              <div className="bg-primary-container/80 rounded-lg p-3 space-y-2 mb-4">
                <div className="flex items-start gap-2 text-on-primary">
                  <span className="material-symbols-outlined text-[18px] text-success-base shrink-0 mt-0.5">check_circle</span>
                  <p className="text-sm">
                    Trust your own systems over customer-provided proof.
                  </p>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between text-muted-text text-xs font-semibold border-t border-primary-container">
                <span className="text-on-primary/70">Standard Operating Routine</span>
                <span className="text-tertiary-fixed">Zero Exceptions</span>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  )
}
