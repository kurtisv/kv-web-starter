import * as React from "react";
import { cn } from "@/lib/utils";

export type FallbackVisualType = "phone" | "laptop" | "car" | "abstract";

const GRADIENTS: Record<FallbackVisualType, string> = {
  phone: "from-slate-900 via-blue-950 to-slate-900",
  laptop: "from-slate-900 via-indigo-950 to-slate-900",
  car: "from-zinc-900 via-red-950 to-zinc-900",
  abstract: "from-slate-900 via-blue-950 to-indigo-950",
};

const SHAPES: Record<FallbackVisualType, React.ReactNode> = {
  phone: (
    <div className="mx-auto h-32 w-16 rounded-2xl border-4 border-white/20 bg-white/5 shadow-xl">
      <div className="mt-2 h-1.5 w-8 mx-auto rounded-full bg-white/30" />
      <div className="mt-1 h-20 mx-1.5 rounded-lg bg-blue-500/20" />
      <div className="mt-2 h-1.5 w-6 mx-auto rounded-full bg-white/20" />
    </div>
  ),
  laptop: (
    <div className="mx-auto w-40">
      <div className="h-24 rounded-t-lg border-4 border-white/20 bg-blue-500/10">
        <div className="m-1 h-full rounded bg-blue-900/30" />
      </div>
      <div className="h-3 rounded-b border-4 border-t-0 border-white/10 bg-white/10" />
    </div>
  ),
  car: (
    <div className="mx-auto w-40">
      <div className="relative mx-8 h-10 rounded-t-2xl bg-white/10 border border-white/20" />
      <div className="h-8 rounded-sm bg-white/15 border border-white/20" />
      <div className="flex justify-between px-4 -mt-1">
        {[0, 1].map((i) => (
          <div key={i} className="h-5 w-5 rounded-full bg-white/20 border border-white/30" />
        ))}
      </div>
    </div>
  ),
  abstract: (
    <div className="relative mx-auto h-24 w-24">
      <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-[spin_8s_linear_infinite]" />
      <div className="absolute inset-2 rounded-full border-2 border-indigo-400/20 animate-[spin_6s_linear_infinite_reverse]" />
      <div className="absolute inset-4 rounded-lg bg-blue-500/20 border border-blue-400/30 rotate-45" />
    </div>
  ),
};

export interface FallbackVisualProps {
  type?: FallbackVisualType;
  label?: string;
  description?: string;
  className?: string;
}

export function FallbackVisual({
  type = "abstract",
  label,
  description,
  className,
}: FallbackVisualProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 overflow-hidden",
        "min-h-[260px] bg-gradient-to-br px-6 py-10",
        GRADIENTS[type],
        className
      )}
      role="img"
      aria-label={label ?? "3D visual (static fallback)"}
    >
      {SHAPES[type]}
      {label && <p className="mt-2 text-center text-sm font-semibold text-white/80">{label}</p>}
      {description && (
        <p className="text-center text-xs text-white/40">{description}</p>
      )}
    </div>
  );
}
