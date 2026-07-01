import * as React from "react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";

export function formatPrice(
  cents: number,
  currency = "EUR",
  locale = "fr-FR"
): string {
  return formatCurrency(cents, {
    currency,
    locale,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export interface PriceDisplayProps {
  priceCents: number;
  originalPriceCents?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  showDiscount?: boolean;
  className?: string;
}

const SIZE_CLASSES = {
  sm: { price: "text-sm font-semibold", original: "text-xs", badge: "text-[10px]" },
  md: { price: "text-base font-semibold", original: "text-sm", badge: "text-xs" },
  lg: { price: "text-xl font-bold", original: "text-base", badge: "text-xs" },
} as const;

export function PriceDisplay({
  priceCents,
  originalPriceCents,
  currency = "EUR",
  size = "md",
  showDiscount = true,
  className,
}: PriceDisplayProps) {
  const cls = SIZE_CLASSES[size];
  const hasDiscount = originalPriceCents !== undefined && originalPriceCents > priceCents;
  const discountPct = hasDiscount
    ? Math.round((1 - priceCents / originalPriceCents!) * 100)
    : 0;

  return (
    <div className={cn("flex flex-wrap items-baseline gap-1.5", className)}>
      <span className={cls.price}>{formatPrice(priceCents, currency)}</span>
      {hasDiscount && (
        <>
          <span className={cn(cls.original, "text-muted-foreground line-through")}>
            {formatPrice(originalPriceCents!, currency)}
          </span>
          {showDiscount && discountPct > 0 && (
            <span
              className={cn(
                cls.badge,
                "rounded bg-destructive/10 px-1 py-0.5 font-medium text-destructive"
              )}
            >
              -{discountPct}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
