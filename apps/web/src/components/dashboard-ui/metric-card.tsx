import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardProps {
  label: string;
  value: React.ReactNode;
  description?: string;
  trend?: { value: string; direction: "up" | "down" | "neutral" };
  icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export function MetricCard({ label, value, description, trend, icon, loading, className }: MetricCardProps) {
  if (loading) {
    return (
      <Card className={cn("", className)}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="grid gap-2 min-w-0 flex-1">
              <Skeleton className="h-3 w-2/5" />
              <Skeleton className="h-7 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-9 w-9 shrink-0 rounded-md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-1 min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground truncate">
              {label}
            </p>
            <p className="text-2xl font-semibold tabular-nums">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  trend.direction === "up" && "text-success",
                  trend.direction === "down" && "text-destructive",
                  trend.direction === "neutral" && "text-muted-foreground",
                )}
                aria-label={`Tendance: ${trend.direction === "up" ? "hausse" : trend.direction === "down" ? "baisse" : "stable"} de ${trend.value}`}
              >
                {trend.direction === "up" && <TrendingUp className="h-3 w-3" aria-hidden="true" />}
                {trend.direction === "down" && <TrendingDown className="h-3 w-3" aria-hidden="true" />}
                {trend.value}
              </div>
            )}
          </div>
          {icon && (
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-muted text-muted-foreground"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {children}
    </div>
  );
}
