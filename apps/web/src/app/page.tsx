import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Globe,
  KeyRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketingPageShell } from "@/components/marketing/page-shell";

const useCases = [
  {
    icon: CalendarDays,
    title: "Prise de rendez-vous",
    description:
      "Tes clients reservent en ligne, payent au moment de la reservation, et recoivent une confirmation par email. Toi, tu vois tout dans ton dashboard.",
    href: "/booking",
    cta: "Voir la demo",
  },
  {
    icon: Globe,
    title: "Site vitrine professionnel",
    description:
      "Accueil, services, temoignages, FAQ, contact — toutes les pages dont un site pro a besoin sont deja construites. Tu personalises, tu livres.",
    href: "/services",
    cta: "Voir les services",
  },
  {
    icon: CreditCard,
    title: "SaaS avec abonnements",
    description:
      "Plans mensuels, paiements automatiques, portail client pour gerer l'abonnement. Le systeme de facturation est entierement configure.",
    href: "/pricing",
    cta: "Voir les plans",
  },
  {
    icon: KeyRound,
    title: "API avec acces payant",
    description:
      "Vends l'acces a tes donnees via des cles API securisees. Chaque appel est comptabilise, les limites sont appliquees automatiquement.",
    href: "/developers",
    cta: "Explorer l'API",
  },
];

const highlights = [
  "Connexion securisee integree",
  "Dashboard d'administration complet",
  "Paiements Stripe preconfigures",
  "Emails automatiques via Resend",
  "SEO optimise sur chaque page",
  "Navigation mobile incluse",
  "Bilingue francais et anglais",
  "Tests automatises fournis",
];

const stats = [
  { value: "4", label: "Modules" },
  { value: "2–5", label: "Jours pour livrer" },
  { value: "0", label: "Infrastructure a bâtir" },
  { value: "EN/FR", label: "Bilingue natif" },
];

export default function Home() {
  return (
    <MarketingPageShell>
      <main>

        {/* Hero — dark inverted section */}
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] opacity-50">
              KV Web Starter
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
              Livre ton prochain site en jours, pas en mois.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 opacity-70">
              Une base complete pour creer des sites avec reservations, paiements
              et portail API. Les fonctionnalites les plus longues a construire
              sont deja la.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link href="/docs">
                  Comprendre le projet <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-background/30 text-background hover:bg-background/10 hover:text-background"
              >
                <Link href="/dashboard">Voir le dashboard</Link>
              </Button>
            </div>

            {/* Stats strip */}
            <div className="mt-14 grid grid-cols-2 gap-px border border-background/10 bg-background/10 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-foreground px-6 py-5">
                  <div className="text-3xl font-semibold">{s.value}</div>
                  <div className="mt-1 text-sm opacity-50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Included */}
        <section className="border-b">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1fr_0.6fr] lg:items-start">
            <div>
              <Badge className="mb-5">Ce qu&apos;on peut construire</Badge>
              <h2 className="text-3xl font-semibold tracking-normal">
                4 types de projets, une seule base.
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Active les modules dont tu as besoin. Le reste reste cache
                et n&apos;encombre pas ton projet.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {useCases.map((uc) => (
                  <Card key={uc.title} className="flex flex-col">
                    <CardHeader>
                      <div className="flex size-9 items-center justify-center border bg-background">
                        <uc.icon className="size-4" />
                      </div>
                      <CardTitle className="text-base">{uc.title}</CardTitle>
                      <CardDescription className="text-sm">{uc.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-0">
                      <Button asChild variant="secondary" size="sm">
                        <Link href={uc.href}>
                          {uc.cta} <ArrowRight className="size-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="border bg-muted/30 p-6 lg:sticky lg:top-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Inclus dans la base
              </p>
              <ul className="grid gap-2.5">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Pret a livrer ton prochain projet ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg opacity-70">
              Clone la base, active les modules dont tu as besoin, personnalise — et livre en jours.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                <Link href="/docs">
                  Lire le guide <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-background/30 text-background hover:bg-background/10 hover:text-background">
                <Link href="/overview">Voir l&apos;architecture</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
    </MarketingPageShell>
  );
}
