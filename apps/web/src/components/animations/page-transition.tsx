"use client";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { EASE, DURATION } from "./motion";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps page content and fades it in on every route change.
 * Place it in a layout, wrapping {children} only (not toasts/banners).
 * Uses key={pathname} so Framer Motion mounts a fresh animation on each navigation.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      className={className ?? "flex flex-1 flex-col"}
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base * 0.75, ease: EASE.smooth }}
    >
      {children}
    </motion.div>
  );
}
