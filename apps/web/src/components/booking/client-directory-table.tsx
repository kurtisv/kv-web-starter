import { cn } from "@/lib/utils";
import type { DemoClient } from "@/lib/demo-data/booking-demo-data";

const SEGMENT_STYLES: Record<DemoClient["segment"], string> = {
  vip:      "bg-primary/10 text-primary",
  regular:  "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  new:      "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
  at_risk:  "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  lapsed:   "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

const SEGMENT_LABELS: Record<DemoClient["segment"], string> = {
  vip:     "VIP",
  regular: "Regulier",
  new:     "Nouveau",
  at_risk: "A risque",
  lapsed:  "Inactif",
};

interface ClientDirectoryTableProps {
  clients: DemoClient[];
  className?: string;
}

export function ClientDirectoryTable({ clients, className }: ClientDirectoryTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border bg-card shadow-sm", className)}>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Client</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Segment</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">RDV</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Absences</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">LTV</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Derniere visite</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Prochain RDV</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-muted/20">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {client.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", SEGMENT_STYLES[client.segment])}>
                  {SEGMENT_LABELS[client.segment]}
                </span>
              </td>
              <td className="px-4 py-3 text-xs font-medium">{client.totalBookings}</td>
              <td className="px-4 py-3">
                <span className={cn(
                  "text-xs font-medium",
                  client.noShowCount >= 2 ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"
                )}>
                  {client.noShowCount}
                </span>
              </td>
              <td className="px-4 py-3 text-xs font-medium">
                {(client.lifetimeValueCents / 100).toFixed(0)} EUR
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{client.lastVisit}</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">
                {client.upcomingBookingDate ?? <span className="text-zinc-400">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
