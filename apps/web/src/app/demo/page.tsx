import Link from "next/link";
import { ArrowRight, Layers, Rocket, Sparkles, Palette, Wand2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DemoCapabilityGrid,
  DemoSectionHeader,
  DemoShowcaseCard,
  type DemoCardData,
} from "@/components/demo";

const DEMOS: DemoCardData[] = [
  {
    slug: "booking",
    label: "Booking",
    type: "Prise de rendez-vous",
    tagline: "Reservations en ligne avec confirmation automatique, gestion du staff et calendrier interactif.",
    result: "Lancez un systeme de reservation complet en quelques jours.",
    accent: "#4d7c0f",
    bg: "#fefce8",
    fg: "#292524",
    heroFrom: "#14532d",
    layout: "standard",
    complexity: "Intermediate",
    keyComponents: ["ServicePicker", "TimeSlotGrid", "BookingForm", "CancelBookingDialog", "RescheduleBookingDialog", "BookingStatusTimeline"],
    integrations: ["Stripe", "Resend", "Google Calendar"],
  },
  {
    slug: "saas",
    label: "SaaS",
    type: "Produit SaaS B2B",
    tagline: "Dashboard, billing, usage, security et settings. Une demo SaaS B2B complete inspiree de LaunchPilot.",
    result: "Lancez un SaaS B2B complet avec cockpit de croissance.",
    accent: "#7c3aed",
    bg: "#ffffff",
    fg: "#0f172a",
    heroFrom: "#4c1d95",
    layout: "standard",
    complexity: "Advanced",
    keyComponents: ["SaasKpiGrid", "ChurnRiskPanel", "BillingSummaryCard", "UsageOverviewPanel", "SecurityPostureCard", "SubscriptionStatusCard"],
    integrations: ["Stripe", "HubSpot", "Slack", "GitHub", "Segment"],
  },
  {
    slug: "api",
    label: "API Portal",
    type: "Portail developpeur",
    tagline: "Documentation interactive, cles API, rate limiting et metriques temps reel.",
    result: "Monetisez votre API avec un portail dev professionnel.",
    accent: "#22d3ee",
    bg: "#030712",
    fg: "#f9fafb",
    heroFrom: "#050d1f",
    dark: true,
    layout: "portal",
    complexity: "Advanced",
    keyComponents: ["EndpointList", "CodeTabsBlock", "ApiKeyDisplay", "RateLimitMeter", "RequestLogViewer", "WebhookTester"],
    integrations: ["Upstash", "Stripe"],
  },
  {
    slug: "ecommerce",
    label: "E-commerce",
    type: "Boutique en ligne",
    tagline: "Catalogue produits, panier, codes promo et checkout. Mode mock inclus.",
    result: "Une boutique premium prete a brancher sur Stripe.",
    accent: "#c2410c",
    bg: "#ffffff",
    fg: "#111827",
    heroFrom: "#1c0f07",
    layout: "store",
    complexity: "Advanced",
    keyComponents: ["ProductGrid", "CartDrawer", "PromoCodeInput", "CheckoutSummary", "OrderStatusTimeline", "CustomerOrderTable"],
    integrations: ["Stripe", "Resend", "S3 / R2"],
  },
  {
    slug: "dashboard",
    label: "Dashboard Admin",
    type: "Back-office",
    tagline: "Metriques, gestion utilisateurs, journal d'audit et tiroirs de detail.",
    result: "Un admin panel complet avec CRUD et controles d'acces.",
    accent: "#7c3aed",
    bg: "#ffffff",
    fg: "#0f172a",
    heroFrom: "#4c1d95",
    layout: "dashboard",
    complexity: "Intermediate",
    keyComponents: ["MetricGrid", "DashboardDemoUsersCard", "AuditLogTimeline", "EntityDrawer", "ConfirmDialog", "EmptyDashboardState"],
    integrations: ["PostgreSQL", "Stripe"],
  },
  {
    slug: "real-estate",
    label: "Immobilier",
    type: "Listings de biens",
    tagline: "Fiches proprietes, simulateur d'hypotheque, profils d'agents et formulaire de contact.",
    result: "Un site immobilier premium avec lead capture integre.",
    accent: "#0369a1",
    bg: "#ffffff",
    fg: "#0f172a",
    heroFrom: "#0369a1",
    layout: "standard",
    complexity: "Intermediate",
    keyComponents: ["PropertyCard", "AgentProfileCard", "MortgageCalculator", "StatsSection", "TestimonialSection"],
    integrations: ["Resend", "Stripe"],
  },
  {
    slug: "local-business",
    label: "Local Business",
    type: "Commerce / service local",
    tagline: "Horaires, services, avis et formulaire de contact. Conversion mobile-first.",
    result: "Un site local pro avec reservation et contact en 1 clic.",
    accent: "#4d7c0f",
    bg: "#fef9f0",
    fg: "#292524",
    heroFrom: "#14532d",
    layout: "standard",
    complexity: "Starter",
    keyComponents: ["BusinessHours", "FeatureGrid", "TestimonialSection", "CTASection", "HeroSection"],
    integrations: ["Stripe", "Resend"],
  },
  {
    slug: "portfolio",
    label: "Portfolio",
    type: "Portfolio creatif",
    tagline: "Projets, competences, timeline d'experience et formulaire de contact anime.",
    result: "Un portfolio dev/designer avec identite visuelle forte.",
    accent: "#1e40af",
    bg: "#f8fafc",
    fg: "#0f172a",
    heroFrom: "#1e3a8a",
    layout: "standard",
    complexity: "Starter",
    keyComponents: ["SkillsGrid", "Timeline", "HeroSection", "TestimonialSection", "CTASection"],
    integrations: ["Resend"],
  },
  {
    slug: "auto-blog",
    label: "Auto Blog",
    type: "Magazine automobile",
    tagline: "Fiches voitures, comparatifs et articles style magazine. Theme sombre premium.",
    result: "Un media auto spectaculaire avec contenu riche.",
    accent: "#dc2626",
    bg: "#09090b",
    fg: "#fafafa",
    heroFrom: "#0d0000",
    dark: true,
    layout: "standard",
    complexity: "Intermediate",
    keyComponents: ["HeroSection", "FeatureGrid", "StatsSection", "ArticleGrid", "CTASection"],
    integrations: ["Sanity CMS", "Stripe"],
  },
];

