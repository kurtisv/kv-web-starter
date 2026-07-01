import { describe, it, expect } from "vitest";
import {
  UI_QUALITY_LEVELS,
  UI_QUALITY_LEVEL_IDS,
  getUiQualityLevel,
  type UiQualityLevelId,
} from "./ui-quality-levels";

describe("UI Quality Levels", () => {
  it("all IDs match their keys", () => {
    for (const [key, level] of Object.entries(UI_QUALITY_LEVELS)) {
      expect(level.id).toBe(key);
    }
  });

  it("every level has a non-empty checklist", () => {
    for (const level of Object.values(UI_QUALITY_LEVELS)) {
      expect(level.checklist.length).toBeGreaterThan(0);
    }
  });

  it("every level has at least one primary use case", () => {
    for (const level of Object.values(UI_QUALITY_LEVELS)) {
      expect(level.primaryUseCases.length).toBeGreaterThan(0);
    }
  });

  it("every level has at least one required state", () => {
    for (const level of Object.values(UI_QUALITY_LEVELS)) {
      expect(level.requiredStates.length).toBeGreaterThan(0);
    }
  });

  it("every level has a description", () => {
    for (const level of Object.values(UI_QUALITY_LEVELS)) {
      expect(level.description.length).toBeGreaterThan(10);
    }
  });

  it("UI_QUALITY_LEVEL_IDS contains all level IDs", () => {
    const keys = Object.keys(UI_QUALITY_LEVELS) as UiQualityLevelId[];
    expect(UI_QUALITY_LEVEL_IDS).toEqual(expect.arrayContaining(keys));
    expect(UI_QUALITY_LEVEL_IDS.length).toBe(keys.length);
  });

  it("getUiQualityLevel returns the correct level", () => {
    const level = getUiQualityLevel("conversion");
    expect(level).toBeDefined();
    expect(level?.id).toBe("conversion");
  });

  it("getUiQualityLevel returns undefined for unknown id", () => {
    expect(getUiQualityLevel("does-not-exist")).toBeUndefined();
  });

  it("8 quality levels are defined", () => {
    expect(UI_QUALITY_LEVEL_IDS.length).toBe(8);
  });
});
