"use client";
import * as React from "react";
import { ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";

interface ApiKeyRevokeCellProps {
  apiKeyId: string;
  keyName: string;
  action: (formData: FormData) => void | Promise<void>;
}

export function ApiKeyRevokeCell({ apiKeyId, keyName, action }: ApiKeyRevokeCellProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="text-destructive hover:text-destructive"
      >
        <ShieldOff className="h-3.5 w-3.5" />
        Revoquer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Revoquer "${keyName}" ?`}
        description="Cette cle sera immediatement invalidee. Tous les appels en cours avec cette cle echoueront."
        warning="La revocation est irreversible. Vous devrez creer une nouvelle cle et mettre a jour vos integrations."
        confirmLabel="Revoquer la cle"
        action={action}
        hiddenFields={{ apiKeyId }}
      />
    </>
  );
}
