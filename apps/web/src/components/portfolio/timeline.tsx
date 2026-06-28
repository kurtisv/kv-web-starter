import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface TimelineItem {
  period: string;
  title: string;
  company?: string;
  description?: string;
  tags?: string[];
  current?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative pl-8", className)}>
      {/* Vertical rail */}
      <div className="absolute bottom-2 left-3 top-2 w-px bg-border" />

      <div className="grid gap-8">
        {items.map((item, i) => (
          <div key={i} className="relative">
            {/* Dot */}
            <div
              className={cn(
                "absolute -left-[21px] mt-1 h-3 w-3 rounded-full border-2",
                item.current
                  ? "border-primary bg-primary"
                  : "border-border bg-background"
              )}
            />

            <div className="flex flex-wrap items-center gap-2 mb-1">
              <Badge
                variant={item.current ? "default" : "outline"}
                size="sm"
              >
                {item.period}
              </Badge>
              {item.current && (
                <Badge variant="success" size="sm">
                  Actuel
                </Badge>
              )}
            </div>

            <p className="font-semibold">{item.title}</p>
            {item.company && (
              <p className="text-sm text-muted-foreground">{item.company}</p>
            )}
            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="soft" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
