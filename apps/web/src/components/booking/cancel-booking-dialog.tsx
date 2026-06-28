"use client";

import * as React from "react";
import { CalendarX2 } from "lucide-react";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { notify } from "@/components/ui/use-toast";

interface CancelBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingRef?: string;
  serviceName?: string;
  onConfirm?: () => void;
}

export function CancelBookingDialog({
  open,
  onOpenChange,
  bookingRef,
  serviceName,
  onConfirm,
}: CancelBookingDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Annuler ce rendez-vous ?"
      description={
        [serviceName, bookingRef ? `Ref. #${bookingRef}` : undefined]
          .filter(Boolean)
          .join(" — ") || undefined
      }
      warning="Cette action est irreversible. Un email de confirmation d'annulation vous sera envoye."
      confirmLabel="Oui, annuler"
      cancelLabel="Garder le RDV"
      variant="destructive"
      onConfirm={() => {
        onConfirm?.();
        notify.success(
          "Rendez-vous annule",
          "Un email de confirmation vous a ete envoye."
        );
      }}
    />
  );
}

export { CalendarX2 as CancelIcon };
