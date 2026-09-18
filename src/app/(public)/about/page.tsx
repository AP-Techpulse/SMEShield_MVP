import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About SMEShield | Mission & Academic Research Background',
  description: 'Learn about SMEShield, our mission to protect Nigerian SMEs through bilingual human firewall training, and our academic research foundations.',
}

export default function AboutPage() {
  return (
    <div className="w-full bg-app-bg py-space-3xl">
      <div className="max-w-4xl mx-auto px-space-lg lg:px-space-xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-label-sm text-muted-text mb-space-lg">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <span className="text-primary font-medium">About SMEShield</span>
        </div>

        <header className="mb-space-2xl pb-space-lg border-b border-border-subtle">
          <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm mb-space-sm">
            <span className="material-symbols-outlined text-[16px] text-secondary">shield</span>
            <span>Academic Research &amp; Commercial Protection</span>
          </div>
          <h1 className="font-display-title text-display-title text-primary-container mb-space-xs">
            About SMEShield
          </h1>
          <p className="font-body-md text-muted-text">
            Democratizing culturally-grounded cybersecurity education for Nigerian frontline enterprises.
          </p>
        </header>

        <div className="prose prose-slate max-w-none space-y-space-xl text-on-surface font-body-md leading-relaxed">
          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              Our Origin &amp; The Nigerian SME Dilemma
            </h2>
            <p>
              In Nigeria, over 39 million micro, small, and medium-sized enterprises (MSMEs) form the backbone of the national economy, accounting for roughly 84% of employment. Yet, as digital payment channels—ranging from Point of Sale (POS) terminals to direct bank transfer notifications—have become ubiquitous, small businesses have become prime targets for criminal social engineering schemes.
            </p>
            <p className="mt-2">
              Unlike multinational corporations, a typical Nigerian boutique owner, supermarket manager, or agency banking kiosk operator cannot afford multi-million-naira enterprise Security Operations Centres (SOCs) or annual corporate licenses. Furthermore, existing cybersecurity awareness programs are riddled with Western enterprise jargon (&quot;spear phishing,&quot; &quot;zero trust architecture&quot;) that fails to connect with frontline staff operating in bustling trade hubs like Alaba, Computer Village, or Ariaria.
            </p>
            <p className="mt-2">
              <strong>SMEShield was conceived to solve this exact divide.</strong>
            </p>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              Our Guiding Philosophy: Protection Without Fear
            </h2>
            <p>
              We believe cybersecurity should not intimidate. Traditional security warnings rely on paralyzing fear. Instead, SMEShield cultivates professional confidence and vigilance through:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Cultural &amp; Linguistic Resonance:</strong> Comprehensive first-class delivery in both formal English and authentic Nigerian Pidgin with 100% curriculum parity.</li>
              <li><strong>Local Threat Scenarios:</strong> Pragmatic lessons directly mapping to actual Nigerian fraud schemes: POS reversal deception, fake credit alerts, WhatsApp voice impersonation, SIM swap takeover, and invoice substitution.</li>
              <li><strong>Deterministic Adaptive Learning:</strong> A rule-based engine that recommends refresher modules based on diagnostic gaps and business vertical—without unpredictable AI hallucinations.</li>
              <li><strong>Measurable Human Firewall Score (HFS):</strong> An objective, transparent formula combining module completion (35%) and quiz performance (65%) to benchmark staff resilience over time.</li>
            </ul>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              Academic Research Foundation
            </h2>
            <p>
              SMEShield represents a postgraduate research implementation in Computer Science at Delta State University, Abraka, supervised to investigate the impact of culturally-grounded, bilingual micro-learning on SME cybersecurity resilience.
            </p>
            <div className="mt-4 p-4 bg-surface-container-low rounded-lg border border-border-subtle text-body-sm">
              <p className="font-semibold text-primary-container">Key Academic Objectives:</p>
              <ol className="list-decimal pl-5 space-y-1 mt-1 text-muted-text">
                <li>Characterize the prevailing social engineering threat landscape facing Nigerian SMEs.</li>
                <li>Design and deploy a bilingual (English and Nigerian Pidgin) modular curriculum tailored to three operational tiers.</li>
                <li>Implement a deterministic, rule-based recommendation engine for personalized remediation.</li>
                <li>Empirically validate improvement in Human Firewall Scores pre- and post-intervention.</li>
              </ol>
            </div>
          </section>

          <section className="bg-surface p-space-xl rounded-xl border border-border-subtle shadow-xs">
            <h2 className="font-headline-md text-headline-md text-primary-container mb-space-sm">
              Join the Shielding Initiative
            </h2>
            <p>
              Whether you are a business owner seeking to protect your team, a counter clerk sharpening your instincts, or an academic evaluator reviewing our methodology, SMEShield provides accessible, verified protection for all.
            </p>
            <div className="mt-4 flex gap-4">
              <Link 
                href="/signup" 
                className="h-11 px-6 inline-flex items-center justify-center bg-primary-container text-on-primary rounded-lg font-label-md font-semibold hover:bg-primary transition shadow-sm"
              >
                Register Free Today
              </Link>
              <Link 
                href="/how-it-works" 
                className="h-11 px-6 inline-flex items-center justify-center bg-surface-container-low text-primary-container rounded-lg font-label-md hover:bg-surface-container transition"
              >
                Take the Product Tour
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
