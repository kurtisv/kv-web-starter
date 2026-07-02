import { Bell, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface WaitlistEntry {
  id: string;
  clientName: string;
  service: string;
  preferredDate: string;
  addedAt: string;
}

interface WaitlistPanelProps {
  entries: WaitlistEntry[];
  className?: string;
}

export function WaitlistPanel({ entries, className }: WaitlistPanelProps) {
  return (
    <div className={cn("rounded-xl border bg-card shadow-sm overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Liste d&apos;attente</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {entries.length} en attente
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Clock className="h-8 w-8 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">Aucune personne en liste d attente</p>
        </div>
      ) : (
        <div className="divide-y">
          {entries.map((entry, i) => (
            <div key={entry.id} className="flex items-start gap-3 px-5 py-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{entry.clientName}</p>
                <p className="text-xs text-muted-foreground">
                  {entry.service} &mdash; souhaite le {entry.preferredDate}
                </p>
                <p className="text-xs text-muted-foreground">Ajoute le {entry.addedAt}</p>
              </div>
              <button
                type="button"
                className="shrink-0 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Notifier ${entry.clientName}`}
              >
                <Bell className="h-3 w-3" />
                Notifier
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
