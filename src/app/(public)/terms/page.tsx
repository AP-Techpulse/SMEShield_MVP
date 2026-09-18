import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use | SMEShield Nigeria',
  description: 'Terms and Conditions governing SMEShield cybersecurity training and self-assessment services.',
}

export default function TermsOfUsePage() {
  return (
    <div className="w-full bg-app-bg py-space-3xl">
      <div className="max-w-4xl mx-auto px-space-lg lg:px-space-xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-label-sm text-muted-text mb-space-lg">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <span className="text-primary font-medium">Terms of Use</span>
        </div>

        <header className="mb-space-2xl pb-space-lg border-b border-border-subtle">
          <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm mb-space-sm">
            <span className="material-symbols-outlined text-[16px] text-secondary">gavel</span>
            <span>Service Terms & Conditions</span>
          </div>
          <h1 className="font-display-title text-display-title text-primary-container mb-space-xs">
            Terms of Use
          </h1>
          <p className="font-body-md text-muted-text">
            Effective Date: January 1, 2026 • Governed by the Laws of the Federal Republic of Nigeria
          </p>
        </header>

        <div className="prose prose-slate max-w-none space-y-space-xl text-on-surface font-body-md leading-relaxed">
          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, creating an account, or interacting with SMEShield (&quot;the Platform&quot;), whether as a Business Owner, an invited Employee, or an independent Sole Entrepreneur, you agree to be legally bound by these Terms of Use and all applicable Nigerian legislation, including the Cybercrimes (Prohibition, Prevention, etc.) Act 2015 (as amended 2024) and the Nigeria Data Protection Act 2023.
            </p>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              2. Nature & Scope of Service: Educational Platform
            </h2>
            <div className="p-4 bg-info-bg rounded-lg border border-info-base/20 my-3">
              <p className="font-semibold text-info-text mb-1">Important Scope Notice:</p>
              <p className="text-body-sm text-on-surface">
                SMEShield is strictly an <strong>educational cybersecurity awareness training and self-assessment platform</strong>. It does <em>not</em> provide real-time endpoint threat detection, automated intrusion prevention (EDR/SIEM), or live banking fraud blocking services. Completion of modules and attainment of a Human Firewall Score does not guarantee absolute immunity against criminal social engineering attacks.
              </p>
            </div>
            <p className="mt-2">
              The Platform provides interactive scenarios, quizzes, and adaptive learning tracks designed to cultivate frontline staff vigilance and improve operational cyber hygiene within Nigerian micro, small, and medium-sized enterprises.
            </p>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              3. User Responsibilities & Account Integrity
            </h2>
            <p>Users agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Provide accurate identification information during onboarding.</li>
              <li>Safeguard login credentials and refrain from unauthorized distribution of business join codes.</li>
              <li>Complete assessment quizzes honestly without automated scripting or external interception tools.</li>
              <li>Respect platform intellectual property, including proprietary curriculum content and scenario assets.</li>
            </ul>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              4. Business Workspace Administration & Staff Joining
            </h2>
            <p>
              Business Owners are solely responsible for generating, distributing, and revoking 6-digit staff join codes. Employees joining an organization warrant that they are authorized staff members. Business Owners may inspect module completion metrics and Human Firewall Scores of linked personnel for organizational compliance.
            </p>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              5. Intellectual Property Rights
            </h2>
            <p>
              All curriculum modules, scenario designs, Nigerian Pidgin translations, algorithms, UI components, and the SMEShield vector identity are the intellectual property of SMEShield and academic researchers. Users are granted a revocable, non-exclusive, non-transferable license to access the training materials for internal educational purposes.
            </p>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              6. Limitation of Liability & Disclaimers
            </h2>
            <p>
              To the fullest extent permitted under Nigerian law, SMEShield and its developers shall not be liable for any direct, indirect, incidental, or consequential losses, including lost revenue, banking losses, or ransomware damages incurred by businesses following cyber incidents. Our tools serve solely to educate and promote preventive behavioral habits.
            </p>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              7. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms shall be interpreted in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from the use of this Platform shall be submitted to mediation in Lagos State, Nigeria, before recourse to judicial arbitration.
            </p>
            <div className="mt-4 pt-4 border-t border-border-subtle text-body-sm text-muted-text">
              Questions regarding these Terms should be sent to <a href="mailto:legal@smeshield.ng" className="text-secondary hover:underline">legal@smeshield.ng</a>.
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
