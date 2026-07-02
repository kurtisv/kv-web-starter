"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

import { useThreeDQuality } from "./three-d-canvas";

interface OrbitingShapeSpec {
  kind: "icosahedron" | "torus" | "sphere";
  radius: number;
  speed: number;
  phase: number;
  y: number;
  size: number;
  color: string;
}

const SHAPES: OrbitingShapeSpec[] = [
  { kind: "icosahedron", radius: 2.6, speed: 0.14, phase: 0, y: 0.6, size: 0.32, color: "#2dd4bf" },
  { kind: "torus", radius: 3.1, speed: 0.1, phase: 2.1, y: -0.4, size: 0.26, color: "#818cf8" },
  { kind: "sphere", radius: 2.2, speed: 0.18, phase: 4.2, y: 0.1, size: 0.2, color: "#f472b6" },
  { kind: "icosahedron", radius: 3.5, speed: 0.08, phase: 1.2, y: 1.1, size: 0.22, color: "#38bdf8" },
  { kind: "sphere", radius: 2.9, speed: 0.12, phase: 5.3, y: -0.9, size: 0.16, color: "#facc15" },
];

function ShapeMesh({ spec }: { spec: OrbitingShapeSpec }) {
  return (
    <>
      {spec.kind === "icosahedron" && (
        <icosahedronGeometry args={[spec.size, 0]} />
      )}
      {spec.kind === "torus" && (
        <torusGeometry args={[spec.size, spec.size * 0.35, 12, 32]} />
      )}
      {spec.kind === "sphere" && <sphereGeometry args={[spec.size, 24, 24]} />}
      <meshStandardMaterial
        color={spec.color}
        emissive={spec.color}
        emissiveIntensity={0.25}
        metalness={0.4}
        roughness={0.35}
      />
    </>
  );
}

export interface OrbitingShapesProps {
  /** Global speed multiplier (1 = default gentle drift) */
  speed?: number;
}

/**
 * Abstract shapes drifting on circular orbits around the scene centre.
 * Procedural, low poly count. Frozen at their initial positions under
 * reduced motion; on low quality the two outermost shapes are dropped.
 */
export function OrbitingShapes({ speed = 1 }: OrbitingShapesProps) {
  const { prefersReducedMotion, quality } = useThreeDQuality();
  const refs = React.useRef<Array<THREE.Mesh | null>>([]);
  const shapes = quality === "low" ? SHAPES.slice(0, 3) : SHAPES;

  useFrame((state) => {
    if (prefersReducedMotion) return;
    const t = state.clock.elapsedTime * speed;
    shapes.forEach((spec, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const angle = spec.phase + t * spec.speed;
      mesh.position.set(
        Math.cos(angle) * spec.radius,
        spec.y + Math.sin(t * 0.4 + spec.phase) * 0.12,
        Math.sin(angle) * spec.radius * 0.55
      );
      mesh.rotation.x += 0.002;
      mesh.rotation.y += 0.003;
    });
  });

  return (
    <group>
      {shapes.map((spec, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[
            Math.cos(spec.phase) * spec.radius,
            spec.y,
            Math.sin(spec.phase) * spec.radius * 0.55,
          ]}
        >
          <ShapeMesh spec={spec} />
        </mesh>
      ))}
    </group>
  );
}
