import { describe, it, expect } from "vitest";
import { generateManifest } from "./generate-manifest";

const BASE_INPUT = {
  name: "Acme",
  tagline: "Tagline here.",
  industry: "saas" as const,
  primaryColor: "#6366f1",
  designProfile: "premium-saas",
  mode: "light" as const,
  selectedFeatures: ["Dashboard analytics", "API REST"],
};

describe("generateManifest", () => {
  it("uses provided generatedAt instead of generating a new one", () => {
    const ts = "2026-01-01T00:00:00.000Z";
    const manifest = generateManifest({ ...BASE_INPUT, generatedAt: ts });
    expect(manifest.generatedAt).toBe(ts);
  });

  it("generates a fallback generatedAt when absent", () => {
    const before = Date.now();
    const manifest = generateManifest(BASE_INPUT);
    const after = Date.now();
    const ts = new Date(manifest.generatedAt).getTime();
    expect(ts).toBeGreaterThanOrEqual(before);
    expect(ts).toBeLessThanOrEqual(after);
  });

  it("sets recommendedDemoSlug from industry", () => {
    const manifest = generateManifest(BASE_INPUT);
    expect(manifest.recommendedDemoSlug).toBe("saas");
  });

  it("sets correct slug for booking industry", () => {
    const manifest = generateManifest({ ...BASE_INPUT, industry: "booking" });
    expect(manifest.recommendedDemoSlug).toBe("booking");
  });

  it("does not mutate the input object", () => {
    const input = { ...BASE_INPUT };
    generateManifest(input);
    expect(input).not.toHaveProperty("recommendedDemoSlug");
    expect(input).not.toHaveProperty("generatedAt");
  });

  it("preserves selectedFeatures in output", () => {
    const manifest = generateManifest(BASE_INPUT);
    expect(manifest.selectedFeatures).toEqual(["Dashboard analytics", "API REST"]);
  });

  it("preserves all input fields", () => {
    const manifest = generateManifest(BASE_INPUT);
    expect(manifest.name).toBe("Acme");
    expect(manifest.tagline).toBe("Tagline here.");
    expect(manifest.industry).toBe("saas");
    expect(manifest.primaryColor).toBe("#6366f1");
    expect(manifest.designProfile).toBe("premium-saas");
    expect(manifest.mode).toBe("light");
  });
});
