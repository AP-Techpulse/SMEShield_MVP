'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { submitModuleQuiz } from '../../actions'

interface QuizQuestion {
  id: string
  module_id: string
  question_en: string
  question_pcm: string
  options_en: string[]
  options_pcm: string[]
  correct_option_index: number
  explanation_en: string
  explanation_pcm: string
}

interface Props {
  questions: QuizQuestion[]
}

export default function QuizEngine({ questions }: Props) {
  const { language, t } = useLanguage()
  const router = useRouter()
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)

  const question = questions[currentIndex]
  const isCorrect = selectedOption === question.correct_option_index
  const isLastQuestion = currentIndex === questions.length - 1

  const handleCheckAnswer = () => {
    if (selectedOption === null) return
    setHasSubmitted(true)
    if (selectedOption === question.correct_option_index) {
      setCorrectAnswersCount(prev => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    setCurrentIndex(prev => prev + 1)
    setSelectedOption(null)
    setHasSubmitted(false)
  }

  const handleComplete = async () => {
    if (selectedOption === null) return
    setIsSubmitting(true)
    
    // correctAnswersCount was already updated in handleCheckAnswer
    const finalCorrectCount = Math.min(correctAnswersCount, questions.length)
    
    // Calculate final score clamped safely between 0 and 100
    const score = Math.min(100, Math.max(0, Math.round((finalCorrectCount / questions.length) * 100)))
    
    // Assuming 80% is the passing score
    const passed = score >= 80
    
    await submitModuleQuiz(question.module_id, passed, score)
    
    // Send them to progress ledger to immediately view their recorded score
    router.push('/dashboard/progress')
    router.refresh()
  }

  const questionText = language === 'pcm' ? question.question_pcm : question.question_en
  const options = language === 'pcm' ? question.options_pcm : question.options_en
  const explanationText = language === 'pcm' ? question.explanation_pcm : question.explanation_en

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-sm font-semibold text-muted-text mb-2 uppercase tracking-wide">
            {t('Knowledge Check', 'Test Yourself')}
          </h2>
          <div className="text-xs font-medium text-secondary">
            {t('Question', 'Question')} {currentIndex + 1} {t('of', 'of')} {questions.length}
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary leading-tight">
          {questionText}
        </h3>
      </div>

      <div className="space-y-4 mb-8">
        {options.map((optionText, index) => {
          let cardStyle = "border-border-subtle bg-surface hover:border-primary/40 hover:bg-surface-container"
          
          if (hasSubmitted) {
            if (index === question.correct_option_index) {
              cardStyle = "border-success-base bg-success-bg ring-1 ring-success-base shadow-[0_0_12px_rgba(35,160,111,0.2)]"
            } else if (index === selectedOption && index !== question.correct_option_index) {
              cardStyle = "border-danger-base bg-danger-bg opacity-85"
            } else {
              cardStyle = "border-border-subtle bg-surface opacity-50"
            }
          } else if (selectedOption === index) {
            cardStyle = "border-primary bg-primary/10 ring-1 ring-primary shadow-sm"
          }

          return (
            <button
              key={index}
              onClick={() => !hasSubmitted && setSelectedOption(index)}
              disabled={hasSubmitted}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-start gap-4 cursor-pointer ${cardStyle}`}
            >
              <div className={`mt-0.5 w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors
                ${hasSubmitted && index === question.correct_option_index ? 'border-success-base bg-success-base' : ''}
                ${hasSubmitted && index === selectedOption && index !== question.correct_option_index ? 'border-danger-base bg-danger-base' : ''}
                ${!hasSubmitted && selectedOption === index ? 'border-primary bg-surface' : ''}
                ${!hasSubmitted && selectedOption !== index ? 'border-border-subtle' : ''}
              `}>
                {hasSubmitted && index === question.correct_option_index && (
                  <span className="material-symbols-outlined text-[14px] text-white">check</span>
                )}
                {hasSubmitted && index === selectedOption && index !== question.correct_option_index && (
                  <span className="material-symbols-outlined text-[14px] text-white">close</span>
                )}
                {!hasSubmitted && selectedOption === index && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
              <span className={`text-base leading-snug font-medium transition-colors
                ${hasSubmitted && index === question.correct_option_index ? 'text-success-text font-semibold' : ''}
                ${hasSubmitted && index === selectedOption && index !== question.correct_option_index ? 'text-danger-text font-semibold' : ''}
                ${!hasSubmitted && selectedOption === index ? 'text-primary font-semibold' : ''}
                ${!hasSubmitted && selectedOption !== index ? 'text-primary' : ''}
              `}>
                {optionText}
              </span>
            </button>
          )
        })}
      </div>

      {hasSubmitted && (
        <div className={`p-5 rounded-xl mb-8 border border-l-4 ${isCorrect ? 'bg-success-bg border-success-base/20 border-l-success-base' : 'bg-danger-bg border-danger-base/20 border-l-danger-base'}`}>
          <div className="flex items-start gap-3">
            <span className={`material-symbols-outlined shrink-0 ${isCorrect ? 'text-success-base' : 'text-danger-base'}`}>
              {isCorrect ? 'check_circle' : 'cancel'}
            </span>
            <div>
              <h4 className={`font-bold text-lg mb-1 ${isCorrect ? 'text-success-text' : 'text-danger-text'}`}>
                {isCorrect ? t('Correct!', 'Correct!') : t('Incorrect', 'You Miss Am')}
              </h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {explanationText}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end border-t border-border-subtle pt-6 mt-6">
        {!hasSubmitted ? (
          <button
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
            className="h-12 px-8 rounded-lg bg-primary text-on-primary font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {t('Check Answer', 'Check Answer')}
          </button>
        ) : !isLastQuestion ? (
          <button
            onClick={handleNextQuestion}
            className="h-12 px-8 rounded-lg bg-primary text-on-primary font-semibold text-sm transition-all flex items-center gap-2"
          >
            <span>{t('Next Question', 'Next Question')}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        ) : (
          <button
            onClick={handleComplete}
            disabled={isSubmitting}
            className="h-12 px-8 rounded-lg bg-primary text-on-primary font-semibold text-sm disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              <>
                <span>{t('Finish Module', 'Finish Module')}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
