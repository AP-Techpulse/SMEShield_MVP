import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex h-6 items-center justify-center rounded-full border px-2.5 text-label-sm transition-colors focus:outline-none focus:ring-4 focus:ring-[#4A90E2]/30",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-on-primary",
        secondary:
          "border-transparent bg-secondary text-on-secondary",
        success:
          "border-transparent bg-success-bg text-success-text",
        warning:
          "border-transparent bg-warning-bg text-warning-text",
        danger:
          "border-transparent bg-danger-bg text-danger-text",
        info:
          "border-transparent bg-info-bg text-info-text",
        outline: "text-on-surface border-outline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
