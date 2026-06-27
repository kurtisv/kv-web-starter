import * as React from "react";
import { cn } from "@/lib/utils";

const METHOD_CLASSES: Record<string, string> = {
  GET:     "text-emerald-600 bg-emerald-50  border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950 dark:border-emerald-800",
  POST:    "text-blue-600    bg-blue-50     border-blue-200    dark:text-blue-400    dark:bg-blue-950    dark:border-blue-800",
  PUT:     "text-amber-600   bg-amber-50    border-amber-200   dark:text-amber-400   dark:bg-amber-950   dark:border-amber-800",
  PATCH:   "text-violet-600  bg-violet-50   border-violet-200  dark:text-violet-400  dark:bg-violet-950  dark:border-violet-800",
  DELETE:  "text-red-600     bg-red-50      border-red-200     dark:text-red-400     dark:bg-red-950     dark:border-red-800",
  HEAD:    "text-muted-foreground bg-muted  border-border",
  OPTIONS: "text-muted-foreground bg-muted  border-border",
};

interface HttpMethodBadgeProps {
  method: string;
  className?: string;
}

export function HttpMethodBadge({ method, className }: HttpMethodBadgeProps) {
  const upper = method.toUpperCase();
  const classes = METHOD_CLASSES[upper] ?? "text-muted-foreground bg-muted border-border";
  return (
    <span
      className={cn(
        "inline-flex w-16 shrink-0 items-center justify-center border px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        classes,
        className
      )}
    >
      {upper}
    </span>
  );
}
