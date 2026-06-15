import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref?: string;
  featured?: boolean;
  badge?: string;
}

interface PricingSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  plans: PricingPlan[];
  className?: string;
}

export function PricingSection({ eyebrow, title, description, plans, className }: PricingSectionProps) {
  return (
    <section className={cn("bg-background", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {(eyebrow || title || description) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {eyebrow && (
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>}
            {description && <p className="mt-4 text-base text-muted-foreground">{description}</p>}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              variant={plan.featured ? "premium" : "default"}
              className={cn("flex flex-col", plan.featured && "border-primary")}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {plan.name}
                  </p>
                  {plan.badge && <Badge variant="soft">{plan.badge}</Badge>}
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-6">
                <ul className="grid gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button
                    asChild={!!plan.ctaHref}
                    variant={plan.featured ? "default" : "outline"}
                    className="w-full"
                  >
                    {plan.ctaHref ? (
                      <a href={plan.ctaHref}>{plan.cta}</a>
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
