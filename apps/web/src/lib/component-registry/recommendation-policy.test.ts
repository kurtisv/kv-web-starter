import { describe, expect, it } from "vitest";
import {
  generateComponentRecommendationReport,
  getAvoidedComponentsForDomain,
  getComponentRecommendationLevel,
  getGapsForDomain,
  getRecommendedComponentsForDomain,
} from "./recommendation-policy";
import type { ComponentCapability } from "./types";

const stableAcademy: ComponentCapability = {
  id: "academy-hero",
  name: "AcademyHero",
  importPath: "@/components/academy/academy-hero",
  category: "section",
  domains: ["academy"],
  description: "Academy hero section.",
  useCases: ["Education landing page"],
  compatibleVariables: [],
  supportedStates: ["default"],
  maturity: "stable",
  limitations: [],
  tags: ["academy"],
};

const productionAcademy: ComponentCapability = {
  ...stableAcademy,
  id: "academy-production-hero",
  name: "AcademyProductionHero",
  maturity: "production",
};

const betaAcademy: ComponentCapability = {
  ...stableAcademy,
  id: "academy-beta-card",
  name: "AcademyBetaCard",
  category: "card",
  maturity: "beta",
};

const demoOnly: ComponentCapability = {
  ...stableAcademy,
  id: "demo-only-course-card",
  name: "DemoOnlyCourseCard",
  category: "card",
  maturity: "demo-only",
};

const experimental: ComponentCapability = {
  ...stableAcademy,
  id: "experimental-course-card",
  name: "ExperimentalCourseCard",
  category: "card",
  maturity: "experimental",
};

const generalStable: ComponentCapability = {
  ...stableAcademy,
  id: "general-stable-card",
  name: "GeneralStableCard",
  domains: ["general"],
  maturity: "stable",
};

const ecommerceStable: ComponentCapability = {
  ...stableAcademy,
  id: "ecommerce-product-card",
  name: "EcommerceProductCard",
  domains: ["ecommerce"],
  maturity: "stable",
};

describe("recommendation policy", () => {
  it("marks stable domain matches as recommended", () => {
    expect(getComponentRecommendationLevel(stableAcademy, { domain: "academy" })).toBe("recommended");
  });

  it("marks production domain matches as recommended", () => {
    expect(getComponentRecommendationLevel(productionAcademy, { domain: "academy" })).toBe("recommended");
  });

  it("marks beta domain matches as acceptable", () => {
    expect(getComponentRecommendationLevel(betaAcademy, { domain: "academy" })).toBe("acceptable");
  });

  it("avoids demo-only and experimental components by default", () => {
    expect(getComponentRecommendationLevel(demoOnly, { domain: "academy" })).toBe("avoid");
    expect(getComponentRecommendationLevel(experimental, { domain: "academy" })).toBe("avoid");
  });

  it("marks general stable components as acceptable (not recommended) for a specific domain", () => {
    expect(getComponentRecommendationLevel(generalStable, { domain: "academy" })).toBe("acceptable");
  });

  it("marks out-of-domain non-general components as avoid", () => {
    expect(getComponentRecommendationLevel(ecommerceStable, { domain: "academy" })).toBe("avoid");
  });

  it("returns recommended components for academy (production or stable, domain match)", () => {
    const recommended = getRecommendedComponentsForDomain("academy");
    expect(recommended.length).toBeGreaterThan(0);
    expect(
      recommended.every(
        (component) => component.maturity === "stable" || component.maturity === "production",
      ),
    ).toBe(true);
  });

  it("returns avoided components with reasons", () => {
    const avoided = getAvoidedComponentsForDomain("academy", [demoOnly, experimental]);
    expect(avoided).toHaveLength(2);
    expect(avoided[0].reason.length).toBeGreaterThan(0);
  });

  it("avoids out-of-domain non-general components", () => {
    const avoided = getAvoidedComponentsForDomain("academy", [ecommerceStable]);
    expect(avoided).toHaveLength(1);
  });

  it("returns known academy gaps", () => {
    const gaps = getGapsForDomain("academy");
    expect(gaps).toContain("CourseCard stable");
  });

  it("generates a deterministic report", () => {
    const report = generateComponentRecommendationReport("academy");
    expect(report.domain).toBe("academy");
    expect(report.recommended.length).toBeGreaterThan(0);
    expect(report.gaps).toContain("CourseCard stable");
    expect(report.nextAction.length).toBeGreaterThan(0);
  });

  it("demo-only is avoid for client projects", () => {
    expect(getComponentRecommendationLevel(demoOnly, { domain: "academy", clientProject: true })).toBe("avoid");
  });

  it("demo-only is acceptable when clientProject=false and domain matches", () => {
    expect(getComponentRecommendationLevel(demoOnly, { domain: "academy", clientProject: false })).toBe("acceptable");
  });

  it("experimental is avoid unless allowExperimental=true, then acceptable", () => {
    expect(getComponentRecommendationLevel(experimental, { domain: "academy", allowExperimental: false })).toBe("avoid");
    expect(getComponentRecommendationLevel(experimental, { domain: "academy", allowExperimental: true })).toBe("acceptable");
  });
});
