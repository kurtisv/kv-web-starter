"use client";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, DURATION } from "./motion";

interface AnimatedFormFieldsProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

/**
 * Staggers the entrance of each direct child (typically FormField blocks).
 * Wrap your form's fields with this to get a sequential slide-in effect on mount.
 *
 * Usage:
 *   <AnimatedFormFields>
 *     <FormField>...</FormField>
 *     <FormField>...</FormField>
 *     <Button>Submit</Button>
 *   </AnimatedFormFields>
 */
export function AnimatedFormFields({
  children,
  staggerDelay = 0.07,
  className = "grid gap-4",
}: AnimatedFormFieldsProps) {
  const reduced = useReducedMotion();
  const items = React.Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, i) => (
        <motion.div
          key={i}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: DURATION.base, delay: i * staggerDelay, ease: EASE.smooth }
          }
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
