import * as React from "react";
import { cn } from "@/lib/utils";

type StatusVariant =
  | "active"   | "actif"
  | "inactive" | "inactif"
  | "pending"  | "en attente"
  | "confirmed"| "confirme"
  | "cancelled"| "annule"
  | "trialing" | "essai"
  | "error"    | "erreur"
  | "draft"    | "brouillon"
  | string;

const STATUS_CLASSES: Record<string, string> = {
  active:       "border-green-200  bg-green-50   text-green-700  dark:border-green-800  dark:bg-green-950  dark:text-green-300",
  actif:        "border-green-200  bg-green-50   text-green-700  dark:border-green-800  dark:bg-green-950  dark:text-green-300",
  confirmed:    "border-blue-200   bg-blue-50    text-blue-700   dark:border-blue-800   dark:bg-blue-950   dark:text-blue-300",
  confirme:     "border-blue-200   bg-blue-50    text-blue-700   dark:border-blue-800   dark:bg-blue-950   dark:text-blue-300",
  pending:      "border-amber-200  bg-amber-50   text-amber-700  dark:border-amber-800  dark:bg-amber-950  dark:text-amber-300",
  "en attente": "border-amber-200  bg-amber-50   text-amber-700  dark:border-amber-800  dark:bg-amber-950  dark:text-amber-300",
  trialing:     "border-purple-200 bg-purple-50  text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
  essai:        "border-purple-200 bg-purple-50  text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
  inactive:     "border-zinc-200   bg-zinc-100   text-zinc-600   dark:border-zinc-700   dark:bg-zinc-800   dark:text-zinc-300",
  inactif:      "border-zinc-200   bg-zinc-100   text-zinc-600   dark:border-zinc-700   dark:bg-zinc-800   dark:text-zinc-300",
  draft:        "border-zinc-200   bg-zinc-100   text-zinc-600   dark:border-zinc-700   dark:bg-zinc-800   dark:text-zinc-300",
  brouillon:    "border-zinc-200   bg-zinc-100   text-zinc-600   dark:border-zinc-700   dark:bg-zinc-800   dark:text-zinc-300",
  suspended:    "border-amber-200  bg-amber-50   text-amber-700  dark:border-amber-800  dark:bg-amber-950  dark:text-amber-300",
  suspendu:     "border-amber-200  bg-amber-50   text-amber-700  dark:border-amber-800  dark:bg-amber-950  dark:text-amber-300",
  cancelled:    "border-red-200    bg-red-50     text-red-700    dark:border-red-800    dark:bg-red-950    dark:text-red-300",
  annule:       "border-red-200    bg-red-50     text-red-700    dark:border-red-800    dark:bg-red-950    dark:text-red-300",
  error:        "border-red-200    bg-red-50     text-red-700    dark:border-red-800    dark:bg-red-950    dark:text-red-300",
  erreur:       "border-red-200    bg-red-50     text-red-700    dark:border-red-800    dark:bg-red-950    dark:text-red-300",
};

const DOT_CLASSES: Record<string, string> = {
  active: "bg-green-500", actif: "bg-green-500",
  confirmed: "bg-blue-500", confirme: "bg-blue-500",
  pending: "bg-amber-500", "en attente": "bg-amber-500",
  trialing: "bg-purple-500", essai: "bg-purple-500",
  cancelled: "bg-red-500", annule: "bg-red-500",
  error: "bg-red-500", erreur: "bg-red-500",
};

interface StatusBadgeProps {
  status: StatusVariant;
  label?: string;
  dot?: boolean;
  className?: string;
}

export function StatusBadge({ status, label, dot = false, className }: StatusBadgeProps) {
  const key = status.toLowerCase();
  const classes = STATUS_CLASSES[key] ?? "border-border bg-muted text-muted-foreground";
  const dotColor = DOT_CLASSES[key] ?? "bg-muted-foreground";
  const displayLabel = label ?? status;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 text-xs font-medium",
        classes,
        className
      )}
    >
      {dot && (
        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotColor)} aria-hidden />
      )}
      {displayLabel}
    </span>
  );
}
