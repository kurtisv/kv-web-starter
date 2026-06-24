import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  KeyRound,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketingPageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Portail développeur",
  description:
    "Intégrez l'API KV Web Starter. Clés d'accès, scopes, rate limiting, documentation interactive.",
};

const endpoints = [
  {
    method: "GET",
    path: "/api/health",
    auth: false,
    description: "Statut du service et timestamp. Aucune auth requise.",
  },
  {
    method: "GET",
    path: "/api/v1/demo",
    auth: true,
    description: "Endpoint de demonstration. Retourne les metadonnees de la cle utilisee.",
  },
  {
    method: "GET",
    path: "/api/v1/scores",
    auth: true,
    description: "Exemple de donnees métier (a personnaliser par projet).",
  },
  {
    method: "POST",
    path: "/api/auth/callback/:provider",
    auth: false,
    description: "Callback OAuth. Gere par Auth.js automatiquement.",
  },
];

const authMethods = [
  {
    name: "Header Authorization",
    example: 'Authorization: Bearer kvk_xxxxxxxxxxxxxxxx',
    description: "Methode recommandee. Compatible avec tous les clients HTTP.",
  },
  {
    name: "Header x-api-key",
    example: 'x-api-key: kvk_xxxxxxxxxxxxxxxx',
    description: "Alternative si Authorization est reserve par un proxy.",
  },
];

const scopes = [
  { name: "demo:read", desc: "Accès aux endpoints de demonstration" },
  { name: "scores:read", desc: "Lecture des donnees de score" },
  { name: "bookings:read", desc: "Lecture des Réservations" },
  { name: "bookings:write", desc: "Creer et modifier des Réservations" },
  { name: "admin:*", desc: "Accès complet (plan Enterprise)" },
];

const limits = [
  { plan: "Starter", calls: "100 / jour", burst: "10 / min" },
  { plan: "Pro", calls: "10 000 / jour", burst: "100 / min" },
  { plan: "Business", calls: "100 000 / jour", burst: "500 / min" },
  { plan: "Enterprise", calls: "Illimite", burst: "Illimite" },
];

const codeExamples = {
  curl: `curl https://api.exemple.com/api/v1/demo \\
  -H "Authorization: Bearer kvk_xxxxxxxxxxxxxxxx"`,
  node: `const res = await fetch('https://api.exemple.com/api/v1/demo', {
  headers: {
    'Authorization': 'Bearer kvk_xxxxxxxxxxxxxxxx'
  }
});
const data = await res.json();`,
  python: `import requests

r = requests.get(
    'https://api.exemple.com/api/v1/demo',
    headers={'Authorization': 'Bearer kvk_xxxxxxxxxxxxxxxx'}
)
print(r.json())`,
};

