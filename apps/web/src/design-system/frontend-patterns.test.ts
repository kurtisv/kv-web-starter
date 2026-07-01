import { describe, it, expect } from "vitest";
import {
  FRONTEND_PATTERNS,
  FRONTEND_PATTERN_IDS,
  getFrontendPattern,
  getPatternsForProfile,
  getPatternsForQualityLevel,
} from "./frontend-patterns";
import { DESIGN_PROFILES } from "./design-profiles";
import { DESIGN_RECIPES } from "./design-recipes";
import { UI_QUALITY_LEVELS } from "./ui-quality-levels";

describe("Frontend Patterns", () => {
  it("all pattern IDs match their keys", () => {
    for (const [key, pattern] of Object.entries(FRONTEND_PATTERNS)) {
      expect(pattern.id).toBe(key);
    }
  });

  it("every pattern has a non-empty components list", () => {
    for (const pattern of Object.values(FRONTEND_PATTERNS)) {
      expect(pattern.components.length).toBeGreaterThan(0);
    }
  });

  it("every pattern has a non-empty testChecklist", () => {
    for (const pattern of Object.values(FRONTEND_PATTERNS)) {
      expect(pattern.testChecklist.length).toBeGreaterThan(0);
    }
  });

  it("every pattern's qualityLevel exists in UI_QUALITY_LEVELS", () => {
    for (const pattern of Object.values(FRONTEND_PATTERNS)) {
      expect(UI_QUALITY_LEVELS[pattern.qualityLevel]).toBeDefined();
    }
  });

  it("every pattern's recommendedProfiles exist in DESIGN_PROFILES", () => {
    for (const pattern of Object.values(FRONTEND_PATTERNS)) {
      for (const profileId of pattern.recommendedProfiles) {
        expect(DESIGN_PROFILES[profileId]).toBeDefined();
      }
    }
  });

  it("every pattern's recommendedRecipes exist in DESIGN_RECIPES", () => {
    for (const pattern of Object.values(FRONTEND_PATTERNS)) {
      for (const recipeId of pattern.recommendedRecipes) {
        expect(DESIGN_RECIPES[recipeId]).toBeDefined();
      }
    }
  });

  it("every pattern has at least one requiredState", () => {
    for (const pattern of Object.values(FRONTEND_PATTERNS)) {
      expect(pattern.requiredStates.length).toBeGreaterThan(0);
    }
  });

  it("FRONTEND_PATTERN_IDS contains all pattern IDs", () => {
    const keys = Object.keys(FRONTEND_PATTERNS);
    expect(FRONTEND_PATTERN_IDS).toEqual(expect.arrayContaining(keys));
    expect(FRONTEND_PATTERN_IDS.length).toBe(keys.length);
  });

  it("getFrontendPattern returns the correct pattern", () => {
    const p = getFrontendPattern("hero-trust-bar");
    expect(p).toBeDefined();
    expect(p?.id).toBe("hero-trust-bar");
  });

  it("getFrontendPattern returns undefined for unknown id", () => {
    expect(getFrontendPattern("does-not-exist")).toBeUndefined();
  });

  it("getPatternsForProfile returns patterns that reference the profile", () => {
    const results = getPatternsForProfile("premium-saas");
    expect(results.length).toBeGreaterThan(0);
    for (const p of results) {
      expect(p.recommendedProfiles).toContain("premium-saas");
    }
  });

  it("getPatternsForQualityLevel returns patterns at that level", () => {
    const results = getPatternsForQualityLevel("conversion");
    expect(results.length).toBeGreaterThan(0);
    for (const p of results) {
      expect(p.qualityLevel).toBe("conversion");
    }
  });

  it("at least 15 patterns are defined", () => {
    expect(FRONTEND_PATTERN_IDS.length).toBeGreaterThanOrEqual(15);
  });
});
