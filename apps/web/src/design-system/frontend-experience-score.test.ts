import { describe, it, expect } from "vitest";
import {
  calculateFrontendExperienceScore,
  getFrontendExperienceGrade,
  getFrontendExperienceRecommendations,
  evaluateFrontendExperience,
  type FrontendExperienceScore,
} from "./frontend-experience-score";

const perfectScore: FrontendExperienceScore = {
  visualHierarchy: 10,
  uxClarity: 10,
  accessibility: 10,
  responsive: 10,
  feedback: 10,
  states: 10,
  conversion: 10,
  consistency: 10,
  performancePerception: 10,
  agentReusability: 10,
};

const failingScore: FrontendExperienceScore = {
  visualHierarchy: 2,
  uxClarity: 3,
  accessibility: 1,
  responsive: 4,
  feedback: 2,
  states: 3,
  conversion: 2,
  consistency: 3,
  performancePerception: 2,
  agentReusability: 3,
};

const midScore: FrontendExperienceScore = {
  visualHierarchy: 8,
  uxClarity: 7,
  accessibility: 6,
  responsive: 8,
  feedback: 6,
  states: 7,
  conversion: 8,
  consistency: 8,
  performancePerception: 7,
  agentReusability: 8,
};

describe("calculateFrontendExperienceScore", () => {
  it("returns 10 for a perfect score", () => {
    expect(calculateFrontendExperienceScore(perfectScore)).toBe(10);
  });

  it("returns a decimal average for a mixed score", () => {
    const avg = calculateFrontendExperienceScore(midScore);
    expect(avg).toBeGreaterThan(6);
    expect(avg).toBeLessThan(10);
  });

  it("sums all 10 criteria", () => {
    const score: FrontendExperienceScore = {
      visualHierarchy: 5,
      uxClarity: 5,
      accessibility: 5,
      responsive: 5,
      feedback: 5,
      states: 5,
      conversion: 5,
      consistency: 5,
      performancePerception: 5,
      agentReusability: 5,
    };
    expect(calculateFrontendExperienceScore(score)).toBe(5);
  });
});

describe("getFrontendExperienceGrade", () => {
  it("returns A+ for 9.5+", () => expect(getFrontendExperienceGrade(9.5)).toBe("A+"));
  it("returns A for 9.0", () => expect(getFrontendExperienceGrade(9.0)).toBe("A"));
  it("returns B for 8.0", () => expect(getFrontendExperienceGrade(8.0)).toBe("B"));
  it("returns C for 7.0", () => expect(getFrontendExperienceGrade(7.0)).toBe("C"));
  it("returns D for 6.0", () => expect(getFrontendExperienceGrade(6.0)).toBe("D"));
  it("returns F below 6.0", () => expect(getFrontendExperienceGrade(5.9)).toBe("F"));
});

describe("getFrontendExperienceRecommendations", () => {
  it("returns no recommendations for a perfect score", () => {
    expect(getFrontendExperienceRecommendations(perfectScore)).toHaveLength(0);
  });

  it("returns recommendations for a failing score", () => {
    const recs = getFrontendExperienceRecommendations(failingScore);
    expect(recs.length).toBeGreaterThan(0);
  });

  it("returns accessibility recommendation when accessibility < 7", () => {
    const score = { ...perfectScore, accessibility: 5 };
    const recs = getFrontendExperienceRecommendations(score);
    expect(recs.some((r) => r.toLowerCase().includes("accessibility"))).toBe(true);
  });
});

describe("evaluateFrontendExperience", () => {
  it("returns a result with score, average, grade and recommendations", () => {
    const result = evaluateFrontendExperience(perfectScore);
    expect(result.average).toBe(10);
    expect(result.grade).toBe("A+");
    expect(result.recommendations).toHaveLength(0);
    expect(result.score).toEqual(perfectScore);
  });

  it("failing score returns grade F", () => {
    const result = evaluateFrontendExperience(failingScore);
    expect(result.grade).toBe("F");
  });
});
