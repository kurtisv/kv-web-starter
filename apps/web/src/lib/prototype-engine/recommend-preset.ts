import type { Industry } from "./types";
import { INDUSTRY_META } from "./presets-map";

export function recommendProfile(industry: Industry): string {
  return INDUSTRY_META[industry]?.profileId ?? "premium-saas";
}

export function recommendDemoSlug(industry: Industry): string {
  return INDUSTRY_META[industry]?.demoSlug ?? "saas";
}

export function getDefaultFeatures(industry: Industry): string[] {
  return [...(INDUSTRY_META[industry]?.defaultFeatures ?? [])];
}

export function getDefaultTagline(industry: Industry): string {
  return INDUSTRY_META[industry]?.defaultTagline ?? "";
}
