import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative flex items-start gap-3 rounded border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-foreground",
        info: "border-primary/30 bg-primary/8 text-primary",
        success: "border-success/30 bg-success/8 text-success",
        warning: "border-warning/30 bg-warning/8 text-warning",
        error: "border-destructive/30 bg-destructive/8 text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const icons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  onDismiss?: () => void;
}

export function Alert({
  className,
  variant = "default",
  title,
  children,
  onDismiss,
  ...props
}: AlertProps) {
  const Icon = icons[variant ?? "default"];

  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <div className="flex-1 min-w-0">
        {title && <p className="font-medium leading-none mb-1">{title}</p>}
        {children && <div className="opacity-90 leading-relaxed">{children}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
