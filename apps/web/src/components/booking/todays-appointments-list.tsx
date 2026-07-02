import { Users, AlertTriangle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoAppointment } from "@/lib/demo-data/booking-demo-data";

const STATUS_CONFIG: Record<
  DemoAppointment["status"],
  { label: string; className: string; icon: React.ReactNode }
> = {
  confirmed:   { label: "Confirme",   className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",   icon: <Clock className="h-3 w-3" /> },
  in_progress: { label: "En cours",   className: "bg-primary/10 text-primary border-primary/30",                                                              icon: <CheckCircle2 className="h-3 w-3" /> },
  completed:   { label: "Termine",    className: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800", icon: <CheckCircle2 className="h-3 w-3" /> },
  cancelled:   { label: "Annule",     className: "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",          icon: <XCircle className="h-3 w-3" /> },
  no_show:     { label: "Absence",    className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800",               icon: <AlertTriangle className="h-3 w-3" /> },
};

interface TodaysAppointmentsListProps {
  appointments: DemoAppointment[];
  className?: string;
}

export function TodaysAppointmentsList({ appointments, className }: TodaysAppointmentsListProps) {
  if (appointments.length === 0) {
    return (
      <div className={cn("flex flex-col items-center gap-2 py-10 text-center", className)}>
        <Clock className="h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">Aucun rendez-vous aujourd hui</p>
      </div>
    );
  }

  return (
    <div className={cn("divide-y", className)}>
      {appointments.map((appt) => {
        const config = STATUS_CONFIG[appt.status];
        return (
          <div key={appt.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            {/* Time */}
            <div className="w-12 shrink-0 text-right">
              <p className="text-xs font-mono font-medium tabular-nums">{appt.startTime}</p>
              <p className="text-xs font-mono text-muted-foreground tabular-nums">{appt.endTime}</p>
            </div>

            {/* Divider */}
            <div className="h-10 w-px bg-border shrink-0" />

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-medium">{appt.service}</p>
                {appt.isGroup && (
                  <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {appt.attendeeCount}/{appt.maxAttendees}
                  </span>
                )}
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {appt.staffName} &mdash; {appt.isGroup ? appt.clientName : appt.clientName}
              </p>
            </div>

            {/* Status badge */}
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                config.className
              )}
            >
              {config.icon}
              {config.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
