import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 text-body-md flex items-start gap-3",
  {
    variants: {
      variant: {
        default: "bg-surface-container border-border text-on-surface",
        destructive:
          "border-danger-border bg-danger-bg text-danger-text",
        success:
          "border-success-border bg-success-bg text-success-text",
        warning:
          "border-warning-border bg-warning-bg text-warning-text",
        info:
          "border-info-border bg-info-bg text-info-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  onDismiss?: () => void;
  icon?: boolean;
}

const icons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: AlertCircle,
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", onDismiss, icon = true, children, ...props }, ref) => {
    const Icon = icons[variant || "default"]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon && <Icon className="h-5 w-5 mt-0.5 shrink-0" />}
        <div className="flex-1 flex flex-col gap-1">
          {children}
        </div>
        {onDismiss && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            onClick={onDismiss}
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-label-md text-label-md", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-body-sm opacity-90", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
