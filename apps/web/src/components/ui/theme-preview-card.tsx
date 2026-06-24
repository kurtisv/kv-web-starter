import * as React from "react";
import { THEME_META, type ThemeId } from "@/design-system/tokens";
import { cn } from "@/lib/utils";

interface ThemePreviewCardProps {
  themeId: ThemeId;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ThemePreviewCard({ themeId, active, onClick, className }: ThemePreviewCardProps) {
  const meta = THEME_META[themeId];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col gap-2 rounded-lg border p-3 text-left transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active ? "border-primary ring-1 ring-primary shadow-sm" : "border-border",
        className,
      )}
    >
      {/* Swatch — shows actual target theme colors, not the current page theme */}
      <div className="flex h-10 w-full overflow-hidden rounded-sm border border-black/10">
        <div className="flex-1" style={{ background: meta.bg }} />
        <div className="w-3" style={{ background: meta.fg }} />
        <div className="w-6" style={{ background: meta.accent }} />
      </div>

      {/* Label */}
      <div>
        <p className="text-sm font-medium leading-tight">{meta.label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{meta.description}</p>
      </div>

      {active && (
        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[9px] font-bold">
          ✓
        </span>
      )}
    </button>
  );
}
