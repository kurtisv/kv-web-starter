import * as React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

type StarState = "full" | "half" | "empty";

function buildStars(rating: number): StarState[] {
  const clamped = Math.max(0, Math.min(5, rating));
  const rounded = Math.round(clamped * 2) / 2;
  const full = Math.floor(rounded);
  const half = rounded % 1 === 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return [
    ...Array<StarState>(full).fill("full"),
    ...Array<StarState>(half).fill("half"),
    ...Array<StarState>(empty).fill("empty"),
  ];
}

export interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "xs" | "sm" | "md";
  showCount?: boolean;
  className?: string;
}

const SIZE_CLS = {
  xs: "h-3 w-3",
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
} as const;

const TEXT_CLS = {
  xs: "text-[10px]",
  sm: "text-xs",
  md: "text-sm",
} as const;

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
  className,
}: RatingStarsProps) {
  const stars = buildStars(rating);
  const iconCls = SIZE_CLS[size];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {stars.map((state, i) => {
          if (state === "full") {
            return (
              <Star
                key={i}
                className={cn(iconCls, "fill-warning text-warning")}
                aria-hidden
              />
            );
          }
          if (state === "half") {
            return (
              <StarHalf
                key={i}
                className={cn(iconCls, "fill-warning text-warning")}
                aria-hidden
              />
            );
          }
          return (
            <Star
              key={i}
              className={cn(iconCls, "fill-none text-muted-foreground/40")}
              aria-hidden
            />
          );
        })}
      </div>
      <span
        className={cn(TEXT_CLS[size], "font-medium tabular-nums")}
        aria-label={`${rating} sur 5`}
      >
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className={cn(TEXT_CLS[size], "text-muted-foreground")}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
