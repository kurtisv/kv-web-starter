import * as React from "react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  message: React.ReactNode;
  timestamp: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive";
}

interface ActivityFeedProps {
  items: ActivityItem[];
  title?: string;
  className?: string;
}

const variantDot: Record<NonNullable<ActivityItem["variant"]>, string> = {
  default: "bg-muted-foreground",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
};

export function ActivityFeed({ items, title, className }: ActivityFeedProps) {
  return (
    <div className={cn("", className)}>
      {title && <h3 className="mb-4 text-sm font-semibold">{title}</h3>}
      <ol className="relative border-l border-border pl-4">
        {items.map((item) => (
          <li key={item.id} className="mb-6 last:mb-0">
            <span
              className={cn(
                "absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-background",
                variantDot[item.variant ?? "default"],
              )}
            />
            <div className="ml-2">
              <div className="text-sm">{item.message}</div>
              <time className="mt-0.5 block text-xs text-muted-foreground">{item.timestamp}</time>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
