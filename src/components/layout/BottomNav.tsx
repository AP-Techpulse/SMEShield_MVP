"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export interface NavItem {
  href: string
  label: string
  icon: React.ElementType
}

interface BottomNavProps {
  items: NavItem[]
}

export function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.04)] md:hidden">
      <div className="flex justify-around items-center h-16 px-gutter-mobile">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-w-[4rem] h-touch-target-min transition-colors",
                isActive
                  ? "text-primary font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <item.icon className={cn("h-6 w-6 mb-1", isActive ? "text-primary" : "text-muted-text")} />
              <span className="font-label-sm text-[10px] tracking-wide">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
