"use client";

/**
 * Car3DPreview — backward-compatible shell over Smart3DObject.
 *
 * Drop-in replacement: all existing call-sites continue to work unchanged.
 * To display a real GLB model instead of the procedural fallback, pass modelUrl:
 *
 *   <Car3DPreview modelUrl="/models/3d/car/taycan.glb" />
 *
 * Without modelUrl, Smart3DObject falls through to ProceduralCarFallback.
 */

import * as React from "react";
import { Smart3DObject } from "./smart-3d-object";
import type { ScenePerformanceMode } from "./scene-canvas";

interface Car3DPreviewProps {
  className?: string;
  color?: string;
  performanceMode?: ScenePerformanceMode;
  label?: string;
  /** Optional GLB path — when provided loads the real model first. */
  modelUrl?: string;
}

export function Car3DPreview(props: Car3DPreviewProps) {
  return <Smart3DObject objectType="car" {...props} />;
}
