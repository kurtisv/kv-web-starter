"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, DURATION, REVEAL_VARIANTS } from "./motion";

export type RevealVariant = keyof typeof REVEAL_VARIANTS;

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
  duration = DURATION.reveal,
  ease = "smooth",
  className,
  once = true,
  threshold = 0.12,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });

  // Avoid hydration mismatch: only apply Framer Motion after client mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div ref={ref} className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={REVEAL_VARIANTS[variant]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: EASE[ease] }}
    >
      {children}
    </motion.div>
  );
}
