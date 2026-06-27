"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

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

const EASE = {
  smooth:  [0.25, 0.1, 0.25, 1]  as [number, number, number, number],
  spring:  [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  decel:   [0.0,  0.0,  0.2,  1] as [number, number, number, number],
};

type RevealVariant = keyof typeof MOTION_VARIANTS;

interface RevealSectionProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  ease?: keyof typeof EASE;
  className?: string;
  once?: boolean;
  threshold?: number;
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

  // Avoid hydration mismatch: on first server render the div is plain (no inline
  // style). Only apply Framer Motion initial="hidden" AFTER the client has mounted.
  // This means no flash of invisible content on hard refresh.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Before mount: render a plain div that matches the SSR output exactly.
  // After mount: switch to motion.div — React treats this as a re-render, not
  // a hydration mismatch, because useEffect runs client-only.
  if (!mounted) {
    return <div ref={ref} className={cn(className)}>{children}</div>;
  }

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
