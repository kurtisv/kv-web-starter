import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { SceneErrorBoundary } from "./core/scene-error-boundary";
import { SafeSceneCanvas } from "./core/safe-scene-canvas";
import { useWebGLSupport } from "./core/webgl-guard";
import { useMobilePerformance } from "./scene-canvas";

// ── matchMedia stub (jsdom does not provide it) ───────────────────────────────
function stubMatchMedia(matches = false) {
  vi.stubGlobal("matchMedia", (_query: string) => ({
    matches,
    media: _query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
  }));
}

// ── 1. SceneErrorBoundary ─────────────────────────────────────────────────────
describe("SceneErrorBoundary", () => {
  beforeEach(() => stubMatchMedia(false));
  afterEach(() => vi.unstubAllGlobals());

  it("renders children normally when no error occurs", () => {
    render(
      <SceneErrorBoundary>
        <div data-testid="child">ok</div>
      </SceneErrorBoundary>
    );
    expect(screen.getByTestId("child")).toBeTruthy();
  });

  it("renders FallbackVisual when a child throws during render", () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    function BrokenScene(): React.ReactNode {
      throw new Error("WebGL context lost");
    }

    render(
      <SceneErrorBoundary fallbackType="car">
        <BrokenScene />
      </SceneErrorBoundary>
    );

    // FallbackVisual renders role="img" with a default label
    expect(screen.getByRole("img")).toBeTruthy();
    // No crash — the error boundary absorbed it
    consoleSpy.mockRestore();
  });
});

// ── 2. useWebGLSupport ────────────────────────────────────────────────────────
describe("useWebGLSupport", () => {
  afterEach(() => vi.restoreAllMocks());

  it("returns false in jsdom (no WebGL canvas support)", async () => {
    const { result } = renderHook(() => useWebGLSupport());
    // renderHook wraps in act(), so the effect fires before we read state.
    // jsdom has no WebGL — expect false after the check completes.
    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it("returns true when the canvas context is mocked as available", async () => {
    const fakeCtx = {} as WebGLRenderingContext;
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(fakeCtx);

    const { result } = renderHook(() => useWebGLSupport());
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });
});

// ── 3. SafeSceneCanvas — WebGL unavailable → FallbackVisual shown ─────────────
describe("SafeSceneCanvas (no WebGL)", () => {
  beforeEach(() => stubMatchMedia(false));
  afterEach(() => vi.unstubAllGlobals());

  it("renders FallbackVisual (not a canvas element) when WebGL is absent", async () => {
    render(
      <SafeSceneCanvas fallbackType="car" aria-label="Car 3D">
        <mesh />
      </SafeSceneCanvas>
    );

    // Wait for useWebGLSupport to settle (jsdom = false)
    await waitFor(() => {
      expect(screen.getByRole("img")).toBeTruthy();
    });

    // Canvas should never have been mounted
    expect(document.querySelector("canvas")).toBeNull();
  });

  it("passes the aria-label through to the FallbackVisual", async () => {
    render(
      <SafeSceneCanvas fallbackType="phone" aria-label="Mon telephone">
        <mesh />
      </SafeSceneCanvas>
    );

    await waitFor(() => {
      expect(
        screen.getByRole("img", { name: "Mon telephone" })
      ).toBeTruthy();
    });
  });
});

// ── 4. useMobilePerformance — prefers-reduced-motion ─────────────────────────
describe("useMobilePerformance", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("returns true when prefers-reduced-motion media query matches", async () => {
    stubMatchMedia(true); // reduced-motion ON
    const { result } = renderHook(() => useMobilePerformance("auto"));

    // Initial state is false; after the effect fires it should flip to true
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("returns false when no reduced-motion and viewport is wide", async () => {
    stubMatchMedia(false); // no special query matches
    const { result } = renderHook(() => useMobilePerformance("auto"));

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it("returns true when mode is explicitly 'mobile'", () => {
    stubMatchMedia(false);
    const { result } = renderHook(() => useMobilePerformance("mobile"));
    expect(result.current).toBe(true);
  });
});
