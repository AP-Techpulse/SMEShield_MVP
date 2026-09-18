import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getRecommendedModules } from '@/lib/adaptive-engine'
import TrainingLibraryClient, { ExtendedModuleData } from './TrainingLibraryClient'

export default async function TrainingLibraryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch adaptive modules
  const { recommended, completed, allOthers } = await getRecommendedModules()

  // Calculate overall metrics
  const totalCompleted = completed.length
  
  // Aggregate all modules to pass to client
  // We can pass them as a single array with their statuses mapped
  const allModules = [
    ...recommended.map(m => ({ ...m, status: m.status || 'not_started', is_recommended: true })),
    ...completed.map(m => ({ ...m, status: 'completed', is_recommended: false })),
    ...allOthers.map(m => ({ ...m, status: m.status || 'not_started', is_recommended: false }))
  ]

  // Sort them by order_index just to be safe
  allModules.sort((a, b) => a.order_index - b.order_index)

  return (
    <main className="w-full bg-app-bg min-h-screen">
      <div className="max-w-container-max mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <TrainingLibraryClient modules={allModules as ExtendedModuleData[]} totalCompleted={totalCompleted} />
      </div>
    </main>
  )
}
