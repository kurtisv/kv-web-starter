import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DEMO_SECURITY } from "@/lib/demo-data/saas-demo-data";

export function ComplianceChecklist() {
  const ready = DEMO_SECURITY.complianceReadiness.filter((c) => c.ready).length;
  const total = DEMO_SECURITY.complianceReadiness.length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Compliance readiness</CardTitle>
          <Badge variant={ready === total ? "success" : "warning"} size="sm">
            {ready}/{total} OK
          </Badge>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Checklist de preparation — demo fictive, non certifie.
        </p>
      </CardHeader>
      <CardContent className="grid gap-2">
        {DEMO_SECURITY.complianceReadiness.map((item) => (
          <div key={item.id} className="flex items-center gap-2.5">
            {item.ready ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
            ) : (
              <XCircle className="h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
            )}
            <span className={cn("text-sm", !item.ready && "text-muted-foreground")}>
              {item.label}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
