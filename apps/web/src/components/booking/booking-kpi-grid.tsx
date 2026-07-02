import { TrendingUp, CalendarCheck, AlertTriangle, Users, Clock, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiItem {
  label: string;
  value: string;
  detail?: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  highlight?: boolean;
}

interface BookingKpiGridProps {
  items: KpiItem[];
  className?: string;
}

export function BookingKpiGrid({ items, className }: BookingKpiGridProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "rounded-xl border bg-card p-5 shadow-sm",
            item.highlight && "border-primary/30 bg-primary/5"
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {item.icon}
            </div>
            {item.trend && (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  item.trendUp
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {item.trend}
              </span>
            )}
          </div>
          <p className="mt-3 text-2xl font-bold tracking-tight">{item.value}</p>
          <p className="mt-0.5 text-sm font-medium text-foreground">{item.label}</p>
          {item.detail && (
            <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export { TrendingUp, CalendarCheck, AlertTriangle, Users, Clock, BarChart2 };
