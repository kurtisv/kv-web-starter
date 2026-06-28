import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ServiceStatus = "operational" | "degraded" | "outage";

export interface StatusService {
  name: string;
  status: ServiceStatus;
  uptimePct?: number;
}

const STATUS_CONFIG: Record<ServiceStatus, { label: string; icon: React.ReactNode; badgeVariant: "success" | "warning" | "destructive" }> = {
  operational: { label: "Operationnel", icon: <CheckCircle2 className="h-3.5 w-3.5" />, badgeVariant: "success" },
  degraded:    { label: "Degrade",       icon: <AlertTriangle className="h-3.5 w-3.5" />, badgeVariant: "warning" },
  outage:      { label: "Panne",          icon: <XCircle className="h-3.5 w-3.5" />,       badgeVariant: "destructive" },
};

interface ApiStatusCardProps {
  services: StatusService[];
  overallStatus?: ServiceStatus;
  className?: string;
}

export function ApiStatusCard({ services, overallStatus = "operational", className }: ApiStatusCardProps) {
  const overall = STATUS_CONFIG[overallStatus];

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Statut systeme
          </CardTitle>
          <Badge variant={overall.badgeVariant} className="flex items-center gap-1 text-xs">
            {overall.icon}
            {overall.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        {services.map((svc) => {
          const cfg = STATUS_CONFIG[svc.status];
          return (
            <div key={svc.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "h-2 w-2 rounded-full",
                  svc.status === "operational" && "bg-green-500",
                  svc.status === "degraded"    && "bg-amber-500",
                  svc.status === "outage"      && "bg-red-500",
                )} />
                <span>{svc.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {svc.uptimePct !== undefined && (
                  <span>{svc.uptimePct.toFixed(2)}%</span>
                )}
                <span className={cn(
                  svc.status === "operational" && "text-green-600 dark:text-green-400",
                  svc.status === "degraded"    && "text-amber-600 dark:text-amber-400",
                  svc.status === "outage"      && "text-red-600 dark:text-red-400",
                )}>
                  {cfg.label}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
