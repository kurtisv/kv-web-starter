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

export function StatsSection({ stats, variant = "grid", className }: StatsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();

  const animate = !reduced && isInView ? "visible" : "hidden";
  const initial = !reduced ? "hidden" : undefined;

  if (variant === "dark") {
    return (
      <section className={cn("theme-hero", className)}>
        <div className="mx-auto max-w-6xl px-6 py-14">
          <motion.div
            ref={ref}
            className={`grid gap-px bg-white/10 border border-white/10 grid-cols-2 sm:grid-cols-${Math.min(stats.length, 4)}`}
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
                <div className="text-4xl font-semibold">{s.value}</div>
                <div className="mt-1 text-sm opacity-50">{s.label}</div>
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
            className={`grid gap-8 sm:grid-cols-${Math.min(stats.length, 4)}`}
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
                <div className="text-3xl font-semibold">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
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
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-${Math.min(stats.length, 4)}`}
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
              <div className="text-4xl font-semibold">{s.value}</div>
              <div className="mt-2 text-sm font-medium">{s.label}</div>
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
