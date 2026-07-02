import { Users, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoService } from "@/lib/demo-data/booking-demo-data";

interface ServiceManagementTableProps {
  services: DemoService[];
  className?: string;
}

function priceFmt(cents: number) {
  if (cents === 0) return "Gratuit";
  return `${(cents / 100).toFixed(0)} EUR`;
}

export function ServiceManagementTable({ services, className }: ServiceManagementTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border bg-card shadow-sm", className)}>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Service</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Categorie</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Duree</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Prix</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Depot</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Format</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Statut</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {services.map((svc) => (
            <tr key={svc.id} className="hover:bg-muted/20">
              <td className="px-4 py-3">
                <p className="font-medium">{svc.name}</p>
                <p className="text-xs text-muted-foreground max-w-xs truncate">{svc.description}</p>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{svc.category}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  {svc.durationMin} min
                </span>
                {(svc.bufferBeforeMin > 0 || svc.bufferAfterMin > 0) && (
                  <p className="text-xs text-muted-foreground">
                    Buffer: +{svc.bufferBeforeMin}/{svc.bufferAfterMin} min
                  </p>
                )}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1 text-xs font-medium">
                  <DollarSign className="h-3 w-3 text-muted-foreground" />
                  {priceFmt(svc.priceCents)}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">
                {svc.depositCents ? priceFmt(svc.depositCents) : "Non"}
              </td>
              <td className="px-4 py-3">
                {svc.isGroup ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    <Users className="h-3 w-3" />
                    Groupe ({svc.maxGroupSize} max)
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    Individuel
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                    svc.isActive
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                  )}
                >
                  {svc.isActive ? "Actif" : "Inactif"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
