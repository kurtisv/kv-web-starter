import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoClient } from "@/lib/demo-data/booking-demo-data";

interface NoShowRiskCardProps {
  clients: Pick<DemoClient, "id" | "name" | "noShowCount" | "segment">[];
  threshold?: number;
  className?: string;
}

export function NoShowRiskCard({ clients, threshold = 2, className }: NoShowRiskCardProps) {
  const atRisk = clients.filter((c) => c.noShowCount >= threshold);

  if (atRisk.length === 0) {
    return (
      <div className={cn("rounded-xl border bg-card p-5 shadow-sm", className)}>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Risque d&apos;absence</p>
        </div>
        <p className="text-sm text-muted-foreground">Aucun client a risque eleve aujourd hui.</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border bg-card p-5 shadow-sm", className)}>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
          <AlertTriangle className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium">Risque d&apos;absence</p>
          <p className="text-xs text-muted-foreground">{atRisk.length} client{atRisk.length > 1 ? "s" : ""} a surveiller</p>
        </div>
      </div>

      <div className="space-y-2">
        {atRisk.map((client) => (
          <div key={client.id} className="flex items-center justify-between rounded-lg border border-amber-200/60 bg-amber-50/60 px-3 py-2 dark:border-amber-800/40 dark:bg-amber-900/20">
            <p className="text-sm font-medium">{client.name}</p>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
              {client.noShowCount} absence{client.noShowCount > 1 ? "s" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
