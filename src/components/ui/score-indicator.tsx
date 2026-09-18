import * as React from "react"
import { cn } from "@/lib/utils"

export interface ScoreIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number;
  label?: string;
  description?: string;
  size?: "sm" | "default" | "lg";
}

export function ScoreIndicator({
  score,
  label = "Human Firewall Score",
  description,
  size = "default",
  className,
  ...props
}: ScoreIndicatorProps) {
  // Determine color based on score (0-100)
  const getColorClass = (s: number) => {
    if (s >= 80) return "text-success-text stroke-success-border"
    if (s >= 50) return "text-warning-text stroke-warning-border"
    return "text-danger-text stroke-danger-border"
  }
  
  const colorClass = getColorClass(score)
  const clampedScore = Math.min(Math.max(0, score), 100)
  
  const sizeMap = {
    sm: { svg: 64, stroke: 4, text: "text-title-md" },
    default: { svg: 96, stroke: 6, text: "text-display-sm" },
    lg: { svg: 144, stroke: 8, text: "text-display-md" }
  }
  
  const dims = sizeMap[size]
  const radius = (dims.svg - dims.stroke) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference

  return (
    <div className={cn("flex items-center gap-6", className)} {...props}>
      <div className="relative flex-shrink-0" style={{ width: dims.svg, height: dims.svg }}>
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx={dims.svg / 2}
            cy={dims.svg / 2}
            r={radius}
            className="stroke-surface-container-highest fill-none"
            strokeWidth={dims.stroke}
          />
          {/* Progress Circle */}
          <circle
            cx={dims.svg / 2}
            cy={dims.svg / 2}
            r={radius}
            className={cn("fill-none transition-all duration-1000 ease-out", colorClass)}
            strokeWidth={dims.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-serif font-bold text-on-surface", dims.text)}>
            {clampedScore}
          </span>
        </div>
      </div>
      
      {(label || description) && (
        <div className="flex flex-col">
          {label && <h4 className="text-headline-sm font-serif text-on-surface">{label}</h4>}
          {description && <p className="text-body-md text-muted-text mt-1">{description}</p>}
        </div>
      )}
    </div>
  )
}
