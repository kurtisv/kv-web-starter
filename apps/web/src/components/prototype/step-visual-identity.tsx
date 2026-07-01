"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DESIGN_PROFILE_IDS, DESIGN_PROFILES } from "@/design-system/design-profiles";

const PRESET_COLORS: { label: string; hex: string }[] = [
  { label: "Violet", hex: "#6366f1" },
  { label: "Bleu", hex: "#3b82f6" },
  { label: "Vert", hex: "#22c55e" },
  { label: "Orange", hex: "#f97316" },
  { label: "Rouge", hex: "#ef4444" },
  { label: "Rose", hex: "#ec4899" },
  { label: "Cyan", hex: "#06b6d4" },
  { label: "Ambre", hex: "#f59e0b" },
  { label: "Emeraude", hex: "#10b981" },
  { label: "Ardoise", hex: "#64748b" },
];

interface StepVisualIdentityProps {
  color: string;
  profile: string;
  mode: "light" | "dark";
  onColor: (v: string) => void;
  onProfile: (v: string) => void;
  onMode: (v: "light" | "dark") => void;
}

export function StepVisualIdentity({
  color,
  profile,
  mode,
  onColor,
  onProfile,
  onMode,
}: StepVisualIdentityProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Identite visuelle</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Couleur principale, profil design et mode d&apos;affichage.
        </p>
      </div>

      {/* Primary color */}
      <div className="space-y-3">
        <Label>Couleur principale</Label>
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => onColor(c.hex)}
              aria-label={c.label}
              aria-pressed={color === c.hex}
              className={cn(
                "h-9 w-9 rounded-full border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                color === c.hex
                  ? "scale-110 border-foreground"
                  : "border-transparent hover:border-muted-foreground",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <div
            className="h-9 w-9 shrink-0 rounded-full border-2 border-foreground"
            style={{ backgroundColor: /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#6366f1" }}
            aria-hidden="true"
          />
          <Input
            type="text"
            value={color}
            onChange={(e) => {
              const val = e.target.value;
              if (/^#[0-9a-fA-F]{0,6}$/.test(val)) onColor(val);
            }}
            placeholder="#6366f1"
            className="w-32 font-mono text-sm"
            maxLength={7}
            aria-label="Code hexadecimal personnalise"
          />
          <span className="text-xs text-muted-foreground">Hex personnalise</span>
        </div>
      </div>

      {/* Mode */}
      <div className="space-y-3">
        <Label>Mode d&apos;affichage</Label>
        <div className="flex gap-2" role="radiogroup" aria-label="Mode d'affichage">
          {(["light", "dark"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => onMode(m)}
              className={cn(
                "rounded-md border px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                mode === m
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-muted",
              )}
            >
              {m === "light" ? "Clair" : "Sombre"}
            </button>
          ))}
        </div>
      </div>

      {/* Design profile */}
      <div className="space-y-3">
        <Label>Profil design</Label>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {DESIGN_PROFILE_IDS.map((id) => {
            const p = DESIGN_PROFILES[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => onProfile(id)}
                aria-pressed={profile === id}
                className={cn(
                  "flex flex-col gap-1 rounded-lg border p-3.5 text-left text-sm transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  profile === id ? "border-primary bg-primary/5" : "border-border",
                )}
              >
                <span className={cn("font-medium", profile === id && "text-primary")}>
                  {p.label}
                </span>
                <span className="line-clamp-2 text-xs text-muted-foreground">
                  {p.description}
                </span>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {p.mood.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border px-1.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
