import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border border-border bg-secondary text-secondary-foreground",
        primary: "border border-primary bg-primary text-primary-foreground",
        outline: "border border-border bg-transparent text-foreground",
        soft: "border border-transparent bg-primary/10 text-primary",
        success: "border border-success/20 bg-success/10 text-success",
        destructive: "border border-destructive/20 bg-destructive/10 text-destructive",
        warning: "border border-warning/20 bg-warning/10 text-warning",
        info: "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
        accent: "border border-accent bg-accent text-accent-foreground",
      },
      size: {
        sm: "px-1.5 py-px text-[10px]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { badgeVariants };
