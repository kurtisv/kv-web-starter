import * as React from "react";
import { cn } from "@/lib/utils";

export type TechLevel = 1 | 2 | 3;

export interface TechItem {
  name: string;
  level: TechLevel;
  category: string;
}

interface TechStackCloudProps {
  items: TechItem[];
  className?: string;
}

function LevelDots({ level }: { level: TechLevel }) {
  return (
    <span className="ml-1.5 flex items-center gap-0.5">
      {([1, 2, 3] as TechLevel[]).map((l) => (
        <span
          key={l}
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full transition-colors",
            l <= level ? "bg-primary" : "bg-muted-foreground/30",
          )}
        />
      ))}
    </span>
  );
}

export function TechStackCloud({ items, className }: TechStackCloudProps) {
  const categories = Array.from(new Set(items.map((i) => i.category)));

  return (
    <div className={cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {categories.map((cat) => {
        const catItems = items.filter((i) => i.category === cat);
        return (
          <div key={cat}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {cat}
            </p>
            <div className="flex flex-col gap-2">
              {catItems.map((item) => (
                <div
                  key={item.name}
                  className={cn(
                    "flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm font-medium",
                    "transition-colors duration-150 hover:border-primary hover:text-primary",
                  )}
                >
                  <span>{item.name}</span>
                  <LevelDots level={item.level} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div className="col-span-full flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="flex gap-0.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
          </span>
          Confortable
        </span>
        <span className="flex items-center gap-1">
          <span className="flex gap-0.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
          </span>
          Avance
        </span>
        <span className="flex items-center gap-1">
          <span className="flex gap-0.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Expert
        </span>
      </div>
    </div>
  );
}
