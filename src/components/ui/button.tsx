import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-label-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:bg-[#132036] hover:-translate-y-[1px] hover:shadow-sm",
        secondary: "bg-surface-container-high text-primary hover:bg-surface-container-highest hover:-translate-y-[1px]",
        tertiary: "bg-transparent text-primary hover:bg-surface-container-low hover:underline underline-offset-4 active:scale-100",
        destructive: "bg-danger-base text-white hover:bg-danger-text hover:-translate-y-[1px] hover:shadow-sm",
        outline: "border-[1.5px] border-primary bg-transparent text-primary hover:bg-surface-container-low",
        ghost: "hover:bg-surface-container-low text-primary active:scale-100",
        link: "text-primary underline-offset-4 hover:underline active:scale-100",
      },
      size: {
        default: "h-12 px-6 py-2", // 48px
        sm: "h-[44px] px-4",       // 44px
        lg: "h-14 px-8",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!asChild && children}
        {asChild && children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
