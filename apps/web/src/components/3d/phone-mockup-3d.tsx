"use client";

import * as React from "react";
import { RoundedBox, Float, ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { SceneCanvas, useMobilePerformance, type ScenePerformanceMode } from "./scene-canvas";

function PhoneScene({ mobilePerformance }: { mobilePerformance: boolean }) {
  const groupRef = React.useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current || mobilePerformance) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.38) * 0.32 + 0.22;
  });

  return (
    <>
      <Float speed={mobilePerformance ? 0.5 : 1.1} floatIntensity={mobilePerformance ? 0.12 : 0.28}>
        <group ref={groupRef} rotation={[0.05, 0.22, 0]}>

          {/* ── FRAME (anodized titanium) ── */}
          <RoundedBox args={[1.08, 2.34, 0.116]} radius={0.094} smoothness={8}>
            <meshPhysicalMaterial
              color="#1a1a1e"
              metalness={0.92}
              roughness={0.14}
              clearcoat={0.45}
              clearcoatRoughness={0.22}
            />
          </RoundedBox>

          {/* ── FRONT DISPLAY GLASS ── */}
          <mesh position={[0, -0.04, 0.061]}>
            <planeGeometry args={[0.9, 2.06]} />
            <meshPhysicalMaterial
              color="#020a18"
              emissive="#1a4fd8"
              emissiveIntensity={mobilePerformance ? 0.32 : 0.58}
              roughness={0.04}
              metalness={0.0}
              clearcoat={1.0}
              clearcoatRoughness={0.04}
            />
          </mesh>

          {/* ── DYNAMIC ISLAND ── */}
          <RoundedBox args={[0.19, 0.066, 0.006]} radius={0.033} smoothness={6} position={[0, 0.98, 0.064]}>
            <meshStandardMaterial color="#000000" />
          </RoundedBox>

          {/* ── SCREEN CONTENT ── */}
          {!mobilePerformance && (
            <>
              <mesh position={[0, 0.82, 0.063]}>
                <planeGeometry args={[0.76, 0.05]} />
                <meshStandardMaterial color="#ffffff" opacity={0.16} transparent />
              </mesh>
              {[-0.06, -0.26, -0.46, -0.66].map((y, i) => (
                <mesh key={i} position={[i % 2 === 0 ? 0 : 0.06, y, 0.063]}>
                  <planeGeometry args={[i % 2 === 0 ? 0.72 : 0.58, 0.058]} />
                  <meshStandardMaterial
                    color="#4a8fff"
                    opacity={0.24 - i * 0.04}
                    transparent
                  />
                </mesh>
              ))}
              <mesh position={[0, -0.82, 0.063]}>
                <planeGeometry args={[0.72, 0.05]} />
                <meshStandardMaterial color="#ffffff" opacity={0.09} transparent />
              </mesh>
            </>
          )}

          {/* ── HOME INDICATOR ── */}
          <RoundedBox args={[0.28, 0.038, 0.004]} radius={0.019} smoothness={4} position={[0, -1.06, 0.063]}>
            <meshStandardMaterial color="#ffffff" opacity={0.26} transparent />
          </RoundedBox>

          {/* ── GLASS BACK ── */}
          <mesh position={[0, 0, -0.06]}>
            <planeGeometry args={[1.02, 2.28]} />
            <meshPhysicalMaterial
              color="#13131a"
              roughness={0.1}
              metalness={0.12}
              clearcoat={0.88}
              clearcoatRoughness={0.08}
            />
          </mesh>

          {/* ── CAMERA MODULE (raised island) ── */}
          <RoundedBox args={[0.44, 0.44, 0.03]} radius={0.075} smoothness={6} position={[-0.2, 0.74, -0.074]}>
            <meshPhysicalMaterial color="#0a0a0d" metalness={0.55} roughness={0.38} clearcoat={0.35} />
          </RoundedBox>

          {/* Lens 1 — main wide */}
          <mesh position={[-0.28, 0.82, -0.091]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.098, 0.098, 0.009, 32]} />
            <meshPhysicalMaterial color="#050508" roughness={0.02} metalness={0.0} clearcoat={1} clearcoatRoughness={0.02} />
          </mesh>
          <mesh position={[-0.28, 0.82, -0.087]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.098, 0.011, 6, 32]} />
            <meshStandardMaterial color="#3a3a40" metalness={0.95} roughness={0.14} />
          </mesh>

          {/* Lens 2 — ultrawide */}
          <mesh position={[-0.1, 0.82, -0.091]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.082, 0.082, 0.009, 32]} />
            <meshPhysicalMaterial color="#050508" roughness={0.02} metalness={0.0} clearcoat={1} clearcoatRoughness={0.02} />
          </mesh>
          <mesh position={[-0.1, 0.82, -0.087]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.082, 0.01, 6, 32]} />
            <meshStandardMaterial color="#3a3a40" metalness={0.95} roughness={0.14} />
          </mesh>

          {/* Lens 3 — telephoto */}
          <mesh position={[-0.19, 0.66, -0.091]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.072, 0.072, 0.009, 32]} />
            <meshPhysicalMaterial color="#050508" roughness={0.02} metalness={0.0} clearcoat={1} clearcoatRoughness={0.02} />
          </mesh>
          <mesh position={[-0.19, 0.66, -0.087]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.072, 0.009, 6, 32]} />
            <meshStandardMaterial color="#3a3a40" metalness={0.95} roughness={0.14} />
          </mesh>

          {/* Flash */}
          <mesh position={[-0.04, 0.66, -0.091]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.028, 0.028, 0.009, 16]} />
            <meshStandardMaterial color="#fde68a" emissive="#fde68a" emissiveIntensity={0.55} />
          </mesh>

          {/* ── SIDE BUTTONS ── */}
          {/* Volume up */}
          <RoundedBox args={[0.022, 0.16, 0.068]} radius={0.009} position={[-0.561, 0.46, 0]}>
            <meshPhysicalMaterial color="#222228" metalness={0.88} roughness={0.2} />
          </RoundedBox>
          {/* Volume down */}
          <RoundedBox args={[0.022, 0.14, 0.068]} radius={0.009} position={[-0.561, 0.22, 0]}>
            <meshPhysicalMaterial color="#222228" metalness={0.88} roughness={0.2} />
          </RoundedBox>
          {/* Power */}
          <RoundedBox args={[0.022, 0.2, 0.068]} radius={0.009} position={[0.561, 0.34, 0]}>
            <meshPhysicalMaterial color="#222228" metalness={0.88} roughness={0.2} />
          </RoundedBox>

        </group>
      </Float>

      {!mobilePerformance && (
        <ContactShadows position={[0, -1.55, 0]} opacity={0.38} scale={3.5} blur={2.8} />
      )}
    </>
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
        <color attach="background" args={["#0a0a10"]} />
        <ambientLight intensity={0.18} />
        {/* Key light — upper left */}
        <directionalLight position={[-3, 5, 4]} intensity={1.8} color="#ffffff" />
        {/* Rim light — right edge */}
        <pointLight position={[3.5, 1.5, -1.5]} intensity={0.7} color="#e8eeff" />
        {/* Cool fill — lower front */}
        <pointLight position={[0, -2, 3]} intensity={0.22} color="#3b82f6" />
        <hemisphereLight args={["#c8d4ff", "#0a0a14", 0.28]} />
        <PhoneScene mobilePerformance={mobilePerformance} />
      </SceneCanvas>
      <div className="bg-background px-1 py-3">
        <p className="font-semibold">Smartphone premium</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Cadre titanium, module camera triple optique, Dynamic Island, dos en verre clearcoat.
        </p>
      </div>
    </div>
  );
}
