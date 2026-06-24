import Link from "next/link";
import { ArrowRight, Key } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";

const endpoints = [
  { method: "GET", path: "/v1/data", description: "Recuperer les donnees" },
  { method: "POST", path: "/v1/process", description: "Lancer un traitement" },
  { method: "GET", path: "/v1/status/:id", description: "Statut d'un job" },
  { method: "DELETE", path: "/v1/data/:id", description: "Supprimer une entree" },
];

const methodColors: Record<string, string> = {
  GET: "text-success",
  POST: "text-primary",
  DELETE: "text-destructive",
};

const plans = [
  {
    name: "Free",
    price: "0€",
    period: "/mois",
    description: "Pour explorer.",
    features: ["1 000 req/mois", "1 cle API", "Rate limit: 10 req/s", "Docs publiques"],
    cta: "Creer un compte",
    ctaHref: "/login",
  },
  {
    name: "Developer",
    price: "29€",
    period: "/mois",
    description: "Pour les projets serieux.",
    features: ["50 000 req/mois", "5 cles API", "Rate limit: 100 req/s", "Webhooks", "Support par email"],
    cta: "Commencer",
    ctaHref: "/login",
    featured: true,
    badge: "Recommande",
  },
  {
    name: "Business",
    price: "149€",
    period: "/mois",
    description: "Pour la production.",
    features: ["500 000 req/mois", "Cles illimitees", "Rate limit: 1000 req/s", "Webhooks + retries", "SLA 99.9%", "Support prioritaire"],
    cta: "Commencer",
    ctaHref: "/login",
  },
];

const stats = [
  { value: "99.9%", label: "Uptime" },
  { value: "80ms", label: "Latence p50" },
  { value: "2M+", label: "Req/jour" },
  { value: "ISO 27001", label: "Certification" },
];

export default function DemoAPIPage() {
  return (
    <div data-theme="dark-tech-api">
      <HeroSection
        variant="centered"
        eyebrow="v2.4.0 — changelog"
        title={<>Une API <span className="text-primary">robuste</span>. Une integration rapide.</>}
        description="REST JSON avec auth par cle API. Documentation auto-générée. SDKs Node, Python et Go disponibles."
        actions={
          <>
            <Button size="lg" variant="default">
              <Link href="/login" className="flex items-center gap-2">Obtenir une cle API <Key className="size-4" /></Link>
            </Button>
            <Button size="lg" variant="glass">
              <Link href="/developers">Voir la documentation</Link>
            </Button>
          </>
        }
        media={
          <div className="border rounded-lg bg-card p-5 text-left font-mono text-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
              <div className="h-2.5 w-2.5 rounded-full bg-warning" />
              <div className="h-2.5 w-2.5 rounded-full bg-success" />
              <span className="ml-2 text-xs text-muted-foreground">Terminal</span>
            </div>
            <pre className="text-xs leading-6 text-muted-foreground">
{`curl -X GET https://api.dataapi.io/v1/data \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"

# Response
{
  "data": [...],
  "total": 1247,
  "page": 1
}`}
            </pre>
          </div>
        }
      />

      <StatsSection stats={stats} variant="strip" />

      <section className="bg-background border-y">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold mb-2">Endpoints disponibles</h2>
          <p className="text-muted-foreground mb-8 text-sm">Base URL: <code className="font-mono bg-muted px-1.5 py-0.5">https://api.dataapi.io</code></p>
          <div className="grid gap-3">
            {endpoints.map((ep) => (
              <div key={ep.path} className="flex items-center gap-4 border rounded bg-card px-4 py-3 font-mono text-sm">
                <span className={`w-16 shrink-0 font-bold ${methodColors[ep.method] ?? "text-foreground"}`}>{ep.method}</span>
                <span className="text-muted-foreground">{ep.path}</span>
                <span className="ml-auto text-xs text-muted-foreground">{ep.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card border-b">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h3 className="text-lg font-semibold mb-6">Votre console</h3>
          <MetricGrid>
            <MetricCard label="Requetes ce mois" value="42,180" trend={{ value: "+18% vs mois dernier", direction: "up" }} />
            <MetricCard label="Latence p95" value="142ms" trend={{ value: "Stable", direction: "neutral" }} />
            <MetricCard label="Taux d'erreur" value="0.02%" trend={{ value: "-50% cette semaine", direction: "down" }} />
            <MetricCard label="Quota restant" value="57,820" description="sur 100 000 req/mois" />
          </MetricGrid>
        </div>
      </section>

      <PricingSection eyebrow="Plans" title="Payez ce que vous consommez." plans={plans} />

      <CTASection
        variant="dark"
        title="Integrez en moins de 10 minutes."
        description="Cle API générée en 30 secondes. Premiere requete en 5 minutes. Garantie."
        actions={
          <Button size="lg" variant="glass">
            <Link href="/login" className="flex items-center gap-2">Commencer gratuitement <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />
    </div>
  );
}
