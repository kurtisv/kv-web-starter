"use client";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, DURATION } from "./motion";

export function AnimatedHeroText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, delay: 0.3 + i * 0.07, ease: EASE.sharp }}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
