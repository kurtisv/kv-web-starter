import * as React from "react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  text?: string;
  className?: string;
  size?: "sm" | "default" | "lg";
}

const sizeMap = {
  sm: "h-4 w-4",
  default: "h-8 w-8",
  lg: "h-12 w-12",
};

export function LoadingState({ text, className, size = "default" }: LoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-12", className)}>
      <svg
        className={cn("animate-spin text-muted-foreground", sizeMap[size])}
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

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded bg-muted", className)} />;
}
