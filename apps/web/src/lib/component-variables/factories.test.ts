import { describe, it, expect } from "vitest";
import {
  createTextVariable,
  createNumberVariable,
  createSelectVariable,
  createMultiSelectVariable,
  createBooleanVariable,
  createViewModeVariable,
  createSortVariable,
  createDateRangeVariable,
  createSliderRangeVariable,
  createRatingVariable,
} from "./factories";
import { serializeVariable, deserializeVariable } from "./variable-serialization";
import { validateVariable } from "./variable-validation";

describe("createTextVariable", () => {
  it("uses empty string as defaultValue", () => {
    const v = createTextVariable({ id: "q", label: "Recherche" });
    expect(v.defaultValue).toBe("");
  });

  it("round-trips via URL", () => {
    const v = createTextVariable({ id: "q", label: "Recherche", urlKeys: "q" });
    const s = serializeVariable(v, "paris");
    expect(deserializeVariable(v, s!)).toBe("paris");
  });

  it("validates maxLength", () => {
    const v = createTextVariable({ id: "q", label: "Q", maxLength: 5 });
    expect(validateVariable(v, "abc")).toBeNull();
    expect(validateVariable(v, "abcdef")).toBeTruthy();
  });
});

describe("createNumberVariable", () => {
  it("uses 0 as defaultValue", () => {
    const v = createNumberVariable({ id: "n", label: "N" });
    expect(v.defaultValue).toBe(0);
  });

  it("validates min/max", () => {
    const v = createNumberVariable({ id: "n", label: "N", min: 0, max: 100 });
    expect(validateVariable(v, 50)).toBeNull();
    expect(validateVariable(v, -1)).toBeTruthy();
    expect(validateVariable(v, 101)).toBeTruthy();
  });

  it("round-trips number via URL", () => {
    const v = createNumberVariable({ id: "n", label: "N", urlKeys: "n" });
    expect(deserializeVariable(v, serializeVariable(v, 42)!)).toBe(42);
  });
});

describe("createSelectVariable", () => {
  const opts = [
    { value: "all", label: "Tous" },
    { value: "maison", label: "Maison" },
  ];

  it("uses first option as defaultValue", () => {
    const v = createSelectVariable({ id: "type", label: "Type", options: opts });
    expect(v.defaultValue).toBe("all");
  });

  it("accepts explicit defaultValue", () => {
    const v = createSelectVariable({ id: "type", label: "Type", options: opts, defaultValue: "maison" });
    expect(v.defaultValue).toBe("maison");
  });

  it("round-trips via URL", () => {
    const v = createSelectVariable({ id: "type", label: "Type", options: opts, urlKeys: "type" });
    expect(deserializeVariable(v, { type: "maison" })).toBe("maison");
  });

  it("stores options in metadata", () => {
    const v = createSelectVariable({ id: "type", label: "Type", options: opts });
    expect((v.metadata as { options: typeof opts }).options).toEqual(opts);
  });
});

describe("createMultiSelectVariable", () => {
  const opts = [{ value: "a", label: "A" }, { value: "b", label: "B" }, { value: "c", label: "C" }];

  it("defaults to empty array", () => {
    const v = createMultiSelectVariable({ id: "cats", label: "Cats", options: opts });
    expect(v.defaultValue).toEqual([]);
  });

  it("round-trips via URL (comma-joined)", () => {
    const v = createMultiSelectVariable({ id: "cats", label: "Cats", options: opts, urlKeys: "cats" });
    const serialized = serializeVariable(v, ["a", "c"]);
    expect(serialized).toEqual({ cats: "a,c" });
    expect(deserializeVariable(v, serialized!)).toEqual(["a", "c"]);
  });

  it("deserializes empty string to empty array", () => {
    const v = createMultiSelectVariable({ id: "cats", label: "Cats", options: opts, urlKeys: "cats" });
    expect(deserializeVariable(v, { cats: "" })).toEqual([]);
  });
});

describe("createBooleanVariable", () => {
  it("defaults to false", () => {
    const v = createBooleanVariable({ id: "inStock", label: "En stock" });
    expect(v.defaultValue).toBe(false);
  });

  it("round-trips true/false", () => {
    const v = createBooleanVariable({ id: "inStock", label: "En stock", urlKeys: "inStock" });
    expect(deserializeVariable(v, { inStock: "true" })).toBe(true);
    expect(deserializeVariable(v, { inStock: "false" })).toBe(false);
  });
});

