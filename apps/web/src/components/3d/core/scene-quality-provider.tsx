"use client";

import * as React from "react";

export interface SceneQuality {
  /** True on small viewports or when prefers-reduced-motion is active */
  isMobile: boolean;
  prefersReducedMotion: boolean;
  /** Recommended DPR clamp for this device */
  dpr: [number, number];
  quality: "high" | "low";
}

const DEFAULT: SceneQuality = {
  isMobile: false,
  prefersReducedMotion: false,
  dpr: [1, 2],
  quality: "high",
};

export const SceneQualityContext = React.createContext<SceneQuality>(DEFAULT);

/**
 * Read scene quality from within any child of SafeSceneCanvas.
 * Useful for scene components that want to adapt without prop drilling.
 */
export function useSceneQuality(): SceneQuality {
  return React.useContext(SceneQualityContext);
}
