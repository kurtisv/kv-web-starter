"use client";

import * as React from "react";
import { CheckCircle2, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notify } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface UpgradePlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

const PLANS: UpgradePlan[] = [
  {
    name: "Pro",
    price: "49€",
    period: "/mois",
    features: ["100 000 req/mois", "10 utilisateurs", "Webhooks", "Analytics avances", "Support prioritaire"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    period: "",
    features: ["Requetes illimitees", "Utilisateurs illimites", "SSO / SAML", "SLA garanti", "Support dedie 24/7"],
  },
];

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan?: string;
}

export function UpgradeModal({ open, onOpenChange, currentPlan = "Starter" }: UpgradeModalProps) {
  const [selected, setSelected] = React.useState<string>("Pro");
  const [loading, setLoading] = React.useState(false);

  function handleUpgrade() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      notify.success(
        "Upgrade en cours",
        `Redirection vers le paiement pour le plan ${selected}. (Demo mode - aucune charge reelle)`
      );
    }, 900);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Changer de plan
          </DialogTitle>
          <DialogDescription>
            Plan actuel : <strong>{currentPlan}</strong>. Choisissez votre prochaine etape.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-2 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <button
              key={plan.name}
              onClick={() => setSelected(plan.name)}
              className={cn(
                "relative flex flex-col rounded-xl border p-4 text-left transition-all",
                selected === plan.name
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              {plan.highlighted && (
                <Badge variant="primary" size="sm" className="absolute right-3 top-3">
                  Recommande
                </Badge>
              )}
              <div className="mb-3">
                <p className="text-base font-semibold">{plan.name}</p>
                <p className="text-lg font-bold text-primary">
                  {plan.price}
                  <span className="text-xs font-normal text-muted-foreground">{plan.period}</span>
                </p>
              </div>
              <ul className="flex flex-col gap-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button className="flex-1" onClick={handleUpgrade} disabled={loading}>
            {loading ? "Redirection..." : `Passer au plan ${selected}`}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Demo mode — aucune charge reelle. Branchez votre cle Stripe pour activer.
        </p>
      </DialogContent>
    </Dialog>
  );
}
