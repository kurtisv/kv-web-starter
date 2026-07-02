import type { Industry, ClientManifest } from "./types";
import { recommendDemoSlug } from "./recommend-preset";

export interface ManifestInput {
  name: string;
  tagline: string;
  industry: Industry;
  primaryColor: string;
  designProfile: string;
  mode: "light" | "dark";
  selectedFeatures: string[];
  /** When provided, the manifest uses this timestamp instead of generating a new one.
   *  Pass a stable useRef value from the wizard to prevent the timestamp from changing
   *  on every render. */
  generatedAt?: string;
}

export function generateManifest(input: ManifestInput): ClientManifest {
  const { generatedAt, ...rest } = input;
  return {
    ...rest,
    recommendedDemoSlug: recommendDemoSlug(input.industry),
    generatedAt: generatedAt ?? new Date().toISOString(),
  };
}
