import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

import { createCheckoutSession } from "@/app/actions/billing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketingPageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Plans Starter, Pro et Business. Paiements Stripe, accès instantané, Annulation à tout moment.",
};

// ------------------------------------------------------------------ data

const plans = [
  {
    name: "Starter",
    price: "0",
    period: "pour toujours",
    description: "Idéal pour tester et pour les sites vitrines.",
    plan: null,
    cta: "Commencer gratuitement",
    ctaVariant: "secondary" as const,
    dark: false,
    features: [
      { label: "Site vitrine complet", included: true },
      { label: "Pages SEO optimisées", included: true },
      { label: "Formulaire de contact", included: true },
      { label: "Dashboard basique", included: true },
      { label: "1 utilisateur", included: true },
      { label: "Réservations en ligne", included: false },
      { label: "Paiements Stripe", included: false },
      { label: "Portail API", included: false },
      { label: "Emails automatiques", included: false },
    ],
  },
  {
    name: "Pro",
    price: "49",
    period: "par mois",
    description: "Pour les services avec réservation et dashboard complet.",
    plan: "PRO",
    cta: "Choisir Pro",
    ctaVariant: "default" as const,
    dark: true,
    badge: "Le plus populaire",
    features: [
      { label: "Tout le plan Starter", included: true },
      { label: "Réservations en ligne", included: true },
      { label: "Staff et services illimités", included: true },
      { label: "Paiements Stripe intégrés", included: true },
      { label: "Emails automatiques (Resend)", included: true },
      { label: "Dashboard complet", included: true },
      { label: "5 utilisateurs", included: true },
      { label: "Portail API", included: false },
      { label: "Clés API et scopes", included: false },
    ],
  },
  {
    name: "Business",
    price: "149",
    period: "par mois",
    description: "Pour les plateformes SaaS et les APIs monétisées.",
    plan: "BUSINESS",
    cta: "Choisir Business",
    ctaVariant: "secondary" as const,
    dark: false,
    features: [
      { label: "Tout le plan Pro", included: true },
      { label: "Portail API avec documentation", included: true },
      { label: "Clés API et scopes granulaires", included: true },
      { label: "Rate limiting par clé", included: true },
      { label: "Suivi d'utilisation en temps réel", included: true },
      { label: "Utilisateurs illimités", included: true },
      { label: "Webhooks configurés", included: true },
      { label: "Support prioritaire", included: true },
      { label: "SLA 99,9 % de disponibilité", included: true },
    ],
  },
];

const billingFaqs = [
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui. Aucun engagement. Tu gères ton abonnement directement depuis le portail client Stripe — annulation immédiate, sans frais.",
  },
  {
    q: "Y a-t-il une période d'essai ?",
    a: "Les nouvelles inscriptions Pro et Business bénéficient de 14 jours d'essai gratuits. Aucune carte requise pour commencer.",
  },
  {
    q: "Les paiements sont-ils sécurisés ?",
    a: "Les paiements passent par Stripe — la plateforme de référence utilisée par Amazon, Google et des millions d'entreprises. Nous ne stockons jamais les informations de carte.",
  },
];

// ------------------------------------------------------------------ page

export default function PricingPage() {
  return (
    <MarketingPageShell>
      <main>

        {/* Header */}
        <section className="border-b theme-hero">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center">
            <Badge className="mb-5 border-background/20 bg-background/10 text-background">Tarifs</Badge>
            <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Simple, transparent, sans surprise.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg opacity-70">
              Commence gratuitement. Passe au Pro quand tu as besoin des réservations.
              Business pour les plateformes API.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`flex flex-col ${plan.dark ? "bg-foreground text-background" : ""}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle
                      className={`text-lg ${plan.dark ? "text-background" : ""}`}
                    >
                      {plan.name}
                    </CardTitle>
                    {plan.badge && (
                      <Badge
                        className={
                          plan.dark
                            ? "border-background/30 bg-background/20 text-background"
                            : ""
                        }
                      >
                        {plan.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-4xl font-semibold">{plan.price} €</span>
                    <span
                      className={`mb-1 text-sm ${plan.dark ? "opacity-60" : "text-muted-foreground"}`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${plan.dark ? "opacity-70" : "text-muted-foreground"}`}
                  >
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-5">
                  <ul className="flex-1 grid gap-2">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-center gap-2.5 text-sm">
                        {f.included ? (
                          <CheckCircle2
                            className={`size-4 shrink-0 ${plan.dark ? "text-background" : "text-foreground"}`}
                          />
                        ) : (
                          <XCircle
                            className={`size-4 shrink-0 ${plan.dark ? "opacity-30" : "text-muted-foreground/40"}`}
                          />
                        )}
                        <span
                          className={
                            f.included
                              ? ""
                              : plan.dark
                                ? "opacity-40"
                                : "text-muted-foreground"
                          }
                        >
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.plan ? (
                    <form action={createCheckoutSession}>
                      <input type="hidden" name="plan" value={plan.plan} />
                      <Button
                        className={`w-full ${
                          plan.dark
                            ? "bg-background text-foreground hover:bg-background/90"
                            : ""
                        }`}
                        variant={plan.dark ? "default" : plan.ctaVariant}
                        type="submit"
                      >
                        {plan.cta} <ArrowRight className="size-4" />
                      </Button>
                    </form>
                  ) : (
                    <Button
                      asChild
                      variant="secondary"
                      className={plan.dark ? "bg-background/20 text-background hover:bg-background/30" : ""}
                    >
                      <Link href="/dashboard">{plan.cta}</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Tous les prix en EUR. Facturation mensuelle. Annulation à tout moment.
          </p>
        </section>

        {/* FAQ billing */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-3xl px-6 py-14">
            <h2 className="text-2xl font-semibold">Questions sur la facturation</h2>
            <div className="mt-6 grid gap-4">
              {billingFaqs.map((faq) => (
                <div key={faq.q} className="border bg-background p-5">
                  <div className="font-medium">{faq.q}</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                D&apos;autres questions ?{" "}
                <Link href="/contact" className="font-medium text-foreground underline underline-offset-2">
                  Contactez-nous
                </Link>
              </p>
            </div>
          </div>
        </section>

      </main>
    </MarketingPageShell>
  );
}
