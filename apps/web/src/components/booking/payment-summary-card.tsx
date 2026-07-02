import { cn } from "@/lib/utils";

interface PaymentSummaryCardProps {
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  pendingRevenue: number;
  overdueRevenue: number;
  className?: string;
}

export function PaymentSummaryCard({
  todayRevenue,
  weekRevenue,
  monthRevenue,
  pendingRevenue,
  overdueRevenue,
  className,
}: PaymentSummaryCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card p-5 shadow-sm", className)}>
      <p className="mb-4 text-sm font-medium">Resume des paiements</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg bg-muted/30 p-3 text-center">
          <p className="text-lg font-bold">{todayRevenue} EUR</p>
          <p className="text-xs text-muted-foreground">Aujourd hui</p>
        </div>
        <div className="rounded-lg bg-muted/30 p-3 text-center">
          <p className="text-lg font-bold">{weekRevenue} EUR</p>
          <p className="text-xs text-muted-foreground">Cette semaine</p>
        </div>
        <div className="rounded-lg bg-primary/5 p-3 text-center border border-primary/20">
          <p className="text-lg font-bold text-primary">{monthRevenue.toLocaleString("fr-FR")} EUR</p>
          <p className="text-xs text-muted-foreground">Ce mois</p>
        </div>
      </div>

      <div className="space-y-2">
        {pendingRevenue > 0 && (
          <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50/60 px-3 py-2 dark:border-amber-800/40 dark:bg-amber-900/20">
            <span className="text-xs text-amber-700 dark:text-amber-400">En attente de paiement</span>
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">{pendingRevenue} EUR</span>
          </div>
        )}
        {overdueRevenue > 0 && (
          <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50/60 px-3 py-2 dark:border-red-800/40 dark:bg-red-900/20">
            <span className="text-xs text-red-700 dark:text-red-400">En retard</span>
            <span className="text-xs font-semibold text-red-700 dark:text-red-400">{overdueRevenue} EUR</span>
          </div>
        )}
      </div>
    </div>
  );
}
