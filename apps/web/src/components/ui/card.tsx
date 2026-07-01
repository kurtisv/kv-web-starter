import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva("border bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "shadow-sm",
      elevated: "shadow-md",
      flat: "shadow-none",
      outline: "shadow-none bg-transparent",
      muted: "border-0 bg-muted shadow-none",
      premium: "shadow-lg ring-1 ring-primary/10",
      glass: "card-glass",
      "gradient-border": "card-gradient-border shadow-sm",
      "dark-elevated": "card-dark-elevated",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      default: "",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    radius: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, radius, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant, radius }), className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-xl font-semibold leading-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}

export { cardVariants };
