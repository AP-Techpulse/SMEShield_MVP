import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'NDPA 2023 Compliance | SMEShield Nigeria',
  description: 'How SMEShield operationalizes compliance with the Nigeria Data Protection Act 2023 for SME cybersecurity awareness.',
}

export default function NdpaCompliancePage() {
  return (
    <div className="w-full bg-app-bg py-space-3xl">
      <div className="max-w-4xl mx-auto px-space-lg lg:px-space-xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-label-sm text-muted-text mb-space-lg">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <span className="text-primary font-medium">NDPA 2023 Compliance</span>
        </div>

        <header className="mb-space-2xl pb-space-lg border-b border-border-subtle">
          <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-success-bg text-success-text font-label-sm mb-space-sm border border-success-base/20">
            <span className="material-symbols-outlined text-[16px] text-success-base">verified</span>
            <span>Statutory Compliance Declaration</span>
          </div>
          <h1 className="font-display-title text-display-title text-primary-container mb-space-xs">
            Nigeria Data Protection Act (NDPA) 2023 Compliance
          </h1>
          <p className="font-body-md text-muted-text">
            Official framework detailing how SMEShield aligns data processing, privacy governance, and employee awareness with the Nigeria Data Protection Act 2023.
          </p>
        </header>

        <div className="prose prose-slate max-w-none space-y-space-xl text-on-surface font-body-md leading-relaxed">
          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              1. Statutory Mandate & NDPC Alignment
            </h2>
            <p>
              Enacted on June 12, 2023, the <strong>Nigeria Data Protection Act (NDPA) 2023</strong> establishes an overarching legal framework for safeguarding data subjects&apos; rights and mandates data controllers and processors to institute technical and organizational security safeguards.
            </p>
            <p className="mt-2">
              SMEShield assists Nigerian small and medium-sized enterprises in satisfying their workforce training obligations under Section 39(1)(b) of the Act, which requires data controllers to provide regular training to employees who handle personal data.
            </p>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              2. Core Data Protection Principles Applied
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-4">
              <div className="p-space-md bg-surface-container-low rounded-lg border border-border-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">filter_alt</span>
                  <h3 className="font-headline-sm text-base text-primary-container font-semibold">Data Minimisation</h3>
                </div>
                <p className="font-body-sm text-muted-text">
                  We capture only essential fields required to personalize learning and link staff to business workspaces. No unnecessary sensitive personal data is recorded.
                </p>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-lg border border-border-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">lock</span>
                  <h3 className="font-headline-sm text-base text-primary-container font-semibold">Integrity & Confidentiality</h3>
                </div>
                <p className="font-body-sm text-muted-text">
                  All databases utilize strict Row-Level Security (RLS) within PostgreSQL to ensure absolute tenant isolation between competing commercial enterprises.
                </p>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-lg border border-border-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">timer</span>
                  <h3 className="font-headline-sm text-base text-primary-container font-semibold">Storage Limitation</h3>
                </div>
                <p className="font-body-sm text-muted-text">
                  Progress metrics and assessment records are maintained only for the duration of the organization&apos;s active subscription or academic study validity.
                </p>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-lg border border-border-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">assignment_turned_in</span>
                  <h3 className="font-headline-sm text-base text-primary-container font-semibold">Accountability</h3>
                </div>
                <p className="font-body-sm text-muted-text">
                  Owners can export timestamped compliance completion transcripts as evidence of workforce cyber-hygiene training for NDPC statutory audits.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              3. Curriculum Module 13: Dedicated NDPA Training
            </h2>
            <p>
              To ensure SME operators and counter workers understand their statutory duties, <strong>Module 13 of our curriculum</strong> is exclusively devoted to NDPA 2023 compliance:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Identifying Customer Personal Identifiable Information (PII) in physical registers and POS slips.</li>
              <li>Protocols for handling customer phone numbers and payment card receipts securely.</li>
              <li>Lawful customer communication channels vs. spam/unsolicited broadcast hazards.</li>
              <li>72-hour mandatory breach notification procedures under NDPC guidelines.</li>
            </ul>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              4. Contact the Compliance Desk
            </h2>
            <p>
              For organizational compliance verification or to request data processing agreements (DPA):
            </p>
            <div className="mt-3 p-4 bg-surface-container-low rounded-lg text-body-sm">
              <p className="font-semibold text-primary-container">NDPA Regulatory Compliance Unit</p>
              <p>Email: <a href="mailto:compliance@smeshield.ng" className="text-secondary hover:underline">compliance@smeshield.ng</a></p>
              <p>Direct Inquiries: Monday – Friday • 8:00 AM – 5:00 PM WAT</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
