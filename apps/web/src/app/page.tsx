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
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { StatsSection } from "@/components/sections/stats-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CTASection } from "@/components/sections/cta-section";
import { THEME_META } from "@/design-system/tokens";
import { PROJECT_PRESETS } from "@/config/project-presets";

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

        {/* Hero */}
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] opacity-50">
              Next.js 16 &middot; Tailwind v4 &middot; Auth.js v5 &middot; Stripe &middot; Prisma
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
              Un boilerplate. 9 identites de projet.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 opacity-70">
              Reservations, SaaS, portfolio, e-commerce, immobilier — chaque preset
              reconfigure le theme, la navigation et la logique produit.
              Clone, personnalise, livre en jours.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link href="/demo">
                  Voir les 9 demos <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-background/30 text-background hover:bg-background/10 hover:text-background"
              >
                <Link href="/docs">Lire le guide</Link>
              </Button>
            </div>

            {/* Theme accent swatch strip */}
            <div className="mt-14 space-y-2">
              <p className="text-xs opacity-30 uppercase tracking-widest">7 themes visuels</p>
              <div className="flex gap-2">
                {(Object.entries(THEME_META) as [string, typeof THEME_META[keyof typeof THEME_META]][]).map(([id, meta]) => (
                  <div key={id} className="group relative flex-1">
                    <div
                      className="h-2 w-full rounded-sm transition-all group-hover:h-3"
                      style={{ background: meta.accent }}
                    />
                    <span className="absolute top-3 left-0 hidden text-[10px] opacity-50 leading-tight whitespace-nowrap lg:group-hover:block">
                      {meta.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <StatsSection
          variant="strip"
          stats={[
            { value: "9", label: "Presets projet" },
            { value: "7", label: "Themes visuels" },
            { value: "50+", label: "Composants UI" },
            { value: "2-5j", label: "Pour livrer" },
          ]}
        />

        {/* 9 demos gallery */}
        <section className="border-b bg-background">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <Badge className="mb-4">Demo Gallery</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                9 identites visuelles, une base commune.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Chaque demo montre un theme distinct et une logique produit realiste.
                Un seul boilerplate, plusieurs identites.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DEMOS.map((d) => {
                const preset = PROJECT_PRESETS[d.slug];
                const theme = THEME_META[preset.theme];
                return (
                  <Link key={d.slug} href={`/demo/${d.slug}`} className="group block">
                    <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                      <div className="h-1.5 w-full" style={{ background: theme.accent }} />
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
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/demo">
                  Explorer la galerie <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stack inclus */}
        <FeatureGrid
          eyebrow="Stack inclus"
          title="Tout ce dont tu as besoin, deja configure."
          description="Chaque module est operationnel. Tu branches les variables d'environnement, tu lances — c'est tout."
          features={stackFeatures}
          columns={3}
          variant="cards"
        />

        {/* CTA */}
        <CTASection
          variant="dark"
          title="Pret a livrer ton prochain projet ?"
          description="Clone la base, active les modules dont tu as besoin, configure — et livre en jours."
          actions={
            <>
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link href="/docs">
                  Lire le guide <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="glass"
                size="lg"
              >
                <Link href="/demo">Voir les demos</Link>
              </Button>
            </>
          }
        />

      </main>
    </MarketingPageShell>
  );
}
