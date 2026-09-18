'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { updateProfile } from './actions'
import { updateBusinessSettings } from '@/app/dashboard/settings/actions'
import { createClient } from '@/utils/supabase/client'
import { signOut } from '@/app/auth/actions'
import { getDefaultAvatar } from '@/lib/avatar'

interface BusinessData {
  name: string
  location_state?: string
  employee_count?: string
  business_type?: string
}

interface ProfileFormProps {
  initialName: string
  email: string
  role: string
  initialAvatarUrl?: string
  preferredLanguage?: string
  userId: string
  business?: BusinessData | null
}

export function ProfileForm({ 
  initialName, 
  email, 
  role, 
  initialAvatarUrl, 
  preferredLanguage = 'en', 
  userId,
  business 
}: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSavingBiz, setIsSavingBiz] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [bizSuccess, setBizSuccess] = useState('')
  const [bizError, setBizError] = useState('')
  const [secSuccess, setSecSuccess] = useState('')
  const [secError, setSecError] = useState('')
  
  const defaultAvatar = getDefaultAvatar(role)
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || '')
  const [previewUrl, setPreviewUrl] = useState(initialAvatarUrl || '')
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  // Avatar Upload Handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 2 * 1024 * 1024) {
        setError('Image must be less than 2MB.')
        return
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setError('Only JPEG, PNG, and WebP formats are allowed.')
        return
      }
      
      setPreviewUrl(URL.createObjectURL(file))
      setError('')
      setIsSubmitting(true)
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/${Math.random()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })

      if (uploadError) {
        setError(uploadError.message)
        setIsSubmitting(false)
        return
      }

      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(fileName)
      const newUrl = publicUrlData.publicUrl
      setAvatarUrl(newUrl)
      
      const formData = new FormData()
      formData.append('fullName', initialName)
      formData.append('preferredLanguage', preferredLanguage)
      formData.append('avatarUrl', newUrl)
      
      await updateProfile(formData)
      setSuccess('Profile photo updated successfully.')
      setIsSubmitting(false)
      router.refresh()
    }
  }

  // Personal Profile Form Submit
  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    if (avatarUrl) {
      formData.append('avatarUrl', avatarUrl)
    }

    const result = await updateProfile(formData)
    setIsSubmitting(false)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess('Profile details updated successfully.')
      router.refresh()
    }
  }

  // Business Information Submit (Owners Only)
  const handleBusinessSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSavingBiz(true)
    setBizError('')
    setBizSuccess('')

    const formData = new FormData(e.currentTarget)
    const result = await updateBusinessSettings(formData)
    setIsSavingBiz(false)

    if (result.error) {
      setBizError(result.error)
    } else {
      setBizSuccess('Business details updated successfully.')
      router.refresh()
    }
  }

  // Password Change Submit
  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsChangingPassword(true)
    setSecError('')
    setSecSuccess('')

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirm = formData.get('confirmPassword') as string

    if (password !== confirm) {
      setSecError('Passwords do not match.')
      setIsChangingPassword(false)
      return
    }

    if (password.length < 8) {
      setSecError('Password must be at least 8 characters long.')
      setIsChangingPassword(false)
      return
    }

    const { error: authError } = await supabase.auth.updateUser({ password })
    setIsChangingPassword(false)

    if (authError) {
      setSecError(authError.message)
    } else {
      setSecSuccess('Password updated successfully.')
      ;(e.target as HTMLFormElement).reset()
    }
  }

  // Signout Handler
  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut()
  }

  const effectiveAvatar = previewUrl || avatarUrl || defaultAvatar
  const displayRole = role === 'business_owner' ? 'Business Owner' : 
                      role === 'employee' ? 'Employee' : 'Sole Entrepreneur'

  return (
    <div className="flex flex-col gap-space-xl">
      {/* ------------------------------------------------------------- */}
      {/* 1. PROFILE HEADER & AVATAR CARD                               */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-surface rounded-xl p-space-lg shadow-sm border border-border-subtle/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-lg">
        <div className="flex items-center gap-space-lg">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm bg-surface-container border-2 border-surface flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={effectiveAvatar} 
                alt="Profile Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload new photo"
              className="absolute -bottom-1 -right-1 bg-primary hover:bg-primary-container text-on-primary p-1.5 rounded-full shadow-sm transition-all flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[15px]">photo_camera</span>
            </button>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-md text-headline-md text-primary font-bold">{initialName || 'Account User'}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm font-semibold text-primary">
                {displayRole}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-muted-text">{email}</p>
          </div>
        </div>

        <div>
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSubmitting}
            className="h-10 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md transition-colors flex items-center gap-1.5 border border-border-subtle/40"
          >
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            <span>Change Photo</span>
          </button>
          <input 
            type="file" 
            accept="image/jpeg,image/png,image/webp" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. PERSONAL DETAILS & LANGUAGE FORM                            */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-surface rounded-xl p-space-xl shadow-sm border border-border-subtle/60 flex flex-col gap-space-md">
        <div className="border-b border-border-subtle/60 pb-space-sm">
          <h3 className="font-headline-sm text-headline-sm text-primary">Personal Details & Preferences</h3>
          <p className="font-body-sm text-body-sm text-muted-text mt-0.5">Update your display name and training dialect.</p>
        </div>

        {error && (
          <div className="p-3 bg-danger-bg text-danger-text rounded-lg text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="p-3 bg-success-bg text-success-text rounded-lg text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="flex flex-col gap-space-md">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="font-label-md text-label-md text-primary font-semibold">
              Full Name <span className="text-error">*</span>
            </label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName"
              defaultValue={initialName}
              required
              className="w-full h-11 px-space-md rounded-lg bg-app-bg text-on-surface font-body-md text-body-md border border-border-subtle focus:outline-none focus:border-secondary transition-all"
            />
          </div>

          {/* Email (Disabled) */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-primary font-semibold">
              Email Address
            </label>
            <input 
              type="email" 
              disabled
              defaultValue={email}
              className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-muted-text font-body-md text-body-md cursor-not-allowed border border-border-subtle/50"
            />
            <span className="text-xs text-muted-text">Managed via authentication and cannot be changed here.</span>
          </div>

          {/* Preferred Language */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="preferredLanguage" className="font-label-md text-label-md text-primary font-semibold">
              Preferred Training Dialect
            </label>
            <div className="relative">
              <select 
                id="preferredLanguage" 
                name="preferredLanguage"
                defaultValue={preferredLanguage}
                className="w-full h-11 px-space-md pr-10 rounded-lg bg-app-bg text-on-surface font-body-md text-body-md border border-border-subtle focus:outline-none focus:border-secondary appearance-none cursor-pointer"
              >
                <option value="en">English (Standard National Business Dialect)</option>
                <option value="pcm">Nigerian Pidgin (Workplace Practical Dialect)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-muted-text pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-space-xl rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-md-semibold text-body-md shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <span className="material-symbols-outlined text-[18px]">save</span>
              )}
              <span>{isSubmitting ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. BUSINESS INFORMATION (BUSINESS OWNERS ONLY)                 */}
      {/* ------------------------------------------------------------- */}
      {role === 'business_owner' && business && (
        <div className="bg-surface rounded-xl p-space-xl shadow-sm border border-border-subtle/60 flex flex-col gap-space-md">
          <div className="border-b border-border-subtle/60 pb-space-sm flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary">Business Information</h3>
              <p className="font-body-sm text-body-sm text-muted-text mt-0.5">Organization settings for your workplace team.</p>
            </div>
            <span className="material-symbols-outlined text-secondary text-2xl">storefront</span>
          </div>

          {bizError && (
            <div className="p-3 bg-danger-bg text-danger-text rounded-lg text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{bizError}</span>
            </div>
          )}
          
          {bizSuccess && (
            <div className="p-3 bg-success-bg text-success-text rounded-lg text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{bizSuccess}</span>
            </div>
          )}

          <form onSubmit={handleBusinessSubmit} className="flex flex-col gap-space-md">
            {/* Field 1: Business Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="font-label-md text-label-md text-primary font-semibold">
                Business Name <span className="text-error">*</span>
              </label>
              <input 
                type="text" 
                id="name" 
                name="name"
                defaultValue={business.name}
                required
                className="w-full h-11 px-space-md rounded-lg bg-app-bg text-on-surface font-body-md text-body-md border border-border-subtle focus:outline-none focus:border-secondary transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
              {/* Field 2: State / Location */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="location_state" className="font-label-md text-label-md text-primary font-semibold">
                  State / Location
                </label>
                <input 
                  type="text" 
                  id="location_state" 
                  name="location_state"
                  defaultValue={business.location_state || ''}
                  placeholder="e.g. Lagos"
                  className="w-full h-11 px-space-md rounded-lg bg-app-bg text-on-surface font-body-md text-body-md border border-border-subtle focus:outline-none focus:border-secondary transition-all"
                />
              </div>

              {/* Field 3: Employee Count */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="employee_count" className="font-label-md text-label-md text-primary font-semibold">
                  Employee Count
                </label>
                <input 
                  type="text" 
                  id="employee_count" 
                  name="employee_count"
                  defaultValue={business.employee_count || ''}
                  placeholder="e.g. 5-10"
                  className="w-full h-11 px-space-md rounded-lg bg-app-bg text-on-surface font-body-md text-body-md border border-border-subtle focus:outline-none focus:border-secondary transition-all"
                />
              </div>

              {/* Field 4: Business Type */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="business_type" className="font-label-md text-label-md text-primary font-semibold">
                  Business Type
                </label>
                <div className="relative">
                  <select 
                    id="business_type" 
                    name="business_type"
                    defaultValue={business.business_type || 'retail'}
                    className="w-full h-11 px-space-md pr-10 rounded-lg bg-app-bg text-on-surface font-body-md text-body-md border border-border-subtle focus:outline-none focus:border-secondary appearance-none cursor-pointer"
                  >
                    <option value="retail">Retail / Shop</option>
                    <option value="service">Services</option>
                    <option value="food">Food & Hospitality</option>
                    <option value="wholesale">Wholesale & Logistics</option>
                    <option value="online">Online / E-commerce</option>
                    <option value="other">Other</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-muted-text pointer-events-none text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                type="submit"
                disabled={isSavingBiz}
                className="h-11 px-space-xl rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-md-semibold text-body-md shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-60"
              >
                {isSavingBiz ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">save</span>
                )}
                <span>{isSavingBiz ? 'Saving...' : 'Save Business Details'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. ACCOUNT SECURITY & SIGN OUT                                */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-surface rounded-xl p-space-xl shadow-sm border border-border-subtle/60 flex flex-col gap-space-md">
        <div className="border-b border-border-subtle/60 pb-space-sm">
          <h3 className="font-headline-sm text-headline-sm text-primary">Account Security</h3>
          <p className="font-body-sm text-body-sm text-muted-text mt-0.5">Manage your password and active sessions.</p>
        </div>

        {secError && (
          <div className="p-3 bg-danger-bg text-danger-text rounded-lg text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{secError}</span>
          </div>
        )}
        
        {secSuccess && (
          <div className="p-3 bg-success-bg text-success-text rounded-lg text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{secSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl pt-1">
          {/* Change Password */}
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-space-md">
            <h4 className="font-label-lg text-label-lg text-primary font-semibold">Change Password</h4>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-xs font-semibold text-primary">New Password</label>
              <input 
                type="password" 
                id="password" 
                name="password"
                required
                minLength={8}
                placeholder="At least 8 characters"
                className="w-full h-10 px-3 rounded-lg bg-app-bg text-sm border border-border-subtle focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="text-xs font-semibold text-primary">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword"
                required
                minLength={8}
                placeholder="Re-enter new password"
                className="w-full h-10 px-3 rounded-lg bg-app-bg text-sm border border-border-subtle focus:outline-none focus:border-secondary"
              />
            </div>

            <button 
              type="submit"
              disabled={isChangingPassword}
              className="h-10 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-body-md-semibold text-xs transition-colors self-start disabled:opacity-60 flex items-center gap-1.5 mt-1"
            >
              {isChangingPassword ? (
                <span className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span>
              ) : (
                <span className="material-symbols-outlined text-[16px]">key</span>
              )}
              <span>Update Password</span>
            </button>
          </form>

          {/* Active Session & Sign Out */}
          <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border-subtle/60 pt-4 lg:pt-0 lg:pl-space-xl">
            <div>
              <h4 className="font-label-lg text-label-lg text-primary font-semibold">Current Session</h4>
              <p className="text-xs text-muted-text mt-1">
                You are currently signed in on this device. Sign out below to end your active session safely.
              </p>
            </div>

            <div className="pt-4">
              <button 
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full sm:w-auto h-10 px-5 rounded-lg bg-danger-bg hover:bg-danger-base hover:text-white text-danger-text font-body-md-semibold text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>{isSigningOut ? 'Signing Out...' : 'Sign Out of SMEShield'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
