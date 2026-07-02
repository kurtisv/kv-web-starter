import { SaasDemoShell } from "@/components/saas/saas-demo-shell";
import { UsageOverviewPanel } from "@/components/saas/usage-overview-panel";
import { MeteringEventsTable } from "@/components/saas/metering-events-table";
import { UsageForecastCard } from "@/components/saas/usage-forecast-card";
import { QuotaAlertCard } from "@/components/saas/quota-alert-card";
import { UsageQuotaCard } from "@/components/saas/usage-quota-card";
import { Badge } from "@/components/ui/badge";
import { DEMO_USAGE, DEMO_PRODUCT } from "@/lib/demo-data/saas-demo-data";
import type { QuotaItem } from "@/components/saas/usage-quota-card";

const compactQuotas: QuotaItem[] = DEMO_USAGE.items.slice(0, 4).map((item) => ({
  label: item.label,
  used:  item.used,
  limit: item.limit,
  unit:  item.unit || undefined,
}));

export default function DemoUsagePage() {
  return (
    <SaasDemoShell>
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Usage & Metering</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Suivez votre consommation, vos quotas et la projection de fin de mois.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Plan {DEMO_PRODUCT.plan}</Badge>
            <Badge variant="outline" className="text-[10px]">{DEMO_PRODUCT.demoDisclaimer}</Badge>
          </div>
        </div>

        {/* Forecast + Alerts */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <UsageForecastCard />
          <QuotaAlertCard />
        </div>

        {/* Full usage overview */}
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-semibold">Quotas par categorie — {DEMO_USAGE.period}</h2>
          <UsageOverviewPanel />
        </div>

        {/* Compact summary */}
        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 text-sm font-semibold">Resume rapide</h2>
            <UsageQuotaCard items={compactQuotas} />
          </div>
        </div>

        {/* Metering events */}
        <div>
          <h2 className="mb-3 text-sm font-semibold">Evenements recents</h2>
          <MeteringEventsTable />
        </div>

      </div>
    </SaasDemoShell>
  );
}
