"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  size = "sm",
  className,
}: QuantityStepperProps) {
  const btnCls =
    size === "sm"
      ? "h-7 w-7 text-xs"
      : "h-9 w-9 text-sm";
  const countCls =
    size === "sm"
      ? "w-8 text-xs"
      : "w-10 text-sm";

  return (
    <div
      className={cn("flex items-center border", className)}
      role="group"
      aria-label="Quantite"
    >
      <button
        type="button"
        aria-label="Diminuer"
        disabled={disabled || value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={cn(
          "flex shrink-0 items-center justify-center border-r text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
          btnCls
        )}
      >
        <Minus className="h-3 w-3" />
      </button>
      <span
        className={cn(
          "select-none text-center font-medium tabular-nums",
          countCls
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Augmenter"
        disabled={disabled || value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={cn(
          "flex shrink-0 items-center justify-center border-l text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
          btnCls
        )}
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}
