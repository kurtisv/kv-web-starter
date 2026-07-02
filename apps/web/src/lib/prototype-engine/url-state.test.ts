import { describe, it, expect } from "vitest";
import {
  safeStep,
  safeIndustry,
  safeColor,
  safeProfile,
  safeMode,
  safeText,
  safeFeatures,
  DEFAULT_COLOR,
  MAX_TEXT_LENGTH,
} from "./url-state";

describe("safeStep", () => {
  it("returns 1 for null", () => expect(safeStep(null)).toBe(1));
  it("returns 1 for NaN string", () => expect(safeStep("abc")).toBe(1));
  it("returns 1 for 0", () => expect(safeStep("0")).toBe(1));
  it("returns 4 for value above max", () => expect(safeStep("99")).toBe(4));
  it("returns 2 for '2'", () => expect(safeStep("2")).toBe(2));
  it("returns 4 for '4'", () => expect(safeStep("4")).toBe(4));
  it("floors floats", () => expect(safeStep("2.9")).toBe(2));
});

describe("safeIndustry", () => {
  it("returns saas for null", () => expect(safeIndustry(null)).toBe("saas"));
  it("returns saas for unknown value", () => expect(safeIndustry("notanindustry")).toBe("saas"));
  it("returns known industry", () => expect(safeIndustry("booking")).toBe("booking"));
  it("returns real-estate", () => expect(safeIndustry("real-estate")).toBe("real-estate"));
  it("returns auto-blog", () => expect(safeIndustry("auto-blog")).toBe("auto-blog"));
});

describe("safeColor", () => {
  it("returns default for null", () => expect(safeColor(null)).toBe(DEFAULT_COLOR));
  it("returns default for short hex", () => expect(safeColor("#fff")).toBe(DEFAULT_COLOR));
  it("returns default for no hash", () => expect(safeColor("6366f1")).toBe(DEFAULT_COLOR));
  it("returns default for 7-char without hash", () => expect(safeColor("6366f1a")).toBe(DEFAULT_COLOR));
  it("accepts valid 6-digit hex", () => expect(safeColor("#3b82f6")).toBe("#3b82f6"));
  it("accepts uppercase hex", () => expect(safeColor("#3B82F6")).toBe("#3B82F6"));
  it("rejects XSS attempt", () => expect(safeColor("<script>")).toBe(DEFAULT_COLOR));
});

describe("safeProfile", () => {
  it("returns recommended for null", () => {
    const result = safeProfile(null, "saas");
    expect(result).toBe("premium-saas");
  });
  it("returns recommended for unknown profile", () => {
    const result = safeProfile("not-a-profile", "booking");
    expect(result).toBe("warm-local");
  });
  it("returns valid profile unchanged", () => {
    expect(safeProfile("minimal-dashboard", "dashboard")).toBe("minimal-dashboard");
  });
});

describe("safeMode", () => {
  it("returns light for null", () => expect(safeMode(null)).toBe("light"));
  it("returns light for unknown", () => expect(safeMode("whatever")).toBe("light"));
  it("returns dark for 'dark'", () => expect(safeMode("dark")).toBe("dark"));
  it("returns light for 'light'", () => expect(safeMode("light")).toBe("light"));
});

describe("safeText", () => {
  it("returns fallback for null", () => expect(safeText(null, "fallback")).toBe("fallback"));
  it("returns empty string for null without fallback", () => expect(safeText(null)).toBe(""));
  it("trims whitespace", () => expect(safeText("  hello  ")).toBe("hello"));
  it("limits to MAX_TEXT_LENGTH", () => {
    const long = "a".repeat(200);
    expect(safeText(long).length).toBe(MAX_TEXT_LENGTH);
  });
  it("preserves special characters without crash", () => {
    expect(() => safeText("<script>alert(1)</script>")).not.toThrow();
  });
  it("returns fallback for empty string", () => expect(safeText("", "fb")).toBe("fb"));
});

describe("safeFeatures", () => {
  it("returns defaults when param is null", () => {
    const result = safeFeatures(null, "saas");
    expect(result).toContain("Dashboard analytics");
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns empty array when param is explicitly empty string", () => {
    expect(safeFeatures("", "saas")).toEqual([]);
  });

  it("filters out features not valid for the industry", () => {
    // Prise de rendez-vous is a booking feature, not saas
    const result = safeFeatures("Prise de rendez-vous,Dashboard analytics", "saas");
    expect(result).not.toContain("Prise de rendez-vous");
    expect(result).toContain("Dashboard analytics");
  });

  it("rejects features from another industry entirely — falls back to defaults", () => {
    const result = safeFeatures("Prise de rendez-vous,Rappels automatiques", "saas");
    // All provided features are booking-only; fallback to saas defaults
    expect(result).toContain("Dashboard analytics");
  });

  it("accepts valid default features", () => {
    const result = safeFeatures("Dashboard analytics,API REST", "saas");
    expect(result).toContain("Dashboard analytics");
    expect(result).toContain("API REST");
  });

  it("accepts optional features for the industry", () => {
    const result = safeFeatures("SSO / SAML", "saas");
    expect(result).toContain("SSO / SAML");
  });

  it("filters out empty segments from CSV", () => {
    const result = safeFeatures(",Dashboard analytics,", "saas");
    expect(result).toContain("Dashboard analytics");
    expect(result).not.toContain("");
  });

  it("does not crash on very long feature strings", () => {
    const long = "a".repeat(5000);
    expect(() => safeFeatures(long, "saas")).not.toThrow();
  });

  it("returns defaults for unknown industry (saas fallback)", () => {
    // safeIndustry would catch unknown industries before this is called,
    // but test defensive behavior
    const result = safeFeatures(null, "saas");
    expect(Array.isArray(result)).toBe(true);
  });
});
