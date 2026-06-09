import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { STATS } from "@/lib/data";

export const metadata: Metadata = {
  title: "À propos — KV Studio",
  description: "Développeur full-stack spécialisé Next.js, React Native et intégrations IA.",
};

const SKILLS = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Prisma", "PostgreSQL", "Supabase", "FastAPI"] },
  { category: "Mobile", items: ["React Native", "Expo", "EAS Build", "iOS", "Android"] },
  { category: "DevOps & Outils", items: ["Vercel", "Docker", "GitHub Actions", "Stripe", "Resend"] },
];

const VALUES = [
  { title: "Ship fast, iterate faster", desc: "Je livre en jours, pas en mois. Les premières versions imparfaites valent mieux que les versions parfaites qui n'arrivent jamais." },
  { title: "Code lisible d'abord", desc: "La dette technique coûte cher. J'écris du code que moi (et vous) pourrons relire dans 6 mois sans souffrir." },
  { title: "Communication directe", desc: "Pas de jargon, pas de surprises. Je communique l'avancement clairement, je lève les blocages tôt." },
];

export default function AboutPage() {
  return (
    <MarketingPageShell>
      <main>

        {/* Hero */}
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <AnimatedSection>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest opacity-40">À propos</p>
              <h1 className="text-5xl font-semibold sm:text-6xl">Kurtis V.</h1>
              <p className="mt-3 text-xl opacity-60">Développeur Full-Stack — Next.js · React Native · IA</p>
            </AnimatedSection>
          </div>
        </section>

        {/* Bio + Stats */}
        <section className="border-b">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <AnimatedSection>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Je suis développeur full-stack basé au Canada, spécialisé dans la création de produits numériques complets — de l&apos;idée au déploiement. J&apos;aime les projets qui ont un vrai impact : des outils qui simplifient des processus complexes, des applications mobiles que les gens utilisent tous les jours, des SaaS qui génèrent de la valeur dès le premier mois.
                </p>
                <p>
                  J&apos;ai commencé à coder il y a quelques années avec Python et JavaScript, et je me suis spécialisé dans l&apos;écosystème React — web avec Next.js, mobile avec React Native. Aujourd&apos;hui je construis des projets en solo ou en collaboration, toujours avec le même objectif : livrer quelque chose qui fonctionne et qui est maintenable.
                </p>
                <p>
                  Quand je ne code pas, je construis des outils pour coder mieux — comme KV Web Starter, ce boilerplate qui me permet de démarrer chaque nouveau projet avec une base solide et de livrer 3x plus vite.
                </p>
              </div>
              <div className="mt-8 flex gap-3">
                <Button asChild>
                  <Link href="/booking">Prendre un appel <ArrowRight className="size-4" /></Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/projects">Voir mes projets</Link>
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-2 gap-px border border-border bg-border">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-background p-6">
                    <div className="text-3xl font-semibold tabular-nums">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Skills */}
        <section className="border-b bg-muted/10">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <AnimatedSection>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Stack</p>
              <h2 className="mb-10 text-3xl font-semibold">Technologies</h2>
            </AnimatedSection>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SKILLS.map((skill, i) => (
                <AnimatedSection key={skill.category} delay={i * 0.08}>
                  <div className="border bg-background p-5">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{skill.category}</h3>
                    <ul className="grid gap-1.5">
                      {skill.items.map((item) => (
                        <li key={item} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <AnimatedSection>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Comment je travaille</p>
              <h2 className="mb-10 text-3xl font-semibold">Valeurs</h2>
            </AnimatedSection>
            <div className="grid gap-6 lg:grid-cols-3">
              {VALUES.map((v, i) => (
                <AnimatedSection key={v.title} delay={i * 0.1}>
                  <div className="border bg-background p-7">
                    <h3 className="font-semibold">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
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
              <h2 className="text-3xl font-semibold">On travaille ensemble ?</h2>
              <p className="mt-3 opacity-60">Premier appel gratuit, sans engagement.</p>
              <div className="mt-6 flex justify-center gap-3">
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
