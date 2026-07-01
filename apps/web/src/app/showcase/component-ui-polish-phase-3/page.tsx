import * as React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShimmerBadge } from "@/components/ui/shimmer-badge";

export const metadata = { title: "Component UI Polish Phase 3 | Showcase" };

const a11yImprovements = [
  "Dialog: focus trap — Tab cycle interne, Shift+Tab, focus retourné au trigger à la fermeture",
  "Dialog: aria-labelledby et aria-describedby props exposées",
  "SheetRoot: focus trap complet + Escape + scroll lock + focus restore",
  "SheetRoot: role=dialog, aria-modal, slide animation depuis 4 directions",
  "BookingForm: error state inline (aria-invalid, aria-describedby, role=alert)",
  "BookingForm: aria-busy sur le bouton submit pendant l'envoi",
  "BookingForm: helper text format téléphone (aria-describedby)",
  "PricingSection: aria-label sur le plan recommandé",
  "PricingSection: aria-label sur la liste de fonctionnalités par plan",
  "LogoCloud: role=list, aria-label par item, aria-hidden sur les SVG",
];

const sheetFeatures = [
  { title: "SheetRoot", body: "Composant modal complet: AnimatePresence, backdrop, focus trap, Escape, scroll lock, focus restore, aria-modal." },
  { title: "side prop", body: 'right | left | top | bottom — slide animé depuis la direction choisie.' },
  { title: "SheetClose", body: "Bouton fermer avec aria-label, positionnement absolu." },
  { title: "Sous-composants", body: "SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter — rétrocompatibles." },
];

const dialogFeatures = [
  { title: "useFocusTrap", body: "Hook interne: focus sur le premier élément focusable à l'ouverture, cycle Tab/Shift+Tab interne." },
  { title: "Focus restore", body: "Le focus retourne automatiquement au trigger quand le dialog se ferme." },
  { title: "aria-labelledby / aria-describedby", body: "Props optionnelles exposées pour lier le titre et la description." },
  { title: "Existing props conservées", body: "open, onOpenChange, className — aucune rupture d'API." },
];

const pricingFeatures = [
  { title: "Plan featured", body: "Décalage vertical (-my-4 sur large), ring-1 ring-primary/20, shadow-lg — plan recommandé clairement plus proéminent." },
  { title: "Prix dominant en primary", body: "Couleur primary sur prix et nom du plan featured pour guider l'oeil." },
  { title: "Check icon coloré", body: "text-primary sur les checks du plan featured vs text-muted-foreground sur les autres." },
  { title: "aria-label", body: 'aria-label="Plan X — plan recommande" sur la card featured.' },
];

export default function ComponentUiPolishPhase3Page() {
  return (
    <main data-testid="component-ui-polish-phase-3-page" className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-background text-center py-16 px-6">
        <ShimmerBadge>Phase 3</ShimmerBadge>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Component UI Polish — Phase 3
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Risques restants de Phase 2 : focus trap, Sheet modal, BookingForm error states,
          PricingSection featured emphasis, LogoCloud ARIA.
        </p>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-6 py-16">

        {/* Dialog */}
        <section data-testid="dialog-phase3-section">
          <h2 className="mb-2 text-xl font-semibold">Dialog — Focus Trap</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Le dialog piège maintenant le focus à l&apos;intérieur et le restitue au trigger
            à la fermeture. Props <code className="text-xs">aria-labelledby</code> et{" "}
            <code className="text-xs">aria-describedby</code> exposées.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {dialogFeatures.map((f) => (
              <Card key={f.title} variant="subtle">
                <CardHeader>
                  <CardTitle className="text-sm">{f.title}</CardTitle>
                  <CardDescription>{f.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Sheet */}
        <section data-testid="sheet-phase3-section">
          <h2 className="mb-2 text-xl font-semibold">SheetRoot — Slide Panel Modal</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            <code className="text-xs">SheetRoot</code> remplace le bare wrapper par un vrai
            panneau modal animé avec focus trap, Escape, scroll lock et restore. Le{" "}
            <code className="text-xs">Sheet</code> original est conservé pour la rétrocompatibilité.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {sheetFeatures.map((f) => (
              <Card key={f.title} variant="subtle">
                <CardHeader>
                  <CardTitle className="text-sm">{f.title}</CardTitle>
                  <CardDescription>{f.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* BookingForm */}
        <section data-testid="booking-form-phase3-section">
          <h2 className="mb-2 text-xl font-semibold">BookingForm — Error States</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Validation inline cote client: error prop sur Input, messages{" "}
            <code className="text-xs">role=alert</code>, aria-describedby,
            aria-busy sur submit, helper text format téléphone.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 max-w-2xl">
            {[
              "Input name: error prop + aria-invalid quand vide",
              "Input email: error prop + aria-invalid + validation format",
              "Messages erreur: role=alert, aria-describedby lie a l'input",
              "Submit: aria-busy=true pendant pending",
              "Loader: motion-reduce:animate-none sur l'icone",
              "Helper text: format telephone lie via aria-describedby",
            ].map((note) => (
              <div key={note} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" aria-hidden="true" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PricingSection */}
        <section data-testid="pricing-phase3-section">
          <h2 className="mb-2 text-xl font-semibold">PricingSection — Featured Emphasis</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Le plan <code className="text-xs">featured</code> est maintenant clairement
            le plan recommandé: décalé, shadow-lg, ring primary, prix en couleur primary.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {pricingFeatures.map((f) => (
              <Card key={f.title} variant="subtle">
                <CardHeader>
                  <CardTitle className="text-sm">{f.title}</CardTitle>
                  <CardDescription>{f.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* LogoCloud */}
        <section data-testid="logo-cloud-phase3-section">
          <h2 className="mb-2 text-xl font-semibold">LogoCloud — ARIA</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            La liste de logos a maintenant <code className="text-xs">role=list</code>,{" "}
            <code className="text-xs">aria-label</code> par item et{" "}
            <code className="text-xs">aria-hidden</code> sur les SVG décoratifs.
          </p>
          <Card variant="subtle" className="p-4 max-w-md">
            <ul role="list" aria-label="Logos partenaires fictifs" className="flex list-none flex-wrap gap-4">
              {["Vercel", "Supabase", "Tailwind", "Next.js"].map((name) => (
                <li key={name} aria-label={name} className="text-sm font-medium text-muted-foreground">
                  {name}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* A11y summary */}
        <section data-testid="a11y-phase3-section">
          <h2 className="mb-2 text-xl font-semibold">Accessibilite — Résumé Phase 3</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            10 améliorations d&apos;accessibilité dans ce sprint.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {a11yImprovements.map((note) => (
              <div key={note} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" aria-hidden="true" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t pt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Phase 1 · Phase 2 · Phase 3 terminées
          </p>
          <Button variant="outline" asChild>
            <a href="/showcase/component-ui-polish">Voir Phase 2 <ArrowRight className="h-4 w-4" /></a>
          </Button>
        </section>

      </div>
    </main>
  );
}
