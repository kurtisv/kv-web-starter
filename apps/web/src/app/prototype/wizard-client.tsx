"use client";

import * as React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { WizardShell } from "@/components/prototype/wizard-shell";
import { StepClientProfile } from "@/components/prototype/step-client-profile";
import { StepVisualIdentity } from "@/components/prototype/step-visual-identity";
import { StepFeatures } from "@/components/prototype/step-features";
import { StepPreview } from "@/components/prototype/step-preview";
import { type Industry } from "@/lib/prototype-engine/types";
import { INDUSTRY_META } from "@/lib/prototype-engine/presets-map";
import {
  recommendProfile,
  getDefaultFeatures,
  getDefaultTagline,
} from "@/lib/prototype-engine/recommend-preset";
import { generateManifest } from "@/lib/prototype-engine/generate-manifest";
import {
  safeStep,
  safeIndustry,
  safeColor,
  safeProfile,
  safeMode,
  safeText,
  safeFeatures,
} from "@/lib/prototype-engine/url-state";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export function WizardClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Stable timestamp — lazy useState initializer runs once on mount, never on re-render.
  // useState is safe to read during render; useRef.current is not (react-hooks/refs rule).
  const [generatedAt] = React.useState(() => new Date().toISOString());

  const step = safeStep(searchParams.get("step"));
  const industry = safeIndustry(searchParams.get("industry"));
  const name = safeText(searchParams.get("name"));
  const color = safeColor(searchParams.get("color"));
  const profile = safeProfile(searchParams.get("profile"), industry);
  const mode = safeMode(searchParams.get("mode"));
  const selectedFeatures = safeFeatures(searchParams.get("features"), industry);
  const tagline = safeText(searchParams.get("tagline"), getDefaultTagline(industry));

  function update(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v === "") {
        params.delete(k);
      } else {
        params.set(k, v);
      }
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleIndustry(ind: Industry) {
    update({
      industry: ind,
      profile: recommendProfile(ind),
      tagline: tagline || getDefaultTagline(ind),
      features: getDefaultFeatures(ind).join(","),
    });
  }

  function handleStep(next: number) {
    const clamped = safeStep(String(next));
    const extras: Record<string, string> = { step: String(clamped) };
    if (clamped === 3 && selectedFeatures.length === 0) {
      extras.features = getDefaultFeatures(industry).join(",");
    }
    update(extras);
  }

  function handleToggleFeature(f: string) {
    const next = selectedFeatures.includes(f)
      ? selectedFeatures.filter((x) => x !== f)
      : [...selectedFeatures, f];
    update({ features: next.length > 0 ? next.join(",") : "" });
  }

  const canNext =
    step === 1
      ? name.trim().length > 0 && !!industry
      : step === 2
      ? HEX_RE.test(color) && !!profile
      : step === 3
      ? selectedFeatures.length > 0
      : false;

  const manifest = generateManifest({
    name: name.trim() || "MonEntreprise",
    tagline: tagline || (INDUSTRY_META[industry]?.defaultTagline ?? ""),
    industry,
    primaryColor: color,
    designProfile: profile,
    mode,
    selectedFeatures,
    generatedAt,
  });

  return (
    <WizardShell
      step={step}
      onPrev={() => handleStep(step - 1)}
      onNext={() => handleStep(step + 1)}
      canNext={canNext}
    >
      {step === 1 && (
        <StepClientProfile
          name={name}
          tagline={tagline}
          industry={industry}
          onName={(v) => update({ name: v })}
          onTagline={(v) => update({ tagline: v })}
          onIndustry={handleIndustry}
        />
      )}
      {step === 2 && (
        <StepVisualIdentity
          color={color}
          profile={profile}
          mode={mode}
          onColor={(v) => update({ color: v })}
          onProfile={(v) => update({ profile: v })}
          onMode={(v) => update({ mode: v })}
        />
      )}
      {step === 3 && (
        <StepFeatures
          industry={industry}
          selectedFeatures={selectedFeatures}
          onToggleFeature={handleToggleFeature}
        />
      )}
      {step === 4 && <StepPreview manifest={manifest} />}
    </WizardShell>
  );
}
