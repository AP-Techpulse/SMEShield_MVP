'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { Logo } from '@/components/ui/Logo'

export function PublicHeader() {
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(26,43,72,0.04)]">
      <div className="h-20 max-w-[75rem] mx-auto px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            <Logo size="md" />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/#how-it-works" className="text-base text-on-surface-variant hover:text-on-surface transition-colors">
            {t('How It Works', 'How E Dey Work')}
          </Link>
          <Link href="/#who-its-for" className="text-base text-on-surface-variant hover:text-on-surface transition-colors">
            {t("Who It's For", 'Na Who E Dey For')}
          </Link>
          <Link href="/#features" className="text-base text-on-surface-variant hover:text-on-surface transition-colors">
            {t('Features', 'Wetin E Fit Do')}
          </Link>
          <Link href="/#curriculum" className="text-base text-on-surface-variant hover:text-on-surface transition-colors">
            {t('Curriculum', 'Curriculum')}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="h-12 min-h-[2.75rem] px-6 inline-flex items-center justify-center text-sm font-semibold text-primary-container hover:bg-surface-container-low rounded-lg transition-colors"
            >
              {t('Login', 'Login')}
            </Link>
            <Link
              href="/signup"
              className="h-12 min-h-[2.75rem] px-6 inline-flex items-center justify-center text-sm font-semibold text-on-primary bg-primary-container hover:bg-primary rounded-lg transition-colors shadow-[0_1px_3px_rgba(26,43,72,0.08)]"
            >
              {t('Sign Up', 'Open Account')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
