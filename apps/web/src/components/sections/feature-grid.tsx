"use client";
import * as React from "react";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, type CardProps } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { EASE, DURATION, CONTAINER, ITEM } from "@/components/animations/motion";

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
  variant?: "cards" | "list" | "icon-left" | "spotlight";
  /** Card variant used for the "cards" variant. Defaults to "default". */
  cardVariant?: CardProps["variant"];
  className?: string;
}

export function FeatureGrid({
  eyebrow,
  title,
  description,
  features,
  columns = 3,
  variant = "cards",
  cardVariant = "default",
  className,
}: FeatureGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const reduced = useReducedMotion();

  const animate = !reduced && isInView ? "visible" : "hidden";
  const initial = !reduced ? "hidden" : undefined;

  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section ref={ref} className={cn("bg-background", className)}>
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
          <motion.div
            className={cn("grid gap-4", colClass)}
            variants={CONTAINER}
            initial={initial}
            animate={animate}
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={ITEM} transition={{ duration: DURATION.reveal, ease: EASE.smooth }}>
                <Card variant={cardVariant} className="flex flex-col h-full">
                  <CardHeader>
                    {f.icon && (
                      <div
                        className="mb-2 flex h-10 w-10 items-center justify-center rounded-md border bg-muted text-muted-foreground"
                        aria-hidden="true"
                      >
                        {f.icon}
                      </div>
                    )}
                    <CardTitle className="text-base">{f.title}</CardTitle>
                    <CardDescription>{f.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {variant === "spotlight" && (
          <motion.div
            className={cn("grid gap-4", colClass)}
            variants={CONTAINER}
            initial={initial}
            animate={animate}
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={ITEM} transition={{ duration: DURATION.reveal, ease: EASE.smooth }} className="h-full">
                <SpotlightCard className="flex flex-col h-full">
                  <div className="flex flex-col gap-3 p-5 h-full">
                    {f.icon && (
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted text-muted-foreground"
                        aria-hidden="true"
                      >
                        {f.icon}
                      </div>
                    )}
                    <p className="text-base font-semibold">{f.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {variant === "icon-left" && (
          <motion.div
            className={cn("grid gap-8", colClass)}
            variants={CONTAINER}
            initial={initial}
            animate={animate}
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={ITEM} transition={{ duration: DURATION.reveal, ease: EASE.smooth }} className="flex gap-4">
                {f.icon && (
                  <div
                    className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-muted text-muted-foreground"
                    aria-hidden="true"
                  >
                    {f.icon}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{f.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {variant === "list" && (
          <motion.ul
            className="mx-auto max-w-2xl grid gap-4"
            variants={CONTAINER}
            initial={initial}
            animate={animate}
          >
            {features.map((f, i) => (
              <motion.li key={i} variants={ITEM} transition={{ duration: DURATION.reveal, ease: EASE.smooth }} className="flex items-start gap-3 border-b pb-4 last:border-0">
                {f.icon && <span className="mt-0.5 text-primary" aria-hidden="true">{f.icon}</span>}
                <div>
                  <p className="font-medium">{f.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{f.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
