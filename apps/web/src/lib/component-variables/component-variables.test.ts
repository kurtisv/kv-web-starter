import { describe, it, expect } from "vitest";
import type { ComponentVariable } from "./types";
import { createComponentVariable } from "./create-component-variable";
import { validateVariable, validateAll, isFormValid } from "./variable-validation";
import { serializeVariable, deserializeVariable, serializeAll, deserializeAll } from "./variable-serialization";
import { isVariableVisible, isVariableDisabled } from "./variable-visibility";
import { getDependents, buildDependencyMap, topoSort } from "./variable-dependencies";
import { createVariableValueStore } from "./variable-value-store";

// ── createComponentVariable ───────────────────────────────────────────────────
describe("createComponentVariable", () => {
  it("returns the config object unchanged when valid", () => {
    const v = createComponentVariable({ id: "search", label: "Recherche", defaultValue: "" });
    expect(v.id).toBe("search");
    expect(v.defaultValue).toBe("");
  });

  it("throws when id is empty", () => {
    expect(() =>
      createComponentVariable({ id: "", label: "X", defaultValue: 0 })
    ).toThrow();
  });

  it("throws when label is empty", () => {
    expect(() =>
      createComponentVariable({ id: "x", label: "", defaultValue: 0 })
    ).toThrow();
  });

  it("throws when defaultValue is undefined", () => {
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createComponentVariable({ id: "x", label: "X", defaultValue: undefined as any })
    ).toThrow();
  });

  it("accepts complex defaultValue", () => {
    const v = createComponentVariable({
      id: "range",
      label: "Prix",
      defaultValue: { min: 0, max: 500000 },
    });
    expect(v.defaultValue).toEqual({ min: 0, max: 500000 });
  });
});

// ── validateVariable ──────────────────────────────────────────────────────────
describe("validateVariable", () => {
  const v = createComponentVariable({
    id: "age",
    label: "Age",
    defaultValue: 0,
    validate: (val) => (val < 0 ? "Doit etre positif" : null),
  });

  it("returns null when valid", () => {
    expect(validateVariable(v, 25)).toBeNull();
  });

  it("returns error message when invalid", () => {
    expect(validateVariable(v, -1)).toBe("Doit etre positif");
  });

  it("returns null when no validate fn", () => {
    const simple = createComponentVariable({ id: "x", label: "X", defaultValue: "" });
    expect(validateVariable(simple, "anything")).toBeNull();
  });

  it("passes context to validate", () => {
    const dependent = createComponentVariable({
      id: "max",
      label: "Max",
      defaultValue: 100,
      validate: (val, ctx) =>
        ctx && (ctx.min as number) > val ? "Max doit etre superieur a min" : null,
    });
    expect(validateVariable(dependent, 50, { min: 80 })).toBe("Max doit etre superieur a min");
    expect(validateVariable(dependent, 150, { min: 80 })).toBeNull();
  });
});

// ── validateAll / isFormValid ─────────────────────────────────────────────────
describe("validateAll / isFormValid", () => {
  const vars: ComponentVariable[] = [
    createComponentVariable({ id: "a", label: "A", defaultValue: "", validate: (v) => ((v as string) === "" ? "Requis" : null) }),
    createComponentVariable({ id: "b", label: "B", defaultValue: 0, validate: (v) => ((v as number) < 0 ? "Negatif" : null) }),
  ];

  it("returns errors map", () => {
    const errors = validateAll(vars, { a: "", b: 5 });
    expect(errors.a).toBe("Requis");
    expect(errors.b).toBeNull();
  });

  it("isFormValid true when all pass", () => {
    expect(isFormValid(vars, { a: "hello", b: 5 })).toBe(true);
  });

  it("isFormValid false when one fails", () => {
    expect(isFormValid(vars, { a: "", b: 5 })).toBe(false);
  });
});

