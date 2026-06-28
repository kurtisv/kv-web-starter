import { CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type WebhookEventStatus = "delivered" | "failed" | "pending";

export interface WebhookEvent {
  id: string;
  type: string;
  url: string;
  status: WebhookEventStatus;
  statusCode?: number;
  durationMs?: number;
  createdAt: string;
}

const STATUS_CONFIG: Record<WebhookEventStatus, {
  icon: React.ReactNode;
  badgeVariant: "success" | "destructive" | "default";
  label: string;
}> = {
  delivered: { icon: <CheckCircle2 className="h-3 w-3" />, badgeVariant: "success",     label: "Envoye" },
  failed:    { icon: <AlertTriangle className="h-3 w-3" />, badgeVariant: "destructive",  label: "Echec" },
  pending:   { icon: <RefreshCw className="h-3 w-3" />,     badgeVariant: "default",      label: "En attente" },
};

interface WebhookEventListProps {
  events: WebhookEvent[];
  className?: string;
}

export function WebhookEventList({ events, className }: WebhookEventListProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Evenements webhook recents
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {events.map((evt) => {
            const cfg = STATUS_CONFIG[evt.status];
            return (
              <div key={evt.id} className="flex items-center gap-3 px-6 py-3">
                <Badge variant={cfg.badgeVariant} className="shrink-0 flex items-center gap-1 text-[10px]">
                  {cfg.icon} {cfg.label}
                </Badge>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs font-medium">{evt.type}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{evt.url}</p>
                </div>
                <div className="shrink-0 text-right">
                  {evt.statusCode && (
                    <p className={cn("text-xs font-mono font-medium",
                      evt.statusCode < 300 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {evt.statusCode}
                    </p>
                  )}
                  {evt.durationMs && (
                    <p className="text-[10px] text-muted-foreground">{evt.durationMs}ms</p>
                  )}
                  <p className="text-[10px] text-muted-foreground">{evt.createdAt}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
