import * as React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { WizardClient } from "./wizard-client";

export const metadata: Metadata = {
  title: "Client-to-Prototype Engine | KV Web Starter",
  description:
    "Generez un prototype client personnalise en 4 etapes : profil, identite visuelle, fonctionnalites, apercu et export.",
};

function WizardFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-sm text-muted-foreground">Chargement du wizard...</div>
    </div>
  );
}

export default function PrototypePage() {
  return (
    <Suspense fallback={<WizardFallback />}>
      <WizardClient />
    </Suspense>
  );
}
