"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { cn } from "@/lib/utils";

import { useMobilePerformance, type ScenePerformanceMode } from "../scene-canvas";
import { FallbackVisual, type FallbackVisualType } from "../fallback-visual";
import { useWebGLSupport } from "./webgl-guard";
import { SceneErrorBoundary } from "./scene-error-boundary";
import { SceneQualityContext, type SceneQuality } from "./scene-quality-provider";

// Re-export so consumer imports can point to this file exclusively
export { useMobilePerformance };
export type { ScenePerformanceMode };

// ── Props ──────────────────────────────────────────────────────────────────────
export interface SafeSceneCanvasProps {
  "aria-label"?: string;
  children: React.ReactNode;
  className?: string;
  performanceMode?: ScenePerformanceMode;
  /** Which CSS fallback shape to show when WebGL is unavailable or errors */
  fallbackType?: FallbackVisualType;
  /** Pass false to remove OrbitControls (e.g. scenes with their own camera) */
  showOrbitControls?: boolean;
  /** Pass false to skip the city Environment preset (lighter on mobile) */
  showEnvironment?: boolean;
}

// ── Shared canvas wrapper class ────────────────────────────────────────────────
const BASE =
  "relative min-h-[320px] w-full overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(20,184,166,0.20),transparent_34%),linear-gradient(135deg,#0b1020,#171717_54%,#2f2417)]";

// ── Component ──────────────────────────────────────────────────────────────────
/**
 * Drop-in replacement for SceneCanvas that adds three safety layers:
 *
 * 1. WebGL detection — if unavailable, renders FallbackVisual instead of Canvas.
 * 2. SceneErrorBoundary — catches any render-phase Three.js / R3F crash and
 *    swaps in FallbackVisual without breaking the page.
 * 3. Quality context — provides isMobile / prefersReducedMotion / dpr to any
 *    child scene component via useSceneQuality().
 *
 * Fixed from original SceneCanvas:
 * - preserveDrawingBuffer is now false (significant GPU memory saving).
 * - OrbitControls.autoRotate is disabled when prefers-reduced-motion is set.
 * - OrbitControls and Environment can be turned off per-scene.
 * - teal point light is skipped on mobile to reduce overdraw.
 */
export function SafeSceneCanvas({
  "aria-label": ariaLabel = "Interactive 3D scene",
  children,
  className,
  performanceMode = "auto",
  fallbackType = "abstract",
  showOrbitControls = true,
  showEnvironment = true,
}: SafeSceneCanvasProps) {
  // Quality detection (mobile viewport + reduced-motion)
  const isLow = useMobilePerformance(performanceMode);

  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const quality: SceneQuality = {
    isMobile: isLow,
    prefersReducedMotion,
    dpr: isLow ? [1, 1.25] : [1, 2],
    quality: isLow ? "low" : "high",
  };

  // WebGL availability (null = SSR / not yet detected)
  const webglSupported = useWebGLSupport();

  // ── SSR & initial client render ─────────────────────────────────────────────
  // Render a sized empty placeholder until WebGL check completes.
  // This avoids hydration mismatch (server never knows WebGL state).
  if (webglSupported === null) {
    return (
      <div
        className={cn(BASE, className)}
        role="img"
        aria-label={ariaLabel}
        aria-busy="true"
      />
    );
  }

  // ── No WebGL: CSS fallback ───────────────────────────────────────────────────
  if (!webglSupported) {
    return (
      <FallbackVisual
        type={fallbackType}
        label={ariaLabel}
        className={cn(BASE, className)}
      />
    );
  }

  // ── WebGL available: Canvas with error boundary ──────────────────────────────
  return (
    <SceneQualityContext.Provider value={quality}>
      <div
        className={cn(BASE, className)}
        role="img"
        aria-label={ariaLabel}
      >
        <SceneErrorBoundary
          fallbackType={fallbackType}
          fallbackClassName="absolute inset-0"
        >
          <Canvas
            camera={{
              position: [0, 0.7, isLow ? 6 : 5],
              fov: isLow ? 42 : 38,
            }}
            dpr={quality.dpr}
            gl={{
              alpha: true,
              antialias: !isLow,
              preserveDrawingBuffer: false, // was true in SceneCanvas — expensive
            }}
          >
            <color attach="background" args={["#0b1020"]} />
            <ambientLight intensity={0.65} />
            <directionalLight position={[4, 5, 5]} intensity={1.25} />
            {!isLow && (
              <pointLight
                position={[-3, 2, 3]}
                intensity={0.8}
                color="#2dd4bf"
              />
            )}
            <React.Suspense fallback={null}>{children}</React.Suspense>
            {!isLow && showEnvironment && <Environment preset="city" />}
            {showOrbitControls && (
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate={!prefersReducedMotion && !isLow}
                autoRotateSpeed={0.7}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.85}
              />
            )}
          </Canvas>
        </SceneErrorBoundary>

        {/* Gradient vignette at the bottom of every scene */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/50 to-transparent" />
      </div>
    </SceneQualityContext.Provider>
  );
}
