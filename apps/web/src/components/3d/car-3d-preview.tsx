"use client";

import * as React from "react";
import { RoundedBox, ContactShadows, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { SceneCanvas, useMobilePerformance, type ScenePerformanceMode } from "./scene-canvas";

interface WheelGroupProps {
  x: number;
  z: number;
  mobilePerformance: boolean;
}

function WheelGroup({ x, z, mobilePerformance }: WheelGroupProps) {
  return (
    <group position={[x, -0.18, z]}>
      {/* Tire */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.09, 14, 36]} />
        <meshStandardMaterial color="#111111" roughness={0.92} metalness={0.04} />
      </mesh>
      {/* Rim disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.048, 24]} />
        <meshPhysicalMaterial color="#c8c8d0" metalness={0.95} roughness={0.1} clearcoat={0.4} />
      </mesh>
      {/* 5 spokes */}
      {!mobilePerformance && [0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} rotation={[0, 0, (Math.PI * 2 * i) / 5]}>
          <boxGeometry args={[0.37, 0.038, 0.024]} />
          <meshPhysicalMaterial color="#b8b8c2" metalness={0.92} roughness={0.14} />
        </mesh>
      ))}
      {/* Hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.054, 0.054, 0.065, 16]} />
        <meshPhysicalMaterial color="#909098" metalness={0.88} roughness={0.22} />
      </mesh>
      {/* Brake caliper */}
      {!mobilePerformance && (
        <mesh position={[x > 0 ? 0.08 : -0.08, 0.12, 0]}>
          <boxGeometry args={[0.065, 0.18, 0.14]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.52} metalness={0.35} />
        </mesh>
      )}
    </group>
  );
}

