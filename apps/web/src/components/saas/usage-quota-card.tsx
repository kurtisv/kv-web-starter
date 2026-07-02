import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface QuotaItem {
  label: string;
  used: number;
  limit: number;
  unit?: string;
}

interface UsageQuotaCardProps {
  items: QuotaItem[];
  className?: string;
}

function QuotaBar({ used, limit, label }: { used: number; limit: number; label: string }) {
  const pct = limit > 0 ? Math.min(Math.round((used / limit) * 100), 100) : 0;
  const colorClass =
    pct >= 90 ? "bg-destructive" : pct >= 70 ? "bg-warning" : "bg-primary";
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label}: ${pct}% utilise`}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", colorClass)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function UsageQuotaCard({ items, className }: UsageQuotaCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Usage
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {items.map((item) => {
          const pct = item.limit > 0 ? Math.round((item.used / item.limit) * 100) : 0;
          const fmt = (n: number) =>
            n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M`
            : n >= 1000 ? `${(n / 1000).toFixed(0)}k`
            : String(n);
          return (
            <div key={item.label} className="grid gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground">
                  {fmt(item.used)}
                  {item.unit ?? ""} / {fmt(item.limit)}
                  {item.unit ?? ""}{" "}
                  <span
                    className={cn(
                      "font-medium",
                      pct >= 90
                        ? "text-destructive"
                        : pct >= 70
                          ? "text-warning"
                          : "text-muted-foreground"
                    )}
                  >
                    ({pct}%)
                  </span>
                </span>
              </div>
              <QuotaBar used={item.used} limit={item.limit} label={item.label} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
