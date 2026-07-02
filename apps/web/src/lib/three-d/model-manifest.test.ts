import { describe, it, expect } from "vitest";

import {
  ALLOWED_NEW_ASSET_LICENSES,
  isWithinWeightBudget,
  requiresDeferredLoading,
} from "./asset-policy";
import { THREE_D_MODEL_MANIFEST, getManifestItem } from "./model-manifest";

describe("three-d asset policy", () => {
  it("flags weights above the hard ceiling", () => {
    expect(isWithinWeightBudget(512)).toBe(true);
    expect(isWithinWeightBudget(2048)).toBe(true);
    expect(isWithinWeightBudget(2049)).toBe(false);
  });

  it("requires deferred loading above the threshold", () => {
    expect(requiresDeferredLoading(512)).toBe(false);
    expect(requiresDeferredLoading(1500)).toBe(true);
  });

  it("never allows unknown licenses for new assets", () => {
    expect(ALLOWED_NEW_ASSET_LICENSES).not.toContain("unknown");
  });
});

describe("three-d model manifest", () => {
  it("has unique ids", () => {
    const ids = THREE_D_MODEL_MANIFEST.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("declares a public /models path for every GLB entry", () => {
    for (const item of THREE_D_MODEL_MANIFEST) {
      if (item.path) {
        expect(item.path).toMatch(/^\/models\/.+\.glb$/);
        expect(item.weightKb, `${item.id} must declare weightKb`).toBeTypeOf(
          "number"
        );
      }
    }
  });

  it("keeps procedural placeholders free of files and license debt", () => {
    const placeholders = THREE_D_MODEL_MANIFEST.filter(
      (m) => m.license === "placeholder"
    );
    expect(placeholders.length).toBeGreaterThan(0);
    for (const item of placeholders) {
      expect(item.path).toBeUndefined();
    }
  });

  it("documents every recommended use", () => {
    for (const item of THREE_D_MODEL_MANIFEST) {
      expect(item.recommendedUse.length).toBeGreaterThan(0);
    }
  });

  it("looks up items by id", () => {
    expect(getManifestItem("procedural-device")?.type).toBe("placeholder");
    expect(getManifestItem("nope")).toBeUndefined();
  });
});
