"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"

type Language = "en" | "pcm"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (en: string, pcm: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  
  // We use useState to avoid re-creating the client on every render
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    const fetchLanguage = async () => {
      // Fast path: local storage
      const saved = localStorage.getItem("preferred_language") as Language
      if (saved && (saved === "en" || saved === "pcm")) {
        setLanguage(saved)
      }

      // Sync with Supabase for authenticated users
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from("users")
          .select("preferred_language")
          .eq("id", user.id)
          .single()
        
        if (data?.preferred_language && (data.preferred_language === "en" || data.preferred_language === "pcm")) {
          // If server preference differs from local fast path, update it
          setLanguage(data.preferred_language)
          localStorage.setItem("preferred_language", data.preferred_language)
        }
      }
    }
    
    fetchLanguage()
  }, [supabase])

  const handleSetLanguage = async (lang: Language) => {
    // Optimistic UI update
    setLanguage(lang)
    localStorage.setItem("preferred_language", lang)
    if (typeof document !== 'undefined') {
      document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`
    }
    
    // Persist to backend if logged in
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase
        .from("users")
        .update({ preferred_language: lang })
        .eq("id", user.id)
    }
  }

  const t = (en: string, pcm: string) => (language === "en" ? en : pcm)

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
