import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DEMO_USAGE } from "@/lib/demo-data/saas-demo-data";

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return String(n);
}

export function UsageOverviewPanel() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Usage — {DEMO_USAGE.period}</CardTitle>
          <span className="text-xs text-muted-foreground">Plan Growth</span>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {DEMO_USAGE.items.map((item) => {
          const pct = Math.min(Math.round((item.used / item.limit) * 100), 100);
          const danger = pct >= 90;
          const warn   = pct >= 70 && !danger;

          return (
            <div key={item.id} className="grid gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground">
                  {fmt(item.used)}{item.unit} / {fmt(item.limit)}{item.unit}{" "}
                  <span
                    className={cn(
                      "font-semibold",
                      danger ? "text-destructive" : warn ? "text-warning" : "text-foreground"
                    )}
                  >
                    ({pct}%)
                  </span>
                </span>
              </div>
              <div
                className="h-2 w-full overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.label}: ${pct}% utilise`}
              >
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    danger ? "bg-destructive" : warn ? "bg-warning" : "bg-primary"
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {danger && (
                <p className="text-[11px] text-destructive" role="alert">
                  Quota critique &mdash; risque d&apos;interruption de service
                </p>
              )}
              {warn && !danger && (
                <p className="text-[11px] text-warning">
                  Usage eleve — envisagez une mise a niveau
                </p>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
