"use client"

import * as React from "react"
import { LogOut } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()
  const [isSigningOut, setIsSigningOut] = React.useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-danger-text transition-colors hover:bg-danger-bg"
    >
      <LogOut className="h-5 w-5" />
      {isSigningOut ? "Signing out..." : "Sign Out"}
    </button>
  )
}
