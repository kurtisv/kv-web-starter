"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Mesh } from "three";
import { SceneCanvas, useMobilePerformance, type ScenePerformanceMode } from "./scene-canvas";
import { ParticleBackground } from "./particle-background";

function PortfolioScene({ mobilePerformance }: { mobilePerformance: boolean }) {
  const icoRef = React.useRef<Mesh>(null);
  const wireRef = React.useRef<Mesh>(null);
  const torusARef = React.useRef<Mesh>(null);
  const torusBRef = React.useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.22;
      icoRef.current.rotation.y = t * 0.34;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.16;
      wireRef.current.rotation.y = t * 0.28;
    }
    if (torusARef.current) {
      torusARef.current.rotation.x = t * 0.45;
      torusARef.current.rotation.z = t * 0.18;
    }
    if (torusBRef.current) {
      torusBRef.current.rotation.y = t * 0.38;
      torusBRef.current.rotation.z = -t * 0.22;
    }
  });

  return (
    <Float speed={mobilePerformance ? 0.5 : 1.1} floatIntensity={mobilePerformance ? 0.2 : 0.45}>
      {!mobilePerformance && <ParticleBackground count={80} mobilePerformance={false} />}

      {/* Solid icosahedron */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial color="#1d4ed8" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial color="#60a5fa" wireframe opacity={0.25} transparent />
      </mesh>

      {/* Outer torus A */}
      <mesh ref={torusARef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.8, 0.025, 12, 80]} />
        <meshStandardMaterial color="#93c5fd" emissive="#3b82f6" emissiveIntensity={0.4} metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Outer torus B */}
      {!mobilePerformance && (
        <mesh ref={torusBRef} rotation={[0, Math.PI / 3, Math.PI / 5]}>
          <torusGeometry args={[2.1, 0.018, 12, 80]} />
          <meshStandardMaterial color="#bfdbfe" emissive="#93c5fd" emissiveIntensity={0.25} metalness={0.5} roughness={0.3} />
        </mesh>
      )}
    </Float>
  );
}

interface Portfolio3DVisualProps {
  className?: string;
  performanceMode?: ScenePerformanceMode;
}

export function Portfolio3DVisual({ className, performanceMode = "auto" }: Portfolio3DVisualProps) {
  const mobilePerformance = useMobilePerformance(performanceMode);

  return (
    <div className={className} data-testid="portfolio-3d-visual">
      <SceneCanvas
        aria-label="Portfolio 3D visual"
        performanceMode={performanceMode}
        className="aspect-square min-h-[300px] rounded-none"
      >
        <color attach="background" args={["#060a14"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 4]} intensity={1.2} />
        <pointLight position={[-3, 2, 3]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[3, -1, -2]} intensity={0.4} color="#818cf8" />
        <PortfolioScene mobilePerformance={mobilePerformance} />
      </SceneCanvas>
      <div className="bg-background px-1 py-3">
        <p className="font-semibold">Visual abstrait</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Icosahedre + wireframe + anneaux orbitaux + particules.
        </p>
      </div>
    </div>
  );
}
