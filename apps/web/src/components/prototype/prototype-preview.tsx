"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { DESIGN_PROFILES } from "@/design-system/design-profiles";
import type { ClientManifest } from "@/lib/prototype-engine/types";
import { INDUSTRY_META } from "@/lib/prototype-engine/presets-map";
import { Check, ArrowRight } from "lucide-react";

const BG_CLASS: Record<string, string> = {
  flat: "",
  "soft-gradient": "bg-profile-soft-gradient",
  noise: "bg-profile-noise",
  "grid-lines": "bg-profile-grid",
  "dark-depth": "bg-profile-dark-depth",
};

function isValidHex(hex: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(hex);
}

type ManifestPreviewData = Pick<
  ClientManifest,
  "name" | "tagline" | "industry" | "primaryColor" | "designProfile"
>;

interface PrototypePreviewProps {
  manifest: ManifestPreviewData;
}

export function PrototypePreview({ manifest }: PrototypePreviewProps) {
  const {
    name = "MonEntreprise",
    tagline = "Votre tagline ici.",
    industry = "saas",
    primaryColor = "#6366f1",
    designProfile = "premium-saas",
  } = manifest;

  const safeColor = isValidHex(primaryColor) ? primaryColor : "#6366f1";
  const profile = DESIGN_PROFILES[designProfile] ?? DESIGN_PROFILES["premium-saas"];
  const meta = INDUSTRY_META[industry];
  const bgClass = BG_CLASS[profile.backgroundStyle] ?? "";
  const features = meta?.defaultFeatures.slice(0, 3) ?? [];
  const stats = meta?.stats ?? [];

  return (
    <div
      className={cn("overflow-hidden rounded-xl border shadow-sm", bgClass)}
      role="img"
      aria-label={`Apercu prototype pour ${name}`}
    >
      {/* Browser chrome */}
      <div className="flex items-center justify-between border-b bg-background/80 px-4 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="rounded-md border bg-background/60 px-3 py-0.5 text-xs text-muted-foreground">
          {name || "MonEntreprise"}.fr
        </div>
        <div className="h-2.5 w-14 rounded-full bg-muted" aria-hidden="true" />
      </div>

      {/* Simulated nav */}
      <div
        className="flex items-center justify-between border-b bg-background/70 px-6 py-3 backdrop-blur-sm"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <div
            className="h-5 w-5 rounded-md"
            style={{ backgroundColor: safeColor }}
          />
          <span className="text-sm font-semibold">{name || "MonEntreprise"}</span>
        </div>
        <div className="hidden items-center gap-4 sm:flex">
          <div className="h-2 w-10 rounded bg-muted" />
          <div className="h-2 w-10 rounded bg-muted" />
          <div className="h-2 w-10 rounded bg-muted" />
          <div
            className="rounded-md px-3 py-1 text-xs font-medium text-white"
            style={{ backgroundColor: safeColor }}
          >
            CTA
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="px-8 py-10 text-center">
        {meta && (
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: safeColor }}
          >
            {meta.label}
          </p>
        )}
        <h2 className="mb-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {name || "MonEntreprise"}
        </h2>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
          {tagline || "Votre tagline ici."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <div
            className="flex items-center gap-1.5 rounded-md px-5 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: safeColor }}
          >
            Commencer <ArrowRight className="size-3.5" aria-hidden="true" />
          </div>
          <div className="rounded-md border px-5 py-2 text-sm font-medium text-muted-foreground">
            En savoir plus
          </div>
        </div>

        {/* Stats trust bar */}
        {stats.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 border-t pt-6 text-sm">
            {stats.map((s) => (
              <span key={s.label} className="flex items-center gap-1.5 text-muted-foreground">
                <span className="font-semibold text-foreground">{s.value}</span>
                {s.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Feature strip */}
      {features.length > 0 && (
        <div className="border-t px-8 py-8">
          <p
            className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: safeColor }}
          >
            Fonctionnalites cles
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f}
                className="flex items-start gap-2.5 rounded-lg border bg-card p-3.5"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-white"
                  style={{ backgroundColor: safeColor }}
                  aria-hidden="true"
                >
                  <Check className="size-3" />
                </span>
                <span className="text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA band */}
      <div
        className="px-8 py-8 text-center text-white"
        style={{
          background: `linear-gradient(135deg, ${safeColor}ee 0%, ${safeColor}99 100%)`,
        }}
      >
        <p className="mb-1.5 text-lg font-semibold">Pret a demarrer ?</p>
        <p className="mb-4 text-sm opacity-80">Rejoignez des milliers de clients satisfaits.</p>
        <div
          className="inline-block rounded-md px-5 py-2 text-sm font-semibold"
          style={{ backgroundColor: "white", color: safeColor }}
        >
          Essai gratuit
        </div>
      </div>
    </div>
  );
}
