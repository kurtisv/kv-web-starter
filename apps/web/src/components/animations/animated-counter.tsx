"use client";
import { useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE } from "./motion";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!isInView || !ref.current) return;
    if (reduced) {
      ref.current.textContent = value + suffix;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.5,
      ease: EASE.sharp,
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return controls.stop;
  }, [isInView, reduced, value, suffix]);

  return (
    <span ref={inViewRef}>
      <span ref={ref}>0{suffix}</span>
    </span>
  );
}
