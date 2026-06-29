"use client";

/**
 * WebsiteShowcase3D — backward-compatible shell over Smart3DObject.
 *
 * Drop-in replacement: all existing call-sites continue to work unchanged.
 * To display a real GLB model, pass modelUrl:
 *
 *   <WebsiteShowcase3D modelUrl="/models/3d/laptop/macbook-pro.glb" />
 *
 * Without modelUrl, Smart3DObject falls through to ProceduralLaptopFallback.
 */

import * as React from "react";
import { Smart3DObject } from "./smart-3d-object";
import type { ScenePerformanceMode } from "./scene-canvas";

interface WebsiteShowcase3DProps {
  className?: string;
  performanceMode?: ScenePerformanceMode;
  /** Optional GLB path — when provided loads the real model first. */
  modelUrl?: string;
}

export function WebsiteShowcase3D(props: WebsiteShowcase3DProps) {
  return <Smart3DObject objectType="laptop" {...props} />;
}
