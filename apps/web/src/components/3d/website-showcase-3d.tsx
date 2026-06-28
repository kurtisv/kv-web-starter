"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { SceneCanvas, useMobilePerformance, type ScenePerformanceMode } from "./scene-canvas";

function LaptopScene({ mobilePerformance }: { mobilePerformance: boolean }) {
  const groupRef = React.useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current || mobilePerformance) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.45;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Base / keyboard */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[3.2, 0.1, 2.1]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Keyboard surface */}
      <mesh position={[0, -0.005, 0.1]}>
        <boxGeometry args={[2.8, 0.01, 1.5]} />
        <meshStandardMaterial color="#2a2a2e" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Screen lid (tilted back) */}
      <group position={[0, 0.05, -1.0]} rotation={[-Math.PI * 0.56, 0, 0]}>
        {/* Lid frame */}
        <mesh position={[0, 1.05, 0]}>
          <boxGeometry args={[3.2, 2.1, 0.09]} />
          <meshStandardMaterial color="#1c1c1e" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Screen surface */}
        <mesh position={[0, 1.05, 0.052]}>
          <boxGeometry args={[2.95, 1.86, 0.005]} />
          <meshStandardMaterial
            color="#050c1a"
            emissive="#1a56db"
            emissiveIntensity={mobilePerformance ? 0.25 : 0.45}
          />
        </mesh>

        {/* Grid lines (simulated UI) */}
        {!mobilePerformance && (
          <>
            {/* Header bar */}
            <mesh position={[0, 1.78, 0.056]}>
              <boxGeometry args={[2.9, 0.15, 0.001]} />
              <meshStandardMaterial color="#1a56db" emissive="#2563eb" emissiveIntensity={0.6} />
            </mesh>
            {/* Content rows */}
            {[1.52, 1.32, 1.12, 0.92, 0.72].map((y, i) => (
              <mesh key={i} position={[i % 2 === 0 ? -0.3 : 0.5, y, 0.056]}>
                <boxGeometry args={[i % 2 === 0 ? 2.2 : 1.4, 0.07, 0.001]} />
                <meshStandardMaterial color="#3b82f6" emissive="#60a5fa" emissiveIntensity={0.2} />
              </mesh>
            ))}
          </>
        )}
      </group>
    </group>
  );
}

interface WebsiteShowcase3DProps {
  className?: string;
  performanceMode?: ScenePerformanceMode;
}

export function WebsiteShowcase3D({ className, performanceMode = "auto" }: WebsiteShowcase3DProps) {
  const mobilePerformance = useMobilePerformance(performanceMode);

  return (
    <div className={className} data-testid="website-showcase-3d">
      <SceneCanvas
        aria-label="Laptop website showcase 3D"
        performanceMode={performanceMode}
        className="aspect-video min-h-[260px] rounded-none"
      >
        <color attach="background" args={["#0c0c14"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} />
        <pointLight position={[-3, 3, 2]} intensity={0.5} color="#3b82f6" />
        <LaptopScene mobilePerformance={mobilePerformance} />
      </SceneCanvas>
      <div className="bg-background px-1 py-3">
        <p className="font-semibold">Laptop showcase</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Geometrie composee, ecran emissif avec grille UI simulee.
        </p>
      </div>
    </div>
  );
}
