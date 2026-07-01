import * as React from "react";
import { ArrowRight, Zap, BarChart2, Star, CheckCircle2, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { SuccessState } from "@/components/ui/success-state";
import { LoadingState } from "@/components/ui/loading-state";
import { ShimmerBadge } from "@/components/ui/shimmer-badge";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Component UI Polish | Showcase" };

export default function ComponentUiPolishPage() {
  return (
    <main data-testid="component-ui-polish-page" className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-background text-center py-16 px-6">
        <ShimmerBadge>Phase 2</ShimmerBadge>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Component UI Polish
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Composants améliorés, nouveaux états UX, primitives plus polies.
          Chaque changement préserve l&apos;API publique existante.
        </p>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-6 py-16">

        {/* ── BUTTONS ──────────────────────────────────────────────── */}
        <section data-testid="button-polish-section">
          <h2 className="mb-2 text-xl font-semibold">Buttons</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Nouveaux: <code className="text-xs">loading</code>,{" "}
            <code className="text-xs">leftIcon</code>,{" "}
            <code className="text-xs">rightIcon</code>,{" "}
            <code className="text-xs">fullWidth</code>.
          </p>

          <div className="space-y-6">
            {/* Variants */}
            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Variants</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="soft">Soft</Button>
                <Button variant="gradient">Gradient</Button>
                <Button variant="premium">Premium</Button>
                <Button variant="glass">Glass</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="success">Success</Button>
              </div>
            </div>

            {/* States */}
            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">States</p>
              <div className="flex flex-wrap gap-3">
                <Button loading>Chargement...</Button>
                <Button disabled>Desactive</Button>
                <Button leftIcon={<Zap className="h-4 w-4" />}>Avec icone gauche</Button>
                <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Avec icone droite</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Tailles</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="xs">XS</Button>
                <Button size="sm">SM</Button>
                <Button size="default">Default</Button>
                <Button size="lg">LG</Button>
                <Button size="xl">XL</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── BADGES ───────────────────────────────────────────────── */}
        <section>
          <h2 className="mb-2 text-xl font-semibold">Badges</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Nouveau: <code className="text-xs">info</code>, border-radius full sur tous.
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="soft">Soft</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="accent">Accent</Badge>
          </div>
        </section>

        {/* ── CARDS ────────────────────────────────────────────────── */}
        <section data-testid="card-polish-section">
          <h2 className="mb-2 text-xl font-semibold">Cards</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Nouveaux variants: <code className="text-xs">interactive</code>,{" "}
            <code className="text-xs">subtle</code>.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-base">Default</CardTitle>
                <CardDescription>Shadow-sm, border</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-base">Elevated</CardTitle>
                <CardDescription>Shadow-md, border</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="muted">
              <CardHeader>
                <CardTitle className="text-base">Muted</CardTitle>
                <CardDescription>Sans border, bg-muted</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="subtle">
              <CardHeader>
                <CardTitle className="text-base">Subtle</CardTitle>
                <CardDescription>Sans border, bg-muted/40</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="premium">
              <CardHeader>
                <CardTitle className="text-base">Premium</CardTitle>
                <CardDescription>Shadow-lg + ring primary</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="interactive" tabIndex={0} role="button" aria-label="Card interactive exemple">
              <CardHeader>
                <CardTitle className="text-base">Interactive</CardTitle>
                <CardDescription>Hover shadow + focus-visible ring</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* ── INPUTS ───────────────────────────────────────────────── */}
        <section>
          <h2 className="mb-2 text-xl font-semibold">Inputs</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Nouveau: border-radius, prop <code className="text-xs">error</code>,{" "}
            focus-visible unifie.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 max-w-2xl">
            <div className="grid gap-1.5">
              <label className="text-sm font-medium" htmlFor="input-default">Normal</label>
              <Input id="input-default" placeholder="Votre texte..." />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium" htmlFor="input-error">Avec erreur</label>
              <Input id="input-error" placeholder="Champ invalide..." error />
              <p className="text-xs text-destructive">Ce champ est requis.</p>
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="input-disabled">Desactive</label>
              <Input id="input-disabled" placeholder="Non modifiable" disabled />
            </div>
          </div>
        </section>

        {/* ── DOMAIN CARDS ─────────────────────────────────────────── */}
        <section data-testid="domain-card-section">
          <h2 className="mb-2 text-xl font-semibold">Domain Cards</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            MetricCard avec loading state, PropertyCard prix dominant, ProductCard hover premium.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Revenus</p>
                <p className="text-2xl font-semibold tabular-nums mt-1">124 500 $</p>
                <div className="flex items-center gap-1 text-xs font-medium text-success mt-1">
                  <BarChart2 className="h-3 w-3" aria-hidden="true" />
                  +12% vs mois precedent
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Clients</p>
                <p className="text-2xl font-semibold tabular-nums mt-1">3 241</p>
                <p className="text-xs text-muted-foreground mt-1">Actifs ce mois-ci</p>
              </CardContent>
            </Card>
            <Card variant="interactive" tabIndex={0} role="button">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-warning" aria-hidden="true" />
                  <Badge variant="success" size="sm">Disponible</Badge>
                </div>
                <p className="font-semibold text-lg tracking-tight">425 000 $</p>
                <p className="text-xs text-muted-foreground mt-0.5">3 pieces · 85 m²</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 space-y-2">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center text-muted-foreground/30">
                  <Star className="h-8 w-8" aria-hidden="true" />
                </div>
                <p className="text-sm font-medium">Produit Premium</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">49,99 $</p>
                  <Button size="xs" variant="default">Ajouter</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── WORKFLOW STATES ──────────────────────────────────────── */}
        <section data-testid="workflow-states-section">
          <h2 className="mb-2 text-xl font-semibold">Workflow States</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            4 etats standardises: loading, empty, error, success.
            Chacun avec variante card, muted, default.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <LoadingState text="Chargement des donnees..." variant="card" size="sm" />
            <EmptyState
              icon={<Inbox className="h-6 w-6" />}
              title="Aucun element"
              description="Ajoutez un premier element pour commencer."
              variant="card"
            />
            <ErrorState
              title="Erreur de connexion"
              description="Impossible de charger les donnees. Verifiez votre connexion."
              variant="card"
            />
            <SuccessState
              title="Sauvegarde reussie"
              description="Vos modifications ont ete enregistrees."
              variant="card"
            />
          </div>
        </section>

        {/* ── MARKETING SECTIONS POLISH ────────────────────────────── */}
        <section data-testid="marketing-section-polish">
          <h2 className="mb-2 text-xl font-semibold">Marketing Sections — Nouveautes</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            HeroSection: prop <code className="text-xs">trustBar</code> + <code className="text-xs">size</code>.
            CTASection: prop <code className="text-xs">eyebrow</code> + variant <code className="text-xs">gradient</code>.
            FeatureGrid: variant <code className="text-xs">spotlight</code> + prop <code className="text-xs">cardVariant</code>.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card variant="muted" className="p-4">
              <p className="text-sm font-semibold mb-1">HeroSection</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Prop <code>trustBar</code> — slot confiance sous actions</li>
                <li>Prop <code>size</code> — compact / default / large</li>
                <li>Padding adaptatif par variante</li>
              </ul>
            </Card>
            <Card variant="muted" className="p-4">
              <p className="text-sm font-semibold mb-1">CTASection</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Prop <code>eyebrow</code> sur toutes les variantes</li>
                <li>Variant <code>gradient</code> — fond degrade leger</li>
              </ul>
            </Card>
            <Card variant="muted" className="p-4">
              <p className="text-sm font-semibold mb-1">FeatureGrid</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Variant <code>spotlight</code> — SpotlightCard par item</li>
                <li>Prop <code>cardVariant</code> — controle le variant Card</li>
                <li>Icones avec <code>aria-hidden</code></li>
              </ul>
            </Card>
          </div>
        </section>

        {/* ── ACCESSIBILITY ─────────────────────────────────────────── */}
        <section>
          <h2 className="mb-2 text-xl font-semibold">Accessibilite</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Chaque amelioration respecte ces contraintes.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 max-w-2xl">
            {[
              "Button: aria-busy quand loading=true",
              "Button: disabled automatique quand loading",
              "Input: aria-invalid quand error=true",
              "ErrorState: role=alert sur le conteneur",
              "SuccessState: role=status + aria-live=polite",
              "MetricCard: aria-label sur l'indicateur de tendance",
              "FeatureGrid: aria-hidden sur les icones decoratives",
              "LoadingState: motion-reduce:animate-none sur le spinner",
              "PropertyCard: alt text descriptif (type + location)",
              "Card interactive: focus-visible:ring-2",
            ].map((note) => (
              <div key={note} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" aria-hidden="true" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── DESIGN PROFILE EXAMPLES ──────────────────────────────── */}
        <section>
          <h2 className="mb-2 text-xl font-semibold">Profils de design</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Les composants s&apos;adaptent au profil choisi via les tokens CSS.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card variant="premium">
              <CardHeader>
                <Badge variant="soft" size="sm" className="w-fit">premium-saas</Badge>
                <CardTitle className="text-sm mt-2">Premium SaaS</CardTitle>
                <CardDescription>Card premium, badge soft, Button gradient</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Button size="sm" variant="gradient" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                  Commencer
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Badge variant="default" size="sm" className="w-fit">minimal-dashboard</Badge>
                <CardTitle className="text-sm mt-2">Minimal Dashboard</CardTitle>
                <CardDescription>Card default, badge default, Button outline</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Button size="sm" variant="outline">Voir details</Button>
              </CardFooter>
            </Card>
            <Card variant="glass">
              <CardHeader>
                <Badge variant="info" size="sm" className="w-fit">dark-technical</Badge>
                <CardTitle className="text-sm mt-2">Dark Technical</CardTitle>
                <CardDescription>Card glass, badge info, Button soft</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Button size="sm" variant="soft">Explorer</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

      </div>
    </main>
  );
}
