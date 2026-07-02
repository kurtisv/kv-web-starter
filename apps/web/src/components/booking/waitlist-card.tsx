import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface WaitlistEntry {
  id: string;
  clientName: string;
  service: string;
  preferredDate: string;
  addedAt: string;
}

interface WaitlistCardProps {
  entries: WaitlistEntry[];
  className?: string;
}

export function WaitlistCard({ entries, className }: WaitlistCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card p-5 shadow-sm", className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Liste d&apos;attente</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {entries.length}
        </span>
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucune personne en attente.</p>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, i) => (
            <div key={entry.id} className="flex items-start gap-3 rounded-lg border bg-muted/30 px-3 py-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{entry.clientName}</p>
                <p className="text-xs text-muted-foreground">{entry.service} &mdash; {entry.preferredDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
