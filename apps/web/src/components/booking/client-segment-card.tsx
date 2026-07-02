import { cn } from "@/lib/utils";
import type { DemoClient } from "@/lib/demo-data/booking-demo-data";

interface SegmentSummary {
  segment: DemoClient["segment"];
  label: string;
  count: number;
  description: string;
  color: string;
}

interface ClientSegmentCardProps {
  clients: DemoClient[];
  className?: string;
}

export function ClientSegmentCard({ clients, className }: ClientSegmentCardProps) {
  const SEGMENTS: SegmentSummary[] = [
    { segment: "vip",     label: "VIP",      count: 0, description: "10+ reservations, aucune absence",          color: "bg-primary/10 text-primary" },
    { segment: "regular", label: "Regulier", count: 0, description: "Reservations recurrentes, faible no-show",   color: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" },
    { segment: "new",     label: "Nouveau",  count: 0, description: "Moins de 5 reservations au total",           color: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300" },
    { segment: "at_risk", label: "A risque", count: 0, description: "2+ absences non signalees ce trimestre",     color: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300" },
    { segment: "lapsed",  label: "Inactif",  count: 0, description: "Aucune reservation depuis plus de 60 jours", color: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400" },
  ];

  for (const client of clients) {
    const seg = SEGMENTS.find((s) => s.segment === client.segment);
    if (seg) seg.count++;
  }

  return (
    <div className={cn("rounded-xl border bg-card p-5 shadow-sm", className)}>
      <p className="mb-4 text-sm font-medium">Segmentation client</p>
      <div className="space-y-3">
        {SEGMENTS.map((seg) => (
          <div key={seg.segment} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs font-medium", seg.color)}>
                {seg.label}
              </span>
              <p className="text-xs text-muted-foreground truncate">{seg.description}</p>
            </div>
            <span className="shrink-0 text-sm font-semibold tabular-nums">{seg.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
