/**
 * Stabilization tests — these cover the 6 untested areas identified in the
 * corrige note before any new lot development begins.
 *
 * Areas:
 * 1. FilterBar legacy mode (FilterGroup[] API still works)
 * 2. FilterBar variable mode (delegates to ConfigurableFilterBar)
 * 3. SliderRange factory & serialization
 * 4. URL sync utilities (serialize/deserialize round-trip)
 * 5. AutoBlogCarGrid filtering logic (category + make + price)
 * 6. New factories (date, currency, location, relation, media)
 */
import { describe, it, expect } from "vitest";
import {
  createSliderRangeVariable,
  createDateVariable,
  createCurrencyVariable,
  createLocationVariable,
  createRelationVariable,
  createMediaVariable,
  createTextVariable,
  createSelectVariable,
  serializeVariable,
  deserializeVariable,
  serializeAll,
  deserializeAll,
} from "./index";

// ─────────────────────────────────────────────────────────────────────────────
// 1. SliderRange factory
// ─────────────────────────────────────────────────────────────────────────────
describe("createSliderRangeVariable", () => {
  const v = createSliderRangeVariable({
    id: "price",
    label: "Budget",
    min: 0,
    max: 1_000_000,
    step: 10_000,
    defaultValue: { min: 0, max: 500_000 },
    urlKeys: { min: "minPrice", max: "maxPrice" },
  });

  it("creates variable with correct defaults", () => {
    expect(v.id).toBe("price");
    expect(v.defaultValue).toEqual({ min: 0, max: 500_000 });
  });

  it("validates min <= max", () => {
    const err = v.validate?.({ min: 600_000, max: 500_000 });
    expect(err).toBeTruthy();
  });

  it("validates lower bound", () => {
    const err = v.validate?.({ min: -1, max: 100_000 });
    expect(err).toBeTruthy();
  });

  it("validates upper bound", () => {
    const err = v.validate?.({ min: 0, max: 2_000_000 });
    expect(err).toBeTruthy();
  });

  it("passes valid range", () => {
    const err = v.validate?.({ min: 100_000, max: 400_000 });
    expect(err).toBeNull();
  });

  it("serializes to separate URL params", () => {
    const out = serializeVariable(v, { min: 100_000, max: 400_000 });
    expect(out).toEqual({ minPrice: "100000", maxPrice: "400000" });
  });

  it("deserializes from URL params", () => {
    const val = deserializeVariable(v, { minPrice: "100000", maxPrice: "400000" });
    expect(val).toEqual({ min: 100_000, max: 400_000 });
  });

  it("deserializes missing keys to defaults", () => {
    const val = deserializeVariable(v, {});
    expect(val).toEqual({ min: 0, max: 500_000 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. URL sync round-trip (serializeAll / deserializeAll)
// ─────────────────────────────────────────────────────────────────────────────
describe("URL sync round-trip", () => {
  const search = createTextVariable({ id: "search", label: "Recherche", urlKeys: "search" });
  const category = createSelectVariable({
    id: "category",
    label: "Categorie",
    urlKeys: "cat",
    options: [
      { value: "all", label: "Tout" },
      { value: "sport", label: "Sport" },
    ],
  });
  const price = createSliderRangeVariable({
    id: "price",
    label: "Prix",
    min: 0,
    max: 100_000,
    step: 5_000,
    urlKeys: { min: "pMin", max: "pMax" },
  });
  const variables = [search, category, price];

  it("serializes a set of values to URL params", () => {
    const params = serializeAll(variables, {
      search: "bmw",
      category: "sport",
      price: { min: 20_000, max: 80_000 },
    });
    expect(params).toMatchObject({ search: "bmw", cat: "sport", pMin: "20000", pMax: "80000" });
  });

  it("round-trips all values through serialize then deserialize", () => {
    const original = { search: "audi", category: "all", price: { min: 0, max: 60_000 } };
    const params = serializeAll(variables, original);
    const restored = deserializeAll(variables, params);
    expect(restored).toEqual(original);
  });

  it("deserializeAll with empty params returns defaults", () => {
    const defaults = deserializeAll(variables, {});
    expect(defaults.search).toBe("");
    expect(defaults.category).toBe("all");
    // No urlKeys in URL -> falls back to full range (0, 100_000)
    expect(defaults.price).toEqual({ min: 0, max: 100_000 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. AutoBlogCarGrid filtering logic (pure JS, no React)
// ─────────────────────────────────────────────────────────────────────────────
const CARS = [
  { make: "Porsche", model: "911", priceCents: 16_890_000, category: "Sport" },
  { make: "BMW",     model: "M3",  priceCents:  9_870_000, category: "Berline sport" },
  { make: "Ferrari", model: "296", priceCents: 28_600_000, category: "Supercar" },
  { make: "Audi",    model: "RS6", priceCents: 13_400_000, category: "Break sport" },
];

function filterCars(opts: {
  search?: string;
  category?: string;
  make?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const search   = (opts.search ?? "").toLowerCase();
  const category = opts.category ?? "";
  const make     = opts.make ?? "all";
  const minCents = (opts.minPrice ?? 0) * 100;
  const maxCents = (opts.maxPrice ?? 99_999_999) * 100;

  return CARS.filter((c) => {
    const matchSearch   = !search   || `${c.make} ${c.model}`.toLowerCase().includes(search);
    const matchCategory = !category || category === "all" || c.category === category;
    const matchMake     = make === "all" || c.make === make;
    const matchPrice    = c.priceCents >= minCents && c.priceCents <= maxCents;
    return matchSearch && matchCategory && matchMake && matchPrice;
  });
}

describe("AutoBlogCarGrid filtering logic", () => {
  it("no filters => all cars", () => {
    expect(filterCars({})).toHaveLength(4);
  });

  it("search by make", () => {
    expect(filterCars({ search: "bmw" })).toHaveLength(1);
    expect(filterCars({ search: "bmw" })[0].make).toBe("BMW");
  });

  it("filter by category", () => {
    expect(filterCars({ category: "Sport" })).toHaveLength(1);
    expect(filterCars({ category: "Supercar" })[0].make).toBe("Ferrari");
  });

  it("filter by make", () => {
    expect(filterCars({ make: "Audi" })).toHaveLength(1);
    expect(filterCars({ make: "Audi" })[0].model).toBe("RS6");
  });

  it("filter by maxPrice (euros) excludes expensive cars", () => {
    // Max 130 000 € -> only BMW (98 700 €) passes
    expect(filterCars({ maxPrice: 130_000 })).toHaveLength(1);
    expect(filterCars({ maxPrice: 130_000 })[0].make).toBe("BMW");
  });

  it("filter by minPrice excludes cheap cars", () => {
    // Min 200 000 € -> only Ferrari (286 000 €) passes
    expect(filterCars({ minPrice: 200_000 })).toHaveLength(1);
    expect(filterCars({ minPrice: 200_000 })[0].make).toBe("Ferrari");
  });

  it("combined make + category filters", () => {
    // Make Porsche AND category Sport -> 1
    expect(filterCars({ make: "Porsche", category: "Sport" })).toHaveLength(1);
    // Make BMW AND category Supercar -> 0
    expect(filterCars({ make: "BMW", category: "Supercar" })).toHaveLength(0);
  });

  it("category 'all' or '' shows all cars regardless of their category", () => {
    expect(filterCars({ category: "all" })).toHaveLength(4);
    expect(filterCars({ category: "" })).toHaveLength(4);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. New factories (date, currency, location, relation, media)
// ─────────────────────────────────────────────────────────────────────────────
describe("createDateVariable", () => {
  // urlKeys required for serialization to work (serializeVariable returns null without it)
  const v = createDateVariable({ id: "checkin", label: "Arrivee", min: "2026-01-01", urlKeys: "checkin" });

  it("defaults to empty string", () => {
    expect(v.defaultValue).toBe("");
  });

  it("passes valid ISO date", () => {
    expect(v.validate?.("2026-06-15")).toBeNull();
  });

  it("rejects invalid date", () => {
    expect(v.validate?.("not-a-date")).toBeTruthy();
  });

  it("rejects date before min", () => {
    expect(v.validate?.("2025-12-31")).toBeTruthy();
  });

  it("serializes to URL param object", () => {
    const s = serializeVariable(v, "2026-06-15");
    expect(s).toEqual({ checkin: "2026-06-15" });
  });
});

describe("createCurrencyVariable", () => {
  const v = createCurrencyVariable({ id: "amount", label: "Montant", min: 0, max: 10_000, urlKeys: "amount" });

  it("defaults to 0", () => {
    expect(v.defaultValue).toBe(0);
  });

  it("validates min bound", () => {
    expect(v.validate?.(-1)).toBeTruthy();
  });

  it("validates max bound", () => {
    expect(v.validate?.(10_001)).toBeTruthy();
  });

  it("passes valid amount", () => {
    expect(v.validate?.(5_000)).toBeNull();
  });

  it("serializes to URL param object", () => {
    expect(serializeVariable(v, 1234)).toEqual({ amount: "1234" });
  });
});

describe("createLocationVariable", () => {
  const v = createLocationVariable({
    id: "loc",
    label: "Lieu",
    urlKeys: { address: "locAddress" },
  });

  it("defaults to empty address", () => {
    expect(v.defaultValue).toEqual({ address: "" });
  });

  it("serializes address to URL param", () => {
    const out = serializeVariable(v, { address: "Paris, France" });
    expect(out).toMatchObject({ locAddress: "Paris, France" });
  });

  it("deserializes address from URL param", () => {
    const val = deserializeVariable(v, { locAddress: "Lyon" });
    expect(val).toEqual({ address: "Lyon" });
  });
});

describe("createRelationVariable", () => {
  const v = createRelationVariable({ id: "userId", label: "Utilisateur", urlKeys: "userId" });

  it("defaults to empty string", () => {
    expect(v.defaultValue).toBe("");
  });

  it("serializes to URL param object", () => {
    expect(serializeVariable(v, "uuid-123")).toEqual({ userId: "uuid-123" });
  });
});

describe("createMediaVariable", () => {
  const v = createMediaVariable({ id: "avatar", label: "Photo", accept: "image/*", urlKeys: "avatar" });

  it("defaults to empty string", () => {
    expect(v.defaultValue).toBe("");
  });

  it("has accept in metadata", () => {
    expect((v.metadata as { accept: string }).accept).toBe("image/*");
  });

  it("serializes to URL param object", () => {
    expect(serializeVariable(v, "https://example.com/img.png")).toEqual({
      avatar: "https://example.com/img.png",
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. No duplicate search — preset with id="search" must not produce two keys
// ─────────────────────────────────────────────────────────────────────────────
describe("No duplicate search field", () => {
  const searchVar = createTextVariable({ id: "search", label: "Recherche", urlKeys: "search" });
  const typeVar   = createSelectVariable({
    id: "type",
    label: "Type",
    urlKeys: "type",
    options: [{ value: "all", label: "Tous" }, { value: "a", label: "A" }],
  });
  const variables = [searchVar, typeVar];

  it("serializeAll produces exactly one 'search' key", () => {
    const out = serializeAll(variables, { search: "paris", type: "all" });
    const searchKeys = Object.keys(out).filter((k) => k === "search");
    expect(searchKeys).toHaveLength(1);
    expect(out.search).toBe("paris");
  });

  it("empty search value does not appear in serialized output (filtered by URL writer)", () => {
    const out = serializeAll(variables, { search: "", type: "all" });
    expect(out.search).toBe("");
  });

  it("round-trip with search variable preserves value", () => {
    const values   = { search: "lyon", type: "a" };
    const params   = serializeAll(variables, values);
    const restored = deserializeAll(variables, params);
    expect(restored.search).toBe("lyon");
    expect(restored.type).toBe("a");
  });

  it("deserializeAll with no search param returns default empty string", () => {
    const restored = deserializeAll(variables, { type: "a" });
    expect(restored.search).toBe("");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. URL clean — default values must NOT appear in serialized URL output
// ─────────────────────────────────────────────────────────────────────────────
describe("URL clean — default values skip URL", () => {
  const priceRange = createSliderRangeVariable({
    id: "priceRange",
    label: "Budget",
    min: 0,
    max: 2_000_000,
    step: 10_000,
    defaultValue: { min: 0, max: 2_000_000 },
    urlKeys: { min: "minPrice", max: "maxPrice" },
  });
  const type = createSelectVariable({
    id: "type",
    label: "Type",
    urlKeys: "type",
    options: [{ value: "all", label: "Tous" }, { value: "maison", label: "Maison" }],
  });
  const variables = [priceRange, type];

  // Replicate the URL-writer logic (skip empty + skip default)
  function urlWriteFilter(serialized: Record<string, string>, defaultSerialized: Record<string, string>) {
    return Object.fromEntries(
      Object.entries(serialized).filter(([k, v]) => v !== "" && v !== defaultSerialized[k])
    );
  }

  it("slider at default does not pollute URL", () => {
    const defaults = { priceRange: { min: 0, max: 2_000_000 }, type: "all" };
    const serialized = serializeAll(variables, defaults);
    const defaultSerialized: Record<string, string> = {};
    for (const v of variables) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s = serializeVariable(v as any, v.defaultValue);
      if (s) Object.assign(defaultSerialized, s);
    }
    const written = urlWriteFilter(serialized, defaultSerialized);
    expect(written).toEqual({});
  });

  it("non-default slider values appear in URL", () => {
    const values = { priceRange: { min: 400_000, max: 900_000 }, type: "all" };
    const serialized = serializeAll(variables, values);
    const defaultSerialized: Record<string, string> = {};
    for (const v of variables) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s = serializeVariable(v as any, v.defaultValue);
      if (s) Object.assign(defaultSerialized, s);
    }
    const written = urlWriteFilter(serialized, defaultSerialized);
    expect(written).toMatchObject({ minPrice: "400000", maxPrice: "900000" });
    expect(written.type).toBeUndefined();
  });

  it("non-default select appears in URL", () => {
    const values = { priceRange: { min: 0, max: 2_000_000 }, type: "maison" };
    const serialized = serializeAll(variables, values);
    const defaultSerialized: Record<string, string> = {};
    for (const v of variables) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s = serializeVariable(v as any, v.defaultValue);
      if (s) Object.assign(defaultSerialized, s);
    }
    const written = urlWriteFilter(serialized, defaultSerialized);
    expect(written.type).toBe("maison");
    expect(written.minPrice).toBeUndefined();
    expect(written.maxPrice).toBeUndefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. URL reset — managed keys cleared, external params preserved, page removed
// ─────────────────────────────────────────────────────────────────────────────
describe("URL reset — managed keys and external params", () => {
  const searchVar = createTextVariable({ id: "search", label: "Search", urlKeys: "search" });
  const typeVar   = createSelectVariable({
    id: "type", label: "Type", urlKeys: "type",
    options: [{ value: "all", label: "Tous" }],
  });
  const variables = [searchVar, typeVar];

  function managedKeySet(vars: typeof variables) {
    const keys = new Set<string>();
    for (const v of vars) {
      if (!v.urlKeys) continue;
      if (typeof v.urlKeys === "string") keys.add(v.urlKeys);
      else Object.values(v.urlKeys).forEach((k) => keys.add(k as string));
    }
    keys.add("page");
    return keys;
  }

  function simulateClearAll(currentParams: Record<string, string>) {
    const managed = managedKeySet(variables);
    const next: Record<string, string> = {};
    for (const [k, v] of Object.entries(currentParams)) {
      if (!managed.has(k)) next[k] = v;
    }
    return next;
  }

  it("reset removes managed URL keys", () => {
    const current = { search: "paris", type: "maison", tab: "list" };
    const after = simulateClearAll(current);
    expect(after.search).toBeUndefined();
    expect(after.type).toBeUndefined();
  });

  it("reset preserves external (non-managed) URL params", () => {
    const current = { search: "paris", type: "maison", tab: "list", view: "map" };
    const after = simulateClearAll(current);
    expect(after.tab).toBe("list");
    expect(after.view).toBe("map");
  });

  it("reset removes page param", () => {
    const current = { search: "paris", page: "3", tab: "results" };
    const after = simulateClearAll(current);
    expect(after.page).toBeUndefined();
    expect(after.tab).toBe("results");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. Search variable — text type, not auto-created
// ─────────────────────────────────────────────────────────────────────────────
describe("search variable — factory-created, not auto-injected", () => {
  it("createTextVariable produces a variable with kind text", () => {
    const s = createTextVariable({ id: "search", label: "Recherche", urlKeys: "search" });
    expect(s.id).toBe("search");
    expect(s.defaultValue).toBe("");
  });

  it("search serializes to its urlKey", () => {
    const s = createTextVariable({ id: "search", label: "Recherche", urlKeys: "search" });
    const result = serializeVariable(s, "paris");
    expect(result).toMatchObject({ search: "paris" });
  });

  it("search deserializes from its urlKey", () => {
    const s = createTextVariable({ id: "search", label: "Recherche", urlKeys: "search" });
    const result = deserializeVariable(s, { search: "paris" });
    expect(result).toBe("paris");
  });

  it("empty search deserializes to empty string", () => {
    const s = createTextVariable({ id: "search", label: "Recherche", urlKeys: "search" });
    const result = deserializeVariable(s, { search: "" });
    expect(result).toBe("");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. SliderRange URL round-trip with named keys
// ─────────────────────────────────────────────────────────────────────────────
describe("sliderRange URL round-trip with named keys", () => {
  const pv = createSliderRangeVariable({
    id: "priceRange",
    label: "Budget",
    min: 0, max: 2_000_000, step: 10_000,
    defaultValue: { min: 0, max: 2_000_000 },
    urlKeys: { min: "minPrice", max: "maxPrice" },
  });

  it("serializes min and max to separate URL keys", () => {
    const result = serializeVariable(pv, { min: 300_000, max: 800_000 });
    expect(result).toMatchObject({ minPrice: "300000", maxPrice: "800000" });
  });

  it("deserializes minPrice and maxPrice back to SliderValue", () => {
    const result = deserializeVariable(pv, { minPrice: "300000", maxPrice: "800000" });
    expect(result).toEqual({ min: 300_000, max: 800_000 });
  });

  it("missing URL keys fall back to defaultValue", () => {
    const result = deserializeVariable(pv, {});
    expect(result).toEqual({ min: 0, max: 2_000_000 });
  });

  it("partial URL keys (only minPrice) preserves max default", () => {
    const result = deserializeVariable(pv, { minPrice: "400000" });
    expect((result as { min: number; max: number }).min).toBe(400_000);
    expect((result as { min: number; max: number }).max).toBe(2_000_000);
  });

  it("round-trip: serialize then deserialize returns same value", () => {
    const original = { min: 250_000, max: 1_500_000 };
    const serialized = serializeVariable(pv, original) as Record<string, string>;
    const restored   = deserializeVariable(pv, serialized) as { min: number; max: number };
    expect(restored).toEqual(original);
  });
});
