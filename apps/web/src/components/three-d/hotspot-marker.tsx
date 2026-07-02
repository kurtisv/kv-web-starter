"use client";

import * as React from "react";
import { Html } from "@react-three/drei";
import { cn } from "@/lib/utils";

export interface HotspotMarkerProps {
  /** World position of the marker inside the scene */
  position: [number, number, number];
  /** Accessible name announced to screen readers */
  label: string;
  active?: boolean;
  onSelect?: () => void;
  /** Short index or glyph shown inside the dot (defaults to "+") */
  glyph?: string;
}

/**
 * In-scene hotspot rendered as a REAL DOM button (via drei Html), so it is
 * keyboard-focusable and screen-reader accessible, unlike a clickable mesh.
 * Pages should still render an HTML list of the same hotspots outside the
 * canvas so the information survives the no-WebGL fallback.
 */
export function HotspotMarker({
  position,
  label,
  active = false,
  onSelect,
  glyph = "+",
}: HotspotMarkerProps) {
  return (
    <Html position={position} center zIndexRange={[10, 0]}>
      <button
        type="button"
        aria-label={label}
        aria-pressed={active}
        onClick={onSelect}
        data-testid="three-d-hotspot"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold shadow-lg backdrop-blur-sm transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400",
          active
            ? "border-teal-300 bg-teal-400 text-slate-950"
            : "border-white/40 bg-slate-950/70 text-white hover:bg-slate-800/80"
        )}
      >
        {glyph}
      </button>
    </Html>
  );
}
