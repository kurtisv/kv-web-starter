import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Section } from "@/components/marketing/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  { name: "Starter", price: "$0", description: "Base vitrine et experimentation." },
  { name: "Pro", price: "$49", description: "Booking, dashboard et emails." },
  { name: "Business", price: "$149", description: "API portal, billing et usage." },
];

export default function PricingPage() {
  return (
    <MarketingPageShell>
      <Section>
        <h1 className="text-4xl font-semibold">Pricing</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Plans exemples pour les futurs projets SaaS/API.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.name === "Pro" ? <Badge>Populaire</Badge> : null}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{plan.price}</p>
                <p className="mt-3 min-h-12 text-sm text-muted-foreground">{plan.description}</p>
                <Button className="mt-6 w-full">Choisir</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </MarketingPageShell>
  );
}