// ── serialize / deserialize ───────────────────────────────────────────────────
describe("serializeVariable / deserializeVariable", () => {
  const textVar = createComponentVariable({
    id: "search",
    label: "Recherche",
    defaultValue: "",
    urlKeys: "q",
  });

  it("serializes string value", () => {
    expect(serializeVariable(textVar, "paris")).toEqual({ q: "paris" });
  });

  it("returns null when no urlKeys", () => {
    const noUrl = createComponentVariable({ id: "x", label: "X", defaultValue: "" });
    expect(serializeVariable(noUrl, "val")).toBeNull();
  });

  it("deserializes from params", () => {
    expect(deserializeVariable(textVar, { q: "paris" })).toBe("paris");
  });

  it("returns defaultValue when param missing", () => {
    expect(deserializeVariable(textVar, {})).toBe("");
  });

  it("round-trips number", () => {
    const numVar = createComponentVariable({ id: "page", label: "Page", defaultValue: 1, urlKeys: "page" });
    const serialized = serializeVariable(numVar, 3);
    expect(deserializeVariable(numVar, serialized!)).toBe(3);
  });

  it("round-trips boolean", () => {
    const boolVar = createComponentVariable({ id: "inStock", label: "En stock", defaultValue: false, urlKeys: "inStock" });
    expect(deserializeVariable(boolVar, { inStock: "true" })).toBe(true);
    expect(deserializeVariable(boolVar, { inStock: "false" })).toBe(false);
  });

  it("uses custom serialize/deserialize when provided", () => {
    const rangeVar = createComponentVariable({
      id: "price",
      label: "Prix",
      defaultValue: { min: 0, max: 1000 },
      urlKeys: { min: "minPrice", max: "maxPrice" },
      serialize: ({ min, max }) => ({ minPrice: String(min), maxPrice: String(max) }),
      deserialize: (raw) => {
        const r = raw as Record<string, string>;
        return { min: Number(r.minPrice), max: Number(r.maxPrice) };
      },
    });
    const serialized = serializeVariable(rangeVar, { min: 100, max: 500 });
    expect(serialized).toEqual({ minPrice: "100", maxPrice: "500" });
    expect(deserializeVariable(rangeVar, { minPrice: "100", maxPrice: "500" })).toEqual({ min: 100, max: 500 });
  });
});

describe("serializeAll / deserializeAll", () => {
  const vars: ComponentVariable[] = [
    createComponentVariable({ id: "q", label: "Recherche", defaultValue: "", urlKeys: "q" }),
    createComponentVariable({ id: "type", label: "Type", defaultValue: "all", urlKeys: "type" }),
    createComponentVariable({ id: "local", label: "Local", defaultValue: 42 }), // no urlKeys
  ];

  it("serializeAll includes only url-synced vars", () => {
    const result = serializeAll(vars, { q: "paris", type: "maison", local: 42 });
    expect(result).toEqual({ q: "paris", type: "maison" });
    expect(result.local).toBeUndefined();
  });

  it("deserializeAll falls back to defaults for non-url vars", () => {
    const result = deserializeAll(vars, { q: "nice", type: "studio" });
    expect(result.q).toBe("nice");
    expect(result.type).toBe("studio");
    expect(result.local).toBe(42);
  });
});

// ── isVisible / isDisabled ────────────────────────────────────────────────────
describe("isVariableVisible / isVariableDisabled", () => {
  const conditional = createComponentVariable({
    id: "rooms",
    label: "Pieces",
    defaultValue: "all",
    isVisible: (ctx) => (ctx as Record<string, unknown>).type !== "all",
    isDisabled: (ctx) => (ctx as Record<string, unknown>).locked === true,
  });

  it("isVisible: returns true when condition met", () => {
    expect(isVariableVisible(conditional, { type: "appartement" })).toBe(true);
  });

  it("isVisible: returns false when condition not met", () => {
    expect(isVariableVisible(conditional, { type: "all" })).toBe(false);
  });

  it("isVisible: returns true when no isVisible fn", () => {
    const plain = createComponentVariable({ id: "x", label: "X", defaultValue: "" });
    expect(isVariableVisible(plain, {})).toBe(true);
  });

  it("isDisabled: returns true when disabled", () => {
    expect(isVariableDisabled(conditional, { locked: true })).toBe(true);
  });

  it("isDisabled: returns false by default", () => {
    const plain = createComponentVariable({ id: "x", label: "X", defaultValue: "" });
    expect(isVariableDisabled(plain, {})).toBe(false);
  });
});

