import { CheckCircle2, CircleAlert, Clock3, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface AuditLogItem {
  id: string;
  action: string;
  actor: string;
  createdAt: string;
  description?: string;
  variant?: "info" | "success" | "warning";
}

const ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: CircleAlert,
};

export function AuditLogTimeline({ items, className }: { items: AuditLogItem[]; className?: string }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Aucune activite pour le moment.</p>;
  }

  return (
    <ol className={cn("relative grid gap-4 border-l pl-5", className)}>
      {items.map((item) => {
        const variant = item.variant ?? "info";
        const Icon = ICONS[variant];
        return (
          <li key={item.id} className="relative">
            <span className="absolute -left-[30px] flex h-5 w-5 items-center justify-center rounded-full border bg-background">
              <Icon className="h-3 w-3" />
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">{item.action}</span>
              <Badge variant={variant === "warning" ? "warning" : variant === "success" ? "success" : "outline"} size="sm">
                {item.actor}
              </Badge>
            </div>
            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            )}
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Clock3 className="h-3 w-3" />
              {item.createdAt}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
