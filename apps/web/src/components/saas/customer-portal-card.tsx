"use client";

import { ExternalLink, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/use-toast";

export function CustomerPortalCard() {
  function handleOpenPortal() {
    notify.success("Demo mode", "Le portail client s'ouvrirait ici dans un vrai environnement Stripe.");
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <User className="h-3.5 w-3.5" aria-hidden="true" />
          Portail client
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <p className="text-sm text-muted-foreground">
          Gerez vos informations de facturation, telechargez vos factures et mettez a jour votre abonnement depuis le portail dedie.
        </p>
        <ul className="grid gap-1.5 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5"><span className="text-success">✓</span> Historique de facturation complet</li>
          <li className="flex items-center gap-1.5"><span className="text-success">✓</span> Mise a jour du moyen de paiement</li>
          <li className="flex items-center gap-1.5"><span className="text-success">✓</span> Changement de plan en self-serve</li>
          <li className="flex items-center gap-1.5"><span className="text-success">✓</span> Export des donnees fiscales</li>
        </ul>
        <Button size="sm" onClick={handleOpenPortal} className="gap-1.5">
          <ExternalLink className="h-3.5 w-3.5" />
          Ouvrir le portail client
        </Button>
        <p className="text-[11px] text-muted-foreground">Portail Stripe — demo mode.</p>
      </CardContent>
    </Card>
  );
}
