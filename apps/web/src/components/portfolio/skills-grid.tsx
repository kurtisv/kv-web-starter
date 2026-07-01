import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkillCategory {
  label: string;
  skills: string[];
}

interface SkillsGridProps {
  categories: SkillCategory[];
  className?: string;
}

export function SkillsGrid({ categories, className }: SkillsGridProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {categories.map((cat) => (
        <div key={cat.label}>
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {cat.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill) => (
              <span
                key={skill}
                className={cn(
                  "inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-sm",
                  "transition-colors duration-150",
                  "hover:border-primary hover:text-primary cursor-default",
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
