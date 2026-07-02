import { Calendar, Tag, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoClient } from "@/lib/demo-data/booking-demo-data";

const SEGMENT_STYLES: Record<DemoClient["segment"], string> = {
  vip:     "bg-primary/10 text-primary",
  regular: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  new:     "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
  at_risk: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  lapsed:  "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

const SEGMENT_LABELS: Record<DemoClient["segment"], string> = {
  vip:     "VIP",
  regular: "Regulier",
  new:     "Nouveau",
  at_risk: "A risque",
  lapsed:  "Inactif",
};

interface ClientProfileCardProps {
  client: DemoClient;
  className?: string;
}

export function ClientProfileCard({ client, className }: ClientProfileCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card p-5 shadow-sm", className)}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
          {client.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold">{client.name}</p>
            <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", SEGMENT_STYLES[client.segment])}>
              {SEGMENT_LABELS[client.segment]}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{client.email}</p>
          <p className="text-xs text-muted-foreground">{client.phone}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg bg-muted/30 p-3 text-center">
          <p className="text-lg font-bold">{client.totalBookings}</p>
          <p className="text-xs text-muted-foreground">RDV total</p>
        </div>
        <div className="rounded-lg bg-muted/30 p-3 text-center">
          <p className={cn("text-lg font-bold", client.noShowCount >= 2 && "text-amber-600 dark:text-amber-400")}>
            {client.noShowCount}
          </p>
          <p className="text-xs text-muted-foreground">Absences</p>
        </div>
        <div className="rounded-lg bg-muted/30 p-3 text-center">
          <p className="text-lg font-bold">{(client.lifetimeValueCents / 100).toFixed(0)}</p>
          <p className="text-xs text-muted-foreground">EUR total</p>
        </div>
      </div>

      {/* Tags */}
      {client.tags.length > 0 && (
        <div className="mb-3 flex items-start gap-2">
          <Tag className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
          <div className="flex flex-wrap gap-1">
            {client.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {client.notes && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/60 px-3 py-2 dark:border-amber-800/40 dark:bg-amber-900/20">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800 dark:text-amber-300">{client.notes}</p>
          </div>
        </div>
      )}

      {/* Dates */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span>Client depuis le {client.joinedAt}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span>Derniere visite : {client.lastVisit}</span>
        </div>
        {client.upcomingBookingDate && (
          <div className="flex items-center gap-2 text-xs text-primary">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>Prochain RDV : {client.upcomingBookingDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
