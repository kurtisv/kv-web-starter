import { type Industry, isIndustry } from "./types";
import { INDUSTRY_META } from "./presets-map";
import { recommendProfile, getDefaultFeatures } from "./recommend-preset";
import { DESIGN_PROFILE_IDS } from "@/design-system/design-profiles";

export const DEFAULT_INDUSTRY: Industry = "saas";
export const DEFAULT_COLOR = "#6366f1";
export const MAX_TEXT_LENGTH = 120;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const MAX_STEP = 4;

export function safeStep(raw: string | null): number {
  const n = Number(raw ?? "1");
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(MAX_STEP, Math.floor(n)));
}

export function safeIndustry(raw: string | null): Industry {
  if (raw && isIndustry(raw)) return raw;
  return DEFAULT_INDUSTRY;
}

export function safeColor(raw: string | null): string {
  if (raw && HEX_RE.test(raw)) return raw;
  return DEFAULT_COLOR;
}

export function safeProfile(raw: string | null, industry: Industry): string {
  if (raw && (DESIGN_PROFILE_IDS as string[]).includes(raw)) return raw;
  return recommendProfile(industry);
}

export function safeMode(raw: string | null): "light" | "dark" {
  return raw === "dark" ? "dark" : "light";
}

export function safeText(raw: string | null, fallback = ""): string {
  if (!raw) return fallback;
  return raw.trim().slice(0, MAX_TEXT_LENGTH);
}

export function safeFeatures(raw: string | null, industry: Industry): string[] {
  // Absent param => industry defaults
  if (raw === null) return getDefaultFeatures(industry);

  // Explicitly empty string => empty selection (user deselected all)
  if (raw === "") return [];

  const meta = INDUSTRY_META[industry];
  if (!meta) return getDefaultFeatures(industry);

  const validSet = new Set([...meta.defaultFeatures, ...meta.optionalFeatures]);
  const parsed = raw
    .split(",")
    .map((f) => f.trim())
    .filter((f) => f.length > 0 && validSet.has(f));

  // All parsed features were invalid => fall back to defaults
  if (parsed.length === 0) return getDefaultFeatures(industry);

  return parsed;
}

export function buildPrototypeSearchParams(state: {
  step?: number;
  name?: string;
  tagline?: string;
  industry?: Industry;
  color?: string;
  profile?: string;
  mode?: "light" | "dark";
  features?: string[];
}): URLSearchParams {
  const p = new URLSearchParams();
  if (state.step !== undefined && state.step !== 1) p.set("step", String(state.step));
  if (state.name) p.set("name", safeText(state.name));
  if (state.tagline) p.set("tagline", safeText(state.tagline));
  if (state.industry && state.industry !== DEFAULT_INDUSTRY) p.set("industry", state.industry);
  if (state.color && state.color !== DEFAULT_COLOR) p.set("color", state.color);
  if (state.profile) p.set("profile", state.profile);
  if (state.mode && state.mode !== "light") p.set("mode", state.mode);
  if (state.features !== undefined) {
    const s = state.features.join(",");
    if (s) p.set("features", s);
  }
  return p;
}
