"use client";

import Link from "next/link";
import { ArrowRight, BarChart2, Lock, Zap, Globe, Clock, Shield } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PricingSection } from "@/components/sections/pricing-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";
import { SubscriptionStatusCard } from "@/components/saas/subscription-status-card";
import { UsageQuotaCard } from "@/components/saas/usage-quota-card";
import { PlanComparisonTable } from "@/components/saas/plan-comparison-table";
import type { PlanFeature } from "@/components/saas/plan-comparison-table";
import { InvoiceList, type Invoice } from "@/components/saas/invoice-list";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { SaasDemoActions } from "./saas-demo-actions";

const features = [
  { icon: <Zap className="h-5 w-5" />,     title: "Ultra rapide",        description: "Traitement en moins de 200ms. Cache intelligent sur toutes les requetes." },
  { icon: <Lock className="h-5 w-5" />,     title: "Securite enterprise",  description: "SOC2, chiffrement AES-256, audit logs complets et SSO disponible." },
  { icon: <BarChart2 className="h-5 w-5" />, title: "Analytics integre",  description: "Tableaux de bord en temps reel. Export CSV/JSON a tout moment." },
  { icon: <Globe className="h-5 w-5" />,    title: "Multi-region",        description: "Deploy dans 12 regions. Failover automatique sous 30 secondes." },
  { icon: <Clock className="h-5 w-5" />,    title: "99.99% uptime",       description: "SLA garanti. Incidents publics en temps reel sur status.votresaas.com." },
  { icon: <Shield className="h-5 w-5" />,   title: "RGPD ready",          description: "Hebergement EU, DPA disponible, droit a l'oubli automatise." },
];

const plans = [
  {
    name: "Starter",
    price: "0€",
    period: "/mois",
    description: "Parfait pour tester.",
    features: ["5 000 requetes/mois", "1 utilisateur", "Support communaute", "API REST"],
    cta: "Commencer",
    ctaHref: "/login",
  },
  {
    name: "Pro",
    price: "49€",
    period: "/mois",
    description: "Pour les equipes en croissance.",
    features: ["100 000 requetes/mois", "10 utilisateurs", "Support prioritaire", "API REST + Webhooks", "Analytics avances"],
    cta: "Essai 14 jours",
    ctaHref: "/login",
    featured: true,
    badge: "Populaire",
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    description: "Pour les grandes organisations.",
    features: ["requetes illimitees", "Utilisateurs illimites", "SLA garanti", "Support dedie 24/7", "SSO + SAML", "Audit logs"],
    cta: "Nous contacter",
    ctaHref: "/contact",
  },
];

const stats = [
  { value: "12k+",   label: "Clients actifs" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "180ms",  label: "Latence moyenne" },
  { value: "4.9/5",  label: "Note clients" },
];

const comparisonFeatures: PlanFeature[] = [
  { label: "Requetes/mois",      starter: "5 000",     pro: "100 000",   enterprise: "Illimite" },
  { label: "Utilisateurs",       starter: "1",         pro: "10",        enterprise: "Illimite" },
  { label: "API REST",           starter: true,        pro: true,        enterprise: true },
  { label: "Webhooks",           starter: false,       pro: true,        enterprise: true },
  { label: "Analytics avances",  starter: false,       pro: true,        enterprise: true },
  { label: "Support prioritaire",starter: false,       pro: true,        enterprise: true },
  { label: "SSO / SAML",        starter: false,       pro: false,       enterprise: true },
  { label: "SLA garanti",        starter: false,       pro: false,       enterprise: true },
  { label: "Audit logs",         starter: false,       pro: false,       enterprise: true },
];

const quotaItems = [
  { label: "Requetes API",      used: 78420,  limit: 100000 },
  { label: "Utilisateurs actifs", used: 7,    limit: 10 },
  { label: "Stockage",          used: 3200,   limit: 5000, unit: " Mo" },
  { label: "Webhooks envoyes",  used: 12400,  limit: 50000 },
];

const invoices: Invoice[] = [
  { id: "inv-1", number: "INV-2026-047", date: "1 juin 2026",  amountCents: 4900, status: "paid",  plan: "Pro" },
  { id: "inv-2", number: "INV-2026-031", date: "1 mai 2026",   amountCents: 4900, status: "paid",  plan: "Pro" },
  { id: "inv-3", number: "INV-2026-018", date: "1 avr. 2026",  amountCents: 4900, status: "paid",  plan: "Pro" },
  { id: "inv-4", number: "INV-2026-004", date: "1 mars 2026",  amountCents: 4900, status: "void",  plan: "Pro" },
];

