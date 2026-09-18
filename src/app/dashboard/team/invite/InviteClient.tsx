'use client'

import { useState } from 'react'
import { regenerateJoinCode, sendEmployeeInvite } from './actions'

export function InviteClient({ initialJoinCode }: { initialJoinCode: string }) {
  const [joinCode, setJoinCode] = useState(initialJoinCode)
  const [email, setEmail] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const handleCopy = () => {
    navigator.clipboard.writeText(joinCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRegenerate = async () => {
    if (!confirm('Are you sure you want to regenerate the join code? The old code will no longer work for new employees.')) {
      return
    }
    setIsRegenerating(true)
    setMessage({ text: '', type: '' })
    const result = await regenerateJoinCode()
    if (result.error) {
      setMessage({ text: result.error, type: 'error' })
    } else if (result.success && result.joinCode) {
      setJoinCode(result.joinCode)
      setMessage({ text: 'Join code regenerated successfully.', type: 'success' })
    }
    setIsRegenerating(false)
  }

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSending(true)
    setMessage({ text: '', type: '' })

    const result = await sendEmployeeInvite(email)
    if (result.error) {
      setMessage({ text: result.error, type: 'error' })
    } else {
      setMessage({ text: 'Invitation sent successfully.', type: 'success' })
      setEmail('')
    }
    setIsSending(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl items-stretch">
      {message.text && (
        <div className={`col-span-1 lg:col-span-2 p-4 rounded-lg flex items-center gap-2 text-sm font-semibold ${
          message.type === 'error' ? 'bg-danger-bg text-danger-text' : 'bg-success-bg text-success-text'
        }`}>
          <span className="material-symbols-outlined">{message.type === 'error' ? 'error' : 'check_circle'}</span>
          <span>{message.text}</span>
        </div>
      )}

      {/* Persistent Join Code */}
      <div className="relative flex flex-col justify-between bg-surface rounded-xl p-space-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col gap-space-lg">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between gap-space-sm">
              <span className="font-label-sm text-label-sm text-primary-container tracking-wider uppercase">Method A</span>
              <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-info-bg text-info-text font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">storefront</span>
                Recommended for In-Store
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary mt-space-xs">6-Digit Walk-in Join Code</h2>
            <p className="font-body-sm text-body-sm text-muted-text">
              Staff can simply enter this code when registering their account on their own phone or tablet to automatically link to your business.
            </p>
          </div>
          
          <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-lg flex flex-col items-center justify-center gap-space-xs text-center shadow-inner">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary-container/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none"></div>
            <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-widest">Single Store Entry PIN</span>
            <div className="flex items-center justify-center py-space-xs">
              <span className="font-headline-xl text-primary tracking-[0.2em] select-all font-mono text-[42px] leading-none">
                {joinCode}
              </span>
            </div>
            <div className="flex items-center gap-space-xs text-success-text bg-success-bg/50 px-space-sm py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span className="font-label-sm text-label-sm font-semibold">Always Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-space-sm mt-space-xl">
          <button
            onClick={handleCopy}
            className="w-full h-12 bg-surface hover:bg-surface-container border border-border-subtle text-primary rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-xs shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">{copied ? 'check' : 'content_copy'}</span>
            {copied ? 'Copied' : 'Copy Code Number'}
          </button>
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="w-full sm:w-auto px-space-lg h-12 bg-surface hover:bg-danger-bg/20 text-danger-text rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            {isRegenerating ? '...' : 'Reset PIN'}
          </button>
        </div>
      </div>

      {/* Email Invitation */}
      <div className="flex flex-col justify-between bg-surface rounded-xl p-space-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-primary-container">
        <div className="flex flex-col gap-space-lg">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm text-primary-container tracking-wider uppercase">Method B</span>
            <h2 className="font-headline-lg text-headline-lg text-primary mt-space-xs">Direct Email Invite</h2>
            <p className="font-body-sm text-body-sm text-muted-text">
              Send a targeted email containing a magic link and instructions directly to a manager or staff member&apos;s inbox.
            </p>
          </div>
          
          <form onSubmit={handleSendInvite} className="flex flex-col gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="emailInput" className="font-label-md text-label-md text-primary font-semibold">Employee Email Address</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-muted-text text-[20px] pointer-events-none">mail</span>
                <input
                  id="emailInput"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="manager@brightpay.ng"
                  className="w-full h-12 pl-11 pr-4 bg-app-bg text-on-surface placeholder:text-muted-text rounded-lg border border-border-subtle focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition text-base"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSending || !email}
              className="w-full h-12 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-space-xs shadow-md mt-space-sm"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
              {isSending ? 'Sending...' : 'Dispatch Email Invitation'}
            </button>
          </form>
        </div>
        
        <div className="mt-space-xl p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs border border-border-subtle">
          <span className="material-symbols-outlined text-info-text text-[18px] shrink-0 mt-0.5">info</span>
          <p className="font-body-sm text-body-sm text-muted-text">
            They will receive an official SMEShield onboarding email verifying your business name.
          </p>
        </div>
      </div>
    </div>
  )
}
