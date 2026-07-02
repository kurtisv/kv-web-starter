import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoAppointment } from "@/lib/demo-data/booking-demo-data";

const STATUS_BG: Record<DemoAppointment["status"], string> = {
  confirmed:   "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-950/40 dark:border-blue-700 dark:text-blue-200",
  in_progress: "bg-primary/10 border-primary/40 text-primary",
  completed:   "bg-green-100 border-green-300 text-green-800 dark:bg-green-950/40 dark:border-green-700 dark:text-green-200",
  cancelled:   "bg-zinc-100 border-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-500",
  no_show:     "bg-red-100 border-red-300 text-red-700 dark:bg-red-950/40 dark:border-red-700 dark:text-red-300",
};

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

interface CalendarDayViewProps {
  appointments: DemoAppointment[];
  date: string;
  className?: string;
}

function timeToFraction(time: string) {
  const [h = 8, m = 0] = time.split(":").map(Number);
  return (h - 8) + m / 60;
}

export function CalendarDayView({ appointments, date, className }: CalendarDayViewProps) {
  const totalHours = HOURS.length;
  const rowH = 56;

  return (
    <div className={cn("relative overflow-hidden rounded-xl border bg-card", className)}>
      {/* Header */}
      <div className="border-b px-4 py-3">
        <p className="text-sm font-medium">{date}</p>
      </div>

      <div className="relative overflow-y-auto" style={{ maxHeight: 520 }}>
        {/* Hour grid */}
        <div className="relative" style={{ height: totalHours * rowH }}>
          {HOURS.map((h) => (
            <div key={h} className="absolute left-0 right-0 flex items-start border-t border-border/50" style={{ top: (h - 8) * rowH }}>
              <span className="w-12 shrink-0 px-3 py-1 text-xs text-muted-foreground tabular-nums">
                {String(h).padStart(2, "0")}:00
              </span>
              <div className="flex-1 border-l border-border/30 h-full" />
            </div>
          ))}

          {/* Appointments */}
          {appointments
            .filter((a) => a.status !== "cancelled")
            .map((appt) => {
              const top = timeToFraction(appt.startTime) * rowH;
              const [sh = 8, sm = 0] = appt.startTime.split(":").map(Number);
              const [eh = 8, em = 0] = appt.endTime.split(":").map(Number);
              const durationH = (eh + em / 60) - (sh + sm / 60);
              const height = Math.max(durationH * rowH - 4, 28);
              return (
                <div
                  key={appt.id}
                  className={cn(
                    "absolute left-14 right-2 rounded-lg border px-2 py-1 text-xs",
                    STATUS_BG[appt.status]
                  )}
                  style={{ top: top + 2, height }}
                  aria-label={`${appt.startTime} - ${appt.service} avec ${appt.staffName}`}
                >
                  <p className="font-semibold truncate">{appt.startTime} {appt.service}</p>
                  <p className="truncate opacity-80">
                    {appt.isGroup ? (
                      <span className="inline-flex items-center gap-0.5"><Users className="h-2.5 w-2.5" />{appt.attendeeCount}/{appt.maxAttendees}</span>
                    ) : (
                      appt.clientName
                    )}
                    {" "}&mdash; {appt.staffName}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
