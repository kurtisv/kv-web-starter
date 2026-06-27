import * as React from "react";
import { cn } from "@/lib/utils";

const SCOPE_CLASSES: Record<string, string> = {
  read:  "border-green-200  bg-green-50   text-green-700  dark:border-green-800  dark:bg-green-950  dark:text-green-300",
  write: "border-blue-200   bg-blue-50    text-blue-700   dark:border-blue-800   dark:bg-blue-950   dark:text-blue-300",
  admin: "border-red-200    bg-red-50     text-red-700    dark:border-red-800    dark:bg-red-950    dark:text-red-300",
  demo:  "border-border bg-muted text-muted-foreground",
};

function resolveClass(scope: string) {
  const base = scope.split(":")[0].toLowerCase();
  if (base.startsWith("admin")) return SCOPE_CLASSES.admin;
  return SCOPE_CLASSES[base] ?? "border-border bg-muted text-muted-foreground";
}

interface ScopePillProps {
  scope: string;
  className?: string;
}

export function ScopePill({ scope, className }: ScopePillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-1.5 py-0.5 font-mono text-[11px]",
        resolveClass(scope),
        className
      )}
    >
      {scope}
    </span>
  );
}

export function ScopeList({ scopes, className }: { scopes: string[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {scopes.map((s) => (
        <ScopePill key={s} scope={s} />
      ))}
    </div>
  );
}
