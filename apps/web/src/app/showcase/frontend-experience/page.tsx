import * as React from "react";
import { CheckCircle2, Layers, Zap, Target, BookOpen, ArrowRight, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ShimmerBadge } from "@/components/ui/shimmer-badge";
import { cn } from "@/lib/utils";
import {
  UI_QUALITY_LEVELS,
  UI_QUALITY_LEVEL_IDS,
} from "@/design-system/ui-quality-levels";
import {
  FRONTEND_PATTERNS,
  FRONTEND_PATTERN_IDS,
} from "@/design-system/frontend-patterns";

export const metadata = {
  title: "Frontend Experience System | Showcase",
  description: "The UI/UX direction layer for the kv-web-starter boilerplate.",
};

const INTENSITY_COLOR: Record<string, string> = {
  low: "bg-muted/60 text-muted-foreground",
  medium: "bg-primary/10 text-primary",
  "medium-high": "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  high: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "very-high": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
};

const QUALITY_BADGE: Record<string, string> = {
  basic: "border-muted text-muted-foreground",
  polished: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300",
  premium: "border-primary/30 bg-primary/8 text-primary",
  conversion: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
  editorial: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
  dashboard: "border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
  technical: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
  luxury: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
};

const WORKFLOW_STATES = [
  {
    state: "loading",
    label: "Loading",
    description: "Skeleton mirrors target layout. No blank flash.",
    example: "SkeletonTable, SkeletonCard, SkeletonMetric",
    color: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300",
  },
  {
    state: "empty",
    label: "Empty",
    description: "Human message + recovery action. Not just 'No results.'",
    example: "ActivityFeed emptyText, DataTable emptyText",
    color: "border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
  },
  {
    state: "error",
    label: "Error",
    description: "Readable message, no stack trace, retry available.",
    example: "Alert variant=destructive, inline field error",
    color: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
  },
  {
    state: "success",
    label: "Success",
    description: "Confirms action. User knows what happened and what's next.",
    example: "Alert variant=success, BookingStatusTimeline",
    color: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
  },
];

const AGENT_STEPS = [
  { n: 1, label: "Identify domain", detail: "saas, ecommerce, booking, real-estate..." },
  { n: 2, label: "Select design profile", detail: "design-profiles.ts" },
  { n: 3, label: "Select design recipe", detail: "design-recipes.ts" },
  { n: 4, label: "Select frontend pattern", detail: "frontend-patterns.ts" },
  { n: 5, label: "Select UI quality level", detail: "ui-quality-levels.ts" },
  { n: 6, label: "Select components from registry", detail: "component-registry.ts" },
  { n: 7, label: "Check missing states", detail: "loading, empty, error, success" },
  { n: 8, label: "Verify mobile 390px", detail: "no overflow, 44px touch targets" },
  { n: 9, label: "Verify accessibility", detail: "focus-visible, ARIA, contrast" },
  { n: 10, label: "Create custom only if gap documented", detail: "maturity: beta in registry" },
];

const ANATOMY_PARTS = [
  { key: "container", required: false, note: "Semantic wrapper: section, article, div[role]" },
  { key: "visual-anchor", required: false, note: "Image, icon or color accent" },
  { key: "title", required: true, note: "Scannable in 1 second" },
  { key: "description", required: false, note: "One sentence of supporting copy" },
  { key: "metadata", required: false, note: "Date, author, badge, status" },
  { key: "content", required: false, note: "Main body of the component" },
  { key: "primary-action", required: false, note: "One CTA per component max" },
  { key: "secondary-action", required: false, note: "Link or secondary button" },
  { key: "feedback-area", required: false, note: "Error, success, loading, empty" },
  { key: "state-layer", required: false, note: "Hover, focus, disabled, selected" },
];

