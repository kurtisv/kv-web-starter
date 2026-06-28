"use client";

import { cn } from "@/lib/utils";

export interface ProductVariantOption {
  value: string;
  label: string;
  disabled?: boolean;
  swatch?: string;
}

interface VariantSelectorProps {
  label: string;
  value?: string;
  options: ProductVariantOption[];
  onChange?: (value: string) => void;
  className?: string;
}

export function VariantSelector({ label, value, options, onChange, className }: VariantSelectorProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <div className="text-sm font-medium">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled}
            aria-pressed={value === option.value}
            onClick={() => onChange?.(option.value)}
            className={cn(
              "inline-flex h-9 items-center gap-2 border px-3 text-sm transition-colors",
              value === option.value ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-muted",
              option.disabled && "cursor-not-allowed opacity-40"
            )}
          >
            {option.swatch && (
              <span className="h-3 w-3 rounded-full border" style={{ background: option.swatch }} aria-hidden />
            )}
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
