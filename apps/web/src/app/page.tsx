import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Code2, Smartphone, Zap, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedHeroText } from "@/components/ui/animated-hero-text";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Marquee } from "@/components/ui/marquee";

export const metadata: Metadata = {
  title: "KV Studio — Développeur Full-Stack",
  description: "Je construis les produits que vous n'avez pas le temps de construire. Next.js, React Native, IA.",
};

const PROJECTS = [
  { id: "kv-starter", name: "KV Web Starter", year: "2025", tags: ["Next.js", "Prisma", "Stripe"], description: "Boilerplate complet pour sites avec réservations, paiements et portail API.", href: "/projects" },
  { id: "gasmobile", name: "GasMobile", year: "2025", tags: ["React Native", "Expo", "Supabase"], description: "Application mobile de gestion pour stations-service. Multi-site, analytics, inventaire.", href: "/projects" },
  { id: "reserveflow", name: "ReserveFlow", year: "2024", tags: ["Next.js", "PostgreSQL", "Stripe"], description: "Système de réservation SaaS pour prestataires de services indépendants.", href: "/projects" },
];

const SERVICES = [
  { icon: Code2, title: "Développement Web", desc: "Sites vitrine, SaaS, e-commerce — avec Next.js et TypeScript." },
  { icon: Smartphone, title: "Applications Mobiles", desc: "iOS et Android en React Native depuis une seule base de code." },
  { icon: Zap, title: "Intégrations & IA", desc: "Stripe, Supabase, OpenAI — l'automatisation qui change tout." },
  { icon: Wrench, title: "Maintenance & Support", desc: "Suivi continu, optimisation et nouvelles fonctionnalités." },
];

const STACK = ["Next.js", "React", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "Stripe", "React Native", "Expo", "Tailwind CSS", "Framer Motion", "Vercel", "Supabase", "OpenAI", "FastAPI", "Python"];

const STATS = [
  { value: 8, suffix: "+", label: "Projets livrés" },
  { value: 6, suffix: "+", label: "Clients satisfaits" },
  { value: 3, suffix: "+", label: "Années d'expérience" },
  { value: 16, suffix: "+", label: "Technologies" },
];

export default function Home() {
  return (
    <MarketingPageShell>
      <main>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:py-36">

            {/* Available badge */}
            <AnimatedSection delay={0.05}>
              <span className="mb-8 inline-flex items-center gap-2 border border-background/20 bg-background/10 px-3 py-1.5 text-xs font-medium uppercase tracking-widest">
                <span className="size-1.5 rounded-full bg-green-400" />
                Disponible pour de nouveaux projets
              </span>
            </AnimatedSection>

            {/* Headline */}
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-balance sm:text-7xl">
              <AnimatedHeroText text="Je construis les produits que vous n'avez pas le temps de construire." />
            </h1>

            {/* Subtitle */}
            <AnimatedSection delay={0.7}>
              <p className="mt-7 max-w-xl text-lg leading-7 opacity-60">
                Développeur full-stack basé au Canada. Next.js, React Native, IA intégrée.
                Du premier commit au déploiement en jours, pas en mois.
              </p>
            </AnimatedSection>

            {/* CTAs */}
            <AnimatedSection delay={0.85}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                  <Link href="/projects">
                    Voir mes projets <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-background/30 text-background hover:bg-background/10 hover:text-background">
                  <Link href="/booking">
                    <Calendar className="size-4" />
                    Prendre un appel
                  </Link>
                </Button>
              </div>
            </AnimatedSection>

            {/* Stats strip */}
            <AnimatedSection delay={1.0}>
              <div className="mt-16 grid grid-cols-2 gap-px border border-background/10 bg-background/10 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-foreground px-6 py-5">
                    <div className="text-3xl font-semibold tabular-nums">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-sm opacity-40">{s.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── Tech marquee ── */}
        <section className="border-y bg-muted/20 py-4">
          <Marquee items={STACK} />
        </section>

        {/* ── Projects preview ── */}
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <AnimatedSection>
              <div className="mb-10 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Projets récents</p>
                  <h2 className="text-3xl font-semibold">Ce que j&apos;ai construit.</h2>
                </div>
                <Button asChild variant="ghost" size="sm" className="shrink-0">
                  <Link href="/projects">Tout voir <ArrowRight className="size-3" /></Link>
                </Button>
              </div>
            </AnimatedSection>

            <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
              {PROJECTS.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 0.1}>
                  <Link
                    href={project.href}
                    className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-muted/30"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="border border-border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="border-b bg-muted/10">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <AnimatedSection>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Ce que je fais</p>
              <h2 className="mb-10 text-3xl font-semibold">Services</h2>
            </AnimatedSection>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service, i) => (
                <AnimatedSection key={service.title} delay={i * 0.08}>
                  <div className="group h-full border bg-background p-6 transition-colors hover:border-foreground">
                    <div className="mb-4 flex size-10 items-center justify-center border bg-muted/30 transition-colors group-hover:bg-foreground group-hover:text-background">
                      <service.icon className="size-4" />
                    </div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{service.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center">
            <AnimatedSection>
              <p className="mb-4 text-sm uppercase tracking-widest opacity-40">Prochaine étape</p>
              <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight">
                Un projet en tête ?<br />Parlons-en.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg opacity-60">
                Premier appel gratuit. 30 minutes pour évaluer votre besoin, estimer la durée et voir si on est un bon match.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                  <Link href="/booking">
                    Réserver un appel <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-background/30 text-background hover:bg-background/10 hover:text-background">
                  <Link href="/contact">Envoyer un message</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>
    </MarketingPageShell>
  );
}
