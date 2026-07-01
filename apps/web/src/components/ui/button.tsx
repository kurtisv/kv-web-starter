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
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  // When asChild=true, Slot expects exactly one React element child.
  // Rendering icon siblings alongside children would break the Radix Slot contract.
  // In that mode, render children directly and let the consumer put the icon inside.
  const content = loading ? (
    <>
      <svg
        className="h-4 w-4 animate-spin motion-reduce:animate-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      {children}
    </>
  ) : asChild ? (
    children
  ) : (
    <>
      {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      {children}
      {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </>
  );

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, className }),
        fullWidth && "w-full",
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </Comp>
  );
}

export { buttonVariants };
