"use client"

import * as React from "react"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-container-lowest">
      <main className="flex-1 w-full flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  )
}
