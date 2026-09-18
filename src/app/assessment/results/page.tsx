'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageToggle } from '@/components/ui/language-toggle'

interface ResultData {
  id: string
  score_percentage: number
  total_correct: number
  total_questions: number
  weak_areas: string[]
  answers: Array<{
    question_id: string
    category: string
    selected: number
    correct: number
    is_correct: boolean
  }>
  created_at: string
}

const CATEGORY_META: Record<string, { en: string; pcm: string; icon: string }> = {
  phishing: { en: 'Phishing & Fake Alerts', pcm: 'Phishing & Fake Alerts', icon: 'phishing' },
  passwords: { en: 'Password Security', pcm: 'Password Security', icon: 'password' },
  wifi_security: { en: 'Wi-Fi Security', pcm: 'Wi-Fi Security', icon: 'wifi' },
  social_engineering: { en: 'Social Engineering', pcm: 'Social Engineering', icon: 'engineering' },
  device_security: { en: 'Device Security', pcm: 'Device Security', icon: 'smartphone' },
}

function getScoreLevel(score: number): { label: string; labelPcm: string; color: string; bg: string; icon: string } {
  if (score >= 80) return { label: 'Excellent', labelPcm: 'Excellent', color: 'text-success-text', bg: 'bg-success-bg', icon: 'verified_user' }
  if (score >= 60) return { label: 'Good', labelPcm: 'Good', color: 'text-info-text', bg: 'bg-info-bg', icon: 'thumb_up' }
  if (score >= 40) return { label: 'Needs Improvement', labelPcm: 'Need Improvement', color: 'text-warning-text', bg: 'bg-warning-bg', icon: 'trending_up' }
  return { label: 'Critical Risk', labelPcm: 'Critical Risk', color: 'text-danger-text', bg: 'bg-danger-bg', icon: 'crisis_alert' }
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const resultId = searchParams.get('id')
  const { t } = useLanguage()
  const [result, setResult] = useState<ResultData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchResult() {
      try {
        const url = resultId 
          ? `/assessment/results/api?id=${resultId}` 
          : `/assessment/results/api`
        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          setResult(data)
        }
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    fetchResult()
  }, [resultId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-text">{t('Loading results...', 'Loading results...')}</div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-lg bg-surface rounded-xl p-12 shadow-level-2 text-center">
          <div className="w-16 h-16 rounded-xl bg-danger-bg flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-danger-base text-4xl">error</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-primary mb-2">{t('Results Not Found', 'Results Not Found')}</h1>
          <p className="text-base text-muted-text mb-4">{t('We couldn\'t load your assessment results.', 'We no fit load your assessment results.')}</p>
          <Link href="/assessment" className="text-secondary font-semibold hover:underline">{t('Retake Assessment', 'Retake Assessment')}</Link>
        </div>
      </div>
    )
  }

  const level = getScoreLevel(result.score_percentage)
  const allCategories = Object.keys(CATEGORY_META)
  const strongAreas = allCategories.filter(c => !result.weak_areas.includes(c))

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
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-12">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8 py-8">
          {/* Score Hero */}
          <div className="bg-surface rounded-xl p-8 md:p-12 shadow-level-1 mb-8 text-center">
            <div className={`w-20 h-20 rounded-2xl ${level.bg} flex items-center justify-center mx-auto mb-6`}>
              <span className={`material-symbols-outlined ${level.color} text-5xl`}>{level.icon}</span>
            </div>

            <div className="mb-4">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${level.bg} ${level.color}`}>
                {t(level.label, level.labelPcm)}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
              {result.score_percentage}%
            </h1>
            <p className="text-lg text-muted-text">
              {t(
                `You answered ${result.total_correct} out of ${result.total_questions} questions correctly.`,
                `You answer ${result.total_correct} out of ${result.total_questions} questions correctly.`
              )}
            </p>

            {/* Score bar */}
            <div className="max-w-sm mx-auto mt-6">
              <div className="w-full h-3 rounded-full bg-surface-variant overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    result.score_percentage >= 80 ? 'bg-success-base' :
                    result.score_percentage >= 60 ? 'bg-info-base' :
                    result.score_percentage >= 40 ? 'bg-warning-base' : 'bg-danger-base'
                  }`}
                  style={{ width: `${result.score_percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Results Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weak Areas */}
            {result.weak_areas.length > 0 && (
              <div className="bg-surface rounded-xl p-6 shadow-level-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-danger-base text-[20px]">crisis_alert</span>
                  <h2 className="text-base font-bold text-primary">{t('Areas Needing Attention', 'Areas Wey Need Attention')}</h2>
                </div>
                <p className="text-sm text-muted-text mb-4">
                  {t(
                    'SMEShield will prioritize training modules targeting these weak areas.',
                    'SMEShield go focus training modules on these areas wey you need help.'
                  )}
                </p>
                <div className="space-y-3">
                  {result.weak_areas.map(area => {
                    const meta = CATEGORY_META[area] || { en: area, pcm: area, icon: 'warning' }
                    return (
                      <div key={area} className="flex items-center gap-3 p-3 bg-danger-bg rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
                          <span className="material-symbols-outlined text-danger-base text-[20px]">{meta.icon}</span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-danger-text">{t(meta.en, meta.pcm)}</span>
                          <span className="block text-xs text-muted-text">{t('Training recommended', 'Training recommended')}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Strong Areas */}
            {strongAreas.length > 0 && (
              <div className="bg-surface rounded-xl p-6 shadow-level-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-success-base text-[20px]">verified_user</span>
                  <h2 className="text-base font-bold text-primary">{t('Strong Areas', 'Areas Wey You Strong')}</h2>
                </div>
                <p className="text-sm text-muted-text mb-4">
                  {t(
                    'Great work! You demonstrated awareness in these critical areas.',
                    'Well done! You show say you sabi these important areas.'
                  )}
                </p>
                <div className="space-y-3">
                  {strongAreas.map(area => {
                    const meta = CATEGORY_META[area] || { en: area, pcm: area, icon: 'check' }
                    return (
                      <div key={area} className="flex items-center gap-3 p-3 bg-success-bg rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
                          <span className="material-symbols-outlined text-success-base text-[20px]">{meta.icon}</span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-success-text">{t(meta.en, meta.pcm)}</span>
                          <span className="block text-xs text-muted-text">{t('Awareness verified', 'Awareness verified')}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-surface rounded-xl p-8 shadow-level-1 text-center">
            <h3 className="font-serif text-xl font-bold text-primary mb-2">
              {t('Ready to Begin Your Training?', 'Ready to Start Your Training?')}
            </h3>
            <p className="text-sm text-muted-text mb-6">
              {t(
                'Your personalized curriculum is ready. SMEShield will prioritize modules based on your assessment results.',
                'Your personalized training don ready. SMEShield go focus on modules wey match your assessment results.'
              )}
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 h-12 px-8 bg-primary-container text-on-primary rounded-lg text-sm font-semibold hover:bg-primary transition-colors shadow-sm"
            >
              <span>{t('Go to Dashboard', 'Go to Dashboard')}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>

          {/* Compliance footer */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-low text-muted-text">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
              <span className="text-xs font-semibold">{t('NDPA 2023 Compliant • Confidential Assessment', 'NDPA 2023 Compliant • Confidential Assessment')}</span>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-text">Loading...</div></div>}>
      <ResultsContent />
    </Suspense>
  )
}
