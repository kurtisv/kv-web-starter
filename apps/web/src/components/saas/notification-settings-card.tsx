"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { notify } from "@/components/ui/use-toast";

const NOTIF_PREFS = [
  { id: "n1", label: "Alertes churn",          description: "Quand un client atteint un score de risque eleve", defaultOn: true  },
  { id: "n2", label: "Paiements echoues",       description: "Quand une transaction est rejetee",                defaultOn: true  },
  { id: "n3", label: "Nouvelles inscriptions",  description: "Quand un client s'inscrit sur votre plan",         defaultOn: true  },
  { id: "n4", label: "Usage critique",          description: "Quand un quota depasse 90% de la limite",           defaultOn: true  },
  { id: "n5", label: "Rapports hebdomadaires",  description: "Resume MRR / churn / activation chaque lundi",     defaultOn: false },
  { id: "n6", label: "Mises a jour produit",    description: "Nouvelles fonctionnalites LaunchPilot",             defaultOn: false },
];

export function NotificationSettingsCard() {
  const [prefs, setPrefs] = React.useState<Record<string, boolean>>(
    Object.fromEntries(NOTIF_PREFS.map((p) => [p.id, p.defaultOn]))
  );

  function toggle(id: string) {
    setPrefs((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleSave() {
    notify.success("Preferences sauvegardees", "Notifications mises a jour (demo mode).");
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Preferences de notifications</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {NOTIF_PREFS.map((pref) => (
          <label
            key={pref.id}
            className="flex cursor-pointer items-start gap-3"
            htmlFor={`notif-${pref.id}`}
          >
            <button
              id={`notif-${pref.id}`}
              role="switch"
              aria-checked={prefs[pref.id]}
              onClick={() => toggle(pref.id)}
              className={cn(
                "relative mt-0.5 h-5 w-9 shrink-0 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                prefs[pref.id] ? "border-primary bg-primary" : "border-muted bg-muted"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 block h-3.5 w-3.5 rounded-full bg-background shadow transition-transform",
                  prefs[pref.id] ? "translate-x-3.5" : "translate-x-0.5"
                )}
              />
            </button>
            <div>
              <p className="text-sm font-medium">{pref.label}</p>
              <p className="text-xs text-muted-foreground">{pref.description}</p>
            </div>
          </label>
        ))}
        <Button size="sm" onClick={handleSave} className="mt-1 self-start">
          Sauvegarder
        </Button>
      </CardContent>
    </Card>
  );
}