const STATS = [
  { value: "9", label: "demos preset" },
  { value: "60+", label: "composants UI" },
  { value: "5", label: "adapters cloud" },
  { value: "0", label: "cles requises" },
];

const USE_CASES = [
  { icon: "SaaS", label: "SaaS platform", description: "Abonnements, metriques, API" },
  { icon: "RDV", label: "Systeme de booking", description: "Staff, creneaux, confirmation" },
  { icon: "API", label: "API business", description: "Cles, docs, rate limiting" },
  { icon: "Shop", label: "Boutique e-commerce", description: "Produits, panier, checkout" },
  { icon: "Admin", label: "Dashboard admin", description: "CRUD, roles, audit logs" },
  { icon: "Immo", label: "Listing immobilier", description: "Biens, agents, lead capture" },
  { icon: "Local", label: "Commerce local", description: "Horaires, services, contact" },
  { icon: "Folio", label: "Portfolio creatif", description: "Projets, skills, contact" },
  { icon: "Mag", label: "Magazine / blog", description: "Articles, fiches, comparatifs" },
];

export default function DemoIndexPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative border-b bg-gradient-to-b from-muted/40 to-background">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 gap-1.5">
              <Sparkles className="h-3 w-3" /> Boilerplate multi-client
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              Un boilerplate.{" "}
              <span className="text-primary">Neuf identites.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Chaque demo est un mini-produit presque pret a vendre — avec son propre
              theme, ses composants metier et ses integrations optionnelles.
              Aucune cle externe requise pour demarrer.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="#demos">
                  Explorer les demos <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo/components">
                  <Layers className="size-4" /> Voir les composants
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-4 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo showcase grid */}
      <section id="demos" className="mx-auto max-w-6xl px-6 py-20">
        <DemoSectionHeader
          eyebrow="9 presets"
          title="Choisissez votre point de depart"
          description="Chaque preset est un theme visuel distinct, un jeu de composants metier adaptes et une logique produit realiste."
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((demo) => (
            <DemoShowcaseCard key={demo.slug} demo={demo} />
          ))}

          {/* Components playground card */}
          <Link href="/demo/components" className="group block">
            <div className="flex h-full flex-col rounded-xl border border-dashed bg-card/50 p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold">Components Playground</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">
                Tous les composants UI en un seul endroit — boutons, cartes, formulaires, tableaux et plus.
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                Voir le playground
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>

          {/* Design Lab card */}
          <Link href="/demo/design-lab" className="group block">
            <div className="flex h-full flex-col rounded-xl border border-dashed bg-card/50 p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold">Design Lab</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">
                10 profils visuels — backgrounds, glass cards, gradient text, animations. La couche de personnalite au-dela des themes.
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                Explorer les profils
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>

          {/* Prototype Engine card */}
          <Link href="/prototype" className="group block">
            <div className="flex h-full flex-col rounded-xl border border-dashed bg-card/50 p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Wand2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold">Prototype Engine</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">
                Generez un prototype client en 4 etapes : secteur, couleur, profil design, fonctionnalites. Export JSON inclus.
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                Generer un prototype
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* What it can build */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <DemoSectionHeader
            eyebrow="Cas d'usage"
            title="Ce boilerplate peut construire"
            description="Un seul repo. Neuf types de projets differents. Adaptez le preset a votre client."
            className="mb-10"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {USE_CASES.map((uc) => (
              <div key={uc.label} className="flex items-start gap-3 rounded-lg border bg-card p-4 shadow-sm">
                <div className="shrink-0 rounded-md bg-primary/10 px-2 py-1">
                  <span className="text-xs font-bold text-primary">{uc.icon}</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{uc.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{uc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included capabilities */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <DemoSectionHeader
          eyebrow="Tout inclus"
          title="Capacites du boilerplate"
          description="Tout ce qui est liste ci-dessous est inclus et fonctionnel en mode local. Aucune cle externe requise."
          className="mb-10"
        />
        <DemoCapabilityGrid />
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Rocket className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight">Pret a demarrer ?</h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            Clonez le repo, copiez{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">.env.example</code>,
            lancez{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">pnpm dev</code>.
            Aucune configuration requise.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/demo/design-lab">
                Explorer le Design Lab <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo/components">
                Voir les composants
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
