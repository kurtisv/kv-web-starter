import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { ThreeDCanvas } from "./three-d-canvas";
import { ThreeDErrorBoundary } from "./three-d-error-boundary";
import { ThreeDFallback } from "./three-d-fallback";

// ── matchMedia stub (jsdom does not provide it) ───────────────────────────────
function stubMatchMedia(matchesFor: (query: string) => boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: matchesFor(query),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
  }));
}

// ── 1. ThreeDFallback ─────────────────────────────────────────────────────────
describe("ThreeDFallback", () => {
  it("renders as an accessible image with the given label", () => {
    render(<ThreeDFallback label="Apercu produit" description="Version statique" />);
    expect(screen.getByRole("img", { name: "Apercu produit" })).toBeTruthy();
    expect(screen.getByText("Version statique")).toBeTruthy();
  });
});

// ── 2. ThreeDErrorBoundary ────────────────────────────────────────────────────
describe("ThreeDErrorBoundary", () => {
  it("renders children when nothing throws", () => {
    render(
      <ThreeDErrorBoundary>
        <div data-testid="scene-ok">ok</div>
      </ThreeDErrorBoundary>
    );
    expect(screen.getByTestId("scene-ok")).toBeTruthy();
  });

  it("renders the custom fallback when a child throws", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    function BrokenScene(): React.ReactNode {
      throw new Error("context lost");
    }

    render(
      <ThreeDErrorBoundary fallback={<div data-testid="custom-fallback" />}>
        <BrokenScene />
      </ThreeDErrorBoundary>
    );

    expect(screen.getByTestId("custom-fallback")).toBeTruthy();
    consoleSpy.mockRestore();
  });
});

// ── 3. ThreeDCanvas — no WebGL (jsdom) → fallback shown, no canvas ────────────
describe("ThreeDCanvas (no WebGL)", () => {
  beforeEach(() => stubMatchMedia(() => false));
  afterEach(() => vi.unstubAllGlobals());

  it("renders the default fallback instead of a canvas", async () => {
    render(
      <ThreeDCanvas aria-label="Scene test">
        <mesh />
      </ThreeDCanvas>
    );

    await waitFor(() => {
      expect(screen.getByTestId("three-d-fallback")).toBeTruthy();
    });
    expect(document.querySelector("canvas")).toBeNull();
  });

  it("renders a custom fallback node when provided", async () => {
    render(
      <ThreeDCanvas fallback={<div data-testid="my-static-hero" />}>
        <mesh />
      </ThreeDCanvas>
    );

    await waitFor(() => {
      expect(screen.getByTestId("my-static-hero")).toBeTruthy();
    });
  });
});

// ── 4. ThreeDCanvas — reduced motion → reducedMotionFallback wins ─────────────
describe("ThreeDCanvas (prefers-reduced-motion)", () => {
  beforeEach(() =>
    stubMatchMedia((q) => q.includes("prefers-reduced-motion"))
  );
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders reducedMotionFallback instead of mounting the canvas", async () => {
    // Pretend WebGL exists so only the reduced-motion branch decides.
    const fakeCtx = {} as WebGLRenderingContext;
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(fakeCtx);

    render(
      <ThreeDCanvas
        reducedMotionFallback={<div data-testid="static-alternative" />}
      >
        <mesh />
      </ThreeDCanvas>
    );

    await waitFor(() => {
      expect(screen.getByTestId("static-alternative")).toBeTruthy();
    });
    expect(document.querySelector("canvas")).toBeNull();
  });
});
