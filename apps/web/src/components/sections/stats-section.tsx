import * as React from "react";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
  description?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  variant?: "grid" | "strip" | "dark";
  className?: string;
}

export function StatsSection({ stats, variant = "grid", className }: StatsSectionProps) {
  if (variant === "dark") {
    return (
      <section className={cn("theme-hero", className)}>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className={`grid gap-px bg-white/10 border border-white/10 grid-cols-2 sm:grid-cols-${Math.min(stats.length, 4)}`}>
            {stats.map((s, i) => (
              <div key={i} className="bg-black/20 px-6 py-7">
                <div className="text-4xl font-semibold">{s.value}</div>
                <div className="mt-1 text-sm opacity-50">{s.label}</div>
                {s.description && (
                  <div className="mt-1 text-xs opacity-40">{s.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "strip") {
    return (
      <section className={cn("border-y bg-muted/30", className)}>
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className={`grid gap-8 sm:grid-cols-${Math.min(stats.length, 4)}`}>
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-semibold">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("bg-background", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-${Math.min(stats.length, 4)}`}>
          {stats.map((s, i) => (
            <div key={i} className="border p-6">
              <div className="text-4xl font-semibold">{s.value}</div>
              <div className="mt-2 text-sm font-medium">{s.label}</div>
              {s.description && (
                <div className="mt-1 text-sm text-muted-foreground">{s.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