export default function DevelopersPage() {
  return (
    <MarketingPageShell>
      <main>

        {/* Hero */}
        <section className="border-b theme-hero">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <Badge className="mb-5 border-background/20 bg-background/10 text-background">
              Portail développeur
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              intégré l&apos;API en quelques minutes.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 opacity-70">
              Cles d&apos;Accès securisees, scopes granulaires, rate limiting automatique
              et documentation interactive. Tout est pret.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="theme-hero-btn-primary"
              >
                <Link href="/dashboard/api-keys">
                  Creer une cle API <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-background/30 text-background hover:bg-background/10 hover:text-background"
              >
                <Link href="/docs/api">
                  <Code2 className="size-4" />
                  Reference complete
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick start */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <Badge>Demarrage rapide</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal">
            Ton premier appel en 3 etapes.
          </h2>
          <div className="mt-8 grid gap-4">
            {[
              {
                n: "1",
                title: "Creer un compte et generer une cle",
                body: "Connecte-toi au dashboard, va dans API Keys, et genere une cle. Elle apparait une seule fois — copie-la immediatement.",
                link: "/dashboard/api-keys",
                linkLabel: "Generer une cle",
              },
              {
                n: "2",
                title: "Faire ton premier appel",
                body: "Utilise la cle dans le header Authorization. L'endpoint /api/v1/demo est disponible sans configuration supplementaire.",
                link: null,
                linkLabel: null,
              },
              {
                n: "3",
                title: "Verifier la réponse",
                body: "La réponse inclut le statut, les metadonnees de la cle, et les scopes actifs. Si tu obtiens 401, la cle est invalide ou les scopes sont insuffisants.",
                link: null,
                linkLabel: null,
              },
            ].map((step) => (
              <div
                key={step.n}
                className="grid gap-4 border bg-background p-6 md:grid-cols-[auto_1fr]"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
                  {step.n}
                </div>
                <div>
                  <div className="font-medium">{step.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                  {step.link && (
                    <Button asChild variant="secondary" size="sm" className="mt-3">
                      <Link href={step.link}>
                        {step.linkLabel} <ArrowRight className="size-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code examples */}
        <section className="border-y bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge>Exemples de code</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">
              Dans tous les langages.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {Object.entries(codeExamples).map(([lang, code]) => (
                <Card key={lang}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
                      <Code2 className="size-3.5" />
                      {lang}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="overflow-x-auto bg-foreground p-4 text-xs leading-relaxed text-background">
                      <code>{code}</code>
                    </pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Auth */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <Badge>Authentification</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal">
            2 methodes d&apos;authentification.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {authMethods.map((method) => (
              <Card key={method.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lock className="size-4" />
                    {method.name}
                  </CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="overflow-x-auto border bg-muted/50 p-3 text-xs">
                    <code>{method.example}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 border bg-muted/30 p-5">
            <p className="text-sm font-medium">réponses d&apos;erreur courantes</p>
            <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {[
                { code: "401", msg: "Cle absente, invalide ou revoquee" },
                { code: "403", msg: "Scope insuffisant pour cet endpoint" },
                { code: "429", msg: "Limite de quota atteinte pour ce plan" },
              ].map((err) => (
                <div key={err.code} className="flex gap-3">
                  <code className="w-8 shrink-0 font-mono font-medium text-foreground">{err.code}</code>
                  <span>{err.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="border-y bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge>Endpoints disponibles</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">
              Routes de l&apos;API.
            </h2>
            <div className="mt-8 grid gap-2">
              {endpoints.map((ep) => (
                <div
                  key={ep.path}
                  className="flex flex-wrap items-center gap-4 border bg-background px-5 py-4"
                >
                  <span
                    className={`w-12 shrink-0 text-center text-xs font-semibold ${
                      ep.method === "GET"
                        ? "text-emerald-600"
                        : ep.method === "POST"
                          ? "text-blue-600"
                          : "text-amber-600"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <code className="flex-1 text-sm font-mono">{ep.path}</code>
                  <Badge className={`text-xs ${ep.auth ? "" : "bg-muted text-muted-foreground"}`}>
                    {ep.auth ? "Auth requise" : "Public"}
                  </Badge>
                  <span className="w-full text-sm text-muted-foreground md:w-auto md:flex-1">
                    {ep.description}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Button asChild variant="secondary">
                <Link href="/docs/api">
                  Voir la reference complete <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Scopes */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <Badge>Scopes</Badge>
              <h2 className="mt-4 text-2xl font-semibold tracking-normal">
                Permissions granulaires.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Chaque cle peut avoir des scopes differents. Une cle de lecture
                ne peut pas ecrire. Une cle demo ne peut pas acceder aux donnees prod.
              </p>
              <div className="mt-6 grid gap-2">
                {scopes.map((scope) => (
                  <div key={scope.name} className="flex gap-3 border bg-background px-4 py-3">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="text-sm font-medium">{scope.name}</code>
                      <p className="text-xs text-muted-foreground">{scope.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Badge>Rate limiting</Badge>
              <h2 className="mt-4 text-2xl font-semibold tracking-normal">
                Quotas par plan.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Les limites sont appliquees automatiquement via Upstash Redis.
                Les headers de réponse indiquent le quota restant.
              </p>
              <div className="mt-6 border">
                <div className="grid grid-cols-3 border-b bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <span>Plan</span>
                  <span>Par jour</span>
                  <span>Par minute</span>
                </div>
                {limits.map((l) => (
                  <div
                    key={l.plan}
                    className="grid grid-cols-3 border-b bg-background px-4 py-3 text-sm last:border-b-0"
                  >
                    <span className="font-medium">{l.plan}</span>
                    <span className="text-muted-foreground">{l.calls}</span>
                    <span className="text-muted-foreground">{l.burst}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Headers renvoyés : <code>X-RateLimit-Limit</code>, <code>X-RateLimit-Remaining</code>
              </p>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="border-y bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge>Securite</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">
              Securite integree, zero configuration.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Lock, title: "Cles hashees SHA-256", desc: "La valeur en clair n'est jamais stockee. Si la DB fuite, les cles sont inutilisables." },
                { icon: Zap, title: "Rate limiting edge", desc: "Limite par cle ET par IP. Appliquee avant meme que le code métier s'execute." },
                { icon: ShieldCheck, title: "Scopes valides cote serveur", desc: "Chaque route verifie les scopes independamment. Pas de confiance implicite." },
                { icon: CheckCircle2, title: "Journaux d'audit", desc: "Chaque utilisation de cle est enregistree avec timestamp, IP et endpoint." },
                { icon: Code2, title: "Validation Zod", desc: "Tous les inputs sont valides par un schema Zod avant traitement." },
                { icon: KeyRound, title: "Revocation instantanee", desc: "Une cle revoquee est invalidee immediatement. Pas de cache TTL a attendre." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 border bg-background px-4 py-4">
                  <item.icon className="mt-0.5 size-4 shrink-0" />
                  <div>
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold tracking-normal">
            Pret a integrer ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Connecte-toi au dashboard, genere une cle, et fais ton premier appel.
            La documentation interactive te permet de tester sans quitter le navigateur.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/dashboard/api-keys">
                Generer une cle <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/docs/api">Documentation complete</Link>
            </Button>
          </div>
        </section>

      </main>
    </MarketingPageShell>
  );
}
