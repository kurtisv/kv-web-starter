import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DEMO_INTEGRATIONS } from "@/lib/demo-data/saas-demo-data";

type IntegrationStatus = "connected" | "disconnected" | "pending";

const STATUS_CONFIG: Record<IntegrationStatus, { icon: React.ReactNode; badge: string; variant: "success" | "default" | "outline" }> = {
  connected:    { icon: <CheckCircle2 className="h-3.5 w-3.5 text-success" />,      badge: "Connecte",    variant: "success" },
  disconnected: { icon: <XCircle className="h-3.5 w-3.5 text-muted-foreground" />,   badge: "Deconnecte",  variant: "outline" },
  pending:      { icon: <Clock className="h-3.5 w-3.5 text-warning" />,              badge: "En attente",  variant: "default" },
};

interface IntegrationStatusListProps {
  limit?: number;
  className?: string;
}

export function IntegrationStatusList({ limit, className }: IntegrationStatusListProps) {
  const items = limit ? DEMO_INTEGRATIONS.slice(0, limit) : DEMO_INTEGRATIONS;

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Integrations</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {items.map((intg) => {
            const cfg = STATUS_CONFIG[intg.status as IntegrationStatus] ?? STATUS_CONFIG.disconnected;
            return (
              <div key={intg.id} className="flex items-center gap-3 px-6 py-2.5">
                <span className="text-lg" aria-hidden="true">{intg.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{intg.name}</p>
                  <p className="text-xs text-muted-foreground">{intg.description}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <Badge variant={cfg.variant} size="sm" className="flex items-center gap-1">
                    {cfg.icon}
                    {cfg.badge}
                  </Badge>
                  {intg.lastSync !== "N/A" && (
                    <span className="text-[10px] text-muted-foreground">{intg.lastSync}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
