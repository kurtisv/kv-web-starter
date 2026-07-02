import { SaasDemoShell } from "@/components/saas/saas-demo-shell";
import { SaasKpiGrid } from "@/components/saas/saas-kpi-grid";
import { OnboardingChecklist } from "@/components/saas/onboarding-checklist";
import { ChurnRiskPanel } from "@/components/saas/churn-risk-panel";
import { CustomerHealthCard } from "@/components/saas/customer-health-card";
import { FeatureAdoptionPanel } from "@/components/saas/feature-adoption-panel";
import { IntegrationStatusList } from "@/components/saas/integration-status-list";
import { ActivityFeed } from "@/components/dashboard-ui/activity-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_ACTIVITY, DEMO_PRODUCT } from "@/lib/demo-data/saas-demo-data";

export default function DemoDashboardPage() {
  const activityItems = DEMO_ACTIVITY.map((a) => ({
    id: a.id,
    message: a.message,
    timestamp: a.timestamp,
    variant: a.variant,
  }));

  return (
    <SaasDemoShell>
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{DEMO_PRODUCT.workspace}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Bonjour Julie — voici l&apos;etat de votre croissance aujourd&apos;hui.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success">Actif</Badge>
            <Badge variant="outline">Plan {DEMO_PRODUCT.plan}</Badge>
            <Badge variant="outline" className="text-[10px]">{DEMO_PRODUCT.demoDisclaimer}</Badge>
          </div>
        </div>

        {/* KPI grid */}
        <section aria-label="Metriques principales" className="mb-8">
          <SaasKpiGrid />
        </section>

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Left column: onboarding + activity */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <OnboardingChecklist />
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Activite recente</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed items={activityItems} />
              </CardContent>
            </Card>
          </div>

          {/* Right columns: health, churn, adoption, integrations */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <ChurnRiskPanel />
            <div className="grid gap-6 sm:grid-cols-2">
              <CustomerHealthCard />
              <FeatureAdoptionPanel />
            </div>
            <IntegrationStatusList limit={4} />
          </div>

        </div>
      </div>
    </SaasDemoShell>
  );
}
