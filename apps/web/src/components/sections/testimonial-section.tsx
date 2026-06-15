import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  avatar?: React.ReactNode;
}

interface TestimonialSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  testimonials: Testimonial[];
  variant?: "grid" | "centered";
  className?: string;
}

export function TestimonialSection({
  eyebrow,
  title,
  testimonials,
  variant = "grid",
  className,
}: TestimonialSectionProps) {
  if (variant === "centered" && testimonials[0]) {
    const t = testimonials[0];
    return (
      <section className={cn("bg-muted/40 border-y", className)}>
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
          {eyebrow && (
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <blockquote className="text-2xl font-semibold leading-snug tracking-tight">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            {t.avatar && <div className="h-9 w-9 overflow-hidden rounded-full border">{t.avatar}</div>}
            <div className="text-left">
              <p className="text-sm font-semibold">{t.author}</p>
              {t.role && <p className="text-xs text-muted-foreground">{t.role}</p>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("bg-background", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {(eyebrow || title) && (
          <div className="mb-10 text-center">
            {eyebrow && (
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} variant="flat" className="bg-muted/40 border">
              <CardContent className="p-6">
                <blockquote className="text-sm leading-7">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-2.5">
                  {t.avatar && (
                    <div className="h-8 w-8 overflow-hidden rounded-full border">{t.avatar}</div>
                  )}
                  <div>
                    <p className="text-sm font-semibold">{t.author}</p>
                    {t.role && <p className="text-xs text-muted-foreground">{t.role}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