function CarScene({ mobilePerformance, color }: { mobilePerformance: boolean; color: string }) {
  const groupRef = React.useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current || mobilePerformance) return;
    // Oscillate with a 3/4 front-left bias
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.28) * 0.52 - 0.38;
  });

  return (
    <group ref={groupRef} rotation={[0.05, -0.38, 0]} position={[0, 0.08, 0]}>

      {/* ── LOWER BODY / SILLS ── */}
      <RoundedBox args={[3.82, 0.5, 1.72]} radius={0.055} smoothness={6} position={[0, -0.06, 0]}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.86}
          roughness={0.07}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </RoundedBox>

      {/* ── HOOD ── */}
      <mesh position={[1.48, 0.2, 0]}>
        <boxGeometry args={[0.88, 0.075, 1.56]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.86}
          roughness={0.07}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* ── TRUNK LID ── */}
      <mesh position={[-1.44, 0.2, 0]}>
        <boxGeometry args={[0.82, 0.07, 1.5]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.86}
          roughness={0.07}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* ── CABIN (roofline) ── */}
      <RoundedBox args={[1.82, 0.76, 1.54]} radius={0.2} smoothness={8} position={[-0.08, 0.44, 0]}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.86}
          roughness={0.07}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </RoundedBox>

      {/* ── WINDSHIELD ── */}
      <mesh position={[0.74, 0.5, 0]} rotation={[0, 0, -0.65]}>
        <planeGeometry args={[0.88, 1.46]} />
        <meshPhysicalMaterial
          color="#0a1628"
          opacity={0.52}
          transparent
          metalness={0}
          roughness={0.04}
          clearcoat={1}
          clearcoatRoughness={0.04}
        />
      </mesh>

      {/* ── REAR GLASS ── */}
      <mesh position={[-0.8, 0.48, 0]} rotation={[0, 0, 0.58]}>
        <planeGeometry args={[0.82, 1.4]} />
        <meshPhysicalMaterial
          color="#0a1628"
          opacity={0.5}
          transparent
          metalness={0}
          roughness={0.04}
          clearcoat={1}
          clearcoatRoughness={0.04}
        />
      </mesh>

      {/* ── SIDE WINDOWS ── */}
      {([-0.9, 0.9] as number[]).map((z, i) => (
        <mesh key={i} position={[-0.08, 0.5, z]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.55, 0.56]} />
          <meshPhysicalMaterial
            color="#0a1628"
            opacity={0.48}
            transparent
            metalness={0}
            roughness={0.04}
            clearcoat={1}
            clearcoatRoughness={0.04}
          />
        </mesh>
      ))}

      {/* ── LED HEADLIGHT STRIPS ── */}
      <mesh position={[1.93, 0.14, 0.52]}>
        <boxGeometry args={[0.04, 0.038, 0.42]} />
        <meshStandardMaterial
          color="#fef3c7"
          emissive="#fde68a"
          emissiveIntensity={mobilePerformance ? 1.2 : 2.8}
        />
      </mesh>
      <mesh position={[1.93, 0.14, -0.52]}>
        <boxGeometry args={[0.04, 0.038, 0.42]} />
        <meshStandardMaterial
          color="#fef3c7"
          emissive="#fde68a"
          emissiveIntensity={mobilePerformance ? 1.2 : 2.8}
        />
      </mesh>
      {/* DRL accent — horizontal */}
      <mesh position={[1.93, 0.22, 0]}>
        <boxGeometry args={[0.04, 0.022, 1.15]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fde68a" emissiveIntensity={mobilePerformance ? 0.6 : 1.4} />
      </mesh>

      {/* ── LED TAILLIGHT STRIPS ── */}
      <mesh position={[-1.93, 0.14, 0.52]}>
        <boxGeometry args={[0.04, 0.038, 0.46]} />
        <meshStandardMaterial
          color="#fee2e2"
          emissive="#dc2626"
          emissiveIntensity={mobilePerformance ? 1.2 : 2.8}
        />
      </mesh>
      <mesh position={[-1.93, 0.14, -0.52]}>
        <boxGeometry args={[0.04, 0.038, 0.46]} />
        <meshStandardMaterial
          color="#fee2e2"
          emissive="#dc2626"
          emissiveIntensity={mobilePerformance ? 1.2 : 2.8}
        />
      </mesh>
      {/* Taillight bar — full width */}
      <mesh position={[-1.93, 0.14, 0]}>
        <boxGeometry args={[0.04, 0.018, 1.2]} />
        <meshStandardMaterial color="#fee2e2" emissive="#dc2626" emissiveIntensity={mobilePerformance ? 0.6 : 1.4} />
      </mesh>

      {/* ── FRONT FASCIA ── */}
      <RoundedBox args={[0.09, 0.38, 1.72]} radius={0.025} position={[1.95, -0.08, 0]}>
        <meshPhysicalMaterial color="#0d0d10" metalness={0.5} roughness={0.35} />
      </RoundedBox>

      {/* ── REAR DIFFUSER ── */}
      <mesh position={[-1.95, -0.22, 0]}>
        <boxGeometry args={[0.08, 0.2, 1.6]} />
        <meshPhysicalMaterial color="#0d0d10" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* ── WHEELS ── */}
      <WheelGroup x={0.94} z={1.05} mobilePerformance={mobilePerformance} />
      <WheelGroup x={0.94} z={-1.05} mobilePerformance={mobilePerformance} />
      <WheelGroup x={-0.94} z={1.05} mobilePerformance={mobilePerformance} />
      <WheelGroup x={-0.94} z={-1.05} mobilePerformance={mobilePerformance} />

      {!mobilePerformance && (
        <ContactShadows position={[0, -0.51, 0]} opacity={0.52} scale={7} blur={2.2} />
      )}
    </group>
  );
}

interface Car3DPreviewProps {
  className?: string;
  color?: string;
  performanceMode?: ScenePerformanceMode;
  label?: string;
}

export function Car3DPreview({
  className,
  color = "#c0392b",
  performanceMode = "auto",
  label = "Apercu 3D",
}: Car3DPreviewProps) {
  const mobilePerformance = useMobilePerformance(performanceMode);

  return (
    <div className={className} data-testid="car-3d-preview">
      <SceneCanvas
        aria-label="Car 3D preview"
        performanceMode={performanceMode}
        className="aspect-video min-h-[280px] rounded-none"
      >
        <color attach="background" args={["#0a0a0f"]} />
        <ambientLight intensity={0.14} />
        {/* Key light — upper left */}
        <directionalLight position={[-4, 6, 3]} intensity={2.2} color="#fffaf0" />
        {/* Rim light — right rear */}
        <pointLight position={[4, 3, -3]} intensity={0.85} color="#e8eeff" />
        {/* Ground bounce — front fill */}
        <pointLight position={[0, -2, 3]} intensity={0.28} color="#ffffff" />
        {/* Cool underside */}
        <pointLight position={[0, -3, 0]} intensity={0.15} color="#1d4ed8" />
        <hemisphereLight args={["#c8d4ff", "#080810", 0.22]} />
        <CarScene mobilePerformance={mobilePerformance} color={color} />
      </SceneCanvas>
      {label && (
        <div className="bg-background px-1 py-3">
          <p className="font-semibold">{label}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Carrosserie clearcoat, jantes 5 branches, etriers freins, strips LED DRL/feux.
          </p>
        </div>
      )}
    </div>
  );
}
