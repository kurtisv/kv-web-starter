import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { AnimatedSection } from "@/components/ui/animated-section";

export const metadata: Metadata = {
  title: "Tarifs — KV Studio",
  description: "Packages de développement web et mobile. Transparent, sans surprise.",
};

const PLANS = [
  {
    name: "Exploration",
    price: "Gratuit",
    period: "",
    description: "Premier appel pour évaluer votre projet.",
    features: [
      "30 minutes en visio",
      "Évaluation du périmètre",
      "Estimation préliminaire",
      "Recommandations stack",
      "Sans engagement",
    ],
    cta: "Réserver",
    href: "/booking",
    featured: false,
  },
  {
    name: "Studio",
    price: "2 500 $",
    period: "/ projet",
    description: "Un projet complet de A à Z. Idéal pour les MVPs et sites vitrine.",
    features: [
      "Jusqu'à 4 semaines de dev",
      "Design + développement",
      "Déploiement inclus",
      "30 jours de support post-livraison",
      "Accès au repo",
      "Documentation technique",
    ],
    cta: "Démarrer",
    href: "/booking",
    featured: true,
    badge: "Le plus populaire",
  },
  {
    name: "Scale",
    price: "5 000 $",
    period: "/ mois",
    description: "Partenariat continu. Je deviens votre développeur dédié.",
    features: [
      "Projets en parallèle",
      "Support prioritaire < 4h",
      "Architecture incluse",
      "Revues de code régulières",
      "Appels hebdomadaires",
      "Accès à tous mes outils et boilerplates",
    ],
    cta: "En discuter",
    href: "/contact",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <MarketingPageShell>
      <main>

        {/* Hero */}
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center">
            <AnimatedSection>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest opacity-40">Transparent</p>
              <h1 className="text-5xl font-semibold sm:text-6xl">Tarifs</h1>
              <p className="mx-auto mt-5 max-w-lg text-lg opacity-60">
                Pas de surprise. Un scope clair, un prix fixe, et on livre.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Plans */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan, i) => (
              <AnimatedSection key={plan.name} delay={i * 0.1}>
                <div className={`relative flex h-full flex-col border p-8 ${plan.featured ? "border-foreground bg-foreground text-background" : "bg-background"}`}>
                  {plan.badge && (
                    <span className="absolute -top-3 left-6 border border-foreground bg-background px-3 py-0.5 text-xs font-medium text-foreground">
                      {plan.badge}
                    </span>
                  )}
                  <div>
                    <p className={`text-sm font-medium ${plan.featured ? "opacity-60" : "text-muted-foreground"}`}>{plan.name}</p>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold">{plan.price}</span>
                      {plan.period && <span className={`text-sm ${plan.featured ? "opacity-60" : "text-muted-foreground"}`}>{plan.period}</span>}
                    </div>
                    <p className={`mt-2 text-sm ${plan.featured ? "opacity-70" : "text-muted-foreground"}`}>{plan.description}</p>
                  </div>

                  <ul className="mt-8 flex-1 grid gap-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className={`size-4 shrink-0 ${plan.featured ? "opacity-70" : "text-muted-foreground"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button
                      asChild
                      className={`w-full ${plan.featured ? "bg-background text-foreground hover:bg-background/90" : ""}`}
                      variant={plan.featured ? "default" : "outline"}
                    >
                      <Link href={plan.href}>
                        {plan.cta} <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* FAQ teaser */}
        <section className="border-t bg-muted/10">
          <div className="mx-auto max-w-3xl px-6 py-14 text-center">
            <AnimatedSection>
              <h2 className="text-2xl font-semibold">Des questions ?</h2>
              <p className="mt-2 text-muted-foreground">Consultez la FAQ ou prenez directement un appel.</p>
              <div className="mt-6 flex justify-center gap-3">
                <Link href="/faq" className="inline-flex items-center gap-2 border px-4 py-2 text-sm hover:bg-muted/40">Voir la FAQ</Link>
                <Link href="/booking" className="inline-flex items-center gap-2 border bg-foreground px-4 py-2 text-sm text-background hover:opacity-90">Réserver un appel</Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>
    </MarketingPageShell>
  );
}
