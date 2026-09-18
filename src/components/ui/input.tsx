import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-border-subtle bg-surface px-4 py-2 text-body-md transition-all ring-offset-surface file:border-0 file:bg-transparent file:text-body-sm file:font-medium placeholder:text-muted-text focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:border-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-error focus-visible:ring-error/30 focus-visible:border-error",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  error?: string;
  helperText?: string;
  htmlFor?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, label, error, helperText, htmlFor, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
        <label htmlFor={htmlFor} className="font-label-md text-label-md text-on-surface">
          {label}
        </label>
        {children}
        {(error || helperText) && (
          <p className={cn("font-body-sm text-body-sm", error ? "text-error" : "text-muted-text")}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)
FormField.displayName = "FormField"

export { Input, FormField }
