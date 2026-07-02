import { CreditCard, Calendar, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_PRODUCT } from "@/lib/demo-data/saas-demo-data";

export function BillingSummaryCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Resume de facturation
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-2xl font-bold">49 €<span className="text-sm font-normal text-muted-foreground">/mois</span></p>
            <p className="mt-0.5 text-xs text-muted-foreground">Plan {DEMO_PRODUCT.plan} — facturation mensuelle</p>
          </div>
          <Badge variant="success" className="shrink-0">Actif</Badge>
        </div>

        <div className="grid gap-2 border-t pt-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground">Prochain renouvellement</span>
            <span className="ml-auto font-medium">{DEMO_PRODUCT.renewalDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground">Moyen de paiement</span>
            <span className="ml-auto font-medium">Visa •••• 4242</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground">Renouvellement auto</span>
            <span className="ml-auto font-medium text-success">Active</span>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground border-t pt-3">{DEMO_PRODUCT.demoDisclaimer}</p>
      </CardContent>
    </Card>
  );
}
