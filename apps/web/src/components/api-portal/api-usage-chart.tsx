import { cn } from "@/lib/utils";

export interface ApiUsagePoint {
  label: string;
  calls: number;
  errors?: number;
}

export function ApiUsageChart({ data, className }: { data: ApiUsagePoint[]; className?: string }) {
  const max = Math.max(...data.map((point) => point.calls), 1);

  return (
    <div className={cn("grid gap-3", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Utilisation API</span>
        <span className="text-muted-foreground">{data.reduce((sum, point) => sum + point.calls, 0)} appels</span>
      </div>
      <div className="flex h-44 items-end gap-2 border bg-muted/20 p-3">
        {data.map((point) => {
          const height = Math.max((point.calls / max) * 100, 3);
          return (
            <div key={point.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div className="flex h-32 w-full items-end">
                <div
                  className="w-full bg-primary transition-all"
                  style={{ height: `${height}%` }}
                  title={`${point.calls} appels`}
                />
              </div>
              <span className="truncate text-[10px] text-muted-foreground">{point.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
