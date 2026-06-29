"use client";

/**
 * Smart3DObject — priority-cascaded 3D renderer.
 *
 * Priority chain (highest → lowest):
 *   1. Real GLB model    — HEAD-checked before load to avoid error-flash.
 *                          Tries explicit modelUrl first, then the default
 *                          slot path (/models/3d/<type>/default.glb).
 *   2. Procedural 3D     — geometry built in Three.js (always available).
 *   3. CSS fallback      — static icon rendered by SafeSceneCanvas when
 *                          WebGL is unavailable; no extra code needed here.
 *
 * Usage — auto-detect GLB slot (procedural if file absent):
 *   <Smart3DObject objectType="car" />
 *
 * Usage — explicit GLB path with procedural fallback:
 *   <Smart3DObject objectType="car" modelUrl="/models/3d/car/taycan.glb" />
 */

import * as React from "react";
import { type ScenePerformanceMode } from "./scene-canvas";
import { GlbSceneViewer, type GlbSceneViewerProps } from "./glb-scene-viewer";
import { ProceduralCarFallback } from "./procedural-fallback/procedural-car";
import { ProceduralLaptopFallback } from "./procedural-fallback/procedural-laptop";
import { ProceduralPhoneFallback } from "./procedural-fallback/procedural-phone";
import { Portfolio3DVisual } from "./portfolio-3d-visual";

// ── Default GLB slot paths ────────────────────────────────────────────────────
// Drop a .glb here to upgrade from procedural to real model automatically.
const DEFAULT_MODEL_URLS: Partial<Record<Smart3DType, string>> = {
  car:    "/models/3d/car/default.glb",
  laptop: "/models/3d/laptop/default.glb",
  phone:  "/models/3d/phone/default.glb",
};

// ── Types ─────────────────────────────────────────────────────────────────────
export type Smart3DType = "car" | "laptop" | "phone" | "watch" | "generic";

type GlbStatus = "checking" | "available" | "unavailable";

export interface Smart3DObjectProps {
  objectType: Smart3DType;

  /**
   * Explicit .glb path. When omitted, Smart3DObject checks the default slot
   * for this objectType (/models/3d/<type>/default.glb). If neither exists
   * on the server the procedural scene is shown instantly.
   */
  modelUrl?: string;

  className?: string;
  performanceMode?: ScenePerformanceMode;

  cameraPosition?: [number, number, number];
  cameraFov?: number;
  orbitTarget?: [number, number, number];
  modelTargetSize?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  backgroundColor?: string;

  color?: string;
  label?: string;

  "aria-label"?: string;
}

// ── Procedural render map ─────────────────────────────────────────────────────
function renderProcedural(
  objectType: Smart3DType,
  props: Pick<Smart3DObjectProps, "className" | "performanceMode" | "color" | "label">
): React.ReactNode {
  const common = { className: props.className, performanceMode: props.performanceMode };
  switch (objectType) {
    case "car":
      return <ProceduralCarFallback {...common} color={props.color} label={props.label} />;
    case "laptop":
      return <ProceduralLaptopFallback {...common} />;
    case "phone":
      return <ProceduralPhoneFallback {...common} />;
    case "watch":
    case "generic":
    default:
      return <Portfolio3DVisual {...common} />;
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
export function Smart3DObject({
  objectType,
  modelUrl,
  className,
  performanceMode = "auto",
  cameraPosition,
  cameraFov,
  orbitTarget,
  modelTargetSize,
  autoRotate,
  autoRotateSpeed,
  backgroundColor,
  color,
  label,
  "aria-label": ariaLabel,
}: Smart3DObjectProps) {
  // Resolve the URL to attempt: explicit prop > default slot > none
  const effectiveUrl = modelUrl ?? DEFAULT_MODEL_URLS[objectType];

  // HEAD-check before mounting the GLB viewer so there's no error-flash when
  // the file is absent (common on first run / CI without rendered assets).
  const [glbStatus, setGlbStatus] = React.useState<GlbStatus>(
    effectiveUrl ? "checking" : "unavailable"
  );

  React.useEffect(() => {
    if (!effectiveUrl) { setGlbStatus("unavailable"); return; }

    setGlbStatus("checking");
    const ctrl = new AbortController();

    fetch(effectiveUrl, { method: "HEAD", cache: "no-store", signal: ctrl.signal })
      .then((r) => setGlbStatus(r.ok ? "available" : "unavailable"))
      .catch(() => { if (!ctrl.signal.aborted) setGlbStatus("unavailable"); });

    return () => ctrl.abort();
  }, [effectiveUrl]);

  // Layer 1 — GLB (confirmed available by HEAD check)
  if (glbStatus === "available" && effectiveUrl) {
    const viewerProps: GlbSceneViewerProps = {
      modelUrl: effectiveUrl,
      className,
      performanceMode,
      onError: () => setGlbStatus("unavailable"),
      ...(cameraPosition  !== undefined && { cameraPosition }),
      ...(cameraFov       !== undefined && { cameraFov }),
      ...(orbitTarget     !== undefined && { orbitTarget }),
      ...(modelTargetSize !== undefined && { modelTargetSize }),
      ...(autoRotate      !== undefined && { autoRotate }),
      ...(autoRotateSpeed !== undefined && { autoRotateSpeed }),
      ...(backgroundColor !== undefined && { backgroundColor }),
      ...(ariaLabel       !== undefined && { "aria-label": ariaLabel }),
    };
    return <GlbSceneViewer {...viewerProps} />;
  }

  // Layer 2 — procedural (shown while checking or when GLB unavailable)
  return renderProcedural(objectType, { className, performanceMode, color, label });
}

// ── Preload helper ────────────────────────────────────────────────────────────
Smart3DObject.preload = (_objectType: Smart3DType, url: string) =>
  GlbSceneViewer.preload(url);
