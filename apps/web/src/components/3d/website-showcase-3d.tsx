"use client";

import * as React from "react";
import { RoundedBox, ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { SceneCanvas, useMobilePerformance, type ScenePerformanceMode } from "./scene-canvas";

function LaptopScene({ mobilePerformance }: { mobilePerformance: boolean }) {
  const groupRef = React.useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current || mobilePerformance) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.38;
  });

  return (
    <group ref={groupRef} position={[0, -0.12, 0]}>

      {/* ── BASE / KEYBOARD DECK ── */}
      <RoundedBox args={[3.1, 0.068, 2.08]} radius={0.032} smoothness={4} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#a2a2a8"
          metalness={0.9}
          roughness={0.28}
          clearcoat={0.1}
          clearcoatRoughness={0.55}
        />
      </RoundedBox>

      {/* Keyboard surface */}
      <mesh position={[0, 0.036, 0.05]}>
        <planeGeometry args={[2.62, 1.52]} />
        <meshPhysicalMaterial color="#929298" metalness={0.7} roughness={0.48} />
      </mesh>

      {/* Key rows */}
      {!mobilePerformance && [0.28, 0.08, -0.12, -0.32].map((z, i) => (
        <mesh key={i} position={[0, 0.037, z]}>
          <planeGeometry args={[2.42 - i * 0.07, 0.11]} />
          <meshPhysicalMaterial color="#787880" metalness={0.5} roughness={0.62} />
        </mesh>
      ))}

      {/* Trackpad */}
      <RoundedBox args={[0.88, 0.006, 0.62]} radius={0.016} smoothness={4} position={[0, 0.037, 0.6]}>
        <meshPhysicalMaterial
          color="#b4b4ba"
          metalness={0.72}
          roughness={0.18}
          clearcoat={0.65}
          clearcoatRoughness={0.12}
        />
      </RoundedBox>

      {/* ── HINGE ── */}
      <mesh position={[0, 0.04, -1.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.038, 0.038, 3.08, 24]} />
        <meshPhysicalMaterial color="#8e8e94" metalness={0.96} roughness={0.18} />
      </mesh>

      {/* ── LID ── */}
      <group position={[0, 0.04, -1.04]} rotation={[-Math.PI * 0.44, 0, 0]}>

        {/* Lid outer shell */}
        <RoundedBox args={[3.1, 2.04, 0.066]} radius={0.032} smoothness={4} position={[0, 1.02, 0]}>
          <meshPhysicalMaterial
            color="#a2a2a8"
            metalness={0.9}
            roughness={0.28}
            clearcoat={0.1}
            clearcoatRoughness={0.55}
          />
        </RoundedBox>

        {/* Screen bezel (dark inner frame) */}
        <mesh position={[0, 1.02, 0.036]}>
          <planeGeometry args={[2.98, 1.92]} />
          <meshPhysicalMaterial color="#0b0b10" roughness={0.65} metalness={0.08} />
        </mesh>

        {/* Active display */}
        <mesh position={[0, 1.02, 0.037]}>
          <planeGeometry args={[2.76, 1.74]} />
          <meshPhysicalMaterial
            color="#040c1e"
            emissive="#1a4fd8"
            emissiveIntensity={mobilePerformance ? 0.2 : 0.4}
            roughness={0.04}
            metalness={0.0}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
          />
        </mesh>

        {/* Screen UI content */}
        {!mobilePerformance && (
          <>
            {/* Top bar */}
            <mesh position={[0, 1.74, 0.039]}>
              <planeGeometry args={[2.72, 0.12]} />
              <meshStandardMaterial color="#1a56db" emissive="#2563eb" emissiveIntensity={0.48} />
            </mesh>
            {/* Left sidebar */}
            <mesh position={[-1.18, 1.02, 0.039]}>
              <planeGeometry args={[0.36, 1.58]} />
              <meshStandardMaterial color="#1e3a6e" opacity={0.65} transparent />
            </mesh>
            {/* Content rows */}
            {[1.5, 1.28, 1.06, 0.84, 0.62].map((y, i) => (
              <mesh key={i} position={[0.14, y, 0.039]}>
                <planeGeometry args={[i % 2 === 0 ? 1.88 : 1.42, 0.068]} />
                <meshStandardMaterial
                  color="#3b82f6"
                  emissive="#60a5fa"
                  emissiveIntensity={0.14}
                  opacity={0.55 - i * 0.07}
                  transparent
                />
              </mesh>
            ))}
            {/* Bottom status bar */}
            <mesh position={[0, 0.22, 0.039]}>
              <planeGeometry args={[2.72, 0.08]} />
              <meshStandardMaterial color="#1a3a6e" opacity={0.45} transparent />
            </mesh>
          </>
        )}

        {/* Webcam dot */}
        <mesh position={[0, 1.93, 0.038]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.006, 16]} />
          <meshStandardMaterial color="#1a1a20" />
        </mesh>
      </group>

      {!mobilePerformance && (
        <ContactShadows position={[0, -0.06, 0]} opacity={0.28} scale={5.5} blur={1.8} />
      )}
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
        <ambientLight intensity={0.2} />
        {/* Key light — upper left */}
        <directionalLight position={[-4, 6, 3]} intensity={2.0} color="#ffffff" />
        {/* Rim light — right rear */}
        <pointLight position={[4, 3, -2]} intensity={0.65} color="#e0e8ff" />
        {/* Screen fill — warm blue front */}
        <pointLight position={[0, 1, 4]} intensity={0.3} color="#3b82f6" />
        <hemisphereLight args={["#d0daff", "#080810", 0.24]} />
        <LaptopScene mobilePerformance={mobilePerformance} />
      </SceneCanvas>
      <div className="bg-background px-1 py-3">
        <p className="font-semibold">Ultrabook aluminium</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Unibody aluminium brosse, charniere cylindrique, trackpad clearcoat, UI ecran simulee.
        </p>
      </div>
    </div>
  );
}
