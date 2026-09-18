'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { revokeInvite } from './actions'

export function RevokeInviteButton({ inviteId }: { inviteId: string }) {
  const [isRevoking, setIsRevoking] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleRevoke = async () => {
    setIsRevoking(true)
    const result = await revokeInvite(inviteId)
    if (result.error) {
      alert(result.error)
      setIsRevoking(false)
    } else {
      setShowConfirm(false)
      setIsRevoking(false)
      router.refresh()
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center justify-end gap-2">
        <span className="text-sm text-muted-text">Delete?</span>
        <button
          onClick={() => setShowConfirm(false)}
          className="text-xs px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high transition"
          disabled={isRevoking}
        >
          Cancel
        </button>
        <button
          onClick={handleRevoke}
          className="text-xs px-2 py-1 rounded bg-danger-bg text-danger-text hover:bg-danger-base hover:text-on-error transition"
          disabled={isRevoking}
        >
          {isRevoking ? '...' : 'Confirm'}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="text-sm text-danger-text hover:text-danger-base transition"
    >
      Delete
    </button>
  )
}
