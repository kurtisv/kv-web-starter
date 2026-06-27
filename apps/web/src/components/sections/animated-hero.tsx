"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { THEME_META } from "@/design-system/tokens";

interface AnimatedHeroProps {
  eyebrow?: string;
  // Pass title as a string — it will be split into words and animated individually
  title: string;
  description: ReactNode;
  actions: ReactNode;
  showSwatches?: boolean;
}

// Spring config shared by word reveals
const WORD_SPRING = {
  type: "spring" as const,
  damping: 28,
  stiffness: 120,
  mass: 0.6,
};

export function AnimatedHero({
  eyebrow,
  title,
  description,
  actions,
  showSwatches = true,
}: AnimatedHeroProps) {
  const words = title.split(" ");

  // Total animation duration so downstream elements can start after words land
  const wordsDuration = words.length * 0.045 + 0.3;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* Eyebrow */}
      {eyebrow && (
        <motion.p
          className="mb-5 text-sm font-medium uppercase tracking-[0.18em] opacity-50"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {eyebrow}
        </motion.p>
      )}

      {/* Title — word by word */}
      <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            style={{ marginRight: "0.28em" }}
            initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ ...WORD_SPRING, delay: 0.08 + i * 0.045 }}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Description */}
      <motion.p
        className="mt-7 max-w-2xl text-lg leading-8 opacity-75"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 0.75, y: 0 }}
        transition={{ duration: 0.6, delay: wordsDuration, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {description}
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        className="mt-9 flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: wordsDuration + 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {actions}
      </motion.div>

      {/* Theme accent swatches */}
      {showSwatches && (
        <motion.div
          className="mt-14 space-y-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: wordsDuration + 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs opacity-30 uppercase tracking-widest">7 themes visuels</p>
          <div className="flex gap-2">
            {(Object.entries(THEME_META) as [string, typeof THEME_META[keyof typeof THEME_META]][]).map(([id, meta]) => (
              <div key={id} className="group relative flex-1">
                <div
                  className="h-2 w-full rounded-sm transition-all group-hover:h-3"
                  style={{ background: meta.accent }}
                />
                <span className="absolute top-3 left-0 hidden text-[10px] opacity-50 leading-tight whitespace-nowrap lg:group-hover:block">
                  {meta.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
