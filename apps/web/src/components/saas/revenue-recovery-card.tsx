"use client";

import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/use-toast";

export function RevenueRecoveryCard() {
  const [retrying, setRetrying] = React.useState(false);

  function handleRetry() {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      notify.success("Relance envoyee", "Email de relance envoye a la@client.io (Demo mode).");
    }, 1200);
  }

  return (
    <Card className="border-warning/40 bg-warning/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-warning">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          Paiement en echec
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="rounded-lg border border-warning/30 bg-background p-3">
          <p className="text-sm font-medium">DataStack Inc. — 49 €</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Echec le 28 juin 2026 &middot; Carte Visa •••• 1234 refusee
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            3 tentatives automatiques prevues (J+1, J+3, J+7)
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1" onClick={handleRetry} disabled={retrying}>
            <RefreshCw className={`h-3.5 w-3.5 ${retrying ? "animate-spin" : ""}`} />
            {retrying ? "Relance..." : "Relancer maintenant"}
          </Button>
          <Button size="sm" variant="ghost" className="flex-1 text-muted-foreground">
            Envoyer un email
          </Button>
        </div>

        <p className="text-[11px] text-muted-foreground">
          Relances automatiques activees. Aucun vrai paiement en demo mode.
        </p>
      </CardContent>
    </Card>
  );
}
