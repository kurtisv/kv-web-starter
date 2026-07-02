"use client";

import * as React from "react";
import { Key, Copy, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/dashboard-ui/status-badge";
import { notify } from "@/components/ui/use-toast";
import { DEMO_API_KEYS } from "@/lib/demo-data/saas-demo-data";

export function ApiKeyList() {
  function handleCopy(key: string) {
    notify.success("Demo mode", "Copie desactivee pour les cles mock.");
  }

  function handleRevoke(name: string) {
    notify.success("Demo mode", `La cle "${name}" serait revoquee dans un vrai environnement.`);
  }

  function handleCreate() {
    notify.success("Demo mode", "Creation de cle desactivee. Utilisez votre dashboard reel.");
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Key className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            Cles API
          </CardTitle>
          <Button size="sm" variant="outline" onClick={handleCreate} className="h-7 gap-1 text-xs">
            <Plus className="h-3 w-3" />
            Nouvelle cle
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {DEMO_API_KEYS.map((k) => (
            <div key={k.id} className="flex items-center gap-3 px-6 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{k.name}</p>
                  <StatusBadge
                    status={k.status === "active" ? "active" : "inactive"}
                    label={k.status === "active" ? "Active" : "Revoquee"}
                  />
                </div>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{k.key}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Cree le {k.created} &middot; Utilise {k.lastUsed}
                </p>
              </div>
              {k.status === "active" && (
                <div className="flex shrink-0 gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => handleCopy(k.key)}
                    aria-label={`Copier la cle ${k.name}`}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRevoke(k.name)}
                    aria-label={`Revoquer la cle ${k.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
