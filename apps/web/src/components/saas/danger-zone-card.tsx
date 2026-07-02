"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/use-toast";

const DANGER_ACTIONS = [
  {
    id: "da1",
    label: "Supprimer toutes les donnees analytics",
    description: "Supprime l'historique d'usage et les metriques. Irreversible.",
    severity: "medium" as const,
  },
  {
    id: "da2",
    label: "Transferer le workspace",
    description: "Transfère la propriete du workspace a un autre membre admin.",
    severity: "medium" as const,
  },
  {
    id: "da3",
    label: "Supprimer le workspace",
    description: "Supprime le workspace et toutes les donnees associees. Cette action est irreversible.",
    severity: "high" as const,
  },
];

export function DangerZoneCard() {
  function handleAction(label: string) {
    notify.success("Demo mode", `"${label}" est desactive en demonstration.`);
  }

  return (
    <Card className="border-destructive/40">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-destructive">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          Zone dangereuse
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {DANGER_ACTIONS.map((action) => (
          <div key={action.id} className="flex flex-col gap-2 rounded-lg border border-destructive/20 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium">{action.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{action.description}</p>
            </div>
            <Button
              size="sm"
              variant={action.severity === "high" ? "destructive" : "outline"}
              className="shrink-0"
              onClick={() => handleAction(action.label)}
            >
              Executer
            </Button>
          </div>
        ))}
        <p className="text-[11px] text-muted-foreground">
          Toutes les actions sont desactivees en demo mode.
        </p>
      </CardContent>
    </Card>
  );
}
