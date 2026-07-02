import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Membership {
  id: string;
  name: string;
  priceCents: number;
  billingPeriod: string;
  serviceIds: string[];
}

interface ActiveMembership {
  clientName: string;
  membershipId: string;
  membershipName: string;
  startDate: string;
  nextBillingDate: string;
  status: "active" | "paused" | "cancelled";
}

interface MembershipCardProps {
  memberships: Membership[];
  activeMembers?: ActiveMembership[];
  serviceNames?: Record<string, string>;
  className?: string;
}

const STATUS_STYLES: Record<ActiveMembership["status"], string> = {
  active:    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  paused:    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  cancelled: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

const STATUS_LABELS: Record<ActiveMembership["status"], string> = {
  active:    "Actif",
  paused:    "Pause",
  cancelled: "Annule",
};

export function MembershipCard({ memberships, activeMembers = [], serviceNames = {}, className }: MembershipCardProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Plans */}
      <div className="grid gap-4 sm:grid-cols-2">
        {memberships.map((mem) => (
          <div key={mem.id} className="rounded-xl border bg-card p-5 shadow-sm">
            <p className="font-semibold">{mem.name}</p>
            <p className="text-2xl font-bold mt-1">
              {(mem.priceCents / 100).toFixed(0)} EUR
              <span className="text-sm font-normal text-muted-foreground">/{mem.billingPeriod === "monthly" ? "mois" : mem.billingPeriod}</span>
            </p>
            <div className="mt-3 space-y-1">
              {mem.serviceIds.map((sId) => (
                <p key={sId} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                  {serviceNames[sId] ?? sId}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Active members */}
      {activeMembers.length > 0 && (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="border-b px-5 py-4">
            <p className="text-sm font-medium">Membres actifs</p>
          </div>
          <div className="divide-y">
            {activeMembers.map((am) => (
              <div key={am.clientName} className="flex items-center justify-between gap-3 px-5 py-3">
                <div>
                  <p className="text-sm font-medium">{am.clientName}</p>
                  <p className="text-xs text-muted-foreground">
                    {am.membershipName} &mdash; depuis le {am.startDate}
                  </p>
                  <p className="text-xs text-muted-foreground">Prochain prelevement : {am.nextBillingDate}</p>
                </div>
                <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs font-medium", STATUS_STYLES[am.status])}>
                  {STATUS_LABELS[am.status]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
