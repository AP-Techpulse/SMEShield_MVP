import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | SMEShield Nigeria',
  description: 'SMEShield Privacy Policy aligned with the Nigeria Data Protection Act (NDPA) 2023.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-app-bg py-space-3xl">
      <div className="max-w-4xl mx-auto px-space-lg lg:px-space-xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-label-sm text-muted-text mb-space-lg">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <span className="text-primary font-medium">Privacy Policy</span>
        </div>

        <header className="mb-space-2xl pb-space-lg border-b border-border-subtle">
          <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm mb-space-sm">
            <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
            <span>NDPA 2023 Aligned Policy</span>
          </div>
          <h1 className="font-display-title text-display-title text-primary-container mb-space-xs">
            Privacy Policy
          </h1>
          <p className="font-body-md text-muted-text">
            Last Updated: January 2026 • Governed under the laws of the Federal Republic of Nigeria
          </p>
        </header>

        <div className="prose prose-slate max-w-none space-y-space-xl text-on-surface font-body-md leading-relaxed">
          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              1. Introduction & Statutory Scope
            </h2>
            <p>
              SMEShield (&quot;we,&quot; &quot;our,&quot; or &quot;the Platform&quot;) is dedicated to safeguarding the personal data and digital privacy of Nigerian small and medium-sized enterprise (SME) operators, staff members, and independent entrepreneurs. This Privacy Policy sets out the basis on which personal data collected through our cybersecurity self-assessment and awareness training platform is processed, in strict accordance with the <strong>Nigeria Data Protection Act (NDPA) 2023</strong> and directives of the Nigeria Data Protection Commission (NDPC).
            </p>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              2. Data We Collect
            </h2>
            <p>To provide targeted, role-specific cybersecurity education, we collect minimal and necessary information:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Account Credentials:</strong> Full name, verified business or personal email address, and hashed authentication records managed securely via Supabase.</li>
              <li><strong>Organizational Metadata:</strong> Business name, enterprise classification (Retail & POS Agent, Hospitality, Logistics, Professional Services, etc.), and role tier (Business Owner, Employee, Sole Entrepreneur).</li>
              <li><strong>Training & Evaluation Metrics:</strong> Diagnostic baseline scores, module completion statuses across the 15-module curriculum, quiz scores, and computed Human Firewall Scores (HFS).</li>
              <li><strong>Technical Session Records:</strong> Standard HTTP request logs, browser language preference (English vs. Nigerian Pidgin), and secure authentication session tokens. We do <em>not</em> collect banking pins, BVNs, or payment credentials.</li>
            </ul>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              3. Purpose & Legal Basis of Processing
            </h2>
            <p>Under Section 25 of the NDPA 2023, processing is lawful under the following legal bases:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Performance of a Contract:</strong> Providing personalized learning recommendations via our deterministic rule engine and issuing verified certificates of completion.</li>
              <li><strong>Legitimate Interests:</strong> Aggregating non-personally identifiable security posture benchmarks for Nigerian SME cybersecurity research.</li>
              <li><strong>Explicit Consent:</strong> Permitting business owners to link and review aggregated team awareness records via 6-digit invitation codes.</li>
            </ul>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              4. Data Subject Rights (NDPA 2023)
            </h2>
            <p>Every registered user in Nigeria possesses the following statutory rights:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Right to Access:</strong> Request a complete copy of stored profile records and quiz transcripts.</li>
              <li><strong>Right to Rectification:</strong> Promptly update inaccurate personal details or business affiliations.</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request deletion of account data upon separation from an employer or platform disengagement.</li>
              <li><strong>Right to Object & Restrict Processing:</strong> Refuse inclusion in anonymized research analytics.</li>
            </ul>
            <p className="mt-4">
              To exercise these statutory rights, submit a verified request to our Data Protection Officer at <a href="mailto:privacy@smeshield.ng" className="text-secondary font-medium hover:underline">privacy@smeshield.ng</a>.
            </p>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              5. Security Safeguards & Multi-Tenant Isolation
            </h2>
            <p>
              We enforce industry-standard technical measures to prevent unauthorized data exposure:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Row-Level Security (RLS):</strong> Granular PostgreSQL policies ensure business owners can only query employees within their verified tenant ID, and employees can only access their own assessments.</li>
              <li><strong>TLS/HTTPS Encryption:</strong> All transit data is strictly encrypted using TLS 1.3 standards.</li>
              <li><strong>Statutory Audits:</strong> Regular compliance audits ensuring all subprocessors comply with Nigerian data sovereignty provisions.</li>
            </ul>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              6. Contact Our Data Protection Officer
            </h2>
            <p>
              For inquiries regarding data compliance or privacy procedures:
            </p>
            <div className="mt-3 p-4 bg-surface-container-low rounded-lg text-body-sm">
              <p className="font-semibold text-primary-container">SMEShield Data Protection Governance Office</p>
              <p>Email: <a href="mailto:dpo@smeshield.ng" className="text-secondary hover:underline">dpo@smeshield.ng</a></p>
              <p>Physical Correspondence: Victoria Island, Lagos / Delta State University Academic Research Annex, Abraka, Nigeria</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