export default function FrontendExperiencePage() {
  return (
    <div
      className="min-h-screen bg-background"
      data-testid="frontend-experience-page"
    >
      {/* Hero */}
      <section className="border-b bg-card px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <ShimmerBadge>Frontend Experience System</ShimmerBadge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            UI/UX Direction Layer
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Ce systeme etablit comment chaque composant, section et page doit se comporter,
            se sentir et repondre. Il guide les agents et les developpeurs pour eviter
            les interfaces fades, incoherentes ou inaccessibles.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Layers className="h-3 w-3" /> 8 quality levels</span>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1"><Target className="h-3 w-3" /> {FRONTEND_PATTERN_IDS.length} patterns</span>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> 20 agent rules</span>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> 10-criteria scoring</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-6 py-14">

        {/* UI Quality Levels */}
        <section data-testid="ui-quality-levels-section">
          <h2 className="mb-2 text-xl font-semibold">UI Quality Levels</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Un niveau de qualite est selectionne avant de commencer, pas apres.
            Il definit l&apos;intensite visuelle, l&apos;espacement, le mouvement et la surface.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {UI_QUALITY_LEVEL_IDS.map((id) => {
              const level = UI_QUALITY_LEVELS[id];
              return (
                <SpotlightCard key={id} className="h-full">
                  <div className="flex h-full flex-col gap-3 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm">{level.label}</span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          INTENSITY_COLOR[level.visualIntensity] ?? "bg-muted text-muted-foreground",
                        )}
                      >
                        {level.visualIntensity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                      {level.description}
                    </p>
                    <div className="border-t pt-2">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-1">
                        Use for
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {level.primaryUseCases.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </section>

        {/* Component Anatomy */}
        <section data-testid="component-anatomy-section">
          <h2 className="mb-2 text-xl font-semibold">Component Anatomy</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Structure standard de tout composant. Chaque element est optionnel sauf le titre.
          </p>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {ANATOMY_PARTS.map((part) => (
                  <div
                    key={part.key}
                    className="flex items-start gap-4 px-5 py-3"
                  >
                    <code className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs font-mono text-foreground w-36">
                      {part.key}
                    </code>
                    <div className="flex flex-1 items-center justify-between gap-4">
                      <p className="text-sm text-muted-foreground">{part.note}</p>
                      {part.required && (
                        <Badge variant="soft" size="sm" className="shrink-0">required</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Frontend Patterns */}
        <section data-testid="frontend-patterns-section">
          <h2 className="mb-2 text-xl font-semibold">Frontend Patterns</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Un pattern combine plusieurs composants avec une intention UX et un contexte client.
            Selectionner un pattern avant de commencer l&apos;assemblage d&apos;une page.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FRONTEND_PATTERN_IDS.map((id) => {
              const pattern = FRONTEND_PATTERNS[id];
              return (
                <Card key={id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm leading-tight">{pattern.label}</CardTitle>
                      <span
                        className={cn(
                          "shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-medium",
                          QUALITY_BADGE[pattern.qualityLevel] ?? "border-border text-muted-foreground",
                        )}
                      >
                        {pattern.qualityLevel}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-3 pt-0">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pattern.description}
                    </p>
                    <div className="mt-auto space-y-1.5">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        Components
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {pattern.components.slice(0, 3).map((c) => (
                          <code
                            key={c}
                            className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono"
                          >
                            {c}
                          </code>
                        ))}
                        {pattern.components.length > 3 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{pattern.components.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Workflow States */}
        <section data-testid="workflow-states-section">
          <h2 className="mb-2 text-xl font-semibold">Workflow States</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Tout composant qui charge, filtre ou modifie des donnees doit implementer
            ces quatre etats. Aucun n&apos;est optionnel dans un composant de production.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STATES.map((ws) => (
              <div
                key={ws.state}
                className={cn("rounded-lg border p-4", ws.color)}
              >
                <p className="font-semibold text-sm mb-1">{ws.label}</p>
                <p className="text-xs leading-relaxed mb-3 opacity-90">{ws.description}</p>
                <code className="text-[10px] font-mono opacity-75">{ws.example}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile-first UX notes */}
        <section>
          <h2 className="mb-2 text-xl font-semibold">Mobile-First UX</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Chaque composant est teste a 390px avant d&apos;etre considere pret.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Grids de N colonnes passent a 1-2 colonnes sur mobile",
              "Padding: p-6 minimum sur mobile, sm:p-10 sur desktop",
              "Touch targets: 44x44px minimum pour tout element interactif",
              "Titres hero scalent de text-2xl (mobile) a text-5xl (desktop)",
              "Tables: overflow-x-auto + sticky first column si besoin",
              "Formulaires: single column sur mobile",
              "Navigation: hamburger ou bottom nav sur < lg screens",
              "Images: lazy loading, ratios fixes pour eviter le layout shift",
            ].map((note) => (
              <div key={note} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="text-muted-foreground">{note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Accessibility Checklist */}
        <section>
          <h2 className="mb-2 text-xl font-semibold">Accessibility Checklist</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Minimum WCAG 2.1 AA. A verifier avant tout commit.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "focus-visible sur tout element interactif (pas outline-none seul)",
              "aria-label sur les boutons icon-only",
              "htmlFor + id sur tous les inputs",
              "aria-valuenow/min/max sur les sliders range",
              "role=tablist/tab/tabpanel avec Arrow/Home/End keyboard nav",
              "aria-hidden sur les icones decoratives",
              "Contraste texte : 4.5:1 normal, 3:1 large",
              "reduced-motion : pas d'animation sans fallback",
              "Images informatives avec alt descriptif",
              "Erreurs liees a leur champ via aria-describedby",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Agent Decision Flow */}
        <section data-testid="agent-decision-flow-section">
          <h2 className="mb-2 text-xl font-semibold">Agent Decision Flow</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Ordre obligatoire avant de coder un composant, une page ou une section.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {AGENT_STEPS.map((step) => (
              <div key={step.n} className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-semibold">
                  {step.n}
                </div>
                <div>
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why this matters */}
        <section className="rounded-xl border bg-card p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Cpu className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <h2 className="text-lg font-semibold mb-2">Why this matters</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Le boilerplate ne doit pas seulement generer des pages. Il doit generer
                  des experiences utilisateur credibles et cohérentes.
                </p>
                <p>
                  Les composants doivent etre choisis par intention UX, pas par preference
                  visuelle aleatoire. Un agent qui assemble une page sans pattern produit
                  une interface fonctionnelle mais non convaincante.
                </p>
                <p>
                  Ce systeme est la couche de direction qui transforme des composants
                  isoles en une experience utilisateur coherente, accessible et orientee
                  vers les objectifs du client.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="/docs/frontend-experience-audit.md"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Lire l&apos;audit <ArrowRight className="h-3 w-3" />
                </a>
                <a
                  href="/docs/frontend-design-agent-rules.md"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Regles agent <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
