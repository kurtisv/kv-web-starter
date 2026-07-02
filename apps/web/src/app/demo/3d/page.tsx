import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Boxes, Gauge, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Demos 3D - Experiences web en trois dimensions",
  description:
    "Galerie des demos 3D du boilerplate: showroom produit interactif et landing immersive, avec fallbacks WebGL, mobile et reduced motion.",
};

interface ThreeDDemoCard {
  slug: string;
  label: string;
  type: string;
  tagline: string;
  complexity: "Intermediate" | "Advanced";
  performanceNotes: string;
  highlights: string[];
}

const THREE_D_DEMOS: ThreeDDemoCard[] = [
  {
    slug: "product-showroom",
    label: "AeroPod Max",
    type: "Showroom produit 3D",
    tagline:
      "Viewer produit orbital avec hotspots, configurateur couleur et matiere, specs et CTA e-commerce.",
    complexity: "Advanced",
    performanceNotes:
      "Modele 100 % procedural (0 Ko telecharge), DPR plafonne, ombres de contact statiques, zoom borne.",
    highlights: [
      "Rotation orbitale bornee",
      "5 hotspots accessibles",
      "4 couleurs x 3 materiaux",
      "Fallback statique complet",
    ],
  },
  {
    slug: "immersive-landing",
    label: "OrbitStack Studio",
    type: "Landing 3D immersive",
    tagline:
      "Hero 3D scroll-reactif avec panneaux flottants et formes en orbite, sections storytelling et CTA.",
    complexity: "Intermediate",
    performanceNotes:
      "Scene decorative aria-hidden derriere du vrai contenu DOM; formes reduites sur mobile, scroll natif preserve.",
    highlights: [
      "Scroll storytelling leger",
      "Parallaxe pointeur",
      "Contenu lisible sans WebGL",
      "Reduced motion respecte",
    ],
  },
];

const WHY_3D = [
  {
    icon: Boxes,
    title: "Quand la 3D vaut le cout",
    body: "Produit physique a inspecter, marque premium a differencier, donnee spatiale a expliquer. La 3D doit servir un argument, pas decorer.",
  },
  {
    icon: Gauge,
    title: "Performance d'abord",
    body: "Geometrie procedurale, DPR plafonne, qualite adaptative: chaque demo vise la fluidite sur un telephone milieu de gamme.",
  },
  {
    icon: ShieldCheck,
    title: "Toujours un fallback",
    body: "Sans WebGL, en reduced motion ou sur petit ecran, chaque page reste complete: contenu DOM, apercu statique, CTA fonctionnels.",
  },
];

export default function ThreeDGalleryPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Back link */}
      <Link
        href="/demo"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Galerie des demos
      </Link>

      {/* Intro */}
      <header className="mt-8 max-w-2xl">
        <p className="text-sm font-medium text-primary">Experiences 3D</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">
          Des sites 3D professionnels, sans compromis
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Deux patterns prets a adapter: un showroom produit interactif et une
          landing immersive. Chaque demo est procedurale, mobile-safe et
          accessible - la 3D y est un accelerateur de conviction, jamais une
          barriere technique.
        </p>
      </header>

      {/* Why 3D */}
      <section aria-labelledby="why-heading" className="mt-12">
        <h2 id="why-heading" className="sr-only">
          Pourquoi la 3D
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {WHY_3D.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-base font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo cards */}
      <section aria-labelledby="demos-heading" className="mt-14">
        <h2
          id="demos-heading"
          className="text-2xl font-semibold text-foreground"
        >
          Les demos
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {THREE_D_DEMOS.map((demo) => (
            <article
              key={demo.slug}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="soft">{demo.type}</Badge>
                <Badge variant="outline">{demo.complexity}</Badge>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {demo.label}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {demo.tagline}
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {demo.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-1.5 text-xs text-muted-foreground"
                  >
                    <span
                      className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    {h}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  Performance:
                </span>{" "}
                {demo.performanceNotes}
              </p>
              <div className="mt-6 flex-1" />
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/demo/3d/${demo.slug}`}>
                  Ouvrir la demo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="mt-14 rounded-2xl border border-border bg-muted/30 p-8">
        <h2 className="text-lg font-semibold text-foreground">
          Comment ces demos sont construites
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Toutes les briques sont reutilisables:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            components/three-d
          </code>{" "}
          fournit le canvas securise (SSR, WebGL, reduced motion), le viewer
          produit, les hotspots accessibles et les scenes procedurales. Le
          playbook complet est documente dans{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            docs/three-d-site-playbook.md
          </code>
          .
        </p>
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link href="/demo">Retour a la galerie des demos</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
