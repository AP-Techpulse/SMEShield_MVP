"use client"

import * as React from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LayoutDashboard, BookOpen, BarChart3, Users } from "lucide-react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { BottomNav, NavItem } from "./BottomNav"

type Role = "business_owner" | "employee" | "sole_entrepreneur" | null

interface AuthenticatedLayoutProps {
  children: React.ReactNode
  userRole?: Role
  userName?: string | null
  avatarUrl?: string | null
}

export function AuthenticatedLayout({ children, userRole, userName, avatarUrl }: AuthenticatedLayoutProps) {
  const { t } = useLanguage()

  // Define role-aware navigation
  const navItems = React.useMemo(() => {
    const items: NavItem[] = [
      { href: "/dashboard", label: t("Dashboard", "Dashboard"), icon: LayoutDashboard },
      { href: "/training", label: t("Training", "Training"), icon: BookOpen },
      { href: "/dashboard/progress", label: t("Progress", "Progress"), icon: BarChart3 },
    ]

    // Business owners see team/employees
    if (userRole === "business_owner") {
      items.push({ href: "/dashboard/team", label: t("Team", "Team"), icon: Users })
    }

    return items
  }, [userRole, t])

  const isOwner = userRole === "business_owner"

  return (
    <div className="flex min-h-screen flex-col bg-app-bg">
      <Header 
        userRole={userRole} 
        userName={userName} 
        avatarUrl={avatarUrl}
        unreadNotifications={0} 
        navItems={!isOwner ? navItems : undefined} 
      />
      
      <div className="flex flex-1 pt-16">
        {/* Desktop Sidebar (Only for Business Owners) */}
        {isOwner && <Sidebar items={navItems} />}

        {/* Main Content Area */}
        <main className={`flex-1 w-full overflow-y-auto pb-20 md:pb-8 ${isOwner ? 'md:pl-64' : ''}`}>
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav items={navItems} />
      </div>
    </div>
  )
}
