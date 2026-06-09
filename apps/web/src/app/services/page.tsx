import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Smartphone, Zap, Wrench, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { AnimatedSection } from "@/components/ui/animated-section";

export const metadata: Metadata = {
  title: "Services — KV Studio",
  description: "Développement web, applications mobiles, intégrations API et maintenance.",
};

const SERVICES = [
  {
    icon: Code2,
    title: "Développement Web",
    description: "Sites vitrine, SaaS, e-commerce — des produits qui convertissent et qui tiennent.",
    features: [
      "Next.js App Router + TypeScript",
      "SEO technique et Core Web Vitals",
      "Animations et transitions fluides",
      "Authentification et espace client",
      "Paiements Stripe intégrés",
      "Déploiement Vercel ou VPS",
    ],
    timeline: "2–4 semaines",
    from: "À partir de 2 500 $",
  },
  {
    icon: Smartphone,
    title: "Applications Mobiles",
    description: "iOS et Android depuis une seule base de code React Native. Vite sur les stores.",
    features: [
      "React Native + Expo",
      "Publication App Store & Play Store",
      "Notifications push",
      "Mode hors-ligne et sync",
      "Backend Supabase ou custom",
      "EAS Build & Updates",
    ],
    timeline: "4–8 semaines",
    from: "À partir de 5 000 $",
  },
  {
    icon: Zap,
    title: "Intégrations & IA",
    description: "Stripe, OpenAI, webhooks — l'automatisation qui élimine le travail manuel.",
    features: [
      "Intégration OpenAI / LLMs",
      "Automatisations Stripe et facturation",
      "Webhooks et pipelines de données",
      "Intégration CRM et outils tiers",
      "Rate limiting et API sécurisée",
      "Monitoring et alertes",
    ],
    timeline: "1–3 semaines",
    from: "À partir de 1 500 $",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "Votre produit évolue. Je reste présent pour les mises à jour, correctifs et nouvelles fonctions.",
    features: [
      "Support prioritaire < 24h",
      "Mises à jour de dépendances",
      "Monitoring uptime",
      "Ajout de fonctionnalités",
      "Optimisation des performances",
      "Revue de code mensuelle",
    ],
    timeline: "Engagement mensuel",
    from: "À partir de 800 $/mois",
  },
];

const PROCESS = [
  { step: "01", title: "Découverte", desc: "Appel de 30 min gratuit. On définit le périmètre, la stack et les délais." },
  { step: "02", title: "Proposition", desc: "Devis détaillé avec jalons, livrables et conditions de paiement." },
  { step: "03", title: "Développement", desc: "Itérations rapides, accès au repo, démos hebdomadaires." },
  { step: "04", title: "Livraison", desc: "Déploiement, documentation et passation. Support inclus 30 jours." },
];

export default function ServicesPage() {
  return (
    <MarketingPageShell>
      <main>

        {/* Hero */}
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <AnimatedSection>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest opacity-40">Ce que je fais</p>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">Services</h1>
              <p className="mt-5 max-w-xl text-lg opacity-60">
                Du développement web aux applications mobiles, en passant par les intégrations IA — je construis ce dont vous avez besoin.
              </p>
              <div className="mt-7">
                <Button asChild className="bg-background text-foreground hover:bg-background/90">
                  <Link href="/booking">
                    Démarrer un projet <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Services */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            {SERVICES.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <div className="group h-full border bg-background p-8 transition-colors hover:border-foreground">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center border bg-muted/30 transition-colors group-hover:bg-foreground group-hover:text-background">
                      <service.icon className="size-5" />
                    </div>
                    <span className="text-xs text-muted-foreground">{service.timeline}</span>
                  </div>
                  <h2 className="text-xl font-semibold">{service.title}</h2>
                  <p className="mt-2 text-muted-foreground">{service.description}</p>
                  <ul className="mt-6 grid gap-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className="size-4 shrink-0 text-muted-foreground" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t pt-4 text-sm font-medium">{service.from}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="border-t bg-muted/10">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <AnimatedSection>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Comment je travaille</p>
              <h2 className="mb-10 text-3xl font-semibold">Le processus</h2>
            </AnimatedSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((step, i) => (
                <AnimatedSection key={step.step} delay={i * 0.1}>
                  <div className="h-full border bg-background p-6">
                    <span className="text-4xl font-semibold text-muted-foreground/20">{step.step}</span>
                    <h3 className="mt-3 font-semibold">{step.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center">
            <AnimatedSection>
              <h2 className="text-3xl font-semibold">Prêt à démarrer ?</h2>
              <p className="mt-3 opacity-60">Premier appel gratuit — 30 minutes pour évaluer votre projet.</p>
              <div className="mt-7 flex justify-center gap-3">
                <Button asChild className="bg-background text-foreground hover:bg-background/90">
                  <Link href="/booking">Réserver un appel <ArrowRight className="size-4" /></Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>
    </MarketingPageShell>
  );
}
