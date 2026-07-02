import { Bell, BellOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ALERTS = [
  { id: "qa1", metric: "API Requests",  threshold: "80%",  current: "78%",  active: true,  severity: "warning"  as const },
  { id: "qa2", metric: "Tokens IA",     threshold: "90%",  current: "92%",  active: true,  severity: "danger"   as const },
  { id: "qa3", metric: "Stockage",      threshold: "70%",  current: "64%",  active: true,  severity: "ok"       as const },
  { id: "qa4", metric: "Webhooks",      threshold: "50%",  current: "25%",  active: false, severity: "ok"       as const },
];

const SEVERITY_BADGE: Record<string, "destructive" | "warning" | "success"> = {
  danger:  "destructive",
  warning: "warning",
  ok:      "success",
};

const SEVERITY_LABEL: Record<string, string> = {
  danger:  "Critique",
  warning: "Attention",
  ok:      "Normal",
};

export function QuotaAlertCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Bell className="h-4 w-4 text-primary" aria-hidden="true" />
          Alertes de quota
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {ALERTS.map((alert) => (
          <div key={alert.id} className="flex items-center gap-3 rounded-lg border p-3">
            {alert.active
              ? <Bell className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              : <BellOff className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            }
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{alert.metric}</p>
              <p className="text-xs text-muted-foreground">Seuil {alert.threshold} &middot; Actuel {alert.current}</p>
            </div>
            <Badge variant={SEVERITY_BADGE[alert.severity] ?? "default"} size="sm">
              {SEVERITY_LABEL[alert.severity]}
            </Badge>
          </div>
        ))}
        <p className="mt-1 text-[11px] text-muted-foreground">
          Alertes envoyees par email et Slack quand le seuil est depasse.
        </p>
      </CardContent>
    </Card>
  );
}
