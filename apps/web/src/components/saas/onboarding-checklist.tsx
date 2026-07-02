import { CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DEMO_ONBOARDING } from "@/lib/demo-data/saas-demo-data";

export function OnboardingChecklist() {
  const done = DEMO_ONBOARDING.filter((t) => t.done).length;
  const total = DEMO_ONBOARDING.length;
  const pct = Math.round((done / total) * 100);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Demarrage</CardTitle>
          <span className="text-xs text-muted-foreground">{done}/{total} etapes</span>
        </div>
        <div
          className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progression onboarding: ${pct}%`}
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        {DEMO_ONBOARDING.map((task) => (
          <div key={task.id} className="flex items-center gap-2.5">
            {task.done ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
            ) : (
              <Circle className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            )}
            <span className={cn("text-sm", task.done ? "text-muted-foreground line-through" : "text-foreground")}>
              {task.label}
            </span>
          </div>
        ))}
        {done < total && (
          <Button size="sm" className="mt-2 w-full" variant="outline">
            Continuer la configuration
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
