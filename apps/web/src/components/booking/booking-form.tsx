"use client";
import * as React from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface BookingFormProps {
  id: string;
  action: (formData: FormData) => void | Promise<void>;
  serviceId: string;
  staffId?: string;
  disabled?: boolean;
  disabledReason?: string;
}

function SubmitButton({ disabled, disabledReason }: { disabled?: boolean; disabledReason?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={disabled || pending}>
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Confirmation en cours...
        </>
      ) : disabled ? (
        disabledReason ?? "Indisponible"
      ) : (
        "Confirmer la reservation"
      )}
    </Button>
  );
}

export function BookingForm({
  id,
  action,
  serviceId,
  staffId,
  disabled,
  disabledReason,
}: BookingFormProps) {
  return (
    <form id={id} action={action} className="grid gap-4">
      <input type="hidden" name="serviceId" value={serviceId} />
      {staffId && <input type="hidden" name="staffId" value={staffId} />}

      <div className="grid gap-1.5">
        <Label htmlFor="customerName">Nom complet</Label>
        <Input
          id="customerName"
          name="customerName"
          placeholder="Marie Tremblay"
          required
          autoComplete="name"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="customerEmail">Adresse email</Label>
        <Input
          id="customerEmail"
          name="customerEmail"
          type="email"
          placeholder="marie@exemple.com"
          required
          autoComplete="email"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="customerPhone">
          Telephone{" "}
          <span className="text-xs text-muted-foreground">(optionnel)</span>
        </Label>
        <Input
          id="customerPhone"
          name="customerPhone"
          type="tel"
          placeholder="+1 514 555-0100"
          autoComplete="tel"
        />
      </div>

      <SubmitButton disabled={disabled} disabledReason={disabledReason} />

      <p className="text-center text-xs text-muted-foreground">
        En continuant, vous acceptez les{" "}
        <a href="/terms" className="underline underline-offset-2">
          conditions d&apos;utilisation
        </a>
        .
      </p>
    </form>
  );
}
