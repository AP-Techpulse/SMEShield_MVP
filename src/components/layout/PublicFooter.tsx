'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Logo } from '@/components/ui/Logo'

export function PublicFooter() {
  const { t } = useLanguage()

  return (
    <footer className="w-full bg-surface-container-low border-t border-border-subtle/70">
      <div className="max-w-[75rem] mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Logo size="md" variant="horizontal" />
            </Link>
            <p className="text-base text-on-surface-variant max-w-sm leading-relaxed">
              {t(
                'Cyber Defence for Nigerian SMEs. Culturally-grounded protection without fear, empowering business owners and frontline workforce across Nigeria.',
                'Cyber Defence for Nigerian SMEs. Protection weh no dey cause wahala, helping business owners and workers for Nigeria.'
              )}
            </p>
            <div className="inline-flex items-center gap-2 bg-surface px-3 py-1.5 rounded-full shadow-xs border border-border-subtle/50">
              <span className="material-symbols-outlined text-secondary text-lg">translate</span>
              <span className="text-xs font-semibold text-on-surface-variant">
                {t('Bilingual Delivery: English & Nigerian Pidgin', 'Two Language: English & Nigerian Pidgin')}
              </span>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="text-sm font-semibold text-primary-container mb-4 uppercase tracking-wider">
              {t('Platform', 'Platform')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Link href="/how-it-works" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  {t('Guided Product Tour', 'How E Dey Work')}
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/about" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  {t('About & Research', 'About SMEShield')}
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/signup?role=owner" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  {t('For Business Owners', 'For Business Owners')}
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/signup?role=employee" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  {t('For Employees', 'For Employees')}
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/signup?role=sole_entrepreneur" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  {t('For Sole Entrepreneurs', 'For Sole Traders')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm font-semibold text-primary-container mb-4 uppercase tracking-wider">
              {t('Legal & Compliance', 'Legal & Compliance')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Link href="/ndpa" className="text-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-success-base">verified</span>
                  <span>NDPA 2023 Compliance</span>
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/privacy" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/terms" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/cookies" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  Cookie &amp; Session Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold text-primary-container mb-4 uppercase tracking-wider">
              {t('Contact & Support', 'Contact & Support')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Link href="/contact" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  Support &amp; FAQ Desk
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-sm text-on-surface-variant">Lagos &amp; Abraka Offices</span>
              </li>
              <li className="flex items-center">
                <a className="text-sm text-secondary font-medium hover:text-primary-container transition-colors" href="mailto:hello@smeshield.ng">
                  hello@smeshield.ng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-text border-t border-border-subtle">
          <p>© 2026 SMEShield Nigeria. All rights reserved.</p>
          <p className="text-center md:text-right text-xs">
            {t(
              'Educational awareness training & self-assessment platform built for Nigerian enterprise resilience.',
              'Educational awareness training & self-assessment platform built for Nigerian enterprise resilience.'
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}
