'use client'

import { useState } from 'react'
import { updateBusinessSettings } from './actions'

type SettingsClientProps = {
  business: {
    name: string
    location_state?: string
    employee_count?: string
    business_type?: string
  }
}

export function SettingsClient({ business }: SettingsClientProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage({ text: '', type: '' })
    
    const formData = new FormData(e.currentTarget)
    const result = await updateBusinessSettings(formData)
    
    if (result.error) {
      setMessage({ text: result.error, type: 'error' })
    } else {
      setMessage({ text: 'Business settings updated successfully.', type: 'success' })
    }
    
    setIsSaving(false)
  }

  return (
    <div className="bg-surface rounded-xl p-space-xl shadow-sm relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary-container"></div>
      <div className="flex items-start justify-between gap-space-md mb-space-lg">
        <div className="flex items-center gap-space-sm">
          <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-[26px]">store</span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider block">Verified Legal Entity</span>
            <h2 className="font-headline-md text-headline-md text-primary">Business Identity & Legal Info</h2>
          </div>
        </div>
      </div>
      
      {message.text && (
        <div className={`mb-space-md p-4 rounded-lg flex items-center gap-2 text-sm font-semibold ${
          message.type === 'error' ? 'bg-danger-bg text-danger-text' : 'bg-success-bg text-success-text'
        }`}>
          <span className="material-symbols-outlined">{message.type === 'error' ? 'error' : 'check_circle'}</span>
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-label-md text-label-md text-primary font-semibold">Registered Business Name (CAC)</label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-muted-text text-[20px] pointer-events-none">business</span>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={business.name}
              required
              className="w-full h-12 pl-11 pr-4 bg-app-bg text-on-surface placeholder:text-muted-text rounded-lg border border-border-subtle focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="business_type" className="font-label-md text-label-md text-primary font-semibold">Primary Industry</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-muted-text text-[20px] pointer-events-none">category</span>
              <select
                id="business_type"
                name="business_type"
                defaultValue={business.business_type || ""}
                className="w-full h-12 pl-11 pr-10 bg-app-bg text-on-surface rounded-lg border border-border-subtle focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition text-base appearance-none cursor-pointer"
              >
                <option value="" disabled>Select your business type</option>
                <option value="retail">Retail / Shop</option>
                <option value="service">Services (Salons, Mechanics)</option>
                <option value="food">Food & Restaurant</option>
                <option value="wholesale">Wholesale / Distribution</option>
                <option value="online">Online / E-commerce</option>
                <option value="other">Other</option>
              </select>
              <span className="material-symbols-outlined absolute right-3.5 text-muted-text text-[20px] pointer-events-none">expand_more</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="employee_count" className="font-label-md text-label-md text-primary font-semibold">Workforce Size</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-muted-text text-[20px] pointer-events-none">groups</span>
              <select
                id="employee_count"
                name="employee_count"
                defaultValue={business.employee_count || ""}
                className="w-full h-12 pl-11 pr-10 bg-app-bg text-on-surface rounded-lg border border-border-subtle focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition text-base appearance-none cursor-pointer"
              >
                <option value="" disabled>Select employee count</option>
                <option value="1">Just me</option>
                <option value="5">1 - 5</option>
                <option value="20">6 - 20</option>
                <option value="50">More than 20</option>
              </select>
              <span className="material-symbols-outlined absolute right-3.5 text-muted-text text-[20px] pointer-events-none">expand_more</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="location_state" className="font-label-md text-label-md text-primary font-semibold">Headquarters State</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-muted-text text-[20px] pointer-events-none">pin_drop</span>
              <select
                id="location_state"
                name="location_state"
                defaultValue={business.location_state || ""}
                className="w-full h-12 pl-11 pr-10 bg-app-bg text-on-surface rounded-lg border border-border-subtle focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition text-base appearance-none cursor-pointer"
              >
                <option value="" disabled>Select your state</option>
                <option value="Abia">Abia</option>
                <option value="Abuja">Abuja (FCT)</option>
                <option value="Adamawa">Adamawa</option>
                <option value="Akwa Ibom">Akwa Ibom</option>
                <option value="Anambra">Anambra</option>
                <option value="Bauchi">Bauchi</option>
                <option value="Bayelsa">Bayelsa</option>
                <option value="Benue">Benue</option>
                <option value="Borno">Borno</option>
                <option value="Cross River">Cross River</option>
                <option value="Delta">Delta</option>
                <option value="Ebonyi">Ebonyi</option>
                <option value="Edo">Edo</option>
                <option value="Ekiti">Ekiti</option>
                <option value="Enugu">Enugu</option>
                <option value="Gombe">Gombe</option>
                <option value="Imo">Imo</option>
                <option value="Jigawa">Jigawa</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Kano">Kano</option>
                <option value="Katsina">Katsina</option>
                <option value="Kebbi">Kebbi</option>
                <option value="Kogi">Kogi</option>
                <option value="Kwara">Kwara</option>
                <option value="Lagos">Lagos</option>
                <option value="Nasarawa">Nasarawa</option>
                <option value="Niger">Niger</option>
                <option value="Ogun">Ogun</option>
                <option value="Ondo">Ondo</option>
                <option value="Osun">Osun</option>
                <option value="Oyo">Oyo</option>
                <option value="Plateau">Plateau</option>
                <option value="Rivers">Rivers</option>
                <option value="Sokoto">Sokoto</option>
                <option value="Taraba">Taraba</option>
                <option value="Yobe">Yobe</option>
                <option value="Zamfara">Zamfara</option>
              </select>
              <span className="material-symbols-outlined absolute right-3.5 text-muted-text text-[20px] pointer-events-none">expand_more</span>
            </div>
          </div>
        </div>

        <div className="mt-space-md border-t border-border-subtle pt-space-lg flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-space-xl h-12 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-space-xs shadow-md"
          >
            <span className="material-symbols-outlined text-[20px]">save</span>
            {isSaving ? 'Synchronizing...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
