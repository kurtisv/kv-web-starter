"use client";

import * as React from "react";
import { ContactShadows } from "@react-three/drei";

import { useThreeDQuality } from "./three-d-canvas";

export interface ThreeDStageProps {
  children: React.ReactNode;
  /** Ground contact shadow under the subject (skipped on low quality) */
  shadows?: boolean;
  /** Key light colour accent */
  accentColor?: string;
  /** Scene background colour; omit for transparent */
  background?: string;
}

/**
 * Reusable lighting rig for product-style scenes. Lights only, no network
 * assets (deliberately no drei <Environment>, whose presets fetch HDRIs
 * from a CDN). Adapts to quality: the fill light and contact shadows are
 * skipped on low-power devices.
 */
export function ThreeDStage({
  children,
  shadows = true,
  accentColor = "#2dd4bf",
  background,
}: ThreeDStageProps) {
  const { quality } = useThreeDQuality();
  const low = quality === "low";

  return (
    <>
      {background ? <color attach="background" args={[background]} /> : null}
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 4]} intensity={1.3} />
      <directionalLight position={[-5, 3, -2]} intensity={0.35} />
      {!low && (
        <pointLight position={[-3, 2, 3]} intensity={0.7} color={accentColor} />
      )}
      {children}
      {shadows && !low && (
        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.35}
          scale={8}
          blur={2.4}
          far={2.5}
          resolution={256}
          frames={1}
        />
      )}
    </>
  );
}
