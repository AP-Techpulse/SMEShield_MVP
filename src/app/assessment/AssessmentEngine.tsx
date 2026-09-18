'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { submitAssessment, type BaselineQuestion } from './actions'

interface Props {
  questions: BaselineQuestion[]
}

export default function AssessmentEngine({ questions }: Props) {
  const { language, t } = useLanguage()
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const question = questions[currentIndex]
  const totalQuestions = questions.length
  const progress = Math.round(((currentIndex + 1) / totalQuestions) * 100)
  const selectedAnswer = answers[currentIndex]

  const questionText = language === 'pcm' ? question.question_pcm : question.question_en
  const options = language === 'pcm' ? question.options_pcm : question.options_en

  const handleSelectOption = (index: number) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = index
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const formData = new FormData()
    formData.set('answers', JSON.stringify(answers))
    formData.set('questions', JSON.stringify(questions))
    await submitAssessment(formData)
  }

  const allAnswered = answers.every(a => a !== null)
  const isLastQuestion = currentIndex === totalQuestions - 1

  // Category display names
  const categoryLabels: Record<string, { en: string; pcm: string; icon: string }> = {
    phishing: { en: 'Phishing & Fake Alerts', pcm: 'Phishing & Fake Alerts', icon: 'phishing' },
    passwords: { en: 'Password Security', pcm: 'Password Security', icon: 'password' },
    wifi_security: { en: 'Wi-Fi Security', pcm: 'Wi-Fi Security', icon: 'wifi' },
    social_engineering: { en: 'Social Engineering', pcm: 'Social Engineering', icon: 'engineering' },
    device_security: { en: 'Device Security', pcm: 'Device Security', icon: 'smartphone' },
  }

  const cat = categoryLabels[question.category] || { en: question.category, pcm: question.category, icon: 'quiz' }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(26,43,72,0.04)]">
        <div className="h-16 max-w-[75rem] mx-auto px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-11 flex items-center justify-center shrink-0">
              <svg className="w-full h-full" fill="none" viewBox="0 0 44 52" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2C34 2 42 7.5 42 22C42 37 28 47 22 50C16 47 2 37 2 22C2 7.5 10 2 22 2Z" fill="#031632" />
                <path d="M22 8L34 22H26V35H18V22H10L22 8Z" fill="#0060ac" />
                <circle cx="22" cy="22" fill="#ffb955" r="3.5" />
              </svg>
            </div>
            <span className="font-serif text-lg font-bold text-primary tracking-tight">SMEShield</span>
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {!started ? (
        <main className="flex-1 pt-16 pb-24 flex items-center justify-center bg-app-bg">
          <div className="max-w-2xl mx-auto px-4 lg:px-8 py-12 w-full">
            <div className="bg-surface rounded-2xl p-8 md:p-12 shadow-level-2 border border-border-subtle text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center mb-6 shadow-md">
                <span className="material-symbols-outlined text-[32px]">shield</span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-info-bg text-info-text text-xs font-semibold mb-4">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>{t('NDPA 2023 Aligned • Confidential Baseline', 'NDPA 2023 Aligned • Confidential Baseline')}</span>
              </div>

              <h1 className="font-serif text-[28px] md:text-[36px] font-bold text-primary tracking-tight mb-3">
                {t('Cybersecurity Baseline Assessment', 'Cybersecurity Baseline Assessment')}
              </h1>

              <p className="text-base md:text-lg text-muted-text max-w-lg mb-8 leading-relaxed">
                {t(
                  'Complete this 5-question scenario assessment to discover your firm\'s security strengths and vulnerability points. Your results will customize your 15-module training roadmap.',
                  'Answer these 5 quick scenario questions make we know your security level. Your score go help us arrange the correct 15 modules for your business.'
                )}
              </p>

              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[22px]">timer</span>
                  <span className="font-semibold text-sm text-primary">{t('~3 Minutes', '~3 Minutes')}</span>
                  <span className="text-xs text-muted-text">{t('5 practical scenarios', '5 quick practical questions')}</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[22px]">psychology</span>
                  <span className="font-semibold text-sm text-primary">{t('Adaptive Focus', 'Adaptive Focus')}</span>
                  <span className="text-xs text-muted-text">{t('Identifies weak spots', 'Finds your weak areas')}</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[22px]">workspace_premium</span>
                  <span className="font-semibold text-sm text-primary">{t('NDPA Certified', 'NDPA Certified')}</span>
                  <span className="text-xs text-muted-text">{t('Compliance baseline', 'Official standard baseline')}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStarted(true)}
                  className="w-full sm:w-auto px-10 h-14 bg-primary hover:bg-primary-container text-on-primary font-semibold text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>{t('Begin Assessment', 'Start Assessment')}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <Link
                  href="/dashboard"
                  className="text-body-sm text-muted-text hover:text-primary transition-colors py-2 px-3 text-sm underline underline-offset-4 decoration-border-subtle"
                >
                  {t('Skip for now • Go to Dashboard', 'Skip for now • Go Dashboard')}
                </Link>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <>
          {/* Main Content */}
          <main className="flex-1 pt-16 pb-24">
            <div className="max-w-[75rem] mx-auto px-4 lg:px-8 py-8">
              {/* Progress Area */}
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary-container text-on-primary text-xs font-semibold shadow-sm">
                      {t('Baseline Assessment', 'Baseline Assessment')}
                    </span>
                    <span className="text-sm font-semibold text-muted-text">
                      {t(`Question ${currentIndex + 1} of ${totalQuestions}`, `Question ${currentIndex + 1} of ${totalQuestions}`)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-text">{t('Progress', 'Progress')}</span>
                    <div className="w-36 h-2 rounded-full bg-surface-variant overflow-hidden">
                      <div className="h-full bg-secondary transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-primary">{progress}%</span>
                  </div>
                </div>

                {/* Question counter dots */}
                <div className="flex items-center gap-1.5">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentIndex
                          ? 'bg-secondary scale-125'
                          : answers[i] !== null
                            ? 'bg-primary/40'
                            : 'bg-surface-variant'
                      }`}
                      aria-label={`Go to question ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main question area */}
                <div className="lg:col-span-8">
                  <section className="bg-surface rounded-xl p-6 md:p-8 shadow-level-1">
                    {/* Category badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-primary">
                        <span className="material-symbols-outlined text-[14px] text-secondary">{cat.icon}</span>
                        <span>{t(cat.en, cat.pcm)}</span>
                      </div>
                    </div>

                    {/* Scenario label */}
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-warning-bg rounded-full text-xs font-semibold text-warning-text mb-4">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      <span>{t('Realistic Nigerian SME Scenario', 'Realistic Nigerian SME Scenario')}</span>
                    </div>

                    {/* Question text */}
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-primary mb-6 leading-snug">
                      {questionText}
                    </h2>

                    {/* Options list */}
                    <div className="space-y-3 mb-8">
                      {options.map((option, index) => {
                        const isSelected = selectedAnswer === index
                        const optionLetters = ['A', 'B', 'C', 'D']

                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSelectOption(index)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 cursor-pointer ${
                              isSelected
                                ? 'border-secondary bg-info-bg/50 shadow-sm'
                                : 'border-border-subtle hover:border-border-subtle/80 hover:bg-surface-container-low'
                            }`}
                          >
                            <span
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold transition-colors ${
                                isSelected
                                  ? 'bg-secondary text-white'
                                  : 'bg-surface-container text-muted-text'
                              }`}
                            >
                              {optionLetters[index]}
                            </span>
                            <span className="text-base text-on-surface pt-1 leading-relaxed">
                              {option}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Language cue */}
                    <div className="flex items-center justify-between pt-4 border-t border-border-subtle text-muted-text">
                      <span className="text-xs font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-secondary">translate</span>
                        {language === 'en' ? 'English • Tap Pidgin switch above' : 'Pidgin • Tap English switch above'}
                      </span>
                    </div>
                  </section>
                </div>


            {/* Side panel */}
            <div className="lg:col-span-4">
              <div className="bg-surface rounded-xl p-6 shadow-level-1 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-secondary text-[20px]">info</span>
                  <span className="text-sm font-semibold text-primary">{t('Assessment Info', 'Assessment Info')}</span>
                </div>
                <div className="space-y-3 text-sm text-muted-text">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-success-base mt-0.5">check_circle</span>
                    <span>{t('No time limit — take your time', 'No time limit — take your time')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-success-base mt-0.5">check_circle</span>
                    <span>{t('5 scenario-based questions', '5 scenario-based questions')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-success-base mt-0.5">check_circle</span>
                    <span>{t('Results help personalize your training', 'Results go help personalize your training')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-info-base mt-0.5">security</span>
                    <span>{t('NDPA 2023 Compliant • Confidential', 'NDPA 2023 Compliant • Confidential')}</span>
                  </div>
                </div>

                {/* Answered count */}
                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-text">{t('Answered', 'Answered')}</span>
                    <span className="font-semibold text-primary">
                      {answers.filter(a => a !== null).length} / {totalQuestions}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-surface/95 backdrop-blur-md p-3 shadow-[0_-4px_16px_rgba(26,43,72,0.08)] z-40">
        <div className="max-w-[75rem] mx-auto flex items-center gap-3">
          {/* Previous */}
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={handlePrevious}
            className="h-12 px-4 rounded-lg font-semibold text-sm text-primary hover:bg-surface-container-low disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            <span>{t('Previous', 'Previous')}</span>
          </button>

          {/* Primary action */}
          {isLastQuestion && allAnswered ? (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="flex-1 h-12 px-4 rounded-lg bg-success-base hover:bg-success-text text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] disabled:opacity-50"
            >
              <span>{isSubmitting ? t('Submitting...', 'Submitting...') : t('Submit Assessment', 'Submit Assessment')}</span>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={selectedAnswer === null}
              onClick={handleNext}
              className="flex-1 h-12 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{t(`Continue (${currentIndex + 1}/${totalQuestions})`, `Continue (${currentIndex + 1}/${totalQuestions})`)}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  )
}
