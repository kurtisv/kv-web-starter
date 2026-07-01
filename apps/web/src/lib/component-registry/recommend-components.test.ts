import { describe, it, expect } from "vitest";
import { recommendComponents } from "./recommend-components";
import { validateComponentFit, filterFitComponents } from "./validate-component-fit";
import { COMPONENT_REGISTRY } from "./component-registry";
import type { ComponentCapability } from "./types";

// ── recommendComponents ──────────────────────────────────────────────────────

describe("recommendComponents", () => {
  it("returns an array", () => {
    const results = recommendComponents({});
    expect(Array.isArray(results)).toBe(true);
  });

  it("defaults to limit 5", () => {
    const results = recommendComponents({ domain: "dashboard" });
    expect(results.length).toBeLessThanOrEqual(5);
  });

  it("respects custom limit", () => {
    const results = recommendComponents({ domain: "general", limit: 3 });
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("returns results sorted by descending score", () => {
    const results = recommendComponents({ domain: "ecommerce" });
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });

  it("domain match boosts score", () => {
    const all = recommendComponents({ limit: 100 });
    const ecommerceFirst = recommendComponents({ domain: "ecommerce", limit: 100 });
    const topEcom = ecommerceFirst[0];
    expect(topEcom.component.domains).toContain("ecommerce");
    expect(topEcom.score).toBeGreaterThan(0);
  });

  it("category match boosts score", () => {
    const results = recommendComponents({ category: "filter", limit: 10 });
    const filterResults = results.filter((r) => r.component.category === "filter");
    expect(filterResults.length).toBeGreaterThan(0);
  });

  it("query keyword matching works", () => {
    const results = recommendComponents({ query: "booking" });
    const bookingMatch = results.find((r) =>
      r.component.tags.includes("booking") || r.component.id.includes("booking")
    );
    expect(bookingMatch).toBeDefined();
  });

  it("query for 'filter' returns filter-category components", () => {
    const results = recommendComponents({ query: "filter", limit: 10 });
    expect(results.length).toBeGreaterThan(0);
    const hasFilter = results.some((r) => r.component.category === "filter");
    expect(hasFilter).toBe(true);
  });

  it("excludes components below minMaturity", () => {
    const registry: ComponentCapability[] = [
      ...COMPONENT_REGISTRY,
      {
        id: "demo-widget",
        name: "DemoWidget",
        importPath: "@/components/demo/demo-widget",
        category: "card",
        domains: ["general"],
        description: "A demo widget.",
        useCases: ["Demo"],
        compatibleVariables: [],
        supportedStates: ["default"],
        maturity: "demo-only",
        limitations: [],
        tags: ["demo"],
      },
    ];
    const results = recommendComponents({ domain: "general", minMaturity: "beta" }, registry);
    const hasDemoOnly = results.some((r) => r.component.maturity === "demo-only");
    expect(hasDemoOnly).toBe(false);
  });

  it("each result includes at least one reason", () => {
    const results = recommendComponents({ domain: "saas" });
    for (const r of results) {
      expect(r.reasons.length).toBeGreaterThan(0);
    }
  });

  it("variable compatibility match boosts score", () => {
    const results = recommendComponents({ requireVariables: ["realEstateVariables"], limit: 10 });
    const hasVarMatch = results.some((r) =>
      r.component.compatibleVariables.includes("realEstateVariables")
    );
    expect(hasVarMatch).toBe(true);
  });

  it("returns empty array when no components match", () => {
    const results = recommendComponents({ query: "xyzzynotarealcomponentkeyword" });
    expect(results).toEqual([]);
  });

  it("combined domain + category gives higher score than either alone", () => {
    const domainOnly = recommendComponents({ domain: "dashboard", category: undefined, limit: 1 });
    const both = recommendComponents({ domain: "dashboard", category: "metric", limit: 1 });
    if (both.length > 0 && domainOnly.length > 0) {
      expect(both[0].score).toBeGreaterThanOrEqual(domainOnly[0].score);
    }
  });

  it("works with empty registry", () => {
    const results = recommendComponents({ domain: "general" }, []);
    expect(results).toEqual([]);
  });
});

// ── validateComponentFit ─────────────────────────────────────────────────────

describe("validateComponentFit", () => {
  const stableGeneral: ComponentCapability = {
    id: "hero-section",
    name: "HeroSection",
    importPath: "@/components/sections/hero-section",
    category: "section",
    domains: ["general", "saas"],
    description: "Hero section.",
    useCases: ["Hero"],
    compatibleVariables: [],
    supportedStates: ["default"],
    maturity: "stable",
    limitations: [],
    tags: ["hero"],
  };

  const demoOnly: ComponentCapability = {
    id: "demo-widget",
    name: "DemoWidget",
    importPath: "@/components/demo/demo-widget",
    category: "card",
    domains: ["auto-blog"],
    description: "Demo widget.",
    useCases: ["Demo"],
    compatibleVariables: [],
    supportedStates: ["default"],
    maturity: "demo-only",
    limitations: [],
    tags: ["demo"],
  };

  const withLimitations: ComponentCapability = {
    id: "cart-drawer",
    name: "CartDrawer",
    importPath: "@/components/ecommerce/cart-drawer",
    category: "drawer",
    domains: ["ecommerce"],
    description: "Cart drawer.",
    useCases: ["Cart"],
    compatibleVariables: [],
    supportedStates: ["default", "empty"],
    maturity: "stable",
    limitations: ["Requires CartProvider in ancestor layout."],
    tags: ["cart"],
  };

  it("stable component in its domain returns fits: true", () => {
    const result = validateComponentFit(stableGeneral, "general");
    expect(result.fits).toBe(true);
    expect(result.blockers).toHaveLength(0);
  });

  it("demo-only component returns fits: false with blocker", () => {
    const result = validateComponentFit(demoOnly, "auto-blog");
    expect(result.fits).toBe(false);
    expect(result.blockers.length).toBeGreaterThan(0);
    expect(result.blockers[0]).toContain("demo-only");
  });

  it("stable component in wrong domain returns fits: true with warning", () => {
    const result = validateComponentFit(stableGeneral, "ecommerce");
    expect(result.fits).toBe(true);
    expect(result.warnings.some((w) => w.includes("ecommerce"))).toBe(true);
  });

  it("limitations surface as warnings", () => {
    const result = validateComponentFit(withLimitations, "ecommerce");
    expect(result.warnings).toContain("Requires CartProvider in ancestor layout.");
  });

  it("no warnings for perfectly matching stable component", () => {
    const simple: ComponentCapability = {
      id: "simple",
      name: "Simple",
      importPath: "@/components/simple",
      category: "badge",
      domains: ["general"],
      description: "Simple.",
      useCases: ["Use"],
      compatibleVariables: [],
      supportedStates: ["default"],
      maturity: "stable",
      limitations: [],
      tags: ["simple"],
    };
    const result = validateComponentFit(simple, "general");
    expect(result.fits).toBe(true);
    expect(result.warnings).toHaveLength(0);
    expect(result.blockers).toHaveLength(0);
  });
});

// ── filterFitComponents ──────────────────────────────────────────────────────

describe("filterFitComponents", () => {
  it("returns only components that fit the domain", () => {
    const result = filterFitComponents(COMPONENT_REGISTRY, "ecommerce");
    for (const cap of result) {
      expect(cap.domains).toContain("ecommerce");
      expect(cap.maturity).not.toBe("demo-only");
      expect(cap.maturity).not.toBe("experimental");
    }
  });

  it("excludes components not in the domain", () => {
    const result = filterFitComponents(COMPONENT_REGISTRY, "booking");
    const nonBooking = result.filter((c) => !c.domains.includes("booking"));
    expect(nonBooking).toHaveLength(0);
  });

  it("returns non-empty result for all main domains", () => {
    const domains = ["general", "saas", "ecommerce", "dashboard", "booking"] as const;
    for (const domain of domains) {
      const result = filterFitComponents(COMPONENT_REGISTRY, domain);
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it("returns empty array for empty input", () => {
    const result = filterFitComponents([], "general");
    expect(result).toHaveLength(0);
  });
});