const saasTestimonials = [
  { quote: "On a deploye en 3 jours. Le dashboard et le billing etaient deja la.", author: "Julie M.", role: "CTO, Startup B2B" },
  { quote: "Le boilerplate nous a economise 2 mois de dev sur la gestion des abonnements.", author: "Marc D.", role: "Fondateur, SaaS RH" },
  { quote: "API, quotas, upgrade modal — tout est inclus et fonctionnel. Impressionnant.", author: "Sara K.", role: "Lead Dev, Agence" },
];

export default function DemoSaaSPage() {
  return (
    <div data-theme="premium-saas">
      <HeroSection
        variant="centered"
        eyebrow="Nouveau — V3 disponible"
        title={<>La plateforme qui <span className="text-primary">simplifie</span> votre workflow.</>}
        description="Gagnez 10h/semaine. Integrez en 5 minutes. Sans carte de credit pour commencer."
        actions={
          <>
            <Button size="xl" variant="default" asChild>
              <Link href="/login">Essai gratuit 14 jours <ArrowRight className="size-4" /></Link>
            </Button>
            <Button size="xl" variant="soft" asChild>
              <Link href="/demo">Voir la demo</Link>
            </Button>
          </>
        }
        media={
          <div className="rounded-xl border bg-card p-6 text-left shadow-lg">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Apercu dashboard
            </p>
            <MetricGrid>
              <MetricCard label="MRR"               value="24 890 €"  trend={{ value: "+12% ce mois",      direction: "up" }} />
              <MetricCard label="Utilisateurs actifs" value="1 247"  trend={{ value: "+8% cette semaine",  direction: "up" }} />
              <MetricCard label="Churn rate"         value="1.2%"    trend={{ value: "-0.3%",              direction: "down" }} />
              <MetricCard label="Uptime"             value="99.99%"  trend={{ value: "Stable",             direction: "neutral" }} />
            </MetricGrid>
          </div>
        }
      />

      <StatsSection stats={stats} variant="strip" />
      <FeatureGrid
        eyebrow="Fonctionnalites"
        title="Tout ce dont vous avez besoin."
        features={features}
        columns={3}
        variant="cards"
      />

      {/* Subscription + Usage components */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-2 text-2xl font-semibold">Composants SaaS inclus</h2>
          <p className="mb-10 max-w-xl text-sm text-muted-foreground">
            Gestion d&apos;abonnement, quotas d&apos;usage et comparatif de plans — prets a brancher sur votre backend.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            <SubscriptionStatusCard
              plan="Pro"
              status="active"
              renewalDate="15 juillet 2026"
              onUpgrade={() => {}}
              onCancel={() => {}}
            />
            <SubscriptionStatusCard
              plan="Starter"
              status="trialing"
              trialEndsAt="30 juin 2026"
              onUpgrade={() => {}}
            />
            <SubscriptionStatusCard
              plan="Pro"
              status="past_due"
              onUpgrade={() => {}}
              onCancel={() => {}}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="min-w-0">
              <p className="mb-3 text-sm font-medium">UsageQuotaCard</p>
              <UsageQuotaCard items={quotaItems} />
            </div>
            <div className="min-w-0">
              <p className="mb-3 text-sm font-medium">PlanComparisonTable</p>
              <PlanComparisonTable
                features={comparisonFeatures}
                onSelect={() => {}}
              />
            </div>
          </div>

          {/* Billing + Actions */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2 border-t pt-10">
            <div>
              <p className="mb-3 text-sm font-medium">InvoiceList</p>
              <InvoiceList invoices={invoices} />
            </div>
            <div>
              <p className="mb-3 text-sm font-medium">UpgradeModal + CancelSubscriptionDialog</p>
              <p className="mb-4 text-xs text-muted-foreground">
                Modal de selection de plan avec paiement mock. Dialog de resiliation avec raison.
                Aucune cle Stripe requise en demo mode.
              </p>
              <SaasDemoActions />
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection eyebrow="Ils l&apos;ont lance avec ce boilerplate" title="Des equipes qui livrent plus vite." testimonials={saasTestimonials} />
      <PricingSection eyebrow="Tarifs" title="Simple et transparent." plans={plans} />

      <CTASection
        variant="dark"
        title="Pret a simplifier votre workflow ?"
        description="Rejoignez 12 000 equipes qui gagnent 10h/semaine."
        actions={
          <Button size="lg" className="theme-hero-btn-primary">
            Commencer maintenant <ArrowRight className="size-4" />
          </Button>
        }
      />
    </div>
  );
}
