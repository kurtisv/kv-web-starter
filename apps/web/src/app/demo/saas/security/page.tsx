import { SaasDemoShell } from "@/components/saas/saas-demo-shell";
import { SecurityPostureCard } from "@/components/saas/security-posture-card";
import { AuditLogTable } from "@/components/saas/audit-log-table";
import { ApiKeyList } from "@/components/saas/api-key-list";
import { TeamMembersTable } from "@/components/saas/team-members-table";
import { ComplianceChecklist } from "@/components/saas/compliance-checklist";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEMO_PRODUCT } from "@/lib/demo-data/saas-demo-data";

const SSO_CONFIG = [
  { label: "Fournisseur SSO",       value: "Okta"                   },
  { label: "Protocole",             value: "SAML 2.0"               },
  { label: "Statut",                value: "Actif"                  },
  { label: "Dernier login SSO",     value: "30 juin 2026, 08:42"    },
  { label: "Sessions actives",      value: "7"                      },
  { label: "Timeout de session",    value: "8 heures"               },
];

export default function DemoSecurityPage() {
  return (
    <SaasDemoShell>
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Security & Compliance</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Audit logs, cles API, SSO et posture de securite de votre workspace.
            </p>
          </div>
          <Badge variant="outline" className="text-[10px]">{DEMO_PRODUCT.demoDisclaimer}</Badge>
        </div>

        {/* Security posture + compliance */}
        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <SecurityPostureCard />
          <ComplianceChecklist />
        </div>

        {/* SSO config */}
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Configuration SSO / SAML</CardTitle>
                <Badge variant="success" size="sm">Actif</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {SSO_CONFIG.map((item) => (
                  <div key={item.label} className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="mt-0.5 text-sm font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
              <Button size="sm" variant="outline" className="mt-4">
                Configurer SSO
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* API keys */}
        <div className="mb-6">
          <ApiKeyList />
        </div>

        {/* Team + roles */}
        <div className="mb-6">
          <TeamMembersTable />
        </div>

        {/* Audit log */}
        <div>
          <AuditLogTable />
        </div>

      </div>
    </SaasDemoShell>
  );
}
