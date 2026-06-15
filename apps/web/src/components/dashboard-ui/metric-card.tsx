import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: React.ReactNode;
  description?: string;
  trend?: { value: string; direction: "up" | "down" | "neutral" };
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ label, value, description, trend, icon, className }: MetricCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-1 min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground truncate">
              {label}
            </p>
            <p className="text-2xl font-semibold">{value}</p>
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
              >
                {trend.direction === "up" && <TrendingUp className="h-3 w-3" />}
                {trend.direction === "down" && <TrendingDown className="h-3 w-3" />}
                {trend.value}
              </div>
            )}
          </div>
          {icon && (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center border bg-muted text-muted-foreground">
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
