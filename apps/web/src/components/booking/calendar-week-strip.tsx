import { cn } from "@/lib/utils";

interface DayStrip {
  day: string;
  slots: string[];
}

interface CalendarWeekStripProps {
  days: DayStrip[];
  activeDayIndex?: number;
  className?: string;
}

export function CalendarWeekStrip({ days, activeDayIndex = 0, className }: CalendarWeekStripProps) {
  return (
    <div className={cn("overflow-x-auto scrollbar-none", className)}>
      <div className="flex gap-2 min-w-max pb-1">
        {days.map((day, i) => {
          const isActive = i === activeDayIndex;
          const isEmpty = day.slots.length === 0;
          return (
            <div
              key={day.day}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl border px-4 py-3 min-w-[96px] cursor-pointer transition-colors",
                isActive ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40",
                isEmpty && "opacity-50"
              )}
              role="button"
              tabIndex={0}
              aria-label={`${day.day}: ${day.slots.length} creneau${day.slots.length !== 1 ? "x" : ""}`}
            >
              <p className={cn("text-xs font-medium", isActive ? "text-primary" : "text-foreground")}>
                {day.day}
              </p>
              {isEmpty ? (
                <p className="text-xs text-muted-foreground">Ferme</p>
              ) : (
                <div className="flex flex-wrap gap-1 justify-center">
                  {day.slots.slice(0, 4).map((slot) => (
                    <span key={slot} className="rounded bg-muted px-1.5 py-0.5 text-xs tabular-nums">
                      {slot}
                    </span>
                  ))}
                  {day.slots.length > 4 && (
                    <span className="text-xs text-muted-foreground">+{day.slots.length - 4}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
