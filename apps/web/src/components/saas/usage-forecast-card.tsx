import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_USAGE } from "@/lib/demo-data/saas-demo-data";

const RISK_VARIANT: Record<string, "success" | "warning" | "destructive"> = {
  faible: "success",
  moyen:  "warning",
  eleve:  "destructive",
};

export function UsageForecastCard() {
  const { forecast } = DEMO_USAGE;
  const variant = RISK_VARIANT[forecast.overageRisk] ?? "default";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
          Prevision de fin de mois
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border bg-muted/30 p-3 text-center">
            <p className="text-xs text-muted-foreground">Requetes prevues</p>
            <p className="mt-1 text-lg font-bold tabular-nums">{forecast.projectedApiRequests}</p>
            <p className="text-xs text-muted-foreground">sur 100 000</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3 text-center">
            <p className="text-xs text-muted-foreground">Overage prevu</p>
            <p className="mt-1 text-lg font-bold tabular-nums">{forecast.projectedOverage}</p>
            <p className="text-xs text-muted-foreground">de depassement</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3 text-center">
            <p className="text-xs text-muted-foreground">Risque overage</p>
            <div className="mt-1 flex justify-center">
              <Badge variant={variant} size="sm">{forecast.overageRisk}</Badge>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Projection basee sur le rythme des 7 derniers jours. Mise a jour toutes les heures.
        </p>
      </CardContent>
    </Card>
  );
}
