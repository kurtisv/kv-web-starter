"use client";
import * as React from "react";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, DURATION, CONTAINER, ITEM } from "@/components/animations/motion";

interface Stat {
  value: string;
  label: string;
  description?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  variant?: "grid" | "strip" | "dark";
  className?: string;
}

// Static safeList — Tailwind JIT can detect these string literals at build time.
const SM_COLS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

const LG_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

export function StatsSection({ stats, variant = "grid", className }: StatsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();

  const animate = !reduced && isInView ? "visible" : "hidden";
  const initial = !reduced ? "hidden" : undefined;

  const count = Math.min(stats.length, 4) as 1 | 2 | 3 | 4;

  if (variant === "dark") {
    return (
      <section className={cn("theme-hero", className)}>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <motion.div
            ref={ref}
            className={cn(
              "grid gap-px border border-white/10 bg-white/10 grid-cols-2",
              SM_COLS[count],
            )}
            variants={CONTAINER}
            initial={initial}
            animate={animate}
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={ITEM}
                transition={{ duration: DURATION.reveal, ease: EASE.smooth }}
                className="bg-black/20 px-6 py-7"
              >
                <div className="text-4xl font-semibold" aria-label={`${s.value} ${s.label}`}>
                  {s.value}
                </div>
                <div className="mt-1 text-sm opacity-50" aria-hidden="true">{s.label}</div>
                {s.description && (
                  <div className="mt-1 text-xs opacity-40">{s.description}</div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  if (variant === "strip") {
    return (
      <section className={cn("border-y bg-muted/30", className)}>
        <div className="mx-auto max-w-6xl px-6 py-10">
          <motion.div
            ref={ref}
            className={cn("grid gap-8", SM_COLS[count])}
            variants={CONTAINER}
            initial={initial}
            animate={animate}
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={ITEM}
                transition={{ duration: DURATION.reveal, ease: EASE.smooth }}
                className="text-center"
              >
                <div className="text-3xl font-semibold" aria-label={`${s.value} ${s.label}`}>
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground" aria-hidden="true">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("bg-background", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <motion.div
          ref={ref}
          className={cn("grid gap-6 sm:grid-cols-2", LG_COLS[count])}
          variants={CONTAINER}
          initial={initial}
          animate={animate}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={ITEM}
              transition={{ duration: DURATION.reveal, ease: EASE.smooth }}
              className="border p-6"
            >
              <div className="text-4xl font-semibold" aria-label={`${s.value} ${s.label}`}>
                {s.value}
              </div>
              <div className="mt-2 text-sm font-medium" aria-hidden="true">{s.label}</div>
              {s.description && (
                <div className="mt-1 text-sm text-muted-foreground">{s.description}</div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
