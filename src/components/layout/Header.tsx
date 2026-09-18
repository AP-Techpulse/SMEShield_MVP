"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { Logo } from "@/components/ui/Logo"
import { NotificationControl } from "./NotificationControl"
import { AccountMenu } from "./AccountMenu"

type Role = "business_owner" | "employee" | "sole_entrepreneur" | null

interface HeaderProps {
  userRole?: Role
  userName?: string | null
  avatarUrl?: string | null
  unreadNotifications?: number
  navItems?: { href: string; label: string }[]
}

export function Header({ userRole, userName, avatarUrl, unreadNotifications = 0, navItems }: HeaderProps) {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-outline-variant/40 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(26,43,72,0.04)]">
      <div className="flex h-16 max-w-container-max mx-auto items-center px-space-lg lg:px-space-xl justify-between gap-space-md">
        
        {/* Brand & Optional Top Nav */}
        <div className="flex items-center gap-space-xl">
          <Link href="/dashboard" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            <Logo size="sm" />
          </Link>

          {/* Top Navigation (Desktop) - Rendered if navItems provided (Learner Roles) */}
          {navItems && navItems.length > 0 && (
            <nav className="hidden md:flex items-center gap-space-lg h-16" data-active-classes="text-primary font-body-md-semibold border-b-2 border-primary">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`) && item.href !== "/dashboard"
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`h-full flex items-center px-space-xs transition-colors ${
                      isActive 
                        ? "text-primary font-body-md-semibold border-b-2 border-primary"
                        : "font-body-md text-body-md text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden md:flex">
            <LanguageToggle />
          </div>

          <NotificationControl unreadCount={unreadNotifications} />

          <div className="h-8 w-px bg-border-subtle hidden md:block"></div>

          <AccountMenu userRole={userRole} userName={userName} avatarUrl={avatarUrl} />
        </div>
      </div>
    </header>
  )
}
