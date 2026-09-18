'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { markModuleInProgress } from '../actions'
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer'

interface ModuleData {
  id: string
  order_index: number
  title_en: string
  title_pcm: string
  content_en: string
  content_pcm: string
  threat_category: string
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
}

interface Props {
  moduleData: ModuleData
}

export default function LessonViewer({ moduleData }: Props) {
  const { language, t } = useLanguage()

  // Mark in progress when opened
  useEffect(() => {
    markModuleInProgress(moduleData.id)
  }, [moduleData.id])

  const title = language === 'pcm' ? moduleData.title_pcm : moduleData.title_en
  const content = language === 'pcm' ? moduleData.content_pcm : moduleData.content_en
  const learningObjectives = language === 'pcm' ? moduleData.learning_objectives_pcm : moduleData.learning_objectives_en
  const keyTakeaways = language === 'pcm' ? moduleData.key_takeaways_pcm : moduleData.key_takeaways_en
  const scenario = language === 'pcm' ? moduleData.scenario_pcm : moduleData.scenario_en

  return (
    <div className="min-h-screen bg-app-bg flex flex-col">
      <header className="sticky top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(26,43,72,0.04)]">
        <div className="h-16 max-w-[48rem] mx-auto px-4 flex items-center justify-between">
          <Link href="/training" className="w-10 h-10 -ml-2 rounded-lg hover:bg-surface-container flex items-center justify-center transition-colors text-muted-text hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-primary">Module {moduleData.order_index}</span>
          </div>

          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="flex-1 py-8 pb-32">
        <article className="max-w-[48rem] mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary leading-tight">
              {title}
            </h1>
            <div className="shrink-0">
              <LanguageToggle />
            </div>
          </div>

          {/* Module Content */}
          <div className="bg-surface rounded-xl shadow-level-1 overflow-hidden mb-8">
            {moduleData.image_url && (
              <div className="w-full h-48 md:h-64 overflow-hidden bg-surface-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={moduleData.image_url} alt={title} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="p-6 md:p-10">
              {/* Learning Objectives */}
              {learningObjectives && learningObjectives.length > 0 && (
                <div className="mb-8 p-5 rounded-lg bg-primary-container/30 border border-primary-container">
                  <h3 className="font-serif text-lg font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">track_changes</span>
                    {t('Learning Objectives', 'Wetin You Go Learn')}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-on-surface-variant">
                    {learningObjectives.map((obj, i) => (
                      <li key={i} className="text-sm md:text-base">{obj}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Lesson Text */}
              <div className="mb-10">
                <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">menu_book</span>
                  {t('Module Content', 'Wetin Dey Inside')}
                </h3>
                <div className="prose prose-slate max-w-none">
                  <MarkdownRenderer content={content} />
                </div>
              </div>

              {/* Real World Scenario */}
              {scenario && (
                <div className="mb-8 bg-surface border border-border-subtle rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-warning-bg px-5 py-3 border-b border-border-subtle flex items-center gap-2">
                    <span className="material-symbols-outlined text-warning-text">visibility</span>
                    <h3 className="font-serif text-lg font-bold text-primary m-0">
                      {t('Real World Scenario', 'Real Life Example')}
                    </h3>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-muted-text uppercase tracking-wider mb-2">
                        {t('The Situation', 'The Matter')}
                      </h4>
                      <p className="text-on-surface text-base">{scenario.situation}</p>
                    </div>
                    
                    {scenario.warning_signs && scenario.warning_signs.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-bold text-danger-text uppercase tracking-wider mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">warning</span>
                          {t('Warning Signs', 'Red Flags')}
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-on-surface-variant">
                          {scenario.warning_signs.map((sign, i) => (
                            <li key={i} className="text-sm">{sign}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Practical Safety Actions */}
              {scenario && (
                <div className="mb-10 bg-surface border border-border-subtle rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-info-bg px-5 py-3 border-b border-border-subtle flex items-center gap-2">
                    <span className="material-symbols-outlined text-info-text">health_and_safety</span>
                    <h3 className="font-serif text-lg font-bold text-primary m-0">
                      {t('Practical Safety Actions', 'Wetin You Must Do')}
                    </h3>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-danger-bg/50 border border-danger-bg">
                        <h4 className="text-sm font-bold text-danger-text flex items-center gap-1 mb-2">
                          <span className="material-symbols-outlined text-[18px]">cancel</span>
                          {t('Risky Action', 'Wetin Make You No Do')}
                        </h4>
                        <p className="text-sm text-on-surface-variant">{scenario.risky_action}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-success-bg/30 border border-success-base/30">
                        <h4 className="text-sm font-bold text-success-text flex items-center gap-1 mb-2">
                          <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          {t('Safe Action', 'Wetin You Suppose Do')}
                        </h4>
                        <p className="text-sm text-on-surface-variant">{scenario.safe_action}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-surface-container rounded-lg mt-4">
                      <h4 className="text-sm font-bold text-primary mb-1">
                        {t('Why?', 'Why E Be Like That?')}
                      </h4>
                      <p className="text-sm text-on-surface-variant">{scenario.explanation}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Takeaways */}
              {keyTakeaways && keyTakeaways.length > 0 && (
                <div className="p-5 rounded-lg bg-success-bg/10 border-l-4 border-success-base">
                  <h3 className="font-serif text-lg font-bold text-primary mb-3">
                    {t('Key Takeaways', 'Wetin You Must Remember')}
                  </h3>
                  <ul className="space-y-3">
                    {keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex gap-3 text-on-surface-variant">
                        <span className="material-symbols-outlined text-success-base shrink-0">task_alt</span>
                        <span className="text-base">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
        </article>
      </main>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-surface/95 backdrop-blur-md p-3 pb-safe shadow-[0_-4px_16px_rgba(26,43,72,0.08)] z-40 border-t border-border-subtle">
        <div className="max-w-[48rem] mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <span className="text-sm font-semibold text-muted-text">
              {t('Ready to test your knowledge?', 'You don ready to test wetin you learn?')}
            </span>
          </div>
          <Link
            href={`/training/${moduleData.id}/quiz`}
            className="flex-1 sm:flex-none min-h-touch-target-min h-14 px-8 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span>{t('Take Quiz', 'Take Quiz')}</span>
            <span className="material-symbols-outlined text-[20px]">task_alt</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
