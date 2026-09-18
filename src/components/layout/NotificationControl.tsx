"use client"

import * as React from "react"
import Link from "next/link"
import { Bell } from "lucide-react"

interface NotificationControlProps {
  unreadCount?: number
}

export function NotificationControl({ unreadCount = 0 }: NotificationControlProps) {
  return (
    <Link href="/dashboard/notifications" className="relative p-2 flex items-center justify-center rounded-lg text-muted-text hover:bg-surface-container hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <Bell className="h-6 w-6" />
      {unreadCount > 0 && (
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
      )}
    </Link>
  )
}
