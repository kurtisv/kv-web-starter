import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = "center", className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" && "max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
