import * as React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Clock, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled" | "paused";

type StatusConfig = {
  label: string;
  icon: React.ReactNode;
  badgeVariant: "success" | "warning" | "destructive" | "default";
};

const STATUS_CONFIG: Record<SubscriptionStatus, StatusConfig> = {
  active:   { label: "Actif",         icon: <CheckCircle2 className="h-3.5 w-3.5" />, badgeVariant: "success" },
  trialing: { label: "En essai",      icon: <Clock className="h-3.5 w-3.5" />,         badgeVariant: "default" },
  past_due: { label: "Paiement echu", icon: <AlertTriangle className="h-3.5 w-3.5" />, badgeVariant: "warning" },
  canceled: { label: "Annule",        icon: <XCircle className="h-3.5 w-3.5" />,       badgeVariant: "destructive" },
  paused:   { label: "En pause",      icon: <Pause className="h-3.5 w-3.5" />,         badgeVariant: "default" },
};

export interface SubscriptionStatusCardProps {
  plan: string;
  status: SubscriptionStatus;
  renewalDate?: string;
  trialEndsAt?: string;
  onUpgrade?: () => void;
  onCancel?: () => void;
  className?: string;
}

export function SubscriptionStatusCard({
  plan,
  status,
  renewalDate,
  trialEndsAt,
  onUpgrade,
  onCancel,
  className,
}: SubscriptionStatusCardProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Abonnement
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">{plan}</p>
            {renewalDate && status === "active" && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Renouvellement le {renewalDate}
              </p>
            )}
            {trialEndsAt && status === "trialing" && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Essai jusqu&apos;au {trialEndsAt}
              </p>
            )}
            {status === "past_due" && (
              <p className="text-xs text-warning mt-0.5">
                Mettez a jour votre moyen de paiement
              </p>
            )}
          </div>
          <Badge variant={config.badgeVariant} className="flex items-center gap-1.5 shrink-0">
            {config.icon}
            {config.label}
          </Badge>
        </div>

        {(onUpgrade || onCancel) && (
          <div className="flex gap-2 border-t pt-3">
            {onUpgrade && (
              <Button size="sm" onClick={onUpgrade} className="flex-1">
                Changer de plan
              </Button>
            )}
            {onCancel && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onCancel}
                className="text-muted-foreground hover:text-destructive"
              >
                Annuler
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
