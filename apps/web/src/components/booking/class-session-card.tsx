import { Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassSession {
  id: string;
  name: string;
  instructor: string;
  date: string;
  time: string;
  durationMin: number;
  enrolledCount: number;
  maxCapacity: number;
  priceCents: number;
  status: "open" | "full" | "cancelled";
}

interface ClassSessionCardProps {
  sessions: ClassSession[];
  className?: string;
}

const STATUS_STYLES: Record<ClassSession["status"], string> = {
  open:      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  full:      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  cancelled: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

const STATUS_LABELS: Record<ClassSession["status"], string> = {
  open:      "Ouvert",
  full:      "Complet",
  cancelled: "Annule",
};

export function ClassSessionCard({ sessions, className }: ClassSessionCardProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {sessions.map((session) => {
        const fillPct = session.maxCapacity > 0
          ? Math.round((session.enrolledCount / session.maxCapacity) * 100)
          : 0;
        return (
          <div key={session.id} className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm">{session.name}</p>
                <p className="text-xs text-muted-foreground">{session.instructor}</p>
              </div>
              <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs font-medium", STATUS_STYLES[session.status])}>
                {STATUS_LABELS[session.status]}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>{session.date} a {session.time}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {session.durationMin} min
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-3 w-3" />
                {session.enrolledCount}/{session.maxCapacity}
              </span>
              <span className="font-medium text-foreground">
                {session.priceCents === 0 ? "Gratuit" : `${(session.priceCents / 100).toFixed(0)} EUR`}
              </span>
            </div>

            <div className="mt-3">
              <div
                role="progressbar"
                aria-valuenow={fillPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Remplissage ${session.name}: ${fillPct}%`}
                className="relative h-1.5 w-full rounded-full bg-muted"
              >
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-full",
                    fillPct >= 90 ? "bg-amber-500" : "bg-primary"
                  )}
                  style={{ width: `${fillPct}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