describe("createViewModeVariable", () => {
  it("defaults to grid", () => {
    const v = createViewModeVariable();
    expect(v.defaultValue).toBe("grid");
    expect(v.id).toBe("viewMode");
  });

  it("accepts list as defaultValue", () => {
    const v = createViewModeVariable({ defaultValue: "list" });
    expect(v.defaultValue).toBe("list");
  });

  it("deserializes invalid value to grid", () => {
    const v = createViewModeVariable({ urlKeys: "view" });
    expect(deserializeVariable(v, { view: "invalid" })).toBe("grid");
  });
});

describe("createSortVariable", () => {
  const fields = [{ value: "price", label: "Prix" }, { value: "name", label: "Nom" }];

  it("defaults to first field, asc", () => {
    const v = createSortVariable({ id: "sort", label: "Tri", fields });
    expect(v.defaultValue).toEqual({ field: "price", direction: "asc" });
  });

  it("round-trips via URL", () => {
    const v = createSortVariable({
      id: "sort",
      label: "Tri",
      fields,
      urlKeys: { field: "sortField", direction: "sortDir" },
    });
    const serialized = serializeVariable(v, { field: "name", direction: "desc" as const });
    expect(serialized).toEqual({ sortField: "name", sortDir: "desc" });
    expect(deserializeVariable(v, serialized!)).toEqual({ field: "name", direction: "desc" });
  });
});

describe("createDateRangeVariable", () => {
  it("defaults to empty strings", () => {
    const v = createDateRangeVariable({ id: "dates", label: "Dates" });
    expect(v.defaultValue).toEqual({ from: "", to: "" });
  });

  it("round-trips via URL", () => {
    const v = createDateRangeVariable({
      id: "dates",
      label: "Dates",
      urlKeys: { from: "dateFrom", to: "dateTo" },
    });
    const serialized = serializeVariable(v, { from: "2026-01-01", to: "2026-12-31" });
    expect(serialized).toEqual({ dateFrom: "2026-01-01", dateTo: "2026-12-31" });
    expect(deserializeVariable(v, serialized!)).toEqual({ from: "2026-01-01", to: "2026-12-31" });
  });
});

describe("createSliderRangeVariable", () => {
  it("defaults to full range", () => {
    const v = createSliderRangeVariable({ id: "price", label: "Prix", min: 0, max: 1000000 });
    expect(v.defaultValue).toEqual({ min: 0, max: 1000000 });
  });

  it("validates min > max", () => {
    const v = createSliderRangeVariable({ id: "price", label: "Prix", min: 0, max: 1000000 });
    expect(validateVariable(v, { min: 500, max: 100 })).toBeTruthy();
  });

  it("validates bounds", () => {
    const v = createSliderRangeVariable({ id: "price", label: "Prix", min: 0, max: 1000000 });
    expect(validateVariable(v, { min: -1, max: 100 })).toBeTruthy();
    expect(validateVariable(v, { min: 0, max: 1000001 })).toBeTruthy();
    expect(validateVariable(v, { min: 0, max: 1000000 })).toBeNull();
  });

  it("round-trips via URL", () => {
    const v = createSliderRangeVariable({
      id: "price",
      label: "Prix",
      min: 0,
      max: 1000000,
      urlKeys: { min: "minPrice", max: "maxPrice" },
    });
    const serialized = serializeVariable(v, { min: 100000, max: 500000 });
    expect(serialized).toEqual({ minPrice: "100000", maxPrice: "500000" });
    expect(deserializeVariable(v, serialized!)).toEqual({ min: 100000, max: 500000 });
  });
});

describe("createRatingVariable", () => {
  it("defaults to 0", () => {
    const v = createRatingVariable({ id: "rating", label: "Note" });
    expect(v.defaultValue).toBe(0);
  });

  it("validates range", () => {
    const v = createRatingVariable({ id: "rating", label: "Note", max: 5 });
    expect(validateVariable(v, -1)).toBeTruthy();
    expect(validateVariable(v, 6)).toBeTruthy();
    expect(validateVariable(v, 3)).toBeNull();
  });
});
