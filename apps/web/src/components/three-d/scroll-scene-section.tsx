"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Mutable scroll progress (0 at section entry, 1 at exit). Read it inside
 * useFrame via `.current` -- it updates without re-rendering React. */
export type ScrollProgressRef = React.MutableRefObject<number>;

const ScrollSceneContext = React.createContext<ScrollProgressRef | null>(null);

/**
 * Read the enclosing ScrollSceneSection's progress (0..1). Returns a ref;
 * read `.current` per frame instead of subscribing, so scrolling never
 * causes React re-renders of the 3D tree.
 */
export function useScrollSceneProgress(): ScrollProgressRef {
  const ctx = React.useContext(ScrollSceneContext);
  const fallback = React.useRef(0);
  return ctx ?? fallback;
}

export interface ScrollSceneSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Also receive progress updates in React land (throttled to rAF) */
  onProgress?: (progress: number) => void;
  "aria-label"?: string;
}

/**
 * Section wrapper that tracks how far the section has moved through the
 * viewport (0 = just entering at the bottom, 1 = just leaving at the top)
 * and shares it via context for scroll-driven 3D scenes. Uses a passive
 * scroll listener + rAF, and writes into a ref so there is no re-render
 * per scroll tick. No scroll-jacking: native scrolling is untouched.
 */
export function ScrollSceneSection({
  children,
  className,
  onProgress,
  "aria-label": ariaLabel,
}: ScrollSceneSectionProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const progressRef = React.useRef(0);

  React.useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height + viewport;
      const advanced = viewport - rect.top;
      const progress = Math.min(1, Math.max(0, advanced / total));
      progressRef.current = progress;
      onProgress?.(progress);
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [onProgress]);

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel}
      className={cn("relative", className)}
    >
      <ScrollSceneContext.Provider value={progressRef}>
        {children}
      </ScrollSceneContext.Provider>
    </section>
  );
}
