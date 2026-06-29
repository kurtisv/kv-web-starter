"use client";

import * as React from "react";
import { Smart3DObject } from "./smart-3d-object";
import type { ScenePerformanceMode } from "./scene-canvas";

interface PhoneMockup3DProps {
  className?: string;
  performanceMode?: ScenePerformanceMode;
  /** Optional GLB override — falls back to /models/3d/phone/default.glb then procedural. */
  modelUrl?: string;
}

export function PhoneMockup3D(props: PhoneMockup3DProps) {
  return <Smart3DObject objectType="phone" {...props} />;
}
