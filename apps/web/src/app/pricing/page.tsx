import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { createCheckoutSession } from "@/app/actions/billing";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Plans modulaires pour lancer un site vitrine, un portail API ou une plateforme avec reservations.",
};

type PricingPlan = {
  name: string;
  plan: "FREE" | "PRO" | "BUSINESS";
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href?: string;
  featured?: boolean;
};

const plans: PricingPlan[] = [
  {
    name: "Starter",
    plan: "FREE",
    price: "0 $",
    period: "/mois",
    description: "Pour tester le boilerplate et lancer une vitrine simple.",
    features: ["Pages marketing", "Demo booking", "Docs API", "Theme presets"],
    cta: "Commencer",
    href: "/login",
  },
  {
    name: "Pro",
    plan: "PRO",
    price: "49 $",
    period: "/mois",
    description: "Pour un projet client avec dashboard, reservations et facturation.",
    features: ["Dashboard admin", "Reservations", "Stripe Checkout", "Emails transactionnels", "Portail API"],
    cta: "Choisir Pro",
    featured: true,
  },
  {
    name: "Business",
    plan: "BUSINESS",
    price: "149 $",
    period: "/mois",
    description: "Pour une plateforme avec quotas, API payante et workflows avances.",
    features: ["Tout Pro", "Quotas API", "Audit logs", "Multi-roles", "Support prioritaire"],
    cta: "Choisir Business",
  },
];

export default function PricingPage() {
  return (
    <MarketingPageShell>
      <main>
        <section className="border-b theme-hero">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <Badge className="mb-5 border-background/20 bg-background/10 text-background">
              Tarifs modulaires
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Une base pour vendre, reserver et facturer.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 opacity-70">
              Choisis le niveau qui correspond au projet: vitrine, SaaS/API ou plateforme business.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.featured ? "border-primary shadow-md" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.featured && <Badge variant="soft">Populaire</Badge>}
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <ul className="grid gap-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {plan.href ? (
                    <Button asChild variant="outline" className="w-full">
                      <a href={plan.href}>
                        {plan.cta} <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <form action={createCheckoutSession}>
                      <input type="hidden" name="plan" value={plan.plan} />
                      <Button type="submit" className="w-full" variant={plan.featured ? "default" : "outline"}>
                        {plan.cta} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}
