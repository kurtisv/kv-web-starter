"use client";

import * as React from "react";
import { CheckCircle2, XCircle, Clock, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { notify } from "@/components/ui/use-toast";
import type { DEMO_INTEGRATIONS } from "@/lib/demo-data/saas-demo-data";

type Integration = (typeof DEMO_INTEGRATIONS)[number];

const STATUS_CONFIG = {
  connected:    { icon: CheckCircle2, color: "text-success",          label: "Connecte",   badge: "success"  as const },
  disconnected: { icon: XCircle,      color: "text-muted-foreground", label: "Deconnecte", badge: "outline"  as const },
  pending:      { icon: Clock,        color: "text-warning",          label: "En attente", badge: "default"  as const },
};

interface IntegrationCardProps {
  integration: Integration;
}

export function IntegrationCard({ integration: intg }: IntegrationCardProps) {
  const cfg = STATUS_CONFIG[intg.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.disconnected;
  const Icon = cfg.icon;

  function handleAction() {
    if (intg.status === "connected") {
      notify.success("Demo mode", `Configuration de ${intg.name} desactivee en demo.`);
    } else {
      notify.success("Demo mode", `Connexion a ${intg.name} desactivee en demo.`);
    }
  }

  return (
    <Card className={cn("", intg.status === "connected" && "border-success/30")}>
      <CardContent className="flex items-start gap-3 p-4">
        <span className="mt-0.5 text-2xl" aria-hidden="true">{intg.icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold">{intg.name}</p>
            <Badge variant={cfg.badge} size="sm" className="flex items-center gap-1">
              <Icon className={cn("h-3 w-3", cfg.color)} aria-hidden="true" />
              {cfg.label}
            </Badge>
            <Badge variant="outline" size="sm">{intg.category}</Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{intg.description}</p>
          {intg.status === "connected" && (
            <p className="mt-0.5 text-[11px] text-muted-foreground">Sync: {intg.lastSync}</p>
          )}
        </div>
        <Button
          size="sm"
          variant={intg.status === "connected" ? "ghost" : "outline"}
          onClick={handleAction}
          className="shrink-0 gap-1 text-xs"
          aria-label={`${intg.status === "connected" ? "Configurer" : "Connecter"} ${intg.name}`}
        >
          <Settings className="h-3.5 w-3.5" />
          {intg.status === "connected" ? "Configurer" : "Connecter"}
        </Button>
      </CardContent>
    </Card>
  );
}
