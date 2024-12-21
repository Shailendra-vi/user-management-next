import * as React from "react"
import { cn } from "@/lib/utils"

const Spinner = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
    </div>
  )
)

Spinner.displayName = "Spinner"

export { Spinner }
