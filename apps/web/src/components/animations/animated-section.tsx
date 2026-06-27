"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { EASE, DURATION } from "./motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
};

export function AnimatedSection({ children, className, delay = 0, direction = "up" }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  const initial = reduced
    ? { opacity: 1, y: 0, x: 0 }
    : {
        opacity: 0,
        y: direction === "up" ? 28 : 0,
        x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
      };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={reduced ? { duration: 0 } : { duration: DURATION.reveal, delay, ease: EASE.sharp }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedStagger({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={cn(className)}>
      {(children as React.ReactNode[]).map((child, i) => (
        <motion.div
          key={i}
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={reduced ? { duration: 0 } : { duration: DURATION.reveal, delay: i * staggerDelay, ease: EASE.sharp }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
