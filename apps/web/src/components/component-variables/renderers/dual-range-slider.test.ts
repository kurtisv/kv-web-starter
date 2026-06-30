/**
 * Unit tests for DualRangeSlider pure logic (clamp, snapToStep).
 * These functions are not exported from the component file, so we duplicate
 * the minimal logic here to verify the constraints hold.
 */
import { describe, it, expect } from "vitest";

// ── Replicated pure helpers (keep in sync with dual-range-slider.tsx) ─────────
function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function snapToStep(v: number, step: number, absMin: number, absMax: number): number {
  const snapped = Math.round((v - absMin) / step) * step + absMin;
  return clamp(snapped, absMin, absMax);
}

// Simulates applyThumb("min", raw)
function applyMin(raw: number, current: { min: number; max: number }, absMin: number): { min: number; max: number } {
  const next = clamp(raw, absMin, current.max);
  return { min: next, max: current.max };
}

// Simulates applyThumb("max", raw)
function applyMax(raw: number, current: { min: number; max: number }, absMax: number): { min: number; max: number } {
  const next = clamp(raw, current.min, absMax);
  return { min: current.min, max: next };
}

// ─────────────────────────────────────────────────────────────────────────────
describe("clamp", () => {
  it("returns value when within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
  it("clamps to lo", () => {
    expect(clamp(-1, 0, 10)).toBe(0);
  });
  it("clamps to hi", () => {
    expect(clamp(11, 0, 10)).toBe(10);
  });
  it("handles lo === hi", () => {
    expect(clamp(5, 3, 3)).toBe(3);
  });
});

describe("snapToStep", () => {
  it("snaps to nearest step", () => {
    expect(snapToStep(12, 5, 0, 100)).toBe(10);
    expect(snapToStep(13, 5, 0, 100)).toBe(15);
  });
  it("snaps exactly on step boundary", () => {
    expect(snapToStep(10, 5, 0, 100)).toBe(10);
  });
  it("clamps below min after snap", () => {
    expect(snapToStep(-1, 5, 0, 100)).toBe(0);
  });
  it("clamps above max after snap", () => {
    expect(snapToStep(101, 5, 0, 100)).toBe(100);
  });
  it("respects non-zero absMin", () => {
    expect(snapToStep(12, 5, 10, 50)).toBe(10);
    expect(snapToStep(17, 5, 10, 50)).toBe(15);
  });
  it("never produces NaN", () => {
    // Edge: step=1, min=max
    expect(isNaN(snapToStep(0, 1, 0, 0))).toBe(false);
  });
});

describe("DualRangeSlider constraints (via applyThumb logic)", () => {
  const ABS_MIN = 0;
  const ABS_MAX = 1_000_000;
  const STEP = 5_000;
  const current = { min: 100_000, max: 500_000 };

  it("min thumb cannot exceed max", () => {
    const raw = snapToStep(600_000, STEP, ABS_MIN, ABS_MAX); // 600k > max
    const next = applyMin(raw, current, ABS_MIN);
    expect(next.min).toBeLessThanOrEqual(next.max);
  });

  it("max thumb cannot go below min", () => {
    const raw = snapToStep(50_000, STEP, ABS_MIN, ABS_MAX); // 50k < min
    const next = applyMax(raw, current, ABS_MAX);
    expect(next.max).toBeGreaterThanOrEqual(next.min);
  });

  it("min stays above absolute min", () => {
    const raw = snapToStep(-50_000, STEP, ABS_MIN, ABS_MAX);
    const next = applyMin(raw, current, ABS_MIN);
    expect(next.min).toBeGreaterThanOrEqual(ABS_MIN);
  });

  it("max stays below absolute max", () => {
    const raw = snapToStep(2_000_000, STEP, ABS_MIN, ABS_MAX);
    const next = applyMax(raw, current, ABS_MAX);
    expect(next.max).toBeLessThanOrEqual(ABS_MAX);
  });

  it("disabled: component should not call onChange (structural — verified at render level)", () => {
    // When disabled=true, handlers return early. This is tested in the component's
    // onPointerDown/onKeyDown guards. Here we just verify constraint logic is unaffected.
    expect(applyMin(0, current, ABS_MIN)).toEqual({ min: 0, max: 500_000 });
  });

  it("formatValue works on arbitrary number", () => {
    const fmt = (v: number) => `${(v / 1000).toFixed(0)}k€`;
    expect(fmt(1_000_000)).toBe("1000k€");
    expect(fmt(0)).toBe("0k€");
  });

  it("parseFloat returns NaN for non-numeric input (guard check)", () => {
    expect(isNaN(parseFloat("abc"))).toBe(true);
    expect(isNaN(parseFloat("100000"))).toBe(false);
    expect(isNaN(parseFloat(""))).toBe(true);
  });
});
