"use client";

import * as React from "react";
import { OrbitControls } from "@react-three/drei";

import {
  ThreeDCanvas,
  usePrefersReducedMotion,
  type ThreeDCanvasProps,
} from "./three-d-canvas";
import { ThreeDStage } from "./three-d-stage";

export interface OrbitProductViewerProps
  extends Omit<ThreeDCanvasProps, "children"> {
  children: React.ReactNode;
  /** Allow pinch / wheel zoom within safe distance bounds */
  enableZoom?: boolean;
  /** Slow idle rotation (automatically off under reduced motion) */
  autoRotate?: boolean;
  minDistance?: number;
  maxDistance?: number;
  stage?: {
    shadows?: boolean;
    accentColor?: string;
    background?: string;
  };
}

/** Inner scene split out so hooks run inside the Canvas provider tree. */
function OrbitProductScene({
  children,
  enableZoom,
  autoRotate,
  minDistance,
  maxDistance,
  stage,
}: Pick<
  OrbitProductViewerProps,
  "children" | "enableZoom" | "autoRotate" | "minDistance" | "maxDistance" | "stage"
>) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <ThreeDStage
      shadows={stage?.shadows ?? true}
      accentColor={stage?.accentColor}
      background={stage?.background}
    >
      {children}
      <OrbitControls
        enablePan={false}
        enableZoom={enableZoom}
        minDistance={minDistance}
        maxDistance={maxDistance}
        autoRotate={autoRotate && !prefersReducedMotion}
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.8}
        makeDefault
      />
    </ThreeDStage>
  );
}

/**
 * Product viewer preset: ThreeDCanvas + stage lighting + bounded
 * OrbitControls (no pan, clamped polar angle, optional zoom within
 * min/max distance). Drop the product mesh in as children.
 */
export function OrbitProductViewer({
  children,
  enableZoom = true,
  autoRotate = true,
  minDistance = 3,
  maxDistance = 8,
  stage,
  ...canvasProps
}: OrbitProductViewerProps) {
  return (
    <ThreeDCanvas {...canvasProps}>
      <OrbitProductScene
        enableZoom={enableZoom}
        autoRotate={autoRotate}
        minDistance={minDistance}
        maxDistance={maxDistance}
        stage={stage}
      >
        {children}
      </OrbitProductScene>
    </ThreeDCanvas>
  );
}
