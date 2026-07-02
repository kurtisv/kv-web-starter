import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conflict {
  id: string;
  staffName: string;
  time: string;
  reason: string;
}

interface ScheduleConflictAlertProps {
  conflicts: Conflict[];
  className?: string;
}

export function ScheduleConflictAlert({ conflicts, className }: ScheduleConflictAlertProps) {
  if (conflicts.length === 0) return null;

  return (
    <div className={cn("rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20", className)}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            {conflicts.length} conflit{conflicts.length > 1 ? "s" : ""} de planning detecte{conflicts.length > 1 ? "s" : ""}
          </p>
          <ul className="mt-2 space-y-1">
            {conflicts.map((c) => (
              <li key={c.id} className="text-xs text-amber-700 dark:text-amber-400">
                <span className="font-medium">{c.staffName}</span> a {c.time} &mdash; {c.reason}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
