import { describe, expect, it } from "vitest";
import { formatCurrency, formatDate, formatNumber, formatRating } from "./index";

describe("deterministic format helpers", () => {
  it("formats numbers with an explicit locale", () => {
    expect(formatNumber(12500)).toBe("12,500");
    expect(formatNumber(12500.45, { maximumFractionDigits: 2 })).toBe("12,500.45");
  });

  it("formats currency with an explicit default currency", () => {
    expect(formatCurrency(4999)).toBe("$49.99");
    expect(formatCurrency(5000, { maximumFractionDigits: 0 })).toBe("$50");
    expect(formatCurrency(-123456)).toBe("-$1,234.56");
    expect(formatCurrency(1250, { currency: "EUR", locale: "fr-FR" })).toBe("12,50\u00a0€");
  });

  it("formats dates with an explicit timezone", () => {
    expect(formatDate("2026-06-30")).toBe("Jun 30, 2026");
    expect(formatDate(new Date("2026-06-30T23:30:00.000Z"))).toBe("Jun 30, 2026");
  });

  it("formats ratings without grouping", () => {
    expect(formatRating(4.8)).toBe("4.8");
    expect(formatRating(5)).toBe("5.0");
  });

  it("returns an empty string for nullish or invalid values", () => {
    expect(formatNumber(null)).toBe("");
    expect(formatNumber(undefined)).toBe("");
    expect(formatNumber(Number.NaN)).toBe("");
    expect(formatCurrency(null)).toBe("");
    expect(formatDate(null)).toBe("");
    expect(formatDate("not-a-date")).toBe("");
    expect(formatRating(undefined)).toBe("");
  });

  it("handles large values deterministically", () => {
    expect(formatNumber(999999999999)).toBe("999,999,999,999");
    expect(formatCurrency(999999999999)).toBe("$9,999,999,999.99");
  });
});
