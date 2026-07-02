import { cn } from "@/lib/utils";

interface FunnelStep {
  step: string;
  count: number;
}

interface BookingFunnelCardProps {
  steps: FunnelStep[];
  className?: string;
}

export function BookingFunnelCard({ steps, className }: BookingFunnelCardProps) {
  const maxCount = steps[0]?.count ?? 1;

  return (
    <div className={cn("rounded-xl border bg-card p-5 shadow-sm", className)}>
      <p className="mb-4 text-sm font-medium">Entonnoir de reservation</p>
      <div className="space-y-3">
        {steps.map((step, i) => {
          const pct = maxCount > 0 ? Math.round((step.count / maxCount) * 100) : 0;
          const convRate = i > 0 && steps[i - 1]!.count > 0
            ? Math.round((step.count / steps[i - 1]!.count) * 100)
            : 100;
          return (
            <div key={step.step}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-muted-foreground">{step.step}</p>
                <div className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="text-xs text-muted-foreground">{convRate}%</span>
                  )}
                  <span className="text-xs font-medium tabular-nums">{step.count.toLocaleString("fr-FR")}</span>
                </div>
              </div>
              <div
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${step.step}: ${pct}%`}
                className="relative h-2 w-full rounded-full bg-muted"
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-primary/70 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
