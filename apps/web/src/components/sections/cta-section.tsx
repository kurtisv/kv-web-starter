import * as React from "react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: "default" | "dark" | "muted" | "border" | "gradient";
  className?: string;
}

export function CTASection({
  eyebrow,
  title,
  description,
  actions,
  variant = "default",
  className,
}: CTASectionProps) {
  const base = "text-center";

  if (variant === "dark") {
    return (
      <section className={cn("theme-hero", base, className)}>
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          {eyebrow && (
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] opacity-50">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          {description && <p className="mx-auto mt-4 max-w-xl text-lg opacity-70">{description}</p>}
          {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
        </div>
      </section>
    );
  }

  if (variant === "gradient") {
    return (
      <section
        className={cn(
          "bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10",
          base,
          className,
        )}
      >
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          {eyebrow && (
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{description}</p>
          )}
          {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
        </div>
      </section>
    );
  }

  if (variant === "muted") {
    return (
      <section className={cn("border-y bg-muted/40", base, className)}>
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          {eyebrow && (
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{description}</p>
          )}
          {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
        </div>
      </section>
    );
  }

  if (variant === "border") {
    return (
      <section className={cn("bg-background", base, className)}>
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="border p-6 sm:p-10">
            {eyebrow && (
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
            {description && (
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{description}</p>
            )}
            {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("bg-background", base, className)}>
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {eyebrow && (
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{description}</p>
        )}
        {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
      </div>
    </section>
  );
}
