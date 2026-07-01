import type { Industry, ClientManifest } from "./types";
import { recommendDemoSlug } from "./recommend-preset";

interface ManifestInput {
  name: string;
  tagline: string;
  industry: Industry;
  primaryColor: string;
  designProfile: string;
  mode: "light" | "dark";
  selectedFeatures: string[];
}

export function generateManifest(input: ManifestInput): ClientManifest {
  return {
    ...input,
    recommendedDemoSlug: recommendDemoSlug(input.industry),
    generatedAt: new Date().toISOString(),
  };
}
