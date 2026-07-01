import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ErrorStateVariant = "default" | "card" | "muted" | "destructive";

interface ErrorStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  action?: React.ReactNode;
  variant?: ErrorStateVariant;
  className?: string;
}

const variantStyles: Record<ErrorStateVariant, { wrapper: string; iconRing: string }> = {
  default:     { wrapper: "",                         iconRing: "border border-destructive/20 bg-destructive/10 text-destructive" },
  card:        { wrapper: "border bg-card shadow-sm", iconRing: "border border-destructive/20 bg-destructive/10 text-destructive" },
  muted:       { wrapper: "bg-muted/40",              iconRing: "border border-destructive/20 bg-destructive/10 text-destructive" },
  destructive: { wrapper: "bg-destructive/5 border border-destructive/20", iconRing: "bg-destructive/10 text-destructive" },
};

export function ErrorState({
  title = "Une erreur est survenue",
  description = "Veuillez reessayer ou contacter le support si le probleme persiste.",
  icon,
  onRetry,
  retryLabel = "Reessayer",
  action,
  variant = "default",
  className,
}: ErrorStateProps) {
  const styles = variantStyles[variant];

  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg px-6 py-16 text-center",
        styles.wrapper,
        className,
      )}
    >
      <div className={cn("flex h-14 w-14 items-center justify-center rounded-full", styles.iconRing)}>
        {icon ?? <AlertTriangle className="h-6 w-6" aria-hidden="true" />}
      </div>
      <div className="grid gap-1.5">
        <p className="text-base font-semibold">{title}</p>
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {(onRetry || action) && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {onRetry && (
            <Button size="sm" variant="outline" onClick={onRetry}>
              {retryLabel}
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
