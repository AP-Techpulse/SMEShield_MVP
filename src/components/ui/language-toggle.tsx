"use client"

import React from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"

export function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div 
      role="radiogroup"
      aria-label="Select language"
      className={cn("relative inline-flex h-10 items-center rounded-full bg-surface-container-low p-1 border border-border-subtle/50 shadow-inner", className)}
    >
      <button
        type="button"
        role="radio"
        aria-checked={language === "en"}
        onClick={() => setLanguage("en")}
        className={cn(
          "relative z-10 h-full rounded-full px-3.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.97]",
          language === "en" 
            ? "bg-surface text-primary shadow-sm ring-1 ring-border-subtle/40" 
            : "text-muted-text hover:text-primary hover:bg-surface/50"
        )}
      >
        English
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={language === "pcm"}
        onClick={() => setLanguage("pcm")}
        className={cn(
          "relative z-10 h-full rounded-full px-3.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.97]",
          language === "pcm" 
            ? "bg-surface text-primary shadow-sm ring-1 ring-border-subtle/40" 
            : "text-muted-text hover:text-primary hover:bg-surface/50"
        )}
      >
        Pidgin
      </button>
    </div>
  )
}
