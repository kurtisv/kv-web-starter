import { describe, expect, it } from "vitest";
import { DESIGN_PROFILES, DESIGN_PROFILE_IDS } from "./design-profiles";
import { DESIGN_RECIPES, getRecipeForPreset } from "./design-recipes";

describe("DESIGN_PROFILES", () => {
  it("exports a non-empty profiles object", () => {
    expect(Object.keys(DESIGN_PROFILES).length).toBeGreaterThanOrEqual(10);
  });

  it("every profile id matches its key", () => {
    for (const [key, profile] of Object.entries(DESIGN_PROFILES)) {
      expect(profile.id, `profile key "${key}" id mismatch`).toBe(key);
    }
  });

  it("every profile has required fields", () => {
    for (const profile of Object.values(DESIGN_PROFILES)) {
      expect(profile.label.length).toBeGreaterThan(0);
      expect(profile.description.length).toBeGreaterThan(0);
      expect(profile.mood.length).toBeGreaterThan(0);
      expect(profile.recommendedDomains.length).toBeGreaterThan(0);
    }
  });
});

describe("DESIGN_RECIPES", () => {
  it("exports a non-empty recipes object", () => {
    expect(Object.keys(DESIGN_RECIPES).length).toBeGreaterThanOrEqual(8);
  });

  it("every recipe id matches its key", () => {
    for (const [key, recipe] of Object.entries(DESIGN_RECIPES)) {
      expect(recipe.id, `recipe key "${key}" id mismatch`).toBe(key);
    }
  });

  it("every recipe profileId references a real DESIGN_PROFILES entry", () => {
    const validProfileIds = new Set(DESIGN_PROFILE_IDS);
    for (const recipe of Object.values(DESIGN_RECIPES)) {
      expect(
        validProfileIds.has(recipe.profileId as typeof DESIGN_PROFILE_IDS[number]),
        `recipe "${recipe.id}" has unknown profileId "${recipe.profileId}" — valid IDs: ${[...validProfileIds].join(", ")}`,
      ).toBe(true);
    }
  });

  it("every recipe has at least one targetPreset", () => {
    for (const recipe of Object.values(DESIGN_RECIPES)) {
      expect(recipe.targetPresets.length, `recipe "${recipe.id}" has no targetPresets`).toBeGreaterThan(0);
    }
  });

  it("no two recipes share the same targetPreset (single recipe per preset)", () => {
    const seen = new Map<string, string>();
    for (const recipe of Object.values(DESIGN_RECIPES)) {
      for (const preset of recipe.targetPresets) {
        const existing = seen.get(preset);
        expect(
          existing,
          `preset "${preset}" is claimed by both recipe "${existing}" and recipe "${recipe.id}"`,
        ).toBeUndefined();
        seen.set(preset, recipe.id);
      }
    }
  });

  it("getRecipeForPreset returns a recipe with a valid profileId for known presets", () => {
    const knownPresets = ["saas", "dashboard", "api", "booking", "local-business", "portfolio", "auto-blog", "ecommerce", "real-estate"];
    const validProfileIds = new Set(DESIGN_PROFILE_IDS);
    for (const preset of knownPresets) {
      const recipe = getRecipeForPreset(preset);
      if (recipe) {
        expect(
          validProfileIds.has(recipe.profileId as typeof DESIGN_PROFILE_IDS[number]),
          `getRecipeForPreset("${preset}") returned recipe with invalid profileId "${recipe.profileId}"`,
        ).toBe(true);
      }
    }
  });

  it("specific profileId corrections are in place", () => {
    expect(DESIGN_RECIPES["dark-api"].profileId).toBe("dark-technical");
    expect(DESIGN_RECIPES["editorial-portfolio"].profileId).toBe("creative-portfolio");
    expect(DESIGN_RECIPES["cinematic-auto"].profileId).toBe("auto-performance");
    expect(DESIGN_RECIPES["ecommerce-clean"].profileId).toBe("commerce-clean");
    expect(DESIGN_RECIPES["real-estate-premium"].profileId).toBe("real-estate-luxe");
  });
});
