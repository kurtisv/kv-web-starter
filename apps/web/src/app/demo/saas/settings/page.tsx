import { SaasDemoShell } from "@/components/saas/saas-demo-shell";
import { WorkspaceSettingsCard } from "@/components/saas/workspace-settings-card";
import { NotificationSettingsCard } from "@/components/saas/notification-settings-card";
import { TeamMembersTable } from "@/components/saas/team-members-table";
import { IntegrationCard } from "@/components/saas/integration-card";
import { DangerZoneCard } from "@/components/saas/danger-zone-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEMO_INTEGRATIONS, DEMO_PRODUCT } from "@/lib/demo-data/saas-demo-data";

const BILLING_CONTACT = {
  name:    "Julie Martin",
  email:   "billing@acme-corp.io",
  address: "42 Rue de la Paix, 75002 Paris, France",
  vat:     "FR12345678901",
};

export default function DemoSettingsPage() {
  return (
    <SaasDemoShell>
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Parametres</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Configurez votre workspace, votre equipe et vos integrations.
            </p>
          </div>
          <Badge variant="outline" className="text-[10px]">{DEMO_PRODUCT.demoDisclaimer}</Badge>
        </div>

        {/* Workspace + Notifications */}
        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <WorkspaceSettingsCard />
          <NotificationSettingsCard />
        </div>

        {/* Billing contact */}
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Contact de facturation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {Object.entries(BILLING_CONTACT).map(([key, value]) => (
                  <div key={key} className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-xs capitalize text-muted-foreground">
                      {key === "vat" ? "TVA" : key === "email" ? "Email" : key === "name" ? "Nom" : "Adresse"}
                    </p>
                    <p className="mt-0.5 text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <div className="mb-6">
          <TeamMembersTable compact />
        </div>

        {/* Integrations */}
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-semibold">Integrations</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {DEMO_INTEGRATIONS.map((intg) => (
              <IntegrationCard key={intg.id} integration={intg} />
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <DangerZoneCard />

      </div>
    </SaasDemoShell>
  );
}
