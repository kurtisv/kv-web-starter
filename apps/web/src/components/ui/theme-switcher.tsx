"use client";

import React, { useEffect, useRef, useState } from "react";
import { Palette } from "lucide-react";

import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { ThemePreviewCard } from "@/components/ui/theme-preview-card";
import { THEMES } from "@/design-system/tokens";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((v) => !v)}
        aria-label="Changer de theme"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="h-9 w-9"
      >
        <Palette className="h-4 w-4" />
      </Button>

      {open && (
        <div
          role="listbox"
          aria-label="Themes disponibles"
          className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border bg-popover p-3 shadow-lg"
        >
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Theme
          </p>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((t) => (
              <ThemePreviewCard
                key={t}
                themeId={t}
                active={theme === t}
                onClick={() => {
                  setTheme(t);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
