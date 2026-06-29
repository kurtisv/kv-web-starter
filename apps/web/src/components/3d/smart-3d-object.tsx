"use client";

/**
 * Smart3DObject — priority-cascaded 3D renderer.
 *
 * Priority chain (highest → lowest):
 *   1. Real GLB model    — if modelUrl is provided and loads successfully
 *   2. Procedural 3D     — geometry built in Three.js (always available)
 *   3. CSS fallback      — static image/icon (handled inside SafeSceneCanvas
 *                          when WebGL is unavailable; no extra code needed)
 *
 * Usage — no model yet (procedural only):
 *   <Smart3DObject objectType="car" />
 *
 * Usage — with a real GLB asset, procedural as automatic fallback:
 *   <Smart3DObject objectType="car" modelUrl="/models/3d/car/taycan.glb" />
 */

import * as React from "react";
import { type ScenePerformanceMode } from "./scene-canvas";
import { GlbSceneViewer, type GlbSceneViewerProps } from "./glb-scene-viewer";
import { ProceduralCarFallback } from "./procedural-fallback/procedural-car";
import { ProceduralLaptopFallback } from "./procedural-fallback/procedural-laptop";
import { ProceduralPhoneFallback } from "./procedural-fallback/procedural-phone";
import { Portfolio3DVisual } from "./portfolio-3d-visual";

// ── Types ─────────────────────────────────────────────────────────────────────
export type Smart3DType = "car" | "laptop" | "phone" | "watch" | "generic";

type RenderLayer = "glb" | "procedural";

export interface Smart3DObjectProps {
  /** The kind of object — controls which procedural fallback is used. */
  objectType: Smart3DType;

  /**
   * Path to a .glb file served from /public (e.g. "/models/3d/car/taycan.glb").
   * When provided the viewer tries to load it first.
   * If the file is missing or the load errors, it silently falls back to procedural.
   * When omitted, procedural is used directly.
   */
  modelUrl?: string;

  className?: string;
  performanceMode?: ScenePerformanceMode;

  // ── GLB-viewer overrides (ignored when using procedural) ──────────────────
  /** Camera position for the GLB viewer. Defaults to a 3/4 elevated view. */
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  orbitTarget?: [number, number, number];
  /** Auto-scales the model so its longest axis = this many scene units. */
  modelTargetSize?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  backgroundColor?: string;

  // ── Procedural-fallback overrides ─────────────────────────────────────────
  /** Paint colour passed to procedural car / other tinted components. */
  color?: string;
  /** Caption shown below the canvas (procedural only). */
  label?: string;

  "aria-label"?: string;
}

// ── Procedural render map ─────────────────────────────────────────────────────
function renderProcedural(
  objectType: Smart3DType,
  props: {
    className?: string;
    performanceMode?: ScenePerformanceMode;
    color?: string;
    label?: string;
  }
): React.ReactNode {
  const common = {
    className: props.className,
    performanceMode: props.performanceMode,
  };
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
  // Start on the highest available layer
  const [layer, setLayer] = React.useState<RenderLayer>(
    modelUrl ? "glb" : "procedural"
  );

  // If modelUrl changes (e.g. dynamic slot), re-attempt the GLB layer
  React.useEffect(() => {
    setLayer(modelUrl ? "glb" : "procedural");
  }, [modelUrl]);

  const onGlbError = React.useCallback(() => setLayer("procedural"), []);

  if (layer === "glb" && modelUrl) {
    const viewerProps: GlbSceneViewerProps = {
      modelUrl,
      className,
      performanceMode,
      onError: onGlbError,
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

  // Layer 2 — procedural (always works, SafeSceneCanvas adds CSS fallback
  // automatically if WebGL is unavailable)
  return renderProcedural(objectType, { className, performanceMode, color, label });
}

// ── Preload helper ────────────────────────────────────────────────────────────
/**
 * Call at module/page level to warm the GLTF cache before render.
 *   Smart3DObject.preload("car", "/models/3d/car/taycan.glb");
 */
Smart3DObject.preload = (
  _objectType: Smart3DType,
  modelUrl: string
) => GlbSceneViewer.preload(modelUrl);
