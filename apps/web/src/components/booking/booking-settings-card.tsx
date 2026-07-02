"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SettingField {
  label: string;
  value: string;
  type?: "text" | "select" | "toggle";
  options?: string[];
}

interface BookingSettingsCardProps {
  title: string;
  description?: string;
  fields: SettingField[];
  isDemoMode?: boolean;
  className?: string;
}

export function BookingSettingsCard({
  title,
  description,
  fields,
  isDemoMode = true,
  className,
}: BookingSettingsCardProps) {
  const [saved, setSaved] = React.useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className={cn("rounded-xl border bg-card shadow-sm overflow-hidden", className)}>
      <div className="border-b px-5 py-4">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>

      <div className="divide-y px-5">
        {fields.map((field) => (
          <div key={field.label} className="flex items-center justify-between gap-3 py-3">
            <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
            {field.type === "toggle" ? (
              <button
                type="button"
                role="switch"
                aria-checked={field.value === "true"}
                aria-label={field.label}
                disabled={isDemoMode}
                className={cn(
                  "relative h-5 w-9 rounded-full transition-colors border",
                  field.value === "true"
                    ? "bg-primary border-primary"
                    : "bg-muted border-border",
                  isDemoMode && "opacity-70 cursor-not-allowed"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-background transition-transform shadow-sm",
                    field.value === "true" && "translate-x-4"
                  )}
                />
              </button>
            ) : (
              <span className="text-xs font-medium text-foreground">{field.value}</span>
            )}
          </div>
        ))}
      </div>

      <div className="border-t px-5 py-3 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isDemoMode}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            isDemoMode
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {saved ? "Sauvegarde !" : "Sauvegarder"}
        </button>
        {isDemoMode && (
          <p className="text-xs text-muted-foreground">Mode demo &mdash; modifications desactivees</p>
        )}
      </div>
    </div>
  );
}
