import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  indicatorColorClass?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, indicatorColorClass = "bg-secondary", ...props }, ref) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100)
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-1.5 w-full overflow-hidden rounded-full bg-surface-container",
          className
        )}
        {...props}
      >
        <div
          className={cn("h-full w-full flex-1 transition-all", indicatorColorClass)}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
