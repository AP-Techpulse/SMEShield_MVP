'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageToggle } from '@/components/ui/language-toggle'

const glossaryTerms = [
  {
    term: "Phishing",
    def_en: "A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity in an electronic communication.",
    def_pcm: "When scammer disguise like real company for email or message to steal your password or card details."
  },
  {
    term: "Business Email Compromise (BEC)",
    def_en: "A type of scam targeting companies who conduct wire transfers, where a hacker compromises legitimate business email accounts to conduct unauthorized transfers of funds.",
    def_pcm: "When hacker take over your supplier or oga email come dey command you make you send money go another account."
  },
  {
    term: "Ransomware",
    def_en: "A type of malicious software designed to block access to a computer system or files until a sum of money is paid.",
    def_pcm: "Virus wey go lock all the files for your computer, then the hackers go demand for money before dem open am back."
  },
  {
    term: "SIM Swap Fraud",
    def_en: "An account takeover fraud that generally targets a weakness in two-factor authentication and two-step verification, where the second factor is a text message or a call placed to a mobile phone.",
    def_pcm: "When scammer block your SIM card come activate your number for their own phone, so dem go fit receive all your bank OTPs."
  },
  {
    term: "Malware",
    def_en: "Software that is specifically designed to disrupt, damage, or gain unauthorized access to a computer system.",
    def_pcm: "Any bad program or virus wey dey spoil phone or computer, or steal information from am."
  },
  {
    term: "Social Engineering",
    def_en: "The psychological manipulation of people into performing actions or divulging confidential information.",
    def_pcm: "When scammer use format or sweet mouth trick you make you do wetin dem want or give dem your secret information."
  },
  {
    term: "Two-Factor Authentication (2FA)",
    def_en: "A security process in which users provide two different authentication factors to verify themselves.",
    def_pcm: "Extra security lock. Aside from your password, the app go still ask for OTP before e open."
  }
]

export default function GlossaryPage() {
  const { language } = useLanguage()
  const [search, setSearch] = useState('')

  const filteredTerms = glossaryTerms.filter(t => 
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.def_en.toLowerCase().includes(search.toLowerCase()) ||
    t.def_pcm.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-app-bg flex flex-col">
      <header className="sticky top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(26,43,72,0.04)]">
        <div className="h-16 max-w-[75rem] mx-auto px-4 lg:px-8 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-11 flex items-center justify-center shrink-0">
              <svg className="w-full h-full" fill="none" viewBox="0 0 44 52" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2C34 2 42 7.5 42 22C42 37 28 47 22 50C16 47 2 37 2 22C2 7.5 10 2 22 2Z" fill="#031632" />
                <path d="M22 8L34 22H26V35H18V22H10L22 8Z" fill="#0060ac" />
                <circle cx="22" cy="22" fill="#ffb955" r="3.5" />
              </svg>
            </div>
            <span className="font-serif text-lg font-bold text-primary tracking-tight">SMEShield</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="max-w-[48rem] mx-auto px-4 lg:px-8">
          
          <div className="mb-10 text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
              Security Glossary
            </h1>
            <p className="text-muted-text max-w-lg mx-auto">
              Quick reference for common cybersecurity terms, explained simply.
            </p>
          </div>

          <div className="mb-8 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted-text">search</span>
            <input 
              type="text" 
              placeholder="Search for a term..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border-subtle bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
            />
          </div>

          <div className="space-y-4">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((item, idx) => (
                <div key={idx} className="bg-surface border border-border-subtle rounded-xl p-6 shadow-sm hover:shadow-level-1 transition-shadow">
                  <h3 className="font-serif text-lg font-bold text-primary mb-2">{item.term}</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {language === 'pcm' ? item.def_pcm : item.def_en}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-text">
                No terms found matching &quot;{search}&quot;
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
