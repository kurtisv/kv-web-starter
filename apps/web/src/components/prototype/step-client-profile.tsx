"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INDUSTRIES, type Industry } from "@/lib/prototype-engine/types";

interface StepClientProfileProps {
  name: string;
  tagline: string;
  industry: Industry;
  onName: (v: string) => void;
  onTagline: (v: string) => void;
  onIndustry: (v: Industry) => void;
}

export function StepClientProfile({
  name,
  tagline,
  industry,
  onName,
  onTagline,
  onIndustry,
}: StepClientProfileProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Profil client</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Commencez par les informations de base de votre client.
        </p>
      </div>

      {/* Name + Tagline */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="client-name">
            Nom du client / projet <span className="text-destructive">*</span>
          </Label>
          <Input
            id="client-name"
            value={name}
            onChange={(e) => onName(e.target.value)}
            placeholder="MonEntreprise"
            className="h-11"
            autoComplete="off"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="client-tagline">Accroche (tagline)</Label>
          <Input
            id="client-tagline"
            value={tagline}
            onChange={(e) => onTagline(e.target.value)}
            placeholder="Le service qui change votre quotidien."
            className="h-11"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Industry picker */}
      <div className="space-y-3">
        <Label>
          Secteur d&apos;activite <span className="text-destructive">*</span>
        </Label>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              type="button"
              onClick={() => onIndustry(ind.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3.5 text-left text-sm transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                industry === ind.id
                  ? "border-primary bg-primary/5 font-medium text-primary"
                  : "border-border text-muted-foreground",
              )}
              aria-pressed={industry === ind.id}
            >
              {ind.label}
            </button>
          ))}
        </div>
      </div>

      {!name.trim() && (
        <p className="text-xs text-muted-foreground">
          Renseignez un nom pour continuer.
        </p>
      )}
    </div>
  );
}
