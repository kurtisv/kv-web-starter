import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DEMO_CUSTOMERS } from "@/lib/demo-data/saas-demo-data";

function HealthDot({ score }: { score: number }) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        score >= 80 ? "bg-success"
        : score >= 50 ? "bg-warning"
        : "bg-destructive"
      )}
      aria-hidden="true"
    />
  );
}

export function CustomerHealthCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Sante clients</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {DEMO_CUSTOMERS.slice(0, 6).map((c) => (
            <div key={c.id} className="flex items-center gap-3 px-6 py-2.5">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold"
                aria-hidden="true"
              >
                {c.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.plan} &middot; {c.mrr}/mois</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <HealthDot score={c.health} />
                <span className={cn(
                  "text-sm font-semibold tabular-nums",
                  c.health >= 80 ? "text-success"
                  : c.health >= 50 ? "text-warning"
                  : "text-destructive"
                )}>
                  {c.health}
                </span>
                {c.risk === "high" && (
                  <Badge variant="destructive" size="sm">Risque</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
