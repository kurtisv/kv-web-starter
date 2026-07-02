"use client";

import "@/lib/three-compat"; // suppress upstream R3F/Three.js deprecation noise
import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { cn } from "@/lib/utils";

import { useWebGLSupport } from "../3d/core/webgl-guard";
import {
  SceneQualityContext,
  useSceneQuality,
  type SceneQuality,
} from "../3d/core/scene-quality-provider";
import { ThreeDErrorBoundary } from "./three-d-error-boundary";
import { ThreeDFallback } from "./three-d-fallback";
import { ThreeDLoader } from "./three-d-loader";

export type ThreeDPerformanceTier = "low" | "balanced" | "high";

export interface ThreeDCanvasProps {
  children: React.ReactNode;
  className?: string;
  /** Node rendered when WebGL is unavailable or the scene crashes */
  fallback?: React.ReactNode;
  /** Node rendered INSTEAD of the canvas when prefers-reduced-motion is set.
   * When omitted, the canvas still renders but with animations disabled
   * (scene components read prefersReducedMotion via useThreeDQuality). */
  reducedMotionFallback?: React.ReactNode;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  performance?: ThreeDPerformanceTier;
  "aria-label"?: string;
  "data-testid"?: string;
}

/** Reads prefers-reduced-motion, false during SSR and first paint. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const frame = window.requestAnimationFrame(() => setReduced(mq.matches));
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => {
      window.cancelAnimationFrame(frame);
      mq.removeEventListener("change", handler);
    };
  }, []);
  return reduced;
}

/** Small-viewport detection, false during SSR and first paint. */
export function useIsSmallViewport(): boolean {
  const [small, setSmall] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const frame = window.requestAnimationFrame(() => setSmall(mq.matches));
    const handler = () => setSmall(mq.matches);
    mq.addEventListener("change", handler);
    return () => {
      window.cancelAnimationFrame(frame);
      mq.removeEventListener("change", handler);
    };
  }, []);
  return small;
}

/** Quality context accessor for scene components under ThreeDCanvas. */
export const useThreeDQuality = useSceneQuality;

const TIER_SETTINGS: Record<
  ThreeDPerformanceTier,
  { dpr: [number, number]; antialias: boolean }
> = {
  low: { dpr: [1, 1.25], antialias: false },
  balanced: { dpr: [1, 1.75], antialias: true },
  high: { dpr: [1, 2], antialias: true },
};

/**
 * The single entry point for putting a 3D scene on a page.
 *
 * Safety layers, in order:
 * 1. SSR / first paint: renders a sized placeholder (no hydration mismatch,
 *    the server can never know WebGL state).
 * 2. No WebGL: renders `fallback` (or a default ThreeDFallback).
 * 3. prefers-reduced-motion + `reducedMotionFallback`: renders the static
 *    alternative instead of mounting a render loop at all.
 * 4. Otherwise: mounts the R3F Canvas inside ThreeDErrorBoundary, with the
 *    frameloop on "demand" under reduced motion, and publishes quality
 *    (isMobile / prefersReducedMotion / dpr) to children via context.
 *
 * Never import this from a server component; wrap it in a client component
 * or a `next/dynamic` import instead.
 */
export function ThreeDCanvas({
  children,
  className,
  fallback,
  reducedMotionFallback,
  camera,
  performance = "balanced",
  "aria-label": ariaLabel = "Scene 3D interactive",
  "data-testid": testId = "three-d-canvas",
}: ThreeDCanvasProps) {
  const webglSupported = useWebGLSupport();
  const prefersReducedMotion = usePrefersReducedMotion();
  const smallViewport = useIsSmallViewport();
  const [sceneReady, setSceneReady] = React.useState(false);

  // Small viewports are capped at the low tier regardless of the prop.
  const tier: ThreeDPerformanceTier = smallViewport ? "low" : performance;
  const settings = TIER_SETTINGS[tier];

  const quality: SceneQuality = {
    isMobile: smallViewport,
    prefersReducedMotion,
    dpr: settings.dpr,
    quality: tier === "low" ? "low" : "high",
  };

  const frameClass = cn(
    "relative min-h-[280px] w-full overflow-hidden",
    className
  );

  // 1. SSR and pre-detection placeholder (webglSupported === null)
  if (webglSupported === null) {
    return (
      <div
        className={frameClass}
        role="img"
        aria-label={ariaLabel}
        aria-busy="true"
        data-testid={testId}
      />
    );
  }

  // 2. No WebGL available
  if (!webglSupported) {
    return (
      <div className={frameClass} data-testid={testId}>
        {fallback ?? (
          <ThreeDFallback
            label={ariaLabel}
            description="La 3D n'est pas disponible sur cet appareil. Voici un apercu statique."
            className="absolute inset-0 min-h-0 rounded-none"
          />
        )}
      </div>
    );
  }

  // 3. Reduced motion with an explicit static alternative
  if (prefersReducedMotion && reducedMotionFallback) {
    return (
      <div
        className={frameClass}
        data-testid={testId}
        data-reduced-motion="true"
      >
        {reducedMotionFallback}
      </div>
    );
  }

  // 4. Live canvas
  return (
    <SceneQualityContext.Provider value={quality}>
      <div
        className={frameClass}
        role="img"
        aria-label={ariaLabel}
        data-testid={testId}
      >
        <ThreeDErrorBoundary fallback={fallback}>
          <Canvas
            camera={{
              position: camera?.position ?? [0, 0.6, 5],
              fov: camera?.fov ?? 40,
            }}
            dpr={settings.dpr}
            frameloop={prefersReducedMotion ? "demand" : "always"}
            gl={{
              alpha: true,
              antialias: settings.antialias,
              preserveDrawingBuffer: false,
              powerPreference: tier === "low" ? "low-power" : "default",
            }}
            onCreated={() => setSceneReady(true)}
          >
            <React.Suspense fallback={null}>{children}</React.Suspense>
          </Canvas>
        </ThreeDErrorBoundary>
        {!sceneReady ? <ThreeDLoader /> : null}
      </div>
    </SceneQualityContext.Provider>
  );
}
