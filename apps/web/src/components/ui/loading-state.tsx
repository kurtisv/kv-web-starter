import * as React from "react";
import { cn } from "@/lib/utils";

type LoadingStateVariant = "default" | "card" | "muted" | "inline";

interface LoadingStateProps {
  text?: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: LoadingStateVariant;
}

const sizeMap = {
  sm: "h-4 w-4",
  default: "h-8 w-8",
  lg: "h-12 w-12",
};

const variantWrapper: Record<LoadingStateVariant, string> = {
  default: "flex flex-col items-center justify-center gap-3 py-12",
  card:    "flex flex-col items-center justify-center gap-3 py-12 border bg-card rounded-lg shadow-sm",
  muted:   "flex flex-col items-center justify-center gap-3 py-12 rounded-lg bg-muted/40",
  inline:  "inline-flex items-center gap-2",
};

export function LoadingState({ text, className, size = "default", variant = "default" }: LoadingStateProps) {
  return (
    <div className={cn(variantWrapper[variant], className)}>
      <svg
        className={cn("animate-spin motion-reduce:animate-none text-muted-foreground", sizeMap[size])}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}

export { Skeleton } from "@/components/ui/skeleton";
