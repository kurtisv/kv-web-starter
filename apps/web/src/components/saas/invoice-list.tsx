import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard-ui/status-badge";
import { cn } from "@/lib/utils";

export type InvoiceStatus = "paid" | "open" | "void" | "past_due";

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amountCents: number;
  status: InvoiceStatus;
  plan: string;
}

const STATUS_MAP: Record<InvoiceStatus, { status: string; label: string }> = {
  paid:     { status: "active",    label: "Paye" },
  open:     { status: "pending",   label: "En attente" },
  void:     { status: "inactive",  label: "Annule" },
  past_due: { status: "error",     label: "En retard" },
};

interface InvoiceListProps {
  invoices: Invoice[];
  className?: string;
}

export function InvoiceList({ invoices, className }: InvoiceListProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Factures
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {invoices.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <FileText className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Aucune facture pour l&apos;instant</p>
          </div>
        ) : (
          <div className="divide-y">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between gap-3 px-6 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{inv.number} &mdash; {inv.plan}</p>
                  <p className="text-xs text-muted-foreground">{inv.date}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-semibold">
                    {(inv.amountCents / 100).toFixed(2)} €
                  </span>
                  <StatusBadge
                    status={STATUS_MAP[inv.status].status}
                    label={STATUS_MAP[inv.status].label}
                  />
                  <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Telecharger">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