// ── dependencies ──────────────────────────────────────────────────────────────
describe("getDependents / buildDependencyMap / topoSort", () => {
  const vars: ComponentVariable[] = [
    createComponentVariable({ id: "type", label: "Type", defaultValue: "all" }),
    createComponentVariable({ id: "rooms", label: "Pieces", defaultValue: "all", dependencies: ["type"] }),
    createComponentVariable({ id: "price", label: "Prix", defaultValue: 0, dependencies: ["type", "rooms"] }),
  ];

  it("getDependents finds vars that depend on changed id", () => {
    const deps = getDependents(vars, "type");
    expect(deps.map((d) => d.id)).toEqual(["rooms", "price"]);
  });

  it("getDependents returns empty when no dependents", () => {
    expect(getDependents(vars, "price")).toHaveLength(0);
  });

  it("buildDependencyMap maps id to its dependencies", () => {
    const map = buildDependencyMap(vars);
    expect(map.type).toEqual([]);
    expect(map.rooms).toEqual(["type"]);
    expect(map.price).toEqual(["type", "rooms"]);
  });

  it("topoSort puts dependencies before dependents", () => {
    const sorted = topoSort(vars);
    const typeIdx  = sorted.findIndex((v) => v.id === "type");
    const roomsIdx = sorted.findIndex((v) => v.id === "rooms");
    const priceIdx = sorted.findIndex((v) => v.id === "price");
    expect(typeIdx).toBeLessThan(roomsIdx);
    expect(roomsIdx).toBeLessThan(priceIdx);
  });
});

// ── createVariableValueStore ──────────────────────────────────────────────────
describe("createVariableValueStore", () => {
  const vars = [
    createComponentVariable({ id: "q", label: "Q", defaultValue: "" }),
    createComponentVariable({ id: "page", label: "Page", defaultValue: 1 }),
  ];

  it("seeds values from defaultValue", () => {
    const store = createVariableValueStore(vars);
    expect(store.get("q")).toBe("");
    expect(store.get("page")).toBe(1);
  });

  it("seeds from initial override", () => {
    const store = createVariableValueStore(vars, { q: "paris" });
    expect(store.get("q")).toBe("paris");
  });

  it("set updates value", () => {
    const store = createVariableValueStore(vars);
    store.set("q", "lyon");
    expect(store.get("q")).toBe("lyon");
  });

  it("reset restores defaults", () => {
    const store = createVariableValueStore(vars, { q: "marseille" });
    store.set("page", 5);
    store.reset();
    expect(store.get("q")).toBe("");
    expect(store.get("page")).toBe(1);
  });

  it("resolveAll returns full resolved state", () => {
    const store = createVariableValueStore(vars);
    const resolved = store.resolveAll();
    expect(resolved).toHaveLength(2);
    expect(resolved[0].variable.id).toBe("q");
    expect(resolved[0].isVisible).toBe(true);
    expect(resolved[0].isDisabled).toBe(false);
    expect(resolved[0].error).toBeNull();
  });

  it("resolveAll surfaces validation errors", () => {
    const withValidation = [
      createComponentVariable({ id: "age", label: "Age", defaultValue: -1, validate: (v) => (v < 0 ? "Negatif" : null) }),
    ];
    const store = createVariableValueStore(withValidation);
    const resolved = store.resolveAll();
    expect(resolved[0].error).toBe("Negatif");
  });
});
