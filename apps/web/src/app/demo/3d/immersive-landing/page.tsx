import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Boxes,
  Gauge,
  Layers,
  MonitorSmartphone,
  Route,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ImmersiveLandingHero } from "./immersive-landing-hero";

export const metadata: Metadata = {
  title: "OrbitStack Studio - Landing 3D immersive",
  description:
    "Demo de landing immersive: hero 3D scroll-reactif, cards en profondeur, metriques, timeline et CTA - avec fallbacks mobile et reduced motion.",
};

const METRICS = [
  { value: "0 Ko", label: "de modeles 3D telecharges (procedural)" },
  { value: "60 fps", label: "vises sur desktop, DPR plafonne" },
  { value: "390 px", label: "layout mobile sans overflow" },
  { value: "100 %", label: "du contenu lisible sans WebGL" },
];

const FEATURES = [
  {
    icon: Boxes,
    title: "Scene procedurale",
    body: "Panneaux flottants et formes en orbite generes en code: aucun asset a licencier, aucun telechargement.",
  },
  {
    icon: Route,
    title: "Scroll storytelling",
    body: "La scene reagit au defilement sans scroll-jacking: le defilement natif reste intact.",
  },
  {
    icon: Gauge,
    title: "Budget performance",
    body: "DPR plafonne, antialias adaptatif, formes reduites sur petits ecrans, frameloop a la demande en reduced motion.",
  },
  {
    icon: MonitorSmartphone,
    title: "Mobile d'abord",
    body: "Le hero garde son contenu DOM au premier plan: la 3D est un decor, jamais un prerequis.",
  },
  {
    icon: Layers,
    title: "Cards en profondeur",
    body: "La hierarchie visuelle utilise ombres et superpositions pour suggerer la profondeur cote DOM aussi.",
  },
  {
    icon: Sparkles,
    title: "Accessibilite",
    body: "Canvas decoratif marque aria-hidden, texte reel en DOM, focus visibles, reduced motion respecte.",
  },
];

const TIMELINE = [
  {
    step: "01",
    title: "Cadrage",
    body: "Choisir ou la 3D apporte de la valeur (hero, produit) et ou elle n'en apporte pas.",
  },
  {
    step: "02",
    title: "Scene procedurale",
    body: "Composer la scene avec les briques three-d du boilerplate, sans asset externe.",
  },
  {
    step: "03",
    title: "Fallbacks",
    body: "Valider les versions sans WebGL, reduced motion et mobile avant d'aller plus loin.",
  },
  {
    step: "04",
    title: "Mesure",
    body: "Verifier build, poids et fluidite; ajuster le budget avant d'ajouter du contenu.",
  },
];

export default function ImmersiveLandingPage() {
  return (
    <main>
      {/* Back link bar (above the hero so it survives the dark backdrop) */}
      <div className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3">
          <Link
            href="/demo/3d"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Demos 3D
          </Link>
          <Badge variant="soft">Immersive landing</Badge>
          <Badge variant="outline" className="border-white/20 text-slate-300">
            Agence fictive
          </Badge>
        </div>
      </div>

      {/* Hero with scroll-reactive 3D backdrop (client island) */}
      <ImmersiveLandingHero />

      {/* Metrics */}
      <section
        aria-labelledby="metrics-heading"
        className="border-b border-border bg-background"
      >
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 id="metrics-heading" className="sr-only">
            Metriques de la demo
          </h2>
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label}>
                <dt className="text-sm text-muted-foreground">{m.label}</dt>
                <dd className="order-first text-3xl font-semibold text-foreground">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Feature grid */}
      <section
        id="capacites"
        aria-labelledby="features-heading"
        className="bg-background"
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2
            id="features-heading"
            className="text-2xl font-semibold text-foreground"
          >
            Ce que cette landing demontre
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <f.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-base font-medium text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini timeline */}
      <section
        aria-labelledby="timeline-heading"
        className="border-t border-border bg-muted/30"
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2
            id="timeline-heading"
            className="text-2xl font-semibold text-foreground"
          >
            La methode, en quatre etapes
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {TIMELINE.map((t) => (
              <li key={t.step} className="relative">
                <span className="text-sm font-semibold text-primary">
                  {t.step}
                </span>
                <h3 className="mt-2 text-base font-medium text-foreground">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Une landing immersive pour votre marque
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              SaaS, agence ou portfolio: ce pattern s&apos;adapte a toute marque
              qui veut une premiere impression premium sans sacrifier la
              performance.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Discuter d&apos;un projet</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/demo">Voir toutes les demos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
