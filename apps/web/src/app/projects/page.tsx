import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projets — KV Studio",
  description: "Portfolio de projets web, mobile et SaaS construits par Kurtis V.",
};

const STATUS_CLASS: Record<string, string> = {
  "Open source": "border-blue-200 bg-blue-50 text-blue-700",
  "En production": "border-green-200 bg-green-50 text-green-700",
  Beta: "border-yellow-200 bg-yellow-50 text-yellow-700",
};

export default function ProjectsPage() {
  return (
    <MarketingPageShell>
      <main>

        {/* Hero */}
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <AnimatedSection>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest opacity-40">Portfolio</p>
              <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Projets</h1>
              <p className="mt-5 max-w-xl text-lg opacity-60">
                Une sélection de projets web, mobile et SaaS construits et livrés. Chaque projet résout un problème réel.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Projects grid */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.1}>
                <div className="group relative flex h-full flex-col border bg-background p-8 transition-colors hover:border-foreground">
                  {/* Header */}
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                      <h2 className="mt-1 text-2xl font-semibold">{project.name}</h2>
                    </div>
                    <span className={`shrink-0 border px-2.5 py-1 text-xs font-medium ${STATUS_CLASS[project.status] ?? ""}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground">{project.description}</p>
                  <p className="mt-3 text-sm text-muted-foreground/70">{project.longDescription}</p>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="border border-border bg-muted/40 px-2 py-0.5 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {project.href !== "#" && (
                    <div className="mt-6 pt-4 border-t">
                      <Link
                        href={project.href}
                        target={project.external ? "_blank" : undefined}
                        rel={project.external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                      >
                        Voir le projet <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-muted/10">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center">
            <AnimatedSection>
              <h2 className="text-2xl font-semibold">Vous avez un projet similaire ?</h2>
              <p className="mt-3 text-muted-foreground">Premier appel gratuit pour évaluer votre besoin.</p>
              <div className="mt-6 flex justify-center gap-3">
                <Link href="/booking" className="inline-flex items-center gap-2 border bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90">
                  Réserver un appel
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border px-5 py-2.5 text-sm font-medium hover:bg-muted/40">
                  Me contacter
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>
    </MarketingPageShell>
  );
}
