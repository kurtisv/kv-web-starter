import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  Bell,
  CheckCircle2,
  Globe,
  Lock,
  Shield,
  TrendingDown,
  Users,
  Zap,
} from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { FAQSection } from "@/components/sections/faq-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ShimmerBadge } from "@/components/ui/shimmer-badge";
import { SaasDemoNav } from "@/components/saas/saas-demo-nav";
import { IntegrationStatusList } from "@/components/saas/integration-status-list";
import {
  DEMO_METRICS,
  DEMO_PLANS,
  DEMO_STATS,
  DEMO_TESTIMONIALS,
  DEMO_FAQ,
  DEMO_PRODUCT,
} from "@/lib/demo-data/saas-demo-data";

// ── Feature bento items ───────────────────────────────────────────────────────

const FEATURE_BENTO = [
  {
    icon: <TrendingDown className="h-5 w-5" />,
    title: "Churn signals",
    description: "Detectez les clients a risque avant qu'ils ne resilient. Scores automatiques bases sur l'usage.",
    highlight: true,
  },
  {
    icon: <BarChart2 className="h-5 w-5" />,
    title: "Revenue analytics",
    description: "MRR, ARR, activation, ARPU — en temps reel dans un seul dashboard.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Usage-based billing",
    description: "Quotas, metering, overages et alertes configures en quelques minutes.",
  },
  {
    icon: <Bell className="h-5 w-5" />,
    title: "Alertes intelligentes",
    description: "Slack, email, webhook — notifie votre equipe au bon moment sur les bons evenements.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Team workspace",
    description: "Roles (admin/membre/lecteur), invitations, SSO et SCIM pour les equipes enterprise.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Integrations",
    description: "Stripe, HubSpot, Slack, GitHub, Segment et plus. Connectez votre stack existant.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Security & audit",
    description: "Journal d'audit complet, cles API, SSO/SAML, chiffrement AES-256.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Compliance readiness",
    description: "Hebergement EU, DPA inclus, RGPD, checklist SOC2-ready. Non certifie — preparation fournie.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Customer portal",
    description: "Vos clients gerent eux-memes leur abonnement, factures et moyens de paiement.",
  },
];

// ── Workflow steps ─────────────────────────────────────────────────────────────

const WORKFLOW_STEPS = [
  { step: "01", title: "Connectez votre stack",  body: "Branchez Stripe, votre CRM et vos outils en moins de 10 minutes. Pas de dev requis." },
  { step: "02", title: "Importez vos clients",   body: "Synchronisation automatique depuis Stripe ou CSV. LaunchPilot construit votre vue client en temps reel." },
  { step: "03", title: "Recevez vos signaux",    body: "Alertes churn, quotas critiques, paiements echoues — tout remonte dans votre dashboard et vos canaux." },
  { step: "04", title: "Scalez en confiance",    body: "Passez de 50 a 50 000 clients sans changer d'outils. Architecture pensee pour la croissance." },
];

// ── Pricing adapter ───────────────────────────────────────────────────────────

const pricingPlans = DEMO_PLANS.map((p) => ({
  name:        p.name,
  price:       p.price,
  period:      p.period,
  description: p.description,
  features:    p.features,
  cta:         p.cta,
  ctaHref:     p.ctaHref,
  featured:    p.recommended,
  badge:       p.badge,
}));

// ── FAQ adapter ───────────────────────────────────────────────────────────────

