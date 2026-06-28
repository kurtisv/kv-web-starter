import * as React from "react";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoyaltyStampCardProps {
  businessName: string;
  stampsEarned: number;
  stampsTotal: number;
  rewardDescription: string;
  expiresLabel?: string;
}

export function LoyaltyStampCard({
  businessName,
  stampsEarned,
  stampsTotal,
  rewardDescription,
  expiresLabel,
}: LoyaltyStampCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-primary/30 bg-card p-6 shadow-sm">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5" />
      <div className="pointer-events-none absolute -left-4 -bottom-4 h-20 w-20 rounded-full bg-accent/10" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Carte fidelite
            </p>
            <p className="mt-0.5 text-lg font-semibold">{businessName}</p>
          </div>
          <Gift className="h-6 w-6 text-primary" />
        </div>

        {/* Stamps grid */}
        <div className="mt-5 flex flex-wrap gap-2.5">
          {Array.from({ length: stampsTotal }).map((_, i) => {
            const filled = i < stampsEarned;
            return (
              <div
                key={i}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-all",
                  filled
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30 bg-muted text-muted-foreground"
                )}
              >
                {filled ? "✓" : ""}
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {stampsEarned}/{stampsTotal} soins
            </span>
            <span className="font-medium text-primary">
              {stampsTotal - stampsEarned > 0
                ? `Plus que ${stampsTotal - stampsEarned} pour votre cadeau`
                : "Cadeau disponible !"}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(stampsEarned / stampsTotal) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-primary/8 px-4 py-3">
          <p className="text-xs font-medium text-primary">{rewardDescription}</p>
          {expiresLabel && (
            <p className="mt-0.5 text-xs text-muted-foreground">{expiresLabel}</p>
          )}
        </div>
      </div>
    </div>
  );
}
