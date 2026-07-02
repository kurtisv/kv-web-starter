"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import { useWebGLSupport } from "../3d/core/webgl-guard";
import {
  useIsSmallViewport,
  usePrefersReducedMotion,
} from "./three-d-canvas";

export interface PerformanceBadgeProps {
  className?: string;
}

/**
 * Small DOM pill announcing which rendering tier the visitor is getting.
 * Useful on demo pages to make the adaptive behaviour visible and honest.
 */
export function PerformanceBadge({ className }: PerformanceBadgeProps) {
  const webgl = useWebGLSupport();
  const small = useIsSmallViewport();
  const reduced = usePrefersReducedMotion();

  let label: string;
  let tone: string;
  if (webgl === null) {
    label = "Detection...";
    tone = "border-white/20 text-white/50";
  } else if (!webgl) {
    label = "Mode statique (sans WebGL)";
    tone = "border-amber-400/40 text-amber-300";
  } else if (reduced) {
    label = "Animations reduites";
    tone = "border-sky-400/40 text-sky-300";
  } else if (small) {
    label = "3D optimisee mobile";
    tone = "border-teal-400/40 text-teal-300";
  } else {
    label = "3D haute qualite";
    tone = "border-teal-400/40 text-teal-300";
  }

  return (
    <span
      data-testid="three-d-performance-badge"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-slate-950/60 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm",
        tone,
        className
      )}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
