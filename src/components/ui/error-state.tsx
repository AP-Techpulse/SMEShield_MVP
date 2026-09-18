import * as React from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an issue loading this content. Please try again.",
  onRetry,
  isRetrying = false,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-xl border border-danger-border bg-danger-bg/50",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger-base/10 text-danger-text">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-headline-sm font-serif text-danger-text mb-2">
        {title}
      </h3>
      <p className="text-body-md text-danger-text/80 max-w-md mx-auto mb-6">
        {message}
      </p>
      {onRetry && (
        <Button 
          variant="outline" 
          onClick={onRetry} 
          disabled={isRetrying}
          className="border-danger-border text-danger-text hover:bg-danger-border hover:text-danger-text"
        >
          {isRetrying ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          {isRetrying ? "Retrying..." : "Try again"}
        </Button>
      )}
    </div>
  )
}
