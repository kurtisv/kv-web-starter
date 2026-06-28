import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface DaySchedule {
  day: string;
  open?: string;
  close?: string;
  closed?: boolean;
}

interface BusinessHoursProps {
  schedule: DaySchedule[];
  highlightToday?: boolean;
  className?: string;
}

export function BusinessHours({
  schedule,
  highlightToday = true,
  className,
}: BusinessHoursProps) {
  const jsDay = new Date().getDay();
  // JS: 0=Sun, 1=Mon … 6=Sat. Assume schedule[0] = Lundi (Mon).
  const todayIndex = jsDay === 0 ? 6 : jsDay - 1;

  return (
    <div className={cn("grid divide-y border", className)}>
      {schedule.map((item, i) => {
        const isToday = highlightToday && i === todayIndex;
        return (
          <div
            key={item.day}
            className={cn(
              "flex items-center justify-between px-4 py-2 text-sm",
              isToday ? "bg-primary/5 font-medium" : ""
            )}
          >
            <span
              className={cn(
                "w-24 shrink-0",
                isToday ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.day}
            </span>
            <span className="flex items-center gap-2">
              {isToday && (
                <Badge variant="success" size="sm" className="text-[10px]">
                  Aujourd&apos;hui
                </Badge>
              )}
              {item.closed ? (
                <span className="text-xs text-muted-foreground">Ferme</span>
              ) : (
                <span className="flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  {item.open} &ndash; {item.close}
                </span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
