import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RateLimitMeterProps {
  used: number;
  limit: number;
  label?: string;
  className?: string;
}

export function RateLimitMeter({ used, limit, label = "Quota", className }: RateLimitMeterProps) {
  const percentage = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  const variant = percentage >= 90 ? "destructive" : percentage >= 70 ? "warning" : "success";

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        <Badge variant={variant}>{percentage}%</Badge>
      </div>
      <div className="h-2 overflow-hidden bg-muted">
        <div className="h-full bg-primary transition-all" style={{ width: `${percentage}%` }} />
      </div>
      <p className="text-xs text-muted-foreground">
        {used.toLocaleString("fr-CA")} / {limit.toLocaleString("fr-CA")} appels
      </p>
    </div>
  );
}
