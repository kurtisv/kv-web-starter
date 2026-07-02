import * as React from "react";
import { cn } from "@/lib/utils";

export type ThreeDFallbackVariant = "product" | "landing" | "abstract";

const VARIANT_GRADIENTS: Record<ThreeDFallbackVariant, string> = {
  product: "from-slate-950 via-slate-900 to-indigo-950",
  landing: "from-slate-950 via-indigo-950 to-slate-900",
  abstract: "from-slate-900 via-blue-950 to-indigo-950",
};

const VARIANT_SHAPES: Record<ThreeDFallbackVariant, React.ReactNode> = {
  product: (
    <div className="relative mx-auto h-28 w-28">
      <div className="absolute inset-0 rounded-3xl border border-white/15 bg-white/5 shadow-2xl" />
      <div className="absolute inset-x-6 top-4 h-2 rounded-full bg-teal-400/40" />
      <div className="absolute inset-x-4 bottom-4 top-10 rounded-2xl bg-gradient-to-br from-teal-500/20 to-indigo-500/10 border border-white/10" />
    </div>
  ),
  landing: (
    <div className="relative mx-auto h-28 w-40">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-xl border border-white/15 bg-white/5 shadow-xl"
          style={{
            inset: `${i * 12}px ${i * 16}px`,
            transform: `translateY(${i * -6}px)`,
            background: `linear-gradient(135deg, rgba(45,212,191,${0.08 + i * 0.05}), rgba(99,102,241,${0.06 + i * 0.04}))`,
          }}
        />
      ))}
    </div>
  ),
  abstract: (
    <div className="relative mx-auto h-24 w-24">
      <div className="absolute inset-0 rounded-full border-2 border-teal-400/30" />
      <div className="absolute inset-3 rounded-full border-2 border-indigo-400/20" />
      <div className="absolute inset-6 rounded-lg bg-teal-500/20 border border-teal-400/30 rotate-45" />
    </div>
  ),
};

export interface ThreeDFallbackProps {
  variant?: ThreeDFallbackVariant;
  /** Accessible label describing what the 3D scene would have shown */
  label?: string;
  /** Optional supporting text rendered under the shape */
  description?: string;
  className?: string;
  "data-testid"?: string;
}

/**
 * Pure HTML/CSS stand-in for a 3D scene. Rendered when WebGL is unavailable,
 * when the scene crashes, or (if chosen by the page) under reduced motion.
 * No three.js imports: safe to render anywhere, including server components.
 */
export function ThreeDFallback({
  variant = "abstract",
  label = "Apercu statique de la scene 3D",
  description,
  className,
  "data-testid": testId = "three-d-fallback",
}: ThreeDFallbackProps) {
  return (
    <div
      role="img"
      aria-label={label}
      data-testid={testId}
      className={cn(
        "relative flex min-h-[280px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-gradient-to-br p-8",
        VARIANT_GRADIENTS[variant],
        className
      )}
    >
      {VARIANT_SHAPES[variant]}
      {description ? (
        <p className="max-w-sm text-center text-sm text-white/60">{description}</p>
      ) : null}
    </div>
  );
}
