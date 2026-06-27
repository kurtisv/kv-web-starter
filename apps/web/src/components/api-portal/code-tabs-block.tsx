"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";

export interface CodeTab {
  label: string;
  language: string;
  code: string;
}

interface CodeTabsBlockProps {
  tabs: CodeTab[];
  className?: string;
}

const LANG_HEADER_COLOR: Record<string, string> = {
  curl:       "text-amber-600 dark:text-amber-400",
  bash:       "text-amber-600 dark:text-amber-400",
  javascript: "text-yellow-600 dark:text-yellow-400",
  node:       "text-yellow-600 dark:text-yellow-400",
  typescript: "text-blue-600 dark:text-blue-400",
  python:     "text-emerald-600 dark:text-emerald-400",
  php:        "text-violet-600 dark:text-violet-400",
  ruby:       "text-red-600 dark:text-red-400",
  go:         "text-sky-600 dark:text-sky-400",
};

export function CodeTabsBlock({ tabs, className }: CodeTabsBlockProps) {
  const [active, setActive] = React.useState(0);
  const current = tabs[active];

  return (
    <div className={cn("border bg-background", className)}>
      {/* Tab bar */}
      <div className="flex items-center gap-0 border-b bg-muted/40 overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "flex-shrink-0 border-b-2 px-4 py-2.5 text-xs font-medium transition-colors",
              i === active
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code block */}
      {current && (
        <div className="relative">
          <span
            className={cn(
              "absolute left-3 top-2 font-mono text-[10px] font-medium uppercase tracking-wide",
              LANG_HEADER_COLOR[current.language.toLowerCase()] ?? "text-muted-foreground"
            )}
          >
            {current.language}
          </span>
          <CopyButton
            value={current.code}
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 h-7 w-7"
          />
          <pre className="overflow-x-auto p-4 pt-7 text-sm">
            <code>{current.code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
