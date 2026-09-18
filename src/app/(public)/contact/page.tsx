import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact & Support | SMEShield Nigeria',
  description: 'Get in touch with the SMEShield support team, compliance desk, and academic research office.',
}

export default function ContactPage() {
  return (
    <div className="w-full bg-app-bg py-space-3xl">
      <div className="max-w-4xl mx-auto px-space-lg lg:px-space-xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-label-sm text-muted-text mb-space-lg">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <span className="text-primary font-medium">Contact & Support</span>
        </div>

        <header className="mb-space-2xl pb-space-lg border-b border-border-subtle">
          <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm mb-space-sm">
            <span className="material-symbols-outlined text-[16px] text-secondary">support_agent</span>
            <span>Support & Research Inquiries</span>
          </div>
          <h1 className="font-display-title text-display-title text-primary-container mb-space-xs">
            Contact SMEShield
          </h1>
          <p className="font-body-md text-muted-text">
            We are here to support Nigerian business owners, workers, and researchers. Reach out to our dedicated teams below.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-2xl">
          {/* Card 1: General Support */}
          <div className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-info-bg flex items-center justify-center mb-space-md text-info-base">
                <span className="material-symbols-outlined text-[26px]">mail</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary-container mb-space-xs">
                Platform & User Support
              </h2>
              <p className="font-body-sm text-muted-text mb-space-md">
                Assistance with account onboarding, 6-digit staff join codes, module access, or certificate verification.
              </p>
            </div>
            <a 
              href="mailto:support@smeshield.ng" 
              className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline text-body-sm"
            >
              <span>support@smeshield.ng</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>

          {/* Card 2: Regulatory & NDPA Compliance */}
          <div className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-success-bg flex items-center justify-center mb-space-md text-success-base">
                <span className="material-symbols-outlined text-[26px]">verified_user</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary-container mb-space-xs">
                Data Protection & Legal Desk
              </h2>
              <p className="font-body-sm text-muted-text mb-space-md">
                Questions regarding NDPA 2023 compliance, data subject access requests (DSAR), or privacy rights.
              </p>
            </div>
            <a 
              href="mailto:compliance@smeshield.ng" 
              className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline text-body-sm"
            >
              <span>compliance@smeshield.ng</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>

          {/* Card 3: Academic Collaboration */}
          <div className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-space-md text-secondary">
                <span className="material-symbols-outlined text-[26px]">school</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary-container mb-space-xs">
                Academic & Research Office
              </h2>
              <p className="font-body-sm text-muted-text mb-space-md">
                Inquiries from university faculty, seminar delegates, and postgraduate cybersecurity researchers.
              </p>
            </div>
            <a 
              href="mailto:research@smeshield.ng" 
              className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline text-body-sm"
            >
              <span>research@smeshield.ng</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>

          {/* Card 4: Physical Operations */}
          <div className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mb-space-md text-primary-container">
                <span className="material-symbols-outlined text-[26px]">location_on</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary-container mb-space-xs">
                Operational Locations
              </h2>
              <p className="font-body-sm text-muted-text mb-space-md">
                Victoria Island Commercial Technology District, Lagos State &amp; Delta State University Academic Research Annex, Abraka, Nigeria.
              </p>
            </div>
            <span className="text-muted-text text-body-sm font-medium">Monday – Friday • 8:00 AM – 5:00 PM WAT</span>
          </div>
        </div>

        {/* Quick FAQ summary */}
        <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
          <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 text-body-sm">
            <div>
              <h3 className="font-semibold text-primary-container">How do employees join without an email invitation?</h3>
              <p className="text-muted-text">Employees simply ask their business owner for the company&apos;s persistent 6-digit join code, click &quot;Join with Business Code&quot; on the signup screen, and enter it directly.</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary-container">Can I access training in Nigerian Pidgin?</h3>
              <p className="text-muted-text">Yes. You can switch between English and authentic Nigerian Pidgin with one click using the language toggle located in the header or module overview.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
