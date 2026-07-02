import * as React from "react";
import { cn } from "@/lib/utils";

export interface ThreeDLoaderProps {
  label?: string;
  className?: string;
}

/**
 * Lightweight DOM loading state shown while the 3D scene initialises.
 * Pure CSS (respects prefers-reduced-motion via the motion-safe variant),
 * no three.js imports.
 */
export function ThreeDLoader({
  label = "Chargement de la scene 3D",
  className,
}: ThreeDLoaderProps) {
  return (
    <div
      data-testid="three-d-loader"
      role="status"
      aria-label={label}
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-white/20 border-t-teal-400/80 motion-safe:animate-spin" />
        <span className="text-xs text-white/50">{label}</span>
      </div>
    </div>
  );
}
