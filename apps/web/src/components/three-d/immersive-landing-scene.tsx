"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

import { useThreeDQuality } from "./three-d-canvas";
import { useScrollSceneProgress } from "./scroll-scene-section";
import { FloatingCardScene } from "./floating-card-scene";
import { OrbitingShapes } from "./orbiting-shapes";

/**
 * Hero scene for the immersive landing: floating dashboard panels in the
 * middle distance, abstract shapes orbiting around them. When rendered
 * inside a ScrollSceneSection, the whole group eases upward and tilts as
 * the visitor scrolls, giving depth without scroll-jacking.
 */
export function ImmersiveLandingScene() {
  const groupRef = React.useRef<THREE.Group>(null);
  const { prefersReducedMotion } = useThreeDQuality();
  const progressRef = useScrollSceneProgress();

  useFrame(() => {
    if (!groupRef.current || prefersReducedMotion) return;
    const progress = progressRef.current;
    // Ease the scene up and slightly away as the hero scrolls out.
    const targetY = progress * 1.2;
    const targetTilt = progress * -0.18;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * 0.08;
    groupRef.current.rotation.x +=
      (targetTilt - groupRef.current.rotation.x) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <pointLight position={[-4, 2, 2]} intensity={0.6} color="#818cf8" />
      <FloatingCardScene parallax={0.1} />
      <OrbitingShapes />
    </group>
  );
}
