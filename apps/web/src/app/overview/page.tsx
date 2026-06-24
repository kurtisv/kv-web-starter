import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Code2,
  CreditCard,
  Globe,
  KeyRound,
  Layers,
  Shield,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { LiveApiDemo } from "./_components/live-api-demo";

export const metadata: Metadata = {
  title: "Comment ca marche",
  description:
    "Architecture, modules et demo interactive du boilerplate KV Web Starter. Next.js, Auth.js, Stripe, Prisma.",
};

// ------------------------------------------------------------------ data

const archLayers = [
  {
    label: "Edge",
    sublabel: "Middleware Next.js",
    color: "border-l-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    items: ["Auth.js JWT check", "CSP / security headers", "Rate limiting Upstash"],
  },
  {
    label: "App",
    sublabel: "App Router (Server Components)",
    color: "border-l-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    items: ["Pages + Layouts", "Server Actions", "API Routes /v1/*"],
  },
  {
    label: "Data",
    sublabel: "Prisma 7 + PostgreSQL",
    color: "border-l-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    items: ["Schemas types", "Migrations versionnees", "AuditLog securite"],
  },
  {
    label: "Services",
    sublabel: "Externes — optionnels",
    color: "border-l-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    items: ["Stripe (billing)", "Resend (emails)", "Sentry (erreurs)"],
  },
];

const modules = [
  {
    icon: Globe,
    title: "Site vitrine",
    flag: null,
    href: "/",
    description: "Pages marketing, SEO complet, sections reutilisables, formulaire de contact Resend.",
    features: [
      "Metadata par page (Open Graph)",
      "Sitemap.xml automatique",
      "Contact form → Resend",
      "Composants hero, services, temoignages",
      "Support CMS Sanity (optionnel)",
    ],
  },
  {
    icon: CalendarDays,
    title: "Reservations",
    flag: "FEATURE_BOOKING=true",
    href: "/booking",
    description: "Services, staff, disponibilites, exceptions, paiements et confirmation par email.",
    features: [
      "Slots calcules en temps reel",
      "Staff et horaires par service",
      "Exceptions et jours feries",
      "Paiement Stripe integre",
      "Emails de confirmation automatiques",
    ],
  },
  {
    icon: KeyRound,
    title: "API payante",
    flag: "FEATURE_API_PORTAL=true",
    href: "/developers",
    description: "Cles API hashees, scopes, plans Stripe, limites de quota et docs OpenAPI/Scalar.",
    features: [
      "Cles API hashees (SHA-256)",
      "Scopes granulaires par cle",
      "Rate limiting Upstash par cle",
      "Suivi des appels en DB",
      "Docs interactives via Scalar",
    ],
  },
  {
    icon: CreditCard,
    title: "Billing SaaS",
    flag: "FEATURE_BILLING=true",
    href: "/pricing",
    description: "Plans Stripe, webhooks, Customer Portal, entitlements et suivi des subscriptions.",
    features: [
      "PRO / BUSINESS / ENTERPRISE",
      "Webhooks synchronises avec Prisma",
      "Customer Portal integre",
      "Trial et grace period",
      "Entitlements par plan",
    ],
  },
];

const requestFlow = [
  { step: "1", label: "Client envoie GET /api/v1/scores?postal_code=H1A", who: "client" },
  { step: "2", label: "Middleware verifie le JWT ou l'Authorization Bearer", who: "edge" },
  { step: "3", label: "Rate limit Upstash verifie le quota de la cle API", who: "edge" },
  { step: "4", label: "Route handler valide les params Zod et charge le user", who: "app" },
  { step: "5", label: "Server Action interroge Prisma, incremente ApiUsage", who: "app" },
  { step: "6", label: "Reponse JSON + headers Cache-Control", who: "client" },
];

const stack = [
  { name: "Next.js 16", desc: "App Router, Server Components, Server Actions" },
  { name: "TypeScript strict", desc: "Zod validation partout aux frontieres" },
  { name: "Prisma 7", desc: "ORM type-safe, PrismaAdapter + pg driver" },
  { name: "Auth.js v5", desc: "JWT strategy, GitHub OAuth, demo login" },
  { name: "Stripe", desc: "Checkout, webhooks, Customer Portal" },
  { name: "Resend", desc: "Emails transactionnels et templates" },
  { name: "Upstash Redis", desc: "Rate limiting edge-compatible REST API" },
  { name: "Sentry", desc: "Error tracking + performance monitoring" },
  { name: "next-intl", desc: "i18n bilingue EN/FR, server + client" },
  { name: "Vitest", desc: "Tests unitaires coloques avec le code" },
  { name: "Playwright", desc: "Tests E2E full-browser" },
  { name: "Sonner", desc: "Toast notifications accessibles" },
];

// ------------------------------------------------------------------ page

export default function OverviewPage() {
  return (
    <MarketingPageShell>
      <main>

        {/* Hero */}
        <section className="border-b theme-hero">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
            <Badge className="mb-5 border-background/20 bg-background/10 text-background">Vue d&apos;ensemble</Badge>
            <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Un boilerplate professionnel.<br />
              Pret en quelques minutes.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 opacity-70">
              KV Web Starter est une base Next.js modulaire : active les modules dont tu as besoin,
              ignore le reste. Sites vitrines, reservations, API payantes ou SaaS complet.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="theme-hero-btn-primary">
                <Link href="/dashboard">
                  Ouvrir le dashboard <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-background/30 text-background hover:bg-background/10">
                <Link href="/docs">
                  <BookOpen className="size-4" />
                  Lire le guide
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { n: "4", label: "Modules" },
                { n: "35+", label: "Fichiers prets" },
                { n: "EN/FR", label: "Bilingue" },
                { n: "0", label: "Dette technique" },
              ].map((s) => (
                <div key={s.label} className="border border-background/20 bg-background/10 p-4 text-center">
                  <div className="text-2xl font-semibold">{s.n}</div>
                  <div className="mt-1 text-sm opacity-60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <Badge>Architecture</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal">
            4 couches, 0 magie cachee.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Chaque requete traverse les couches dans l&apos;ordre. Tu sais exactement ce qui se passe
            avant d&apos;ecrire la premiere ligne de code metier.
          </p>

          {/* Layer diagram */}
          <div className="mt-8 grid gap-2">
            {/* Arrow from browser down */}
            <div className="flex items-center gap-4 border bg-background px-5 py-4">
              <div className="flex size-9 shrink-0 items-center justify-center border bg-muted">
                <Globe className="size-4" />
              </div>
              <div>
                <div className="text-sm font-medium">Navigateur / Client</div>
                <div className="text-xs text-muted-foreground">Requete HTTP entrante</div>
              </div>
            </div>
            <div className="ml-4 h-4 w-px bg-border" />
            {archLayers.map((layer, i) => (
              <div key={layer.label}>
                <div
                  className={`border-l-4 ${layer.color} ${layer.bg} border px-5 py-4`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold">{layer.label}</div>
                      <div className="text-xs text-muted-foreground">{layer.sublabel}</div>
                    </div>
                    <ul className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground sm:gap-x-8">
                      {layer.items.map((item) => (
                        <li key={item} className="flex items-center gap-1.5">
                          <CheckCircle2 className="size-3 shrink-0 text-foreground/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {i < archLayers.length - 1 && (
                  <div className="ml-4 h-2 w-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Modules */}
        <section className="border-y bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge>Modules</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">
              Active uniquement ce dont tu as besoin.
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Chaque module est controle par une variable d&apos;environnement. Les pages et
              routes inutiles restent dormantes — zero code mort expose en production.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {modules.map((mod) => (
                <Card key={mod.title} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center border bg-background">
                        <mod.icon className="size-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{mod.title}</CardTitle>
                        {mod.flag && (
                          <code className="mt-0.5 block text-[10px] text-muted-foreground">
                            {mod.flag}
                          </code>
                        )}
                      </div>
                    </div>
                    <CardDescription className="mt-1 text-sm">
                      {mod.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <ul className="grid gap-2 text-sm text-muted-foreground">
                      {mod.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-foreground/60" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <Button asChild variant="secondary" size="sm" className="w-full">
                        <Link href={mod.href}>
                          Voir la page <ArrowRight className="size-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <Badge>Demo interactive</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal">
            Essayer en direct.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Appels reels vers le serveur Next.js — pas de mock. Observe la reponse JSON,
            le temps de reponse, et les headers renvoyes par le middleware.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <LiveApiDemo />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Code2 className="size-4" />
                  Docs API interactives
                </CardTitle>
                <CardDescription>
                  Scalar UI genere depuis le schema OpenAPI du projet. Teste
                  les endpoints directement dans le navigateur.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="border bg-muted/40 p-4 text-sm text-muted-foreground">
                  <div className="font-mono text-xs">GET  /api/v1/demo</div>
                  <div className="font-mono text-xs">GET  /api/v1/scores</div>
                  <div className="font-mono text-xs">POST /api/v1/bookings</div>
                  <div className="mt-2 text-xs opacity-60">
                    Authentification : Bearer &lt;api-key&gt;
                  </div>
                </div>
                <Button asChild variant="secondary">
                  <Link href="/docs/api">
                    Ouvrir la reference API <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Request flow */}
        <section className="border-y bg-secondary/30">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge>Flux d&apos;une requete</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">
              De l&apos;API key au JSON — chaque etape.
            </h2>
            <div className="mt-8 grid gap-2">
              {requestFlow.map((s) => (
                <div key={s.step} className="flex items-start gap-4 border bg-background px-5 py-4">
                  <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${
                      s.who === "edge"
                        ? "bg-blue-500"
                        : s.who === "app"
                          ? "bg-violet-500"
                          : "bg-muted-foreground"
                    }`}
                  >
                    {s.step}
                  </div>
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                    <span className="text-sm">{s.label}</span>
                    <Badge className="shrink-0 text-xs">
                      {s.who === "edge" ? "Edge" : s.who === "app" ? "App" : "Client"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <Badge>Securite</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal">
            Protection activee par defaut.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "CSP strict",
                desc: "Content-Security-Policy injecte sur chaque reponse par le middleware.",
              },
              {
                icon: ShieldCheck,
                title: "Auth edge-safe",
                desc: "Verification JWT en middleware — sans Prisma, sans latence DB.",
              },
              {
                icon: Zap,
                title: "Rate limiting",
                desc: "Upstash Redis par IP sur /api/auth/*. Soft-fail si non configure.",
              },
              {
                icon: Layers,
                title: "AuditLog",
                desc: "Toutes les actions sensibles (signIn, checkout, export) tracees en DB.",
              },
              {
                icon: KeyRound,
                title: "Cles hashees",
                desc: "Les cles API sont stockees en SHA-256. La valeur en clair n'est affichee qu'une fois.",
              },
              {
                icon: CheckCircle2,
                title: "Env valide",
                desc: "Zod valide toutes les variables d'env au demarrage. Pas de crash silencieux.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <item.icon className="size-4" />
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-y bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge>Stack technique</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">
              Des choix opiniones et maintenables.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stack.map((tech) => (
                <div key={tech.name} className="flex gap-3 border bg-background px-4 py-3">
                  <div className="mt-0.5 size-2 shrink-0 rounded-full bg-foreground" />
                  <div>
                    <div className="text-sm font-medium">{tech.name}</div>
                    <div className="text-xs text-muted-foreground">{tech.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold tracking-normal">
            Pret a commencer ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Clone le boilerplate, configure les variables d&apos;env, et lance le serveur.
            Le dashboard est accessible en quelques minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Ouvrir le dashboard <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/docs">
                Guide complet
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/pricing">
                Voir les plans
              </Link>
            </Button>
          </div>
        </section>

      </main>
    </MarketingPageShell>
  );
}
