"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type * as THREE from "three";

import { useThreeDQuality } from "./three-d-canvas";

export type ModelPlaceholderVariant = "device" | "box" | "orb";

export interface ModelPlaceholderProps {
  variant?: ModelPlaceholderVariant;
  /** Primary body colour (product variants are driven through this) */
  color?: string;
  /** Accent colour for emissive details */
  accentColor?: string;
  /** Metalness of the body material, 0..1 */
  metalness?: number;
  /** Roughness of the body material, 0..1 */
  roughness?: number;
  /** Slow idle spin (off under reduced motion) */
  spin?: boolean;
  scale?: number;
}

/**
 * Procedural stand-in for a real GLB model: a premium-looking product shape
 * built from primitives, so demos ship with ZERO model downloads and no
 * licensing questions. Swap for a GLB via the model manifest when a real,
 * licensed asset exists. Must be rendered inside ThreeDCanvas.
 */
export function ModelPlaceholder({
  variant = "device",
  color = "#334155",
  accentColor = "#2dd4bf",
  metalness = 0.7,
  roughness = 0.3,
  spin = false,
  scale = 1,
}: ModelPlaceholderProps) {
  const groupRef = React.useRef<THREE.Group>(null);
  const { prefersReducedMotion } = useThreeDQuality();

  useFrame((_, delta) => {
    if (!spin || prefersReducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.25;
  });

  const bodyMaterial = (
    <meshStandardMaterial
      color={color}
      metalness={metalness}
      roughness={roughness}
    />
  );

  return (
    <group ref={groupRef} scale={scale}>
      {variant === "device" && (
        <>
          <RoundedBox args={[1.1, 2.2, 0.12]} radius={0.09} smoothness={4}>
            {bodyMaterial}
          </RoundedBox>
          {/* screen */}
          <mesh position={[0, 0.05, 0.062]}>
            <planeGeometry args={[0.94, 1.86]} />
            <meshStandardMaterial
              color="#0b1020"
              emissive={accentColor}
              emissiveIntensity={0.12}
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
          {/* camera dot */}
          <mesh position={[0, 1.0, 0.065]}>
            <circleGeometry args={[0.03, 24]} />
            <meshStandardMaterial color="#0f172a" roughness={0.15} />
          </mesh>
        </>
      )}

      {variant === "box" && (
        <>
          <RoundedBox args={[1.4, 1.4, 1.4]} radius={0.08} smoothness={4}>
            {bodyMaterial}
          </RoundedBox>
          {/* lid seam accent */}
          <mesh position={[0, 0.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.995, 0.012, 8, 48]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.5}
            />
          </mesh>
        </>
      )}

      {variant === "orb" && (
        <>
          <mesh>
            <sphereGeometry args={[0.85, 48, 48]} />
            {bodyMaterial}
          </mesh>
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <torusGeometry args={[1.15, 0.02, 12, 64]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.7}
            />
          </mesh>
        </>
      )}
    </group>
  );
}
