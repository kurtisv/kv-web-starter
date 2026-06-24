import Link from "next/link";
import { ArrowRight, BarChart2, Lock, Zap, Globe, Clock, Shield } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PricingSection } from "@/components/sections/pricing-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";

const features = [
  { icon: <Zap className="h-5 w-5" />, title: "Ultra rapide", description: "Traitement en moins de 200ms. Cache intelligent sur toutes les requetes." },
  { icon: <Lock className="h-5 w-5" />, title: "Securite enterprise", description: "SOC2, chiffrement AES-256, audit logs complets et SSO disponible." },
  { icon: <BarChart2 className="h-5 w-5" />, title: "Analytics integre", description: "Tableaux de bord en temps reel. Export CSV/JSON a tout moment." },
  { icon: <Globe className="h-5 w-5" />, title: "Multi-region", description: "Deploy dans 12 regions. Failover automatique sous 30 secondes." },
  { icon: <Clock className="h-5 w-5" />, title: "99.99% uptime", description: "SLA garanti. Incidents publics en temps reel sur status.votresaas.com." },
  { icon: <Shield className="h-5 w-5" />, title: "RGPD ready", description: "Hebergement EU, DPA disponible, droit a l'oubli automatise." },
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
    features: ["Requetes illimitees", "Utilisateurs illimites", "SLA garanti", "Support dedie 24/7", "SSO + SAML", "Audit logs"],
    cta: "Nous contacter",
    ctaHref: "/contact",
  },
];

const stats = [
  { value: "12k+", label: "Clients actifs" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "180ms", label: "Latence moyenne" },
  { value: "4.9/5", label: "Note clients" },
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
            <Button size="xl" variant="default">
              <Link href="/login" className="flex items-center gap-2">Essai gratuit 14 jours <ArrowRight className="size-4" /></Link>
            </Button>
            <Button size="xl" variant="soft">
              <Link href="/demo">Voir la demo</Link>
            </Button>
          </>
        }
        media={
          <div className="border rounded-xl bg-card shadow-lg p-6 text-left">
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide font-medium">Apercu dashboard</p>
            <MetricGrid>
              <MetricCard label="MRR" value="€24,890" trend={{ value: "+12% ce mois", direction: "up" }} />
              <MetricCard label="Utilisateurs actifs" value="1,247" trend={{ value: "+8% cette semaine", direction: "up" }} />
              <MetricCard label="Churn rate" value="1.2%" trend={{ value: "-0.3%", direction: "down" }} />
              <MetricCard label="Uptime" value="99.99%" trend={{ value: "Stable", direction: "neutral" }} />
            </MetricGrid>
          </div>
        }
      />

      <StatsSection stats={stats} variant="strip" />
      <FeatureGrid eyebrow="Fonctionnalites" title="Tout ce dont vous avez besoin." features={features} columns={3} variant="cards" />
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
