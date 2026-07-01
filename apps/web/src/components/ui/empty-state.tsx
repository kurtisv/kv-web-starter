import * as React from "react";
import { cn } from "@/lib/utils";

type EmptyStateVariant = "default" | "card" | "muted" | "destructive" | "success";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: EmptyStateVariant;
  className?: string;
}

const variantStyles: Record<EmptyStateVariant, { wrapper: string; iconRing: string }> = {
  default:     { wrapper: "",                                    iconRing: "border bg-muted text-muted-foreground" },
  card:        { wrapper: "border bg-card shadow-sm",            iconRing: "border bg-muted text-muted-foreground" },
  muted:       { wrapper: "bg-muted/40",                         iconRing: "border bg-background text-muted-foreground" },
  destructive: { wrapper: "",                                    iconRing: "border border-destructive/20 bg-destructive/10 text-destructive" },
  success:     { wrapper: "",                                    iconRing: "border border-success/20 bg-success/10 text-success" },
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = "default",
  className,
}: EmptyStateProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg px-6 py-16 text-center",
        styles.wrapper,
        className,
      )}
    >
      {icon && (
        <div className={cn("flex h-14 w-14 items-center justify-center rounded-full", styles.iconRing)}>
          {icon}
        </div>
      )}
      <div className="grid gap-1.5">
        <p className="text-base font-semibold">{title}</p>
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
