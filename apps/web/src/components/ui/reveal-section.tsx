"use client";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Per-variant initial/visible states
const MOTION_VARIANTS: Record<string, Variants> = {
  "fade-up": {
    hidden:  { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-left": {
    hidden:  { opacity: 0, x: -56 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden:  { opacity: 0, x: 56 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-in": {
    hidden:  { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  "none": {
    hidden:  {},
    visible: {},
  },
};

// Easing curves
const EASE = {
  smooth:  [0.25, 0.1, 0.25, 1]  as [number, number, number, number],
  spring:  [0.34, 1.56, 0.64, 1] as [number, number, number, number], // slight overshoot
  decel:   [0.0,  0.0,  0.2,  1] as [number, number, number, number],
};

type RevealVariant = keyof typeof MOTION_VARIANTS;

interface RevealSectionProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;       // seconds — stagger items by passing i * 0.06
  duration?: number;    // seconds, default 0.55
  ease?: keyof typeof EASE;
  className?: string;
  once?: boolean;       // default true — don't re-animate on scroll back
  threshold?: number;   // 0..1, fraction of element visible before triggering
}

export function RevealSection({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.55,
  ease = "smooth",
  className,
  once = true,
  threshold = 0.12,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={MOTION_VARIANTS[variant]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: EASE[ease] }}
    >
      {children}
    </motion.div>
  );
}
