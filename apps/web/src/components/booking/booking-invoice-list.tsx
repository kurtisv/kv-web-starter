import { cn } from "@/lib/utils";
import type { DemoInvoice } from "@/lib/demo-data/booking-demo-data";

const STATUS_CONFIG: Record<
  DemoInvoice["status"],
  { label: string; className: string }
> = {
  paid:     { label: "Paye",      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  pending:  { label: "En attente",className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  overdue:  { label: "En retard", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  refunded: { label: "Rembourse", className: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400" },
};

interface BookingInvoiceListProps {
  invoices: DemoInvoice[];
  className?: string;
}

export function BookingInvoiceList({ invoices, className }: BookingInvoiceListProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border bg-card shadow-sm", className)}>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Reference</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Client</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Service</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Montant</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Statut</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {invoices.map((inv) => {
            const config = STATUS_CONFIG[inv.status];
            return (
              <tr key={inv.id} className="hover:bg-muted/20">
                <td className="px-4 py-3">
                  <p className="font-mono text-xs">{inv.ref}</p>
                  {inv.depositCents && (
                    <p className="text-xs text-muted-foreground">
                      Depot: {(inv.depositCents / 100).toFixed(0)} EUR
                    </p>
                  )}
                </td>
                <td className="px-4 py-3 text-xs">{inv.clientName}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground max-w-[120px] truncate">{inv.service}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{inv.date}</td>
                <td className="px-4 py-3 text-right text-xs font-semibold">
                  {(inv.amountCents / 100).toFixed(0)} EUR
                </td>
                <td className="px-4 py-3">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", config.className)}>
                    {config.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
