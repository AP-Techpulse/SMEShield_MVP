"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NavItem } from "./BottomNav"
import { SignOutButton } from "./SignOutButton"


interface SidebarProps {
  items: NavItem[]
}

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-64 bg-surface-container-lowest border-r border-border-subtle z-40 hidden md:flex flex-col justify-between">
      <nav className="flex-1 space-y-2 p-space-md mt-4">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-label-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isActive
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-on-primary" : "text-muted-text")} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      
      <div className="p-4 mt-auto border-t border-border-subtle flex flex-col gap-4">
        {/* Fallback language toggle on sidebar for some layouts if needed, but it's mainly in Header. We'll leave it in header for desktop. */}
        <SignOutButton />
      </div>
    </aside>
  )
}