const faqItems = DEMO_FAQ.map((f) => ({ question: f.q, answer: f.a }));

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DemoSaaSPage() {
  return (
    <div data-theme="premium-saas" className="bg-profile-soft-gradient">
      <SaasDemoNav />

      {/* 1. Hero */}
      <HeroSection
        variant="centered"
        eyebrow={<ShimmerBadge>LaunchPilot — Cockpit SaaS B2B</ShimmerBadge>}
        title={
          <>
            Suivez votre croissance.{" "}
            <span className="text-gradient-primary">Anticipez le churn.</span>
          </>
        }
        description={DEMO_PRODUCT.description}
        actions={
          <>
            <Button size="xl" variant="default" asChild>
              <Link href="/demo/saas/dashboard">
                Voir le dashboard <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="xl" variant="soft" asChild>
              <Link href="/demo/saas/billing">Voir la facturation</Link>
            </Button>
          </>
        }
        trustBar={
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">3 400+</span> equipes actives
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">47 M €</span> de MRR suivi
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">99.98%</span> uptime SLA
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">4.8/5</span> note clients
            </span>
          </div>
        }
        media={
          <div className="rounded-xl p-5 text-left card-glass">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Apercu dashboard — {DEMO_PRODUCT.workspace}
            </p>
            <MetricGrid className="grid-cols-2">
              <MetricCard
                label="MRR"
                value={DEMO_METRICS.mrr.value}
                trend={{ value: DEMO_METRICS.mrr.trend + " ce mois", direction: DEMO_METRICS.mrr.direction }}
              />
              <MetricCard
                label="Churn rate"
                value={DEMO_METRICS.churnRate.value}
                trend={{ value: DEMO_METRICS.churnRate.trend, direction: DEMO_METRICS.churnRate.direction }}
              />
              <MetricCard
                label="Activation"
                value={DEMO_METRICS.activationRate.value}
                trend={{ value: DEMO_METRICS.activationRate.trend, direction: DEMO_METRICS.activationRate.direction }}
              />
              <MetricCard
                label="NPS"
                value={DEMO_METRICS.nps.value}
                trend={{ value: "+" + DEMO_METRICS.nps.trend, direction: DEMO_METRICS.nps.direction }}
              />
            </MetricGrid>
            <p className="mt-3 text-center text-[10px] text-muted-foreground">
              {DEMO_PRODUCT.demoDisclaimer}
            </p>
          </div>
        }
      />

      {/* 2. Stats */}
      <StatsSection stats={DEMO_STATS} variant="strip" />

      {/* 3. Problem / Solution */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="outline" className="mb-4">Le probleme</Badge>
              <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Votre MRR monte. Votre churn aussi.
              </h2>
              <p className="text-muted-foreground">
                La plupart des equipes SaaS deccouvrent le churn dans leur export Stripe du mois dernier.
                Trop tard pour agir. LaunchPilot inverse cet avantage en detectant les signaux faibles
                avant que vos clients ne resilient.
              </p>
            </div>
            <div>
              <Badge variant="outline" className="mb-4">La solution</Badge>
              <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Un cockpit. Tous vos signaux.
              </h2>
              <p className="text-muted-foreground">
                LaunchPilot connecte votre billing, votre usage produit et votre CRM pour vous donner
                une vue unifiee de la sante de chaque client — avec des alertes actionnables, pas juste des graphiques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Feature bento */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Fonctionnalites
        </p>
        <h2 className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">
          Tout ce dont une equipe SaaS B2B a besoin.
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_BENTO.map((f) => (
            <SpotlightCard
              key={f.title}
              className={
                "flex flex-col gap-3 rounded-xl p-6 " +
                (f.highlight ? "border-primary/30 bg-primary/5" : "")
              }
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {f.icon}
              </div>
              <p className="font-semibold">{f.title}</p>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 5. Workflow */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Workflow
          </p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">
            Operationnel en une heure.
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <span className="text-4xl font-black text-primary/20">{s.step}</span>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Dashboard preview */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Dashboard
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tout ce qui compte. En un coup d&apos;oeil.
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/demo/saas/dashboard">
              Voir le dashboard complet <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <MetricGrid className="sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="MRR"
            value={DEMO_METRICS.mrr.value}
            trend={{ value: DEMO_METRICS.mrr.trend + " ce mois", direction: DEMO_METRICS.mrr.direction }}
          />
          <MetricCard
            label="Utilisateurs actifs"
            value={DEMO_METRICS.activeUsers.value}
            trend={{ value: DEMO_METRICS.activeUsers.trend, direction: DEMO_METRICS.activeUsers.direction }}
          />
          <MetricCard
            label="Churn rate"
            value={DEMO_METRICS.churnRate.value}
            trend={{ value: DEMO_METRICS.churnRate.trend, direction: DEMO_METRICS.churnRate.direction }}
          />
          <MetricCard
            label="Activation"
            value={DEMO_METRICS.activationRate.value}
            trend={{ value: DEMO_METRICS.activationRate.trend, direction: DEMO_METRICS.activationRate.direction }}
          />
        </MetricGrid>
      </section>

      {/* 7. Integrations */}
      <section className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Integrations
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Votre stack, conecte.
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/demo/saas/settings">
                Voir toutes les integrations <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <IntegrationStatusList limit={6} />
        </div>
      </section>

      {/* 8. Security */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Securite & Compliance
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Enterprise-ready. Pas de compromis.
              </h2>
              <p className="mb-6 text-muted-foreground">
                Chiffrement AES-256, audit logs, SSO/SAML, hebergement EU et checklist SOC2-ready.
                LaunchPilot est concu pour passer les due diligences de vos clients enterprise.
              </p>
              <Button asChild variant="outline">
                <Link href="/demo/saas/security">
                  Voir la page security <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: "🔒", label: "TLS 1.3 + AES-256" },
                { icon: "🛡️", label: "SSO / SAML / SCIM" },
                { icon: "📋", label: "Audit logs complets" },
                { icon: "🇪🇺", label: "Hebergement EU (RGPD)" },
                { icon: "✅", label: "Checklist SOC2-ready" },
                { icon: "📄", label: "DPA inclus" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 rounded-lg border bg-background p-3">
                  <span className="text-lg" aria-hidden="true">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-[11px] text-muted-foreground">
            Demonstration fictive. LaunchPilot n&apos;est pas certifie SOC2. La checklist indique une preparation, pas une certification.
          </p>
        </div>
      </section>

      {/* 9. Pricing */}
      <PricingSection
        eyebrow="Tarifs"
        title="Simple, transparent, sans surprise."
        plans={pricingPlans}
      />
      <p className="text-center text-xs text-muted-foreground pb-8">
        {DEMO_PRODUCT.demoDisclaimer}
      </p>

      {/* 10. Testimonials */}
      <TestimonialSection
        eyebrow="Ils ont adopte LaunchPilot"
        title="Des equipes qui anticipent le churn."
        testimonials={DEMO_TESTIMONIALS}
      />

      {/* 11. FAQ */}
      <FAQSection
        eyebrow="Questions frequentes"
        title="Tout ce que vous voulez savoir."
        items={faqItems}
      />

      {/* 12. Final CTA */}
      <CTASection
        variant="dark"
        eyebrow={`${DEMO_STATS[0].value} equipes nous font confiance`}
        title="Pret a voir votre churn baisser ?"
        description="Demarrez gratuitement. Pas de carte de credit."
        actions={
          <Button size="lg" className="theme-hero-btn-primary" asChild>
            <Link href="/demo/saas/dashboard">
              Voir le dashboard <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />
    </div>
  );
}
