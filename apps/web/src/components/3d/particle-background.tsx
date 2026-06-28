"use client";

import * as React from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Points as ThreePoints } from "three";

interface ParticleBackgroundProps {
  count?: number;
  mobilePerformance?: boolean;
}

function createParticlePositions(count: number) {
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 7;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 4.5;
    positions[index * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  return positions;
}

export function ParticleBackground({ count = 130, mobilePerformance = false }: ParticleBackgroundProps) {
  const pointsRef = React.useRef<ThreePoints>(null);
  const positions = React.useMemo(
    () => createParticlePositions(mobilePerformance ? Math.min(48, count) : count),
    [count, mobilePerformance]
  );

  useFrame((state) => {
    if (!pointsRef.current || mobilePerformance) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.025;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#bfdbfe" size={mobilePerformance ? 0.035 : 0.028} sizeAttenuation depthWrite={false} opacity={0.65} />
    </Points>
  );
}
