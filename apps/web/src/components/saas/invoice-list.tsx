import { Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type InvoiceStatus = "paid" | "open" | "void";

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amountCents: number;
  status: InvoiceStatus;
  plan: string;
}

const STATUS_STYLES: Record<InvoiceStatus, string> = {
  paid: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
  open: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
  void: "border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
};

const STATUS_LABELS: Record<InvoiceStatus, string> = {
  paid: "Paye",
  open: "En attente",
  void: "Annule",
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
                  <Badge variant="outline" size="sm" className={cn("font-normal", STATUS_STYLES[inv.status])}>
                    {STATUS_LABELS[inv.status]}
                  </Badge>
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
