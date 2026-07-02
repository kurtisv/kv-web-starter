"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type * as THREE from "three";

import { useThreeDQuality } from "./three-d-canvas";

export interface FloatingCardSpec {
  position: [number, number, number];
  size?: [number, number];
  color?: string;
  /** Extra emissive accent strip across the top of the card */
  accent?: string;
}

export interface FloatingCardSceneProps {
  cards?: FloatingCardSpec[];
  /** Amplitude of the idle bobbing motion (0 disables it) */
  floatIntensity?: number;
  /** How strongly the group tilts toward the pointer */
  parallax?: number;
}

const DEFAULT_CARDS: FloatingCardSpec[] = [
  { position: [-1.6, 0.4, 0], size: [1.6, 1.0], color: "#1e293b", accent: "#2dd4bf" },
  { position: [0.2, -0.2, 0.6], size: [1.8, 1.1], color: "#0f172a", accent: "#818cf8" },
  { position: [1.7, 0.7, -0.4], size: [1.4, 0.9], color: "#1e1b4b", accent: "#f472b6" },
];

function FloatingCard({
  spec,
  index,
  animate,
}: {
  spec: FloatingCardSpec;
  index: number;
  animate: boolean;
}) {
  const ref = React.useRef<THREE.Mesh>(null);
  const [w, h] = spec.size ?? [1.6, 1.0];

  useFrame((state) => {
    if (!animate || !ref.current) return;
    const t = state.clock.elapsedTime + index * 1.7;
    ref.current.position.y = spec.position[1] + Math.sin(t * 0.6) * 0.08;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.03;
  });

  return (
    <group position={spec.position}>
      <RoundedBox ref={ref} args={[w, h, 0.06]} radius={0.05} smoothness={3}>
        <meshStandardMaterial
          color={spec.color ?? "#1e293b"}
          metalness={0.35}
          roughness={0.45}
        />
      </RoundedBox>
      {spec.accent ? (
        <mesh position={[0, h / 2 - 0.09, 0.045]}>
          <boxGeometry args={[w * 0.82, 0.05, 0.015]} />
          <meshStandardMaterial
            color={spec.accent}
            emissive={spec.accent}
            emissiveIntensity={0.9}
          />
        </mesh>
      ) : null}
    </group>
  );
}

/**
 * A scene of floating "dashboard card" panels with gentle bobbing and
 * pointer parallax. All procedural geometry -- zero asset downloads.
 * Motion is disabled under prefers-reduced-motion and the parallax is
 * softened on low quality. Must be rendered inside ThreeDCanvas.
 */
export function FloatingCardScene({
  cards = DEFAULT_CARDS,
  floatIntensity = 1,
  parallax = 0.12,
}: FloatingCardSceneProps) {
  const groupRef = React.useRef<THREE.Group>(null);
  const { prefersReducedMotion, quality } = useThreeDQuality();
  const animate = !prefersReducedMotion && floatIntensity > 0;
  const parallaxStrength = quality === "low" ? parallax * 0.5 : parallax;

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;
    const { pointer } = state;
    groupRef.current.rotation.y +=
      (pointer.x * parallaxStrength - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x +=
      (-pointer.y * parallaxStrength * 0.6 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {cards.map((spec, i) => (
        <FloatingCard key={i} spec={spec} index={i} animate={animate} />
      ))}
    </group>
  );
}
