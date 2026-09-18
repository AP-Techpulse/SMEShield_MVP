'use client'

import { useState } from 'react'
import { removeEmployee } from './actions'

export function EmployeeRemoveButton({ employeeId, employeeName }: { employeeId: string, employeeName: string }) {
  const [isRemoving, setIsRemoving] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleRemove = async () => {
    setIsRemoving(true)
    const result = await removeEmployee(employeeId)
    if (result.error) {
      alert(result.error)
      setIsRemoving(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-text">Remove {employeeName}?</span>
        <button
          onClick={() => setShowConfirm(false)}
          className="text-sm px-3 py-1 rounded bg-surface-container hover:bg-surface-container-high transition"
          disabled={isRemoving}
        >
          Cancel
        </button>
        <button
          onClick={handleRemove}
          className="text-sm px-3 py-1 rounded bg-danger-bg text-danger-text hover:bg-danger-base hover:text-on-error transition"
          disabled={isRemoving}
        >
          {isRemoving ? 'Removing...' : 'Confirm'}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="text-sm text-danger-text hover:text-danger-base transition flex items-center gap-1"
    >
      <span className="material-symbols-outlined text-[18px]">person_remove</span>
      <span>Remove</span>
    </button>
  )
}
