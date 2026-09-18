import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie & Session Policy | SMEShield Nigeria',
  description: 'Information about cookies, local storage, and session tokens utilized by SMEShield.',
}

export default function CookiePolicyPage() {
  return (
    <div className="w-full bg-app-bg py-space-3xl">
      <div className="max-w-4xl mx-auto px-space-lg lg:px-space-xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-label-sm text-muted-text mb-space-lg">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <span className="text-primary font-medium">Cookie & Session Policy</span>
        </div>

        <header className="mb-space-2xl pb-space-lg border-b border-border-subtle">
          <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm mb-space-sm">
            <span className="material-symbols-outlined text-[16px] text-secondary">cookie</span>
            <span>Session & Tracking Disclosure</span>
          </div>
          <h1 className="font-display-title text-display-title text-primary-container mb-space-xs">
            Cookie & Session Policy
          </h1>
          <p className="font-body-md text-muted-text">
            Last Updated: January 2026 • Transparency regarding technical storage and user preferences.
          </p>
        </header>

        <div className="prose prose-slate max-w-none space-y-space-xl text-on-surface font-body-md leading-relaxed">
          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              1. What Are Cookies and Session Tokens?
            </h2>
            <p>
              Cookies and browser storage mechanisms (such as localStorage and sessionStorage) are small files placed on your computer or mobile device when you browse websites. They enable the platform to remember your active session, keep you logged in safely across page reloads, and preserve your chosen language setting (English or Nigerian Pidgin).
            </p>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              2. Strict No-Third-Party-Ad-Tracker Guarantee
            </h2>
            <div className="p-4 bg-success-bg rounded-lg border border-success-base/20 my-3">
              <p className="font-semibold text-success-text mb-1">Our Privacy Promise:</p>
              <p className="text-body-sm text-on-surface">
                SMEShield does <strong>NOT</strong> run commercial third-party tracking scripts, advertising pixels (e.g. Meta Pixel, TikTok Pixel, Google AdSense), or cross-site data harvesting brokers. All storage mechanisms are strictly first-party and essential to platform operation.
              </p>
            </div>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              3. Category of Cookies & Storage Used
            </h2>
            <div className="space-y-space-md mt-4">
              <div className="p-space-md bg-surface-container-low rounded-lg border border-border-subtle">
                <h3 className="font-headline-sm text-base text-primary-container font-semibold">
                  A. Strictly Necessary Authentication Cookies
                </h3>
                <p className="font-body-sm text-muted-text mt-1">
                  Managed via Supabase Auth (JWT tokens). These secure, HttpOnly-capable session cookies allow authenticated owners, employees, and sole entrepreneurs to access their respective protected dashboards and prevent CSRF attacks.
                </p>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-lg border border-border-subtle">
                <h3 className="font-headline-sm text-base text-primary-container font-semibold">
                  B. Functional Preference Storage
                </h3>
                <p className="font-body-sm text-muted-text mt-1">
                  Key: <code>smeshield_language</code> in localStorage. Stores your preferred training language (<code>en</code> for English or <code>pcm</code> for Nigerian Pidgin) so the platform consistently greets you in your preferred dialect.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              4. Managing Your Preferences
            </h2>
            <p>
              Because our cookies are strictly essential for authentication and language localization, disabling them in your browser settings will prevent you from logging into your dashboard or retaining quiz progress. You can clear your cookies anytime via your browser settings.
            </p>
            <div className="mt-4 pt-4 border-t border-border-subtle text-body-sm text-muted-text">
              For further queries, contact <a href="mailto:privacy@smeshield.ng" className="text-secondary hover:underline">privacy@smeshield.ng</a>.
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
