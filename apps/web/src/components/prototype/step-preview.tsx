"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ClientManifest } from "@/lib/prototype-engine/types";
import { PrototypePreview } from "./prototype-preview";
import { ManifestCard } from "./manifest-card";
import { Button } from "@/components/ui/button";

function isValidHex(hex: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(hex);
}

interface StepPreviewProps {
  manifest: ClientManifest;
}

export function StepPreview({ manifest }: StepPreviewProps) {
  const safeColor = isValidHex(manifest.primaryColor) ? manifest.primaryColor : "#6366f1";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Apercu & Export</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Votre prototype <strong>{manifest.name}</strong> est pret.
        </p>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border px-3 py-1 font-medium">{manifest.industry}</span>
        <span className="rounded-full border px-3 py-1 font-medium">{manifest.designProfile}</span>
        <span
          className="rounded-full border px-3 py-1 font-semibold text-white"
          style={{ backgroundColor: safeColor }}
        >
          {manifest.primaryColor}
        </span>
        <span className="rounded-full border px-3 py-1">{manifest.mode}</span>
      </div>

      {/* Live preview */}
      <PrototypePreview manifest={manifest} />

      {/* Quick links */}
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href={`/demo/${manifest.recommendedDemoSlug}`}>
            Voir la demo complete{" "}
            <ExternalLink className="ml-1.5 size-3.5" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/demo">
            Galerie des demos{" "}
            <ExternalLink className="ml-1.5 size-3.5" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/demo/design-lab">
            Design Lab{" "}
            <ExternalLink className="ml-1.5 size-3.5" aria-hidden="true" />
          </Link>
        </Button>
      </div>

      {/* Export */}
      <ManifestCard manifest={manifest} />
    </div>
  );
}
