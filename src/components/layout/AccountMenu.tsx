"use client"

import * as React from "react"
import Link from "next/link"
import { SignOutButton } from "./SignOutButton"
import { useLanguage } from "@/contexts/LanguageContext"
import { getDefaultAvatar } from "@/lib/avatar"

type Role = "business_owner" | "employee" | "sole_entrepreneur" | null

interface AccountMenuProps {
  userRole?: Role
  userName?: string | null
  avatarUrl?: string | null
}

export function AccountMenu({ userRole, userName, avatarUrl }: AccountMenuProps) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClose = () => setIsOpen(false)

  const effectiveAvatar = avatarUrl || getDefaultAvatar(userRole)

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-1 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full pr-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-sm ring-1 ring-border-subtle overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={effectiveAvatar} alt={userName || "Avatar"} className="w-full h-full object-cover" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success-base ring-2 ring-surface-container-lowest"></span>
        </div>
        <div className="hidden md:flex flex-col text-left">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-on-surface">{userName || "User"}</span>
          </div>
          <span className="text-xs text-muted-text capitalize">{userRole?.replace('_', ' ') || "Learner"}</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface border border-border-subtle shadow-level-2 py-1 z-50">
          <div className="px-4 py-2 border-b border-border-subtle mb-1">
            <p className="text-sm font-medium text-on-surface truncate">{userName || "User"}</p>
            <p className="text-xs text-muted-text capitalize truncate">{userRole?.replace('_', ' ')}</p>
          </div>
          
          <Link href="/dashboard/profile" onClick={handleClose} className="block px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors">
            {t("Profile", "Profile")}
          </Link>
          
          <div className="border-t border-border-subtle mt-1 pt-1">
            <div className="px-4 py-2 hover:bg-surface-container transition-colors cursor-pointer text-error">
              <SignOutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
