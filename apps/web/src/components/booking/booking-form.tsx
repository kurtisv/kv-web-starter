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
    <Button
      type="submit"
      className="w-full"
      disabled={disabled || pending}
      aria-busy={pending}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
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
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const next: Record<string, string> = {};
    const name = (form.elements.namedItem("customerName") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("customerEmail") as HTMLInputElement)?.value.trim();
    if (!name) next.customerName = "Le nom est requis.";
    if (!email) next.customerEmail = "L'adresse email est requise.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.customerEmail = "Entrez une adresse email valide.";
    setErrors(next);
    if (Object.keys(next).length > 0) e.preventDefault();
  };

  return (
    <form id={id} action={action} className="grid gap-4" onSubmit={validate} noValidate>
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
          error={!!errors.customerName}
          aria-describedby={errors.customerName ? "customerName-error" : undefined}
        />
        {errors.customerName && (
          <p id="customerName-error" className="text-xs text-destructive" role="alert">
            {errors.customerName}
          </p>
        )}
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
          error={!!errors.customerEmail}
          aria-describedby={errors.customerEmail ? "customerEmail-error" : undefined}
        />
        {errors.customerEmail && (
          <p id="customerEmail-error" className="text-xs text-destructive" role="alert">
            {errors.customerEmail}
          </p>
        )}
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
          aria-describedby="customerPhone-hint"
        />
        <p id="customerPhone-hint" className="text-xs text-muted-foreground">
          Format : +1 514 555-0100
        </p>
      </div>

      <SubmitButton disabled={disabled} disabledReason={disabledReason} />

      <p className="text-center text-xs text-muted-foreground">
        En continuant, vous acceptez les{" "}
        <a href="/terms" className="underline underline-offset-2 hover:no-underline">
          conditions d&apos;utilisation
        </a>
        .
      </p>
    </form>
  );
}
