import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DEMO_CHURN_RISKS } from "@/lib/demo-data/saas-demo-data";

const RISK_STYLES = {
  high:   "border-destructive/40 bg-destructive/5",
  medium: "border-warning/40 bg-warning/5",
  low:    "border-border bg-card",
};

const RISK_BADGE: Record<string, "destructive" | "warning" | "default"> = {
  high:   "destructive",
  medium: "warning",
  low:    "default",
};

export function ChurnRiskPanel() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <AlertTriangle className="h-4 w-4 text-warning" aria-hidden="true" />
          Risques de churn
          <Badge variant="destructive" size="sm">{DEMO_CHURN_RISKS.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {DEMO_CHURN_RISKS.map((risk) => (
          <div
            key={risk.id}
            className={cn(
              "flex items-start justify-between gap-3 rounded-lg border p-3",
              RISK_STYLES[risk.risk as keyof typeof RISK_STYLES] ?? RISK_STYLES.low
            )}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium">{risk.customer}</p>
                <Badge variant={RISK_BADGE[risk.risk] ?? "default"} size="sm">
                  Score {risk.score}
                </Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{risk.signal}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {risk.plan} &middot; {risk.mrr}/mois
              </p>
            </div>
            <Button size="sm" variant="outline" className="shrink-0 text-xs">
              Contacter
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
