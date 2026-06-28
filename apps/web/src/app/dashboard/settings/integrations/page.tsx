import { CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getIntegrationStatus, type Integration, type IntegrationStatus } from "@/lib/integrations/integration-status";
import { getProviderConfig } from "@/lib/integrations/provider-config";

function StatusIcon({ status }: { status: IntegrationStatus }) {
  if (status === "active") return <CheckCircle className="h-4 w-4 text-green-500" />;
  if (status === "partial") return <AlertCircle className="h-4 w-4 text-amber-500" />;
  return <XCircle className="h-4 w-4 text-muted-foreground" />;
}

function StatusBadge({ status }: { status: IntegrationStatus }) {
  if (status === "active") return <Badge variant="success" size="sm">Active</Badge>;
  if (status === "partial") return <Badge variant="warning" size="sm">Partial</Badge>;
  return <Badge variant="outline" size="sm">Inactive</Badge>;
}

function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <Card className={integration.status === "active" ? "border-green-200 bg-green-50/30 dark:border-green-900 dark:bg-green-950/20" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <StatusIcon status={integration.status} />
            <CardTitle className="text-sm font-semibold">{integration.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={integration.status} />
            {integration.docsUrl && (
              <a
                href={integration.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
        <CardDescription className="text-xs">{integration.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {integration.envVars.map((v) => (
            <div key={v.name} className="flex items-center gap-2 text-xs">
              {v.present ? (
                <CheckCircle className="h-3 w-3 text-green-500 shrink-0" />
              ) : (
                <XCircle className={`h-3 w-3 shrink-0 ${v.required ? "text-red-400" : "text-muted-foreground/50"}`} />
              )}
              <code className={`font-mono ${v.present ? "text-foreground" : "text-muted-foreground"}`}>
                {v.name}
              </code>
              {!v.required && !v.present && (
                <span className="text-muted-foreground">(optional)</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function IntegrationsPage() {
  const integrations = getIntegrationStatus();
  const config = getProviderConfig();

  const activeCount = integrations.filter((i) => i.status === "active").length;

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Integrations</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All integrations are optional. The app runs in demo/local mode without any of them.
        </p>
      </div>

      {/* Provider summary */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Storage", value: config.storage, icon: "storage" },
          { label: "Email", value: config.email, icon: "email" },
          { label: "Payments", value: config.payments, icon: "payments" },
          { label: "Database", value: config.database, icon: "database" },
        ].map((item) => (
          <Card key={item.label} className="p-4">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="mt-1 text-sm font-semibold capitalize">{item.value}</p>
          </Card>
        ))}
      </div>

      {config.demoMode && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
          <strong>Demo mode active.</strong> The app is running without all production integrations.
          Configure the missing env vars in <code className="font-mono">.env.local</code> to activate
          real services. See <code className="font-mono">docs/integrations.md</code> for instructions.
        </div>
      )}

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">All integrations</h2>
          <span className="text-sm text-muted-foreground">{activeCount} / {integrations.length} active</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {integrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      </div>
    </div>
  );
}
