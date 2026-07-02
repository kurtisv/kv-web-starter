"use client";

import * as React from "react";
import { CreditCard, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notify } from "@/components/ui/use-toast";

const MOCK_CARDS = [
  { id: "c1", brand: "Visa",       last4: "4242", expiry: "12/27", primary: true  },
  { id: "c2", brand: "Mastercard", last4: "8888", expiry: "06/26", primary: false },
];

export function PaymentMethodCard() {
  function handleAddCard() {
    notify.success("Demo mode", "Ajout de carte desactive. Branchez votre cle Stripe pour activer.");
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Moyens de paiement
          </CardTitle>
          <Button size="sm" variant="outline" onClick={handleAddCard} className="h-7 gap-1 text-xs">
            <Plus className="h-3 w-3" />
            Ajouter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        {MOCK_CARDS.map((card) => (
          <div
            key={card.id}
            className="flex items-center gap-3 rounded-lg border p-3"
          >
            <CreditCard className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{card.brand} •••• {card.last4}</p>
              <p className="text-xs text-muted-foreground">Expire {card.expiry}</p>
            </div>
            {card.primary && (
              <Badge variant="default" size="sm">Principale</Badge>
            )}
          </div>
        ))}
        <p className="mt-1 text-[11px] text-muted-foreground">
          Cartes de test. Aucune charge reelle en demo mode.
        </p>
      </CardContent>
    </Card>
  );
}
