"use client"

import * as React from "react"
import Link from "next/link"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { Logo } from "@/components/ui/Logo"
import { Menu, X } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { useLanguage } from "@/contexts/LanguageContext"

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null)
  const { t } = useLanguage()

  React.useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthenticated(!!data.user)
    })
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 left-0 right-0 z-50 w-full border-b border-outline-variant/40 bg-surface-container-lowest shadow-sm">
        <div className="flex h-20 items-center px-4 md:px-8 justify-between max-w-container-max mx-auto">
          {/* Brand */}
          <Link href="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
              {t('Features', 'Wetin E Fit Do')}
            </Link>
            <Link href="/how-it-works" className="text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
              {t('How It Works', 'How E Dey Work')}
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <div className="h-6 w-px bg-border-subtle"></div>
            {isAuthenticated ? (
              <Link href="/dashboard" className="px-5 h-[44px] inline-flex items-center justify-center rounded-lg bg-primary text-on-primary font-medium text-sm hover:bg-[#132036] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4A90E2]/30">
                {t('Go to Dashboard', 'Go to Dashboard')}
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-label-md text-on-surface-variant hover:text-on-surface transition-colors font-semibold">
                  {t('Log In', 'Login')}
                </Link>
                <Link href="/signup" className="px-4 h-[44px] inline-flex items-center justify-center rounded-lg bg-primary text-on-primary font-medium text-sm hover:bg-[#132036] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4A90E2]/30">
                  {t('Start Free Training', 'Start Free Training')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageToggle />
            <button
              className="p-2 text-muted-text hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden top-20 bg-surface flex-col p-4 border-t border-border-subtle">
          <nav className="flex flex-col gap-4">
            <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="text-headline-sm text-on-surface py-2 border-b border-border-subtle">
              {t('Features', 'Wetin E Fit Do')}
            </Link>
            <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-headline-sm text-on-surface py-2 border-b border-border-subtle">
              {t('How It Works', 'How E Dey Work')}
            </Link>
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full px-4 h-[44px] inline-flex items-center justify-center rounded-lg bg-primary text-on-primary font-medium text-sm hover:bg-[#132036] transition-colors shadow-sm">
                {t('Go to Dashboard', 'Go to Dashboard')}
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full px-4 h-[44px] inline-flex items-center justify-center rounded-lg border border-border-subtle bg-surface text-on-surface font-medium text-sm hover:bg-surface-container transition-colors shadow-sm">
                  {t('Log In', 'Login')}
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full px-4 h-[44px] inline-flex items-center justify-center rounded-lg bg-primary text-on-primary font-medium text-sm hover:bg-[#132036] transition-colors shadow-sm">
                  {t('Start Free Training', 'Start Free Training')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  )
}
