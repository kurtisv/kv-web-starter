"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { INDUSTRY_META } from "@/lib/prototype-engine/presets-map";
import type { Industry } from "@/lib/prototype-engine/types";
import { Check } from "lucide-react";

interface StepFeaturesProps {
  industry: Industry;
  selectedFeatures: string[];
  onToggleFeature: (f: string) => void;
}

export function StepFeatures({ industry, selectedFeatures, onToggleFeature }: StepFeaturesProps) {
  const meta = INDUSTRY_META[industry];

  const allFeatures = meta
    ? [...meta.defaultFeatures, ...meta.optionalFeatures]
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Fonctionnalites</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Selectionnez les fonctionnalites cles de votre prototype.
        </p>
      </div>

      {allFeatures.length > 0 ? (
        <>
          <div className="space-y-2">
            <Label>
              Fonctionnalites disponibles{meta ? ` pour ${meta.label}` : ""}
            </Label>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {allFeatures.map((f) => {
                const isSelected = selectedFeatures.includes(f);
                const isDefault = meta?.defaultFeatures.includes(f) ?? false;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => onToggleFeature(f)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3.5 text-left text-sm transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border",
                      )}
                      aria-hidden="true"
                    >
                      {isSelected && <Check className="size-3" />}
                    </span>
                    <span className="flex-1">{f}</span>
                    {isDefault && (
                      <span className="text-xs text-muted-foreground">inclus</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{selectedFeatures.length}</span>{" "}
            fonctionnalite{selectedFeatures.length !== 1 ? "s" : ""} selectionnee
            {selectedFeatures.length !== 1 ? "s" : ""}
            {selectedFeatures.length === 0 && (
              <span className="ml-2 text-xs text-destructive">
                Selectionnez au moins une fonctionnalite pour continuer.
              </span>
            )}
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Aucune fonctionnalite disponible pour ce secteur.
        </p>
      )}
    </div>
  );
}
