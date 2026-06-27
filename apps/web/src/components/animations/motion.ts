import type { Variants } from "framer-motion";

export const EASE = {
  smooth: [0.25, 0.1,  0.25, 1]  as [number, number, number, number],
  sharp:  [0.22, 1,    0.36, 1]  as [number, number, number, number],
  spring: [0.34, 1.56, 0.64, 1]  as [number, number, number, number],
  decel:  [0.0,  0.0,  0.2,  1]  as [number, number, number, number],
} as const;

export const SPRING = {
  default: { type: "spring" as const, damping: 28, stiffness: 120, mass: 0.6 },
  bouncy:  { type: "spring" as const, damping: 20, stiffness: 200, mass: 0.5 },
  word:    { type: "spring" as const, damping: 28, stiffness: 120, mass: 0.6 },
} as const;

export const DURATION = {
  fast:   0.2,
  base:   0.4,
  reveal: 0.55,
  slow:   0.7,
} as const;

export const STAGGER_DELAY = {
  fast:    0.05,
  default: 0.08,
  slow:    0.12,
} as const;

// Shared variant maps for container / item stagger patterns.
// Import these in section components to avoid duplicating the same values.
export const CONTAINER: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: STAGGER_DELAY.default, delayChildren: 0.04 } },
};

export const ITEM: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE.smooth } },
};

export const REVEAL_VARIANTS: Record<string, Variants> = {
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
