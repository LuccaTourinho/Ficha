import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  /* 
    * 1. Define o botão como um container flex inline e impede quebras de linha no texto
    * 2. Centraliza os filhos verticalmente e horizontalmente, com 8px de espaçamento entre eles
    * 3. Bordas arredondadas grandes (8px), texto de 16px e peso médio
    * 4. Transição suave de cores, remove contorno padrão e adiciona um anel de foco de 2px na cor azul
    * 5. Desativa interações e reduz opacidade para 70% quando o botão está desativado 
    * 6. Controla SVGs (ícones) dentro do botão, desativando cliques, definindo tamanho de 20px e impedindo encolhimento
  */
  `
    inline-flex whitespace-nowrap 
    items-center justify-center gap-2 
    rounded-md text-sm font-medium 
    transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
    disabled:pointer-events-none disabled:opacity-50 
    [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
  `,
  {
    variants: {
      variant: {
        default:
          "bg-accent hover:bg-accent-hover text-accent-foreground shadow transition-all duration-300 hover:cursor-pointer hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-hover transition-all duration-300 hover:cursor-pointer hover:scale-105",
        outline:
          "border-1 border-input shadow-sm border-accent-hover text-accent hover:bg-accent-hover transition-all duration-300 hover:cursor-pointer",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-hover transition-all duration-300 hover:cursor-pointer hover:scale-105",
        ghost: "hover:bg-accent-hover text-accent-foreground transition-all duration-300 hover:cursor-pointer",
        link: "text-primary underline-offset-4 hover:underline transition-all duration-300 hover:cursor-pointer",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
