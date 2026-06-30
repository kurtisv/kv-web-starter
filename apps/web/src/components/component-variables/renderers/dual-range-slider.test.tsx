import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DualRangeSlider } from "./dual-range-slider";

// ── Helpers ───────────────────────────────────────────────────────────────────

function setup(overrides: Partial<Parameters<typeof DualRangeSlider>[0]> = {}) {
  const onChange = vi.fn();
  const props = {
    label: "Prix",
    value: { min: 100_000, max: 500_000 },
    min: 0,
    max: 1_000_000,
    step: 10_000,
    onChange,
    ...overrides,
  };
  const result = render(<DualRangeSlider {...props} />);
  const sliders   = screen.getAllByRole("slider");
  const spinners  = screen.getAllByRole("spinbutton");
  return {
    ...result,
    minThumb: sliders[0],
    maxThumb: sliders[1],
    minInput: spinners[0] as HTMLInputElement,
    maxInput: spinners[1] as HTMLInputElement,
    onChange,
  };
}

// ── Render ────────────────────────────────────────────────────────────────────

describe("DualRangeSlider — render", () => {
  it("renders the label", () => {
    setup();
    expect(screen.getByText("Prix")).toBeTruthy();
  });

  it("renders two slider thumbs", () => {
    setup();
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("renders two numeric inputs", () => {
    setup();
    expect(screen.getAllByRole("spinbutton")).toHaveLength(2);
  });

  it("min thumb has correct aria attributes", () => {
    const { minThumb } = setup();
    expect(minThumb.getAttribute("aria-valuenow")).toBe("100000");
    expect(minThumb.getAttribute("aria-valuemin")).toBe("0");
    expect(minThumb.getAttribute("aria-valuemax")).toBe("500000");
    expect(minThumb.getAttribute("aria-label")).toBe("Prix minimum");
    expect(minThumb.getAttribute("role")).toBe("slider");
  });

  it("max thumb has correct aria attributes", () => {
    const { maxThumb } = setup();
    expect(maxThumb.getAttribute("aria-valuenow")).toBe("500000");
    expect(maxThumb.getAttribute("aria-valuemin")).toBe("100000");
    expect(maxThumb.getAttribute("aria-valuemax")).toBe("1000000");
    expect(maxThumb.getAttribute("aria-label")).toBe("Prix maximum");
  });

  it("inputs show current values", () => {
    const { minInput, maxInput } = setup();
    expect(Number(minInput.value)).toBe(100_000);
    expect(Number(maxInput.value)).toBe(500_000);
  });

  it("formatValue applies to aria-valuetext on min thumb", () => {
    const { minThumb } = setup({ formatValue: (v) => `${(v / 1000).toFixed(0)}k` });
    expect(minThumb.getAttribute("aria-valuetext")).toBe("100k");
  });

  it("formatValue applies to aria-valuetext on max thumb", () => {
    const { maxThumb } = setup({ formatValue: (v) => `${(v / 1000).toFixed(0)}k` });
    expect(maxThumb.getAttribute("aria-valuetext")).toBe("500k");
  });
});

// ── Keyboard navigation ───────────────────────────────────────────────────────

describe("DualRangeSlider — keyboard", () => {
  it("ArrowRight on min thumb increases min", () => {
    const { minThumb, onChange } = setup();
    fireEvent.keyDown(minThumb, { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith({ min: 110_000, max: 500_000 });
  });

  it("ArrowLeft on min thumb decreases min", () => {
    const { minThumb, onChange } = setup();
    fireEvent.keyDown(minThumb, { key: "ArrowLeft" });
    expect(onChange).toHaveBeenCalledWith({ min: 90_000, max: 500_000 });
  });

  it("ArrowUp on min thumb increases min (same as ArrowRight)", () => {
    const { minThumb, onChange } = setup();
    fireEvent.keyDown(minThumb, { key: "ArrowUp" });
    expect(onChange).toHaveBeenCalledWith({ min: 110_000, max: 500_000 });
  });

  it("ArrowDown on min thumb decreases min (same as ArrowLeft)", () => {
    const { minThumb, onChange } = setup();
    fireEvent.keyDown(minThumb, { key: "ArrowDown" });
    expect(onChange).toHaveBeenCalledWith({ min: 90_000, max: 500_000 });
  });

  it("ArrowRight on max thumb increases max", () => {
    const { maxThumb, onChange } = setup();
    fireEvent.keyDown(maxThumb, { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith({ min: 100_000, max: 510_000 });
  });

  it("ArrowLeft on max thumb decreases max", () => {
    const { maxThumb, onChange } = setup();
    fireEvent.keyDown(maxThumb, { key: "ArrowLeft" });
    expect(onChange).toHaveBeenCalledWith({ min: 100_000, max: 490_000 });
  });

  it("Shift+ArrowRight moves min by 10x step", () => {
    const { minThumb, onChange } = setup();
    fireEvent.keyDown(minThumb, { key: "ArrowRight", shiftKey: true });
    expect(onChange).toHaveBeenCalledWith({ min: 200_000, max: 500_000 });
  });

  it("Shift+ArrowLeft moves max by 10x step", () => {
    const { maxThumb, onChange } = setup();
    fireEvent.keyDown(maxThumb, { key: "ArrowLeft", shiftKey: true });
    expect(onChange).toHaveBeenCalledWith({ min: 100_000, max: 400_000 });
  });

  it("Home on min thumb goes to absolute min", () => {
    const { minThumb, onChange } = setup();
    fireEvent.keyDown(minThumb, { key: "Home" });
    expect(onChange).toHaveBeenCalledWith({ min: 0, max: 500_000 });
  });

  it("End on min thumb goes to current max", () => {
    const { minThumb, onChange } = setup();
    fireEvent.keyDown(minThumb, { key: "End" });
    expect(onChange).toHaveBeenCalledWith({ min: 500_000, max: 500_000 });
  });

  it("Home on max thumb goes to current min", () => {
    const { maxThumb, onChange } = setup();
    fireEvent.keyDown(maxThumb, { key: "Home" });
    expect(onChange).toHaveBeenCalledWith({ min: 100_000, max: 100_000 });
  });

  it("End on max thumb goes to absolute max", () => {
    const { maxThumb, onChange } = setup();
    fireEvent.keyDown(maxThumb, { key: "End" });
    expect(onChange).toHaveBeenCalledWith({ min: 100_000, max: 1_000_000 });
  });

  it("min thumb cannot exceed max after keyboard nav", () => {
    // min = 490k, max = 500k. End on min goes to max (500k) — not above.
    const { minThumb, onChange } = setup({ value: { min: 490_000, max: 500_000 } });
    fireEvent.keyDown(minThumb, { key: "End" });
    const call = onChange.mock.calls[0][0] as { min: number; max: number };
    expect(call.min).toBeLessThanOrEqual(500_000);
  });

  it("max thumb cannot go below min after keyboard nav", () => {
    // min = 100k, max = 110k. Home on max goes to min (100k) — not below.
    const { maxThumb, onChange } = setup({ value: { min: 100_000, max: 110_000 } });
    fireEvent.keyDown(maxThumb, { key: "Home" });
    const call = onChange.mock.calls[0][0] as { min: number; max: number };
    expect(call.max).toBeGreaterThanOrEqual(100_000);
  });

  it("ignores unrecognized keys", () => {
    const { minThumb, onChange } = setup();
    fireEvent.keyDown(minThumb, { key: "Tab" });
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ── Numeric inputs ────────────────────────────────────────────────────────────

describe("DualRangeSlider — inputs", () => {
  it("changing min input calls onChange with snapped value", () => {
    const { minInput, onChange } = setup();
    fireEvent.change(minInput, { target: { value: "200000" } });
    expect(onChange).toHaveBeenCalledWith({ min: 200_000, max: 500_000 });
  });

  it("changing max input calls onChange with snapped value", () => {
    const { maxInput, onChange } = setup();
    fireEvent.change(maxInput, { target: { value: "800000" } });
    expect(onChange).toHaveBeenCalledWith({ min: 100_000, max: 800_000 });
  });

  it("min input cannot exceed current max", () => {
    const { minInput, onChange } = setup();
    fireEvent.change(minInput, { target: { value: "900000" } });
    const call = onChange.mock.calls[0][0] as { min: number; max: number };
    expect(call.min).toBeLessThanOrEqual(call.max);
  });

  it("max input cannot go below current min", () => {
    const { maxInput, onChange } = setup();
    fireEvent.change(maxInput, { target: { value: "50000" } });
    const call = onChange.mock.calls[0][0] as { min: number; max: number };
    expect(call.max).toBeGreaterThanOrEqual(call.min);
  });

  it("invalid input (string) does not call onChange", () => {
    const { minInput, onChange } = setup();
    fireEvent.change(minInput, { target: { value: "abc" } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("empty input does not call onChange", () => {
    const { maxInput, onChange } = setup();
    fireEvent.change(maxInput, { target: { value: "" } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("input value snaps to step boundary", () => {
    const { minInput, onChange } = setup();
    // step=10_000, so 123456 snaps to nearest 10k boundary
    fireEvent.change(minInput, { target: { value: "123456" } });
    const call = onChange.mock.calls[0][0] as { min: number; max: number };
    expect(call.min % 10_000).toBe(0);
  });

  it("result is never NaN", () => {
    const { minInput, onChange } = setup();
    fireEvent.change(minInput, { target: { value: "200000" } });
    const call = onChange.mock.calls[0][0] as { min: number; max: number };
    expect(isNaN(call.min)).toBe(false);
    expect(isNaN(call.max)).toBe(false);
  });
});

// ── Disabled state ────────────────────────────────────────────────────────────

describe("DualRangeSlider — disabled", () => {
  it("thumbs have aria-disabled true when disabled", () => {
    const { minThumb, maxThumb } = setup({ disabled: true });
    expect(minThumb.getAttribute("aria-disabled")).toBe("true");
    expect(maxThumb.getAttribute("aria-disabled")).toBe("true");
  });

  it("thumbs have tabIndex -1 when disabled", () => {
    const { minThumb, maxThumb } = setup({ disabled: true });
    expect(minThumb.getAttribute("tabindex")).toBe("-1");
    expect(maxThumb.getAttribute("tabindex")).toBe("-1");
  });

  it("inputs are disabled when slider is disabled", () => {
    const { minInput, maxInput } = setup({ disabled: true });
    expect(minInput.disabled).toBe(true);
    expect(maxInput.disabled).toBe(true);
  });

  it("keyboard on disabled min thumb does not call onChange", () => {
    const { minThumb, onChange } = setup({ disabled: true });
    fireEvent.keyDown(minThumb, { key: "ArrowRight" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("keyboard on disabled max thumb does not call onChange", () => {
    const { maxThumb, onChange } = setup({ disabled: true });
    fireEvent.keyDown(maxThumb, { key: "ArrowLeft" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("input change on disabled slider does not call onChange", () => {
    const { minInput, onChange } = setup({ disabled: true });
    fireEvent.change(minInput, { target: { value: "300000" } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("enabled thumbs have tabIndex 0", () => {
    const { minThumb, maxThumb } = setup();
    expect(minThumb.getAttribute("tabindex")).toBe("0");
    expect(maxThumb.getAttribute("tabindex")).toBe("0");
  });
});

// ── Error display ─────────────────────────────────────────────────────────────

describe("DualRangeSlider — error", () => {
  it("renders error text when provided", () => {
    const { container } = setup({ error: "Montant invalide" });
    expect(container.textContent).toContain("Montant invalide");
  });

  it("does not render error when error is null", () => {
    const { container } = setup({ error: null });
    expect(container.querySelector("p.text-destructive")).toBeNull();
  });
});
