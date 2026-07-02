import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductSpecCard } from "@/components/three-d/product-spec-card";
import {
  PRODUCT_NAME,
  PRODUCT_SPECS,
  PRODUCT_TAGLINE,
  THREE_D_BENEFITS,
} from "@/components/three-d/product-showroom-data";

import { ProductShowroomExperience } from "./product-showroom-experience";

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} - Showroom produit 3D`,
  description:
    "Demo de showroom e-commerce 3D: viewer produit orbital, hotspots, configurateur couleur et matiere, fallbacks mobile et reduced motion.",
};

export default function ProductShowroomPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Back link + context */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/demo/3d"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Demos 3D
        </Link>
        <Badge variant="soft">Product showroom</Badge>
        <Badge variant="outline">Produit fictif</Badge>
      </div>

      {/* Hero */}
      <header className="mt-8 max-w-2xl">
        <p className="text-sm font-medium text-primary">
          Showroom e-commerce 3D
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">
          {PRODUCT_NAME}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{PRODUCT_TAGLINE}</p>
      </header>

      {/* Interactive experience (client island) */}
      <section aria-label="Visualisation 3D et configuration" className="mt-10">
        <ProductShowroomExperience />
      </section>

      {/* Specs */}
      <section aria-labelledby="specs-heading" className="mt-16">
        <h2
          id="specs-heading"
          className="text-2xl font-semibold text-foreground"
        >
          Caracteristiques
        </h2>
        <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {PRODUCT_SPECS.map((spec) => (
            <ProductSpecCard key={spec.label} spec={spec} />
          ))}
        </dl>
      </section>

      {/* What 3D improves */}
      <section aria-labelledby="benefits-heading" className="mt-16">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2
            id="benefits-heading"
            className="text-2xl font-semibold text-foreground"
          >
            Ce que la 3D ameliore
          </h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {THREE_D_BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="text-base font-medium text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {benefit.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-16 rounded-2xl border border-border bg-muted/30 p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Un showroom comme celui-ci pour votre produit
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Ce pattern (viewer orbital, hotspots, configurateur) est reutilisable
          pour tout produit physique: electronique, mobilier, sport, luxe.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/contact">Discuter d&apos;un projet</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/demo">Voir toutes les demos</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
