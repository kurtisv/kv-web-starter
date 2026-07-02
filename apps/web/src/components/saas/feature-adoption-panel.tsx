import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DEMO_FEATURE_ADOPTION } from "@/lib/demo-data/saas-demo-data";

export function FeatureAdoptionPanel() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Adoption des features</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {DEMO_FEATURE_ADOPTION.map((f) => (
          <div key={f.id} className="grid gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">{f.feature}</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                {f.trend === "up" && <TrendingUp className="h-3 w-3 text-success" aria-hidden="true" />}
                {f.trend === "down" && <TrendingDown className="h-3 w-3 text-destructive" aria-hidden="true" />}
                {f.trend === "neutral" && <Minus className="h-3 w-3 text-muted-foreground" aria-hidden="true" />}
                <span
                  className={cn(
                    "font-semibold",
                    f.adoptionPct >= 70 ? "text-success"
                    : f.adoptionPct >= 40 ? "text-foreground"
                    : "text-muted-foreground"
                  )}
                >
                  {f.adoptionPct}%
                </span>
                <span className="text-muted-foreground/60">({f.activeUsers.toLocaleString("fr-FR")} users)</span>
              </span>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={f.adoptionPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Adoption ${f.feature}: ${f.adoptionPct}%`}
            >
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  f.adoptionPct >= 70 ? "bg-success"
                  : f.adoptionPct >= 40 ? "bg-primary"
                  : "bg-muted-foreground/40"
                )}
                style={{ width: `${f.adoptionPct}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
