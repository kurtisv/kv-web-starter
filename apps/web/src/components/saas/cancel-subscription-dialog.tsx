"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/use-toast";

const REASONS = [
  "Trop cher pour mon usage",
  "Je n'utilise pas assez le service",
  "Je passe a un concurrent",
  "Fonctionnalites manquantes",
  "Problemes techniques recurrents",
  "Autre raison",
];

interface CancelSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: string;
  onConfirm?: (reason: string) => void;
}

export function CancelSubscriptionDialog({
  open,
  onOpenChange,
  plan = "Pro",
  onConfirm,
}: CancelSubscriptionDialogProps) {
  const [reason, setReason] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function handleConfirm() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      onConfirm?.(reason);
      notify.success(
        "Abonnement resilie",
        "Votre plan reste actif jusqu'a la fin de la periode en cours."
      );
    }, 800);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Resilier votre abonnement {plan} ?</DialogTitle>
          <DialogDescription>
            Votre acces reste actif jusqu&apos;a la fin de la periode de facturation.
            Vous pouvez reactiver a tout moment.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <p className="mb-3 text-sm font-medium">Raison de la resiliation</p>
          <div className="flex flex-col gap-2">
            {REASONS.map((r) => (
              <label key={r} className="flex cursor-pointer items-center gap-2.5 text-sm">
                <input
                  type="radio"
                  name="cancel-reason"
                  value={r}
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="accent-primary"
                />
                {r}
              </label>
            ))}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Garder mon abonnement
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!reason || loading}
          >
            {loading ? "En cours..." : "Confirmer la resiliation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
