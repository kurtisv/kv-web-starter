import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DEMO_SECURITY } from "@/lib/demo-data/saas-demo-data";

const CHECK_CONFIG = {
  pass:    { icon: ShieldCheck, color: "text-success",     bg: "bg-success/10" },
  warning: { icon: ShieldAlert, color: "text-warning",     bg: "bg-warning/10" },
  fail:    { icon: ShieldX,     color: "text-destructive", bg: "bg-destructive/10" },
};

export function SecurityPostureCard() {
  const { score, checks } = DEMO_SECURITY;
  const scoreColor =
    score >= 80 ? "text-success" : score >= 60 ? "text-warning" : "text-destructive";

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Posture de securite</CardTitle>
          <div className="flex items-center gap-1.5">
            <span className={cn("text-2xl font-bold tabular-nums", scoreColor)}>{score}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>
        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Score de securite: ${score}/100`}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              score >= 80 ? "bg-success" : score >= 60 ? "bg-warning" : "bg-destructive"
            )}
            style={{ width: `${score}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        {checks.map((check) => {
          const cfg = CHECK_CONFIG[check.status];
          const Icon = cfg.icon;
          return (
            <div key={check.id} className="flex items-center gap-2.5">
              <div className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full", cfg.bg)}>
                <Icon className={cn("h-3 w-3", cfg.color)} aria-hidden="true" />
              </div>
              <span className={cn("text-sm", check.status === "fail" ? "text-destructive" : "text-foreground")}>
                {check.label}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
