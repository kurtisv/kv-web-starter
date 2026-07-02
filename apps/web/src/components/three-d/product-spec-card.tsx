import * as React from "react";
import { cn } from "@/lib/utils";

import type { ProductSpec } from "./product-showroom-data";

export interface ProductSpecCardProps {
  spec: ProductSpec;
  className?: string;
}

/** Server-renderable spec tile: label, headline value, supporting detail. */
export function ProductSpecCard({ spec, className }: ProductSpecCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5",
        className
      )}
    >
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {spec.label}
      </dt>
      <dd className="mt-1">
        <span className="text-2xl font-semibold text-foreground">
          {spec.value}
        </span>
        <span className="mt-1 block text-xs text-muted-foreground">
          {spec.detail}
        </span>
      </dd>
    </div>
  );
}
