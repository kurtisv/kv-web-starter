"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import { PRODUCT_HOTSPOTS } from "./product-showroom-data";

export interface ProductHotspotListProps {
  activeHotspotId: string | null;
  onHotspotSelect: (id: string) => void;
  className?: string;
}

/**
 * DOM twin of the in-scene hotspot markers. This list is the accessible
 * source of truth: it works without WebGL, without a pointer, and under
 * reduced motion. Selecting an item highlights the matching 3D marker.
 */
export function ProductHotspotList({
  activeHotspotId,
  onHotspotSelect,
  className,
}: ProductHotspotListProps) {
  return (
    <ol
      data-testid="product-hotspot-list"
      className={cn("grid gap-2", className)}
    >
      {PRODUCT_HOTSPOTS.map((h) => {
        const active = activeHotspotId === h.id;
        return (
          <li key={h.id}>
            <button
              type="button"
              aria-expanded={active}
              onClick={() => onHotspotSelect(h.id)}
              className={cn(
                "w-full rounded-lg border px-4 py-3 text-left transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                active
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {h.index}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {h.title}
                </span>
              </span>
              {active ? (
                <span className="mt-2 block pl-9 text-sm text-muted-foreground">
                  {h.body}
                </span>
              ) : null}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
