import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Gauge,
  Globe,
  Home as HomeIcon,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  ShoppingCart,
  Shield,
  Star,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RevealSection } from "@/components/ui/reveal-section";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { AnimatedHero } from "@/components/sections/animated-hero";
import { StatsSection } from "@/components/sections/stats-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CTASection } from "@/components/sections/cta-section";
import { THEME_META } from "@/design-system/tokens";
import { PROJECT_PRESETS } from "@/config/project-presets";

function DemoThumbnail({ slug, accent, dark }: { slug: string; accent: string; dark: boolean }) {
  const bg = dark ? "#1a1a2e" : "#f9fafb";
  const line = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const line2 = dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.11)";
  const af = accent + "33";

  const Nav = () => (
    <div className="flex h-6 shrink-0 items-center gap-2 border-b px-3" style={{ borderColor: line }}>
      <div className="h-1.5 w-8 rounded-full" style={{ background: accent }} />
      <div className="ml-auto flex gap-2">
        {[16, 12, 14].map((w, i) => <div key={i} className="h-1 rounded-full" style={{ background: line2, width: w }} />)}
      </div>
    </div>
  );

  if (slug === "portfolio") return (
    <div className="flex h-36 flex-col overflow-hidden" style={{ background: bg }}>
      <Nav />
      <div className="px-3 pt-2">
        <div className="h-3 w-28 rounded" style={{ background: line2 }} />
        <div className="mt-1 h-2 w-20 rounded" style={{ background: line }} />
      </div>
      <div className="flex flex-1 gap-1.5 px-3 pt-3">
        {[af, line, line].map((c, i) => (
          <div key={i} className="flex flex-1 flex-col overflow-hidden rounded">
            <div className="flex-1" style={{ background: c }} />
            <div className="mt-1 h-1.5 w-3/4 rounded" style={{ background: line2 }} />
          </div>
        ))}
      </div>
      <div className="pb-2" />
    </div>
  );

  if (slug === "saas") return (
    <div className="flex h-36 flex-col overflow-hidden" style={{ background: bg }}>
      <Nav />
      <div className="flex flex-1 gap-2 px-3 pt-3 pb-3">
        {[false, true, false].map((feat, i) => (
          <div key={i} className="flex flex-1 flex-col gap-1 rounded border p-2"
            style={{ borderColor: feat ? accent : line, background: feat ? af : "transparent" }}>
            <div className="h-1.5 w-8 rounded" style={{ background: feat ? accent : line2 }} />
            <div className="h-3 w-10 rounded" style={{ background: feat ? accent : line2 }} />
            {[1, 2, 3].map(j => <div key={j} className="h-1 rounded" style={{ background: feat ? accent + "40" : line }} />)}
          </div>
        ))}
      </div>
    </div>
  );

  if (slug === "booking") return (
    <div className="flex h-36 flex-col overflow-hidden" style={{ background: bg }}>
      <Nav />
      <div className="px-3 pt-2">
        <div className="h-2 w-16 rounded" style={{ background: line2 }} />
      </div>
      <div className="mt-2 grid grid-cols-7 gap-0.5 px-3">
        {Array.from({ length: 35 }, (_, i) => {
          const highlighted = [3, 8, 15, 20, 27].includes(i);
          const today = i === 10;
          return <div key={i} className="h-3 rounded-sm" style={{ background: highlighted ? accent : today ? line2 : line }} />;
        })}
      </div>
    </div>
  );

  if (slug === "api") return (
    <div className="flex h-36 flex-col overflow-hidden" style={{ background: "#0d1117" }}>
      <div className="flex h-6 shrink-0 items-center gap-1.5 border-b px-3" style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.08)" }}>
        {["#ef4444", "#f59e0b", "#22c55e"].map(c => <div key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}
      </div>
      <div className="flex-1 px-3 pt-2 space-y-1.5">
        {[
          { w: "80%", c: accent },
          { w: "70%", c: "rgba(255,255,255,0.35)" },
          { w: "55%", c: "rgba(255,255,255,0.2)" },
          { w: "40%", c: "#4ade80" },
        ].map((l, i) => <div key={i} className="h-2 rounded" style={{ background: l.c, width: l.w }} />)}
      </div>
    </div>
  );

  if (slug === "real-estate") return (
    <div className="flex h-36 flex-col overflow-hidden" style={{ background: bg }}>
      <Nav />
      <div className="grid grid-cols-2 gap-1.5 px-3 pt-2 pb-2 flex-1">
        {[af, line, line, af].map((c, i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded">
            <div className="flex-1" style={{ background: c }} />
            <div className="mt-0.5 h-1.5 w-3/4 rounded" style={{ background: line2 }} />
            <div className="mt-0.5 mb-0.5 h-1 w-1/2 rounded" style={{ background: accent }} />
          </div>
        ))}
      </div>
    </div>
  );

  if (slug === "local-business") return (
    <div className="flex h-36 flex-col overflow-hidden" style={{ background: bg }}>
      <Nav />
      <div className="mx-3 mt-2 flex items-center justify-center overflow-hidden rounded" style={{ background: af, height: 52 }}>
        <div className="h-4 w-24 rounded" style={{ background: accent + "80" }} />
      </div>
      <div className="flex gap-1.5 px-3 pt-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex-1 rounded p-1.5" style={{ background: line }}>
            <div className="mx-auto h-2 w-2 rounded-full" style={{ background: accent }} />
            <div className="mt-1 h-1 rounded" style={{ background: line2 }} />
          </div>
        ))}
      </div>
    </div>
  );

  if (slug === "auto-blog") return (
    <div className="flex h-36 flex-col overflow-hidden" style={{ background: "#0f172a" }}>
      <div className="relative flex-1" style={{ background: "linear-gradient(135deg,#1e293b,#0f172a)" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-9 w-9 rounded-full" style={{ background: accent + "30", border: `2px solid ${accent}` }} />
        </div>
        <div className="absolute bottom-2 left-3 space-y-1">
          <div className="h-2 w-24 rounded" style={{ background: "rgba(255,255,255,0.55)" }} />
          <div className="h-1.5 w-16 rounded" style={{ background: "rgba(255,255,255,0.25)" }} />
        </div>
        <div className="absolute right-2 top-2 rounded px-1.5 py-0.5" style={{ background: accent }}>
          <div className="h-1 w-6 rounded" style={{ background: "rgba(0,0,0,0.4)" }} />
        </div>
      </div>
      <div className="flex gap-2 px-3 py-2">
        {[1, 2].map(i => (
          <div key={i} className="flex-1 space-y-0.5">
            <div className="h-1.5 rounded" style={{ background: "rgba(255,255,255,0.2)" }} />
            <div className="h-1 w-3/4 rounded" style={{ background: "rgba(255,255,255,0.1)" }} />
          </div>
        ))}
      </div>
    </div>
  );

  if (slug === "ecommerce") return (
    <div className="flex h-36 flex-col overflow-hidden" style={{ background: bg }}>
      <Nav />
      <div className="grid grid-cols-3 gap-1.5 px-3 pt-2 pb-2 flex-1">
        {[af, line, af, line, line, af].map((c, i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded" style={{ background: line }}>
            <div className="flex-1" style={{ background: c }} />
            <div className="space-y-0.5 px-1 pb-1 pt-0.5">
              <div className="h-1 rounded" style={{ background: line2 }} />
              <div className="h-1.5 w-2/3 rounded" style={{ background: accent }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // dashboard (default)
  return (
    <div className="flex h-36 flex-col overflow-hidden" style={{ background: bg }}>
      <Nav />
      <div className="flex gap-1.5 px-3 pt-2">
        {[accent, line2, line2, line2].map((c, i) => (
          <div key={i} className="flex-1 rounded p-1.5" style={{ background: i === 0 ? af : line }}>
            <div className="h-1 rounded" style={{ background: c }} />
            <div className="mt-1 h-3 w-3/4 rounded" style={{ background: c + (i === 0 ? "" : "88") }} />
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-end gap-0.5 px-3 pt-2 pb-2">
        {[50, 35, 70, 45, 90, 40, 65, 55, 80, 35, 60, 75].map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 8 ? accent : line2 }} />
        ))}
      </div>
    </div>
  );
}

const DEMOS = [
  { slug: "portfolio",      label: "Portfolio",       Icon: Globe,       tagline: "Vitrine developpeur avec etudes de cas" },
  { slug: "saas",           label: "SaaS",            Icon: Zap,         tagline: "Plateforme avec abonnements et analytics" },
  { slug: "booking",        label: "Reservations",    Icon: CalendarDays,tagline: "Agenda en ligne, paiement a la reservation" },
  { slug: "api",            label: "API Portal",      Icon: KeyRound,    tagline: "Acces payant par cles API, rate limit" },
  { slug: "real-estate",    label: "Immobilier",      Icon: HomeIcon,    tagline: "Annonces, scores quartier, rendements" },
  { slug: "local-business", label: "Commerce local",  Icon: MapPin,      tagline: "Vitrine + services + avis clients" },
  { slug: "auto-blog",      label: "Blog auto",       Icon: Gauge,       tagline: "Magazine + catalogue vehicules" },
  { slug: "ecommerce",      label: "E-commerce",      Icon: ShoppingCart,tagline: "Boutique produits avec panier" },
  { slug: "dashboard",      label: "Dashboard",       Icon: BarChart2,   tagline: "Interface admin avec metriques temps reel" },
] as const;

const stackFeatures = [
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Auth.js v5",
    description: "JWT sessions, OAuth GitHub, credentials, adapter Prisma. Middleware edge protege /dashboard/* sans latence.",
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: "Stripe",
    description: "Checkout, abonnements mensuels, webhooks, portail client. Plans FREE / PRO / BUSINESS / ENTERPRISE preconfigures.",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Resend + React Email",
    description: "Templates transactionnels en TSX. Confirmation de reservation et contact envoyes depuis l'action serveur.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Upstash Redis",
    description: "Rate limiting sliding window sur toutes les routes API publiques. Zero cold start, zero serveur a gerer.",
  },
  {
    icon: <CalendarDays className="h-5 w-5" />,
    title: "Module Booking",
    description: "Disponibilites, slots, reservations avec paiement Stripe integre. API REST incluse avec auth par cle.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "API Portal",
    description: "Cles API hashees bcrypt, comptabilisation des appels, limites automatiques par plan. Endpoint demo fourni.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "TypeScript strict + Zod",
    description: "Types partages via @kv/types, schema env valide au demarrage, zod sur tous les formulaires et routes.",
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "Storybook + Playwright + Vitest",
    description: "6 stories avec theme switcher, 50 tests unitaires Vitest, e2e Playwright sur les 9 pages demo.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "i18n EN/FR natif",
    description: "next-intl integre, 8 namespaces, Server et Client components. Pret a ajouter d'autres langues.",
  },
];

export default function Home() {
  return (
    <MarketingPageShell>
      <main>

        {/* Hero — AnimatedHero handles word-by-word reveal on mount */}
        {/* hero-background.mp4 is a text-free seamless-loop Remotion render (HeroBackground, premium-saas theme) */}
        <section className="theme-hero relative overflow-hidden">
          <video
            src="/videos/hero-background.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: 0.18, mixBlendMode: "soft-light" }}
          />
          <div className="theme-hero-accent-bar relative z-10" />
          <div className="relative z-10">
          <AnimatedHero
            eyebrow="Next.js 16 · Tailwind v4 · Auth.js v5 · Stripe · Prisma"
            title="Un boilerplate. 9 identites de projet."
            description="Reservations, SaaS, portfolio, e-commerce, immobilier — chaque preset reconfigure le theme, la navigation et la logique produit. Clone, personnalise, livre en jours."
            actions={
              <>
                <Button asChild size="lg" className="theme-hero-btn-primary shadow-md">
                  <Link href="/demo">Voir les 9 demos <ArrowRight className="size-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="theme-hero-btn-outline">
                  <Link href="/docs">Lire le guide</Link>
                </Button>
              </>
            }
          />
          </div>
        </section>

        {/* Stats — fade up when scrolled to */}
        <RevealSection variant="fade-up" delay={0.05}>
          <StatsSection
            variant="strip"
            stats={[
              { value: "9",   label: "Presets projet" },
              { value: "7",   label: "Themes visuels" },
              { value: "50+", label: "Composants UI"  },
              { value: "2-5j",label: "Pour livrer"    },
            ]}
          />
        </RevealSection>

        {/* 9 demos gallery */}
        <section className="border-b bg-background">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">

            {/* Section header */}
            <RevealSection variant="fade-up" className="mx-auto mb-12 max-w-2xl text-center">
              <Badge className="mb-4">Demo Gallery</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                9 identites visuelles, une base commune.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Chaque demo montre un theme distinct et une logique produit realiste.
                Un seul boilerplate, plusieurs identites.
              </p>
            </RevealSection>

            {/* Cards — each staggered by its position in the grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DEMOS.map((d, i) => {
                const preset = PROJECT_PRESETS[d.slug];
                const theme = THEME_META[preset.theme];
                return (
                  <RevealSection
                    key={d.slug}
                    variant="fade-up"
                    delay={0.05 + i * 0.06}
                    threshold={0.05}
                  >
                    <Link href={`/demo/${d.slug}`} className="group block h-full">
                      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                        <DemoThumbnail slug={d.slug} accent={theme.accent} dark={theme.dark} />
                        <CardHeader className="pt-4 pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <d.Icon className="h-4 w-4 text-muted-foreground" />
                              <CardTitle className="text-base">{d.label}</CardTitle>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <CardDescription className="mt-1 text-sm">{d.tagline}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-4 pt-0">
                          <Badge variant="outline" size="sm">{theme.label}</Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  </RevealSection>
                );
              })}
            </div>

            <RevealSection variant="fade-in" delay={0.1} className="mt-10 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/demo">
                  Explorer la galerie <ArrowRight className="size-4" />
                </Link>
              </Button>
            </RevealSection>
          </div>
        </section>

        {/* Stack inclus — slide in as a unit, then inner cards from feature-grid */}
        <RevealSection variant="fade-up" threshold={0.08}>
          <FeatureGrid
            eyebrow="Stack inclus"
            title="Tout ce dont tu as besoin, deja configure."
            description="Chaque module est operationnel. Tu branches les variables d'environnement, tu lances — c'est tout."
            features={stackFeatures}
            columns={3}
            variant="cards"
          />
        </RevealSection>

        {/* CTA — scale-in for visual weight */}
        <RevealSection variant="scale-in" ease="spring" threshold={0.15}>
          <CTASection
            variant="dark"
            title="Pret a livrer ton prochain projet ?"
            description="Clone la base, active les modules dont tu as besoin, configure — et livre en jours."
            actions={
              <>
                <Button asChild size="lg" className="theme-hero-btn-primary shadow-md">
                  <Link href="/docs">Lire le guide <ArrowRight className="size-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="theme-hero-btn-outline">
                  <Link href="/demo">Voir les demos</Link>
                </Button>
              </>
            }
          />
        </RevealSection>

      </main>
    </MarketingPageShell>
  );
}
