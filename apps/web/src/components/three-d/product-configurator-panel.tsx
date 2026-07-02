"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import {
  PRODUCT_COLORS,
  PRODUCT_MATERIALS,
  type ProductColorOption,
  type ProductMaterialOption,
} from "./product-showroom-data";

export interface ProductConfiguratorPanelProps {
  color: ProductColorOption;
  material: ProductMaterialOption;
  onColorChange: (color: ProductColorOption) => void;
  onMaterialChange: (material: ProductMaterialOption) => void;
  className?: string;
}

/**
 * DOM configurator for the showroom: colour swatches + material choices.
 * Real buttons with visible focus; state lives in the page-level client
 * component so the 3D scene and this panel stay in sync.
 */
export function ProductConfiguratorPanel({
  color,
  material,
  onColorChange,
  onMaterialChange,
  className,
}: ProductConfiguratorPanelProps) {
  return (
    <div
      data-testid="product-configurator"
      className={cn("flex flex-col gap-6", className)}
    >
      <fieldset>
        <legend className="text-sm font-medium text-foreground">Couleur</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {PRODUCT_COLORS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-label={`Couleur ${option.label}`}
              aria-pressed={color.id === option.id}
              onClick={() => onColorChange(option)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                color.id === option.id
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-4 w-4 rounded-full border border-black/20",
                  option.swatchClass
                )}
              />
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-foreground">Materiau</legend>
        <div className="mt-3 grid gap-2">
          {PRODUCT_MATERIALS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={material.id === option.id}
              onClick={() => onMaterialChange(option)}
              className={cn(
                "rounded-lg border px-4 py-3 text-left transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                material.id === option.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              )}
            >
              <span className="block text-sm font-medium text-foreground">
                {option.label}
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
