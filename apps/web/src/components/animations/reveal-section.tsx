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
  // Always render <motion.div> so the ref never changes between renders.
  // If we switch between <div> and <motion.div>, framer-motion's useInView
  // keeps observing the OLD unmounted element and inView stays false forever
  // — that is what locks sections at opacity:0 and makes the page look blank.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });

  // Three-value flag:
  //   null           — not yet measured (SSR + hydration): show content, no animation
  //   "above-fold"   — was visible at mount time: show content, no animation
  //   "below-fold"   — was off-screen at mount: apply scroll-in animation
  const [startPos, setStartPos] = useState<null | "above-fold" | "below-fold">(null);
  // When we snap a below-fold element to "hidden", use duration:0 for that one
  // transition so users never see a flash of content vanishing.
  const [snapTransition, setSnapTransition] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setStartPos("above-fold");
    } else {
      // Snap hidden instantly so content doesn't flash before disappearing
      setSnapTransition(true);
      setStartPos("below-fold");
      // One rAF later, restore normal transition timing for the scroll-in animation
      const id = requestAnimationFrame(() => setSnapTransition(false));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  // Compute the target animation state:
  // • not measured yet, or above fold → keep content visible at all times
  // • below fold → hide until inView fires
  const animate =
    startPos === "below-fold" ? (inView ? "visible" : "hidden") : "visible";

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={REVEAL_VARIANTS[variant]}
      // initial={false} = don't run the initial animation on mount;
      // content stays in whatever state `animate` says from the first render.
      initial={false}
      animate={animate}
      transition={
        snapTransition
          ? { duration: 0 }
          : { duration, delay, ease: EASE[ease] }
      }
    >
      {children}
    </motion.div>
  );
}
