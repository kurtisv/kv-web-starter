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

describe("recommendation policy", () => {
  it("marks stable domain matches as recommended", () => {
    expect(getComponentRecommendationLevel(stableAcademy, { domain: "academy" })).toBe("recommended");
  });

  it("marks beta domain matches as acceptable", () => {
    expect(getComponentRecommendationLevel(betaAcademy, { domain: "academy" })).toBe("acceptable");
  });

  it("avoids demo-only and experimental components by default", () => {
    expect(getComponentRecommendationLevel(demoOnly, { domain: "academy" })).toBe("avoid");
    expect(getComponentRecommendationLevel(experimental, { domain: "academy" })).toBe("avoid");
  });

  it("returns recommended components for academy", () => {
    const recommended = getRecommendedComponentsForDomain("academy");
    expect(recommended.length).toBeGreaterThan(0);
    expect(recommended.every((component) => component.maturity === "stable")).toBe(true);
  });

  it("returns avoided components with reasons", () => {
    const avoided = getAvoidedComponentsForDomain("academy", [demoOnly, experimental]);
    expect(avoided).toHaveLength(2);
    expect(avoided[0].reason.length).toBeGreaterThan(0);
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
});
