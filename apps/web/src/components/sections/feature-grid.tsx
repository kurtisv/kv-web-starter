import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureGridProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: "cards" | "list" | "icon-left";
  className?: string;
}

export function FeatureGrid({
  eyebrow,
  title,
  description,
  features,
  columns = 3,
  variant = "cards",
  className,
}: FeatureGridProps) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

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
            {description && (
              <p className="mt-4 text-base text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        {variant === "cards" && (
          <div className={cn("grid gap-4", colClass)}>
            {features.map((f, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader>
                  {f.icon && (
                    <div className="mb-2 flex h-10 w-10 items-center justify-center border bg-muted text-muted-foreground">
                      {f.icon}
                    </div>
                  )}
                  <CardTitle className="text-base">{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {variant === "icon-left" && (
          <div className={cn("grid gap-8", colClass)}>
            {features.map((f, i) => (
              <div key={i} className="flex gap-4">
                {f.icon && (
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border bg-muted text-muted-foreground">
                    {f.icon}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{f.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {variant === "list" && (
          <ul className="mx-auto max-w-2xl grid gap-4">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 border-b pb-4 last:border-0">
                {f.icon && <span className="mt-0.5 text-primary">{f.icon}</span>}
                <div>
                  <p className="font-medium">{f.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{f.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
