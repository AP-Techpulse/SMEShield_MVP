import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    destructive?: boolean;
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
  className,
  ...props
}: ModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      
      {/* Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          "relative w-full max-w-lg rounded-2xl bg-surface p-6 shadow-level-2 animate-in fade-in zoom-in-95 duration-200",
          className
        )}
        {...props}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-text hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="mb-6 pr-8">
          <h2 id="modal-title" className="text-headline-md font-serif text-on-surface mb-2">
            {title}
          </h2>
          {description && (
            <p className="text-body-md text-muted-text">
              {description}
            </p>
          )}
        </div>
        
        <div className="mb-8">
          {children}
        </div>
        
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            {secondaryAction && (
              <Button 
                variant="outline" 
                onClick={secondaryAction.onClick}
                disabled={secondaryAction.disabled}
                className="w-full sm:w-auto"
              >
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button 
                variant={primaryAction.destructive ? "destructive" : "default"}
                onClick={primaryAction.onClick}
                loading={primaryAction.loading}
                className="w-full sm:w-auto"
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
