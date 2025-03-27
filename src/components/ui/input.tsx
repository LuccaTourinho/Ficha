import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `
            flex h-[30px] md:h-[40px] lg:h-[50px]
            rounded-md  
            font-light 
            bg-secondary focus:bg-secondary-focus 
            border-4 border-accent
            text-primary-foreground placeholder:text-muted-foreground text-base
            px-4 py-1 
            focus:outline-none
            transition-all duration-200
          `,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
