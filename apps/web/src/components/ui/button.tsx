import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-primary bg-primary text-primary-foreground hover:opacity-90",
        secondary:
          "border border-border bg-secondary text-secondary-foreground hover:bg-muted",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost:
          "border border-transparent bg-transparent text-foreground hover:bg-muted",
        link:
          "border-transparent bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto",
        destructive:
          "border border-destructive bg-destructive text-destructive-foreground hover:opacity-90",
        success:
          "border border-success bg-success text-success-foreground hover:opacity-90",
        premium:
          "border border-primary bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:opacity-90",
        gradient:
          "border-0 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-sm",
        soft:
          "border border-transparent bg-primary/10 text-primary hover:bg-primary/20",
        glass:
          "border border-white/20 bg-white/10 text-foreground backdrop-blur-sm hover:bg-white/20",
        icon:
          "border border-border bg-transparent text-foreground hover:bg-muted",
      },
      size: {
        xs: "h-7 px-2 text-xs gap-1",
        sm: "h-9 px-3",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-6 text-base",
        xl: "h-13 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { buttonVariants };
