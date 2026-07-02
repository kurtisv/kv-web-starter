import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface Policy {
  freeCancellationHours: number;
  lateCancellationFeePercent: number;
  noShowFeePercent: number;
  depositRefundable: boolean;
  depositRefundDeadlineHours: number;
}

interface NoShowPolicyItem {
  clientName: string;
  noShowCount: number;
  lastNoShow: string;
  feeApplied: boolean;
  feeCents?: number;
}

interface NoShowPolicyCardProps {
  policy: Policy;
  recentNoShows?: NoShowPolicyItem[];
  className?: string;
}

export function NoShowPolicyCard({ policy, recentNoShows = [], className }: NoShowPolicyCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card shadow-sm overflow-hidden", className)}>
      <div className="flex items-center gap-2 border-b px-5 py-4">
        <ShieldAlert className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium">Politique no-show &amp; annulation</p>
        <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          Demo
        </span>
      </div>

      <div className="px-5 py-4 space-y-3">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Annulation gratuite</p>
            <p className="text-sm font-semibold">Jusqu a {policy.freeCancellationHours}h avant</p>
          </div>
          <div className="rounded-lg bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Annulation tardive</p>
            <p className="text-sm font-semibold">{policy.lateCancellationFeePercent}% du montant</p>
          </div>
          <div className="rounded-lg bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Absence non signalee</p>
            <p className="text-sm font-semibold">{policy.noShowFeePercent}% du montant</p>
          </div>
          <div className="rounded-lg bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Depot</p>
            <p className="text-sm font-semibold">
              {policy.depositRefundable ? "Remboursable" : "Non remboursable"}
              {policy.depositRefundable && ` jusqu a ${policy.depositRefundDeadlineHours}h`}
            </p>
          </div>
        </div>

        {recentNoShows.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Absences recentes</p>
            <div className="space-y-2">
              {recentNoShows.map((ns) => (
                <div key={ns.clientName + ns.lastNoShow} className="flex items-center justify-between rounded-lg border border-red-200/60 bg-red-50/40 px-3 py-2 dark:border-red-800/40 dark:bg-red-900/20">
                  <div>
                    <p className="text-xs font-medium">{ns.clientName}</p>
                    <p className="text-xs text-muted-foreground">
                      {ns.noShowCount} absence{ns.noShowCount > 1 ? "s" : ""} &mdash; derniere le {ns.lastNoShow}
                    </p>
                  </div>
                  {ns.feeApplied && ns.feeCents && (
                    <span className="text-xs font-medium text-red-700 dark:text-red-400">
                      {(ns.feeCents / 100).toFixed(0)} EUR facture
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
