import { describe, it, expect } from "vitest";
import { COMPONENT_REGISTRY } from "./component-registry";
import type { ComponentCapability } from "./types";

describe("COMPONENT_REGISTRY", () => {
  it("exports a non-empty array", () => {
    expect(Array.isArray(COMPONENT_REGISTRY)).toBe(true);
    expect(COMPONENT_REGISTRY.length).toBeGreaterThanOrEqual(20);
  });

  it("every entry has a unique id", () => {
    const ids = COMPONENT_REGISTRY.map((c) => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("every id is kebab-case", () => {
    for (const cap of COMPONENT_REGISTRY) {
      expect(cap.id, `id "${cap.id}" must be kebab-case`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("every entry has a non-empty name", () => {
    for (const cap of COMPONENT_REGISTRY) {
      expect(cap.name.length).toBeGreaterThan(0);
    }
  });

  it("every importPath starts with @/", () => {
    for (const cap of COMPONENT_REGISTRY) {
      expect(cap.importPath, `importPath for "${cap.id}" must start with @/`).toMatch(/^@\//);
    }
  });

  it("every entry has at least one domain", () => {
    for (const cap of COMPONENT_REGISTRY) {
      expect(cap.domains.length).toBeGreaterThan(0);
    }
  });

  it("every entry has at least one tag", () => {
    for (const cap of COMPONENT_REGISTRY) {
      expect(cap.tags.length).toBeGreaterThan(0);
    }
  });

  it("maturity is one of the valid values", () => {
    const valid = new Set(["production", "stable", "beta", "experimental", "demo-only"]);
    for (const cap of COMPONENT_REGISTRY) {
      expect(valid.has(cap.maturity)).toBe(true);
    }
  });

  it("every entry has a description", () => {
    for (const cap of COMPONENT_REGISTRY) {
      expect(cap.description.length).toBeGreaterThan(10);
    }
  });

  it("contains key stable components", () => {
    const ids = new Set(COMPONENT_REGISTRY.map((c) => c.id));
    const required = [
      "hero-section",
      "configurable-filter-bar",
      "metric-card",
      "product-card",
      "booking-form",
      "dashboard-shell",
      "endpoint-row",
    ];
    for (const id of required) {
      expect(ids.has(id)).toBe(true);
    }
  });

  it("no demo-only component is in 'general' or 'saas' domain", () => {
    const demoOnly = COMPONENT_REGISTRY.filter((c) => c.maturity === "demo-only");
    for (const cap of demoOnly) {
      expect(cap.domains).not.toContain("general");
      expect(cap.domains).not.toContain("saas");
    }
  });

  it("components with examples have valid importStatement and usage", () => {
    const withExamples = COMPONENT_REGISTRY.filter((c) => c.examples && c.examples.length > 0);
    for (const cap of withExamples) {
      for (const ex of cap.examples!) {
        expect(ex.importStatement.length).toBeGreaterThan(0);
        expect(ex.usage.length).toBeGreaterThan(0);
        expect(ex.label.length).toBeGreaterThan(0);
      }
    }
  });

  describe("domain coverage", () => {
    const domains = [
      "general", "academy", "saas", "ecommerce", "real-estate",
      "auto-blog", "booking", "dashboard", "api", "portfolio",
    ] as const;

    for (const domain of domains) {
      it(`has at least one stable component for domain "${domain}"`, () => {
        const found = COMPONENT_REGISTRY.filter(
          (c) => c.domains.includes(domain) && (c.maturity === "stable" || c.maturity === "beta")
        );
        expect(found.length).toBeGreaterThan(0);
      });
    }
  });

  describe("category coverage", () => {
    const expectedCategories = [
      "section", "card", "filter", "form", "table",
      "metric", "layout", "badge", "timeline", "drawer",
    ] as const;

    for (const cat of expectedCategories) {
      it(`has at least one component with category "${cat}"`, () => {
        const found = COMPONENT_REGISTRY.filter((c) => c.category === cat);
        expect(found.length).toBeGreaterThan(0);
      });
    }
  });
});

describe("ComponentCapability shape", () => {
  it("all entries are valid ComponentCapability objects", () => {
    const requiredFields: Array<keyof ComponentCapability> = [
      "id", "name", "importPath", "category", "domains",
      "description", "useCases", "compatibleVariables",
      "supportedStates", "maturity", "limitations", "tags",
    ];
    for (const cap of COMPONENT_REGISTRY) {
      for (const field of requiredFields) {
        expect(cap[field]).toBeDefined();
      }
    }
  });
});
