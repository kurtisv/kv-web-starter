"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as React from "react";
import type { Group } from "three";

interface FloatingModelProps {
  color?: string;
  mobilePerformance?: boolean;
}

export function FloatingModel({ color = "#14b8a6", mobilePerformance = false }: FloatingModelProps) {
  const groupRef = React.useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current || mobilePerformance) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.28;
  });

  return (
    <Float speed={mobilePerformance ? 0.7 : 1.6} rotationIntensity={mobilePerformance ? 0.15 : 0.45} floatIntensity={mobilePerformance ? 0.25 : 0.7}>
      <group ref={groupRef} position={[0, 0.1, 0]}>
        <mesh castShadow rotation={[0.4, 0.6, 0.2]}>
          <boxGeometry args={[1.7, 1.7, 1.7]} />
          <meshStandardMaterial color={color} metalness={0.52} roughness={0.28} />
        </mesh>
        <mesh rotation={[Math.PI / 2.8, 0, 0]}>
          <torusGeometry args={[1.45, 0.035, 12, 96]} />
          <meshStandardMaterial color="#f9fafb" emissive="#0f766e" emissiveIntensity={0.18} metalness={0.7} roughness={0.22} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2.5, 0]}>
          <torusGeometry args={[1.2, 0.025, 12, 96]} />
          <meshStandardMaterial color="#f59e0b" emissive="#78350f" emissiveIntensity={0.14} metalness={0.45} roughness={0.34} />
        </mesh>
      </group>
    </Float>
  );
}
