import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SuccessStateVariant = "default" | "card" | "muted";

interface SuccessStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  variant?: SuccessStateVariant;
  className?: string;
}

const variantStyles: Record<SuccessStateVariant, { wrapper: string; iconRing: string }> = {
  default: { wrapper: "",                         iconRing: "border border-success/20 bg-success/10 text-success" },
  card:    { wrapper: "border bg-card shadow-sm", iconRing: "border border-success/20 bg-success/10 text-success" },
  muted:   { wrapper: "bg-muted/40",              iconRing: "border border-success/20 bg-success/10 text-success" },
};

export function SuccessState({
  title = "Operation reussie",
  description,
  icon,
  action,
  variant = "default",
  className,
}: SuccessStateProps) {
  const styles = variantStyles[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg px-6 py-16 text-center",
        styles.wrapper,
        className,
      )}
    >
      <div className={cn("flex h-14 w-14 items-center justify-center rounded-full", styles.iconRing)}>
        {icon ?? <CheckCircle2 className="h-6 w-6" aria-hidden="true" />}
      </div>
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
