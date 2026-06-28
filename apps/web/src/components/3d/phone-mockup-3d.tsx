"use client";

import * as React from "react";
import { RoundedBox, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { SceneCanvas, useMobilePerformance, type ScenePerformanceMode } from "./scene-canvas";

function PhoneScene({ mobilePerformance }: { mobilePerformance: boolean }) {
  const groupRef = React.useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current || mobilePerformance) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.4;
  });

  return (
    <Float speed={mobilePerformance ? 0.6 : 1.2} floatIntensity={mobilePerformance ? 0.2 : 0.5}>
      <group ref={groupRef}>
        {/* Phone body */}
        <RoundedBox args={[1.15, 2.4, 0.13]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#1c1c1e" metalness={0.85} roughness={0.15} />
        </RoundedBox>

        {/* Screen (emissive) */}
        <mesh position={[0, -0.08, 0.072]}>
          <planeGeometry args={[0.92, 1.95]} />
          <meshStandardMaterial
            color="#0a192f"
            emissive="#1a56db"
            emissiveIntensity={mobilePerformance ? 0.3 : 0.55}
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>

        {/* Status bar strip */}
        <mesh position={[0, 1.07, 0.074]}>
          <planeGeometry args={[0.92, 0.1]} />
          <meshStandardMaterial color="#1a56db" emissive="#3b82f6" emissiveIntensity={0.4} />
        </mesh>

        {/* Front camera */}
        <mesh position={[0, 1.03, 0.075]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Home indicator */}
        <mesh position={[0, -1.1, 0.074]}>
          <boxGeometry args={[0.32, 0.045, 0.005]} />
          <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
        </mesh>
      </group>
    </Float>
  );
}

interface PhoneMockup3DProps {
  className?: string;
  performanceMode?: ScenePerformanceMode;
}

export function PhoneMockup3D({ className, performanceMode = "auto" }: PhoneMockup3DProps) {
  const mobilePerformance = useMobilePerformance(performanceMode);

  return (
    <div className={className} data-testid="phone-mockup-3d">
      <SceneCanvas
        aria-label="Phone mockup 3D"
        performanceMode={performanceMode}
        className="aspect-[3/4] min-h-[280px] rounded-none"
      >
        <color attach="background" args={["#0c0c14"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 5]} intensity={1.5} />
        <pointLight position={[-2, 2, 3]} intensity={0.6} color="#3b82f6" />
        <PhoneScene mobilePerformance={mobilePerformance} />
      </SceneCanvas>
      <div className="bg-background px-1 py-3">
        <p className="font-semibold">Mockup telephone</p>
        <p className="mt-1 text-sm text-muted-foreground">
          RoundedBox + materiaux PBR + flottement Framer Three.
        </p>
      </div>
    </div>
  );
}
