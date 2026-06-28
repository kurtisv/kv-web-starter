"use client";

import { DeveloperOnboardingSteps, type OnboardingStep } from "@/components/api-portal/developer-onboarding-steps";

const STEPS: OnboardingStep[] = [
  {
    id: "create-account",
    title: "Creer un compte",
    description: "Inscrivez-vous en 30 secondes. Aucune carte de credit requise.",
    cta: { label: "Commencer", href: "/login" },
  },
  {
    id: "generate-key",
    title: "Generer une cle API",
    description: "Depuis votre tableau de bord, cliquez sur 'Nouvelle cle'.",
    cta: { label: "Generer une cle" },
  },
  {
    id: "first-request",
    title: "Faire votre premiere requete",
    description: "Utilisez la cle dans le header Authorization: Bearer.",
    cta: { label: "Tester" },
  },
  {
    id: "setup-webhook",
    title: "Configurer un webhook (optionnel)",
    description: "Recevez des notifications en temps reel sur vos evenements.",
    cta: { label: "Configurer" },
  },
];

export function ApiDemoOnboarding() {
  return <DeveloperOnboardingSteps steps={STEPS} completedIds={["create-account"]} />;
}
