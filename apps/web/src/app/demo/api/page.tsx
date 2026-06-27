import Link from "next/link";
import { ArrowRight, Key } from "lucide-react";

import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EndpointList } from "@/components/api-portal/endpoint-row";
import { CodeTabsBlock } from "@/components/api-portal/code-tabs-block";
import { ScopePill } from "@/components/api-portal/scope-pill";
import { ApiKeyDisplay } from "@/components/api-portal/api-key-display";
import type { EndpointDef, CodeTab } from "@/components/api-portal";

const endpoints: EndpointDef[] = [
  { method: "GET",    path: "/v1/data",        auth: false, description: "Liste paginee des ressources" },
  { method: "POST",   path: "/v1/process",     auth: true,  description: "Lancer un traitement asynchrone" },
  { method: "GET",    path: "/v1/status/:id",  auth: true,  description: "Statut et logs d'un job" },
  { method: "DELETE", path: "/v1/data/:id",    auth: true,  description: "Supprimer une entree" },
  { method: "PATCH",  path: "/v1/data/:id",    auth: true,  description: "Mise a jour partielle" },
];

const codeTabs: CodeTab[] = [
  {
    label: "cURL",
    language: "bash",
    code: `curl https://api.dataapi.io/v1/data \\
  -H "Authorization: Bearer kvk_live_xxxxxxxxxxxx"`,
  },
  {
    label: "Node.js",
    language: "javascript",
    code: `const res = await fetch('https://api.dataapi.io/v1/data', {
  headers: { 'Authorization': 'Bearer kvk_live_xxxxxxxxxxxx' }
});
const data = await res.json();`,
  },
  {
    label: "Python",
    language: "python",
    code: `import requests

r = requests.get(
    'https://api.dataapi.io/v1/data',
    headers={'Authorization': 'Bearer kvk_live_xxxxxxxxxxxx'}
)
print(r.json())`,
  },
];

const scopes = ["data:read", "data:write", "jobs:read", "jobs:execute", "admin:*"];

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
  { value: "80ms",  label: "Latence p50" },
  { value: "2M+",   label: "Req/jour" },
  { value: "ISO 27001", label: "Certification" },
];

export default function DemoAPIPage() {
  return (
    <div data-theme="dark-tech-api">
      <HeroSection
        variant="split"
        eyebrow="v2.4.0 — changelog"
        title={<>Une API <span className="text-primary">robuste</span>. Une integration en minutes.</>}
        description="REST JSON avec auth par cle API. Documentation interactive. SDKs Node, Python et Go inclus."
        actions={
          <>
            <Button size="lg" variant="default" asChild>
              <Link href="/login">Obtenir une cle API <Key className="size-4" /></Link>
            </Button>
            <Button size="lg" variant="glass" asChild>
              <Link href="/developers">Portail developpeur <ArrowRight className="size-4" /></Link>
            </Button>
          </>
        }
        media={<CodeTabsBlock tabs={codeTabs} className="text-xs" />}
      />

      <StatsSection stats={stats} variant="strip" />

      {/* Endpoints */}
      <section className="bg-background border-y">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="mb-2 flex items-center gap-3">
            <h2 className="text-2xl font-semibold">Endpoints</h2>
            <Badge variant="outline" size="sm">REST JSON</Badge>
          </div>
          <p className="text-muted-foreground mb-8 text-sm">
            Base URL:{" "}
            <code className="font-mono bg-muted px-1.5 py-0.5 text-xs">https://api.dataapi.io</code>
          </p>
          <EndpointList endpoints={endpoints} />
          <div className="mt-6 text-right">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/developers">
                Voir la documentation complete <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Developer portal preview */}
      <section className="bg-card border-b">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Portail developpeur integre</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Gestion des cles, scopes et usage — directement dans le dashboard.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/developers">Explorer <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* API key preview */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Cle d&apos;acces
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Production</p>
                  <ApiKeyDisplay prefix="kvk_live_a1b2c3d4" />
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Developpement</p>
                  <ApiKeyDisplay prefix="kvk_test_e5f6g7h8" />
                </div>
              </CardContent>
            </Card>

            {/* Scopes preview */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Permissions (scopes)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {scopes.map((s) => (
                    <ScopePill key={s} scope={s} />
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Chaque cle peut etre limitee a un sous-ensemble de permissions granulaires.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <PricingSection eyebrow="Plans" title="Payez ce que vous consommez." plans={plans} />

      <CTASection
        variant="dark"
        title="Integrez en moins de 10 minutes."
        description="Cle API generee en 30 secondes. Premiere requete en 5 minutes. Garantie."
        actions={
          <Button size="lg" variant="glass" asChild>
            <Link href="/login">Commencer gratuitement <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />
    </div>
  );
}
