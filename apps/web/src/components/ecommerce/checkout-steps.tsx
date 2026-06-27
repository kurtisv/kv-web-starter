import * as React from "react";
import { Stepper } from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

export const CHECKOUT_STEPS = [
  { label: "Panier" },
  { label: "Coordonnees" },
  { label: "Livraison" },
  { label: "Paiement" },
  { label: "Confirmation" },
];

export interface CheckoutStepsProps {
  currentStep: 0 | 1 | 2 | 3 | 4;
  className?: string;
}

export function CheckoutSteps({ currentStep, className }: CheckoutStepsProps) {
  return (
    <Stepper
      steps={CHECKOUT_STEPS}
      currentStep={currentStep}
      className={cn("w-full", className)}
    />
  );
}
