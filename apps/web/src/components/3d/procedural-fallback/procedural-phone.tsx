"use client";

import * as React from "react";
import { RoundedBox, Float, ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { useMobilePerformance, type ScenePerformanceMode } from "../scene-canvas";
import { SafeSceneCanvas } from "../core/safe-scene-canvas";

function PhoneScene({ mobile }: { mobile: boolean }) {
  const groupRef = React.useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current || mobile) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.38) * 0.32 + 0.22;
  });

  return (
    <>
      <Float speed={mobile ? 0.5 : 1.1} floatIntensity={mobile ? 0.12 : 0.28}>
        <group ref={groupRef} rotation={[0.05, 0.22, 0]}>
          <RoundedBox args={[1.08, 2.34, 0.116]} radius={0.094} smoothness={8}>
            <meshPhysicalMaterial color="#1a1a1e" metalness={0.92} roughness={0.14} clearcoat={0.45} clearcoatRoughness={0.22} />
          </RoundedBox>
          <mesh position={[0, -0.04, 0.061]}>
            <planeGeometry args={[0.9, 2.06]} />
            <meshPhysicalMaterial color="#020a18" emissive="#1a4fd8" emissiveIntensity={mobile ? 0.32 : 0.58} roughness={0.04} metalness={0.0} clearcoat={1.0} clearcoatRoughness={0.04} />
          </mesh>
          <RoundedBox args={[0.19, 0.066, 0.006]} radius={0.033} smoothness={6} position={[0, 0.98, 0.064]}>
            <meshStandardMaterial color="#000000" />
          </RoundedBox>
          {!mobile && (
            <>
              <mesh position={[0, 0.82, 0.063]}>
                <planeGeometry args={[0.76, 0.05]} />
                <meshStandardMaterial color="#ffffff" opacity={0.16} transparent />
              </mesh>
              {[-0.06, -0.26, -0.46, -0.66].map((y, i) => (
                <mesh key={i} position={[i % 2 === 0 ? 0 : 0.06, y, 0.063]}>
                  <planeGeometry args={[i % 2 === 0 ? 0.72 : 0.58, 0.058]} />
                  <meshStandardMaterial color="#4a8fff" opacity={0.24 - i * 0.04} transparent />
                </mesh>
              ))}
              <mesh position={[0, -0.82, 0.063]}>
                <planeGeometry args={[0.72, 0.05]} />
                <meshStandardMaterial color="#ffffff" opacity={0.09} transparent />
              </mesh>
            </>
          )}
          <RoundedBox args={[0.28, 0.038, 0.004]} radius={0.019} smoothness={4} position={[0, -1.06, 0.063]}>
            <meshStandardMaterial color="#ffffff" opacity={0.26} transparent />
          </RoundedBox>
          <mesh position={[0, 0, -0.06]}>
            <planeGeometry args={[1.02, 2.28]} />
            <meshPhysicalMaterial color="#13131a" roughness={0.1} metalness={0.12} clearcoat={0.88} clearcoatRoughness={0.08} />
          </mesh>
          <RoundedBox args={[0.44, 0.44, 0.03]} radius={0.075} smoothness={6} position={[-0.2, 0.74, -0.074]}>
            <meshPhysicalMaterial color="#0a0a0d" metalness={0.55} roughness={0.38} clearcoat={0.35} />
          </RoundedBox>
          {[
            { pos: [-0.28, 0.82] as [number, number], r: 0.098, ring: 0.011 },
            { pos: [-0.1,  0.82] as [number, number], r: 0.082, ring: 0.010 },
            { pos: [-0.19, 0.66] as [number, number], r: 0.072, ring: 0.009 },
          ].map(({ pos: [lx, ly], r, ring }, i) => (
            <React.Fragment key={i}>
              <mesh position={[lx, ly, -0.091]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[r, r, 0.009, 32]} />
                <meshPhysicalMaterial color="#050508" roughness={0.02} metalness={0.0} clearcoat={1} clearcoatRoughness={0.02} />
              </mesh>
              <mesh position={[lx, ly, -0.087]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[r, ring, 6, 32]} />
                <meshStandardMaterial color="#3a3a40" metalness={0.95} roughness={0.14} />
              </mesh>
            </React.Fragment>
          ))}
          <mesh position={[-0.04, 0.66, -0.091]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.028, 0.028, 0.009, 16]} />
            <meshStandardMaterial color="#fde68a" emissive="#fde68a" emissiveIntensity={0.55} />
          </mesh>
          <RoundedBox args={[0.022, 0.16, 0.068]} radius={0.009} position={[-0.561, 0.46, 0]}>
            <meshPhysicalMaterial color="#222228" metalness={0.88} roughness={0.2} />
          </RoundedBox>
          <RoundedBox args={[0.022, 0.14, 0.068]} radius={0.009} position={[-0.561, 0.22, 0]}>
            <meshPhysicalMaterial color="#222228" metalness={0.88} roughness={0.2} />
          </RoundedBox>
          <RoundedBox args={[0.022, 0.2, 0.068]} radius={0.009} position={[0.561, 0.34, 0]}>
            <meshPhysicalMaterial color="#222228" metalness={0.88} roughness={0.2} />
          </RoundedBox>
        </group>
      </Float>
      {!mobile && <ContactShadows position={[0, -1.55, 0]} opacity={0.38} scale={3.5} blur={2.8} />}
    </>
  );
}

export interface ProceduralPhoneFallbackProps {
  className?: string;
  performanceMode?: ScenePerformanceMode;
}

export function ProceduralPhoneFallback({ className, performanceMode = "auto" }: ProceduralPhoneFallbackProps) {
  const mobile = useMobilePerformance(performanceMode);
  return (
    <div className={className} data-testid="procedural-phone-fallback">
      <SafeSceneCanvas
        aria-label="Smartphone premium — rendu procedural"
        performanceMode={performanceMode}
        fallbackType="phone"
        className="aspect-[3/4] min-h-[280px] rounded-none"
      >
        <color attach="background" args={["#0a0a10"]} />
        <ambientLight intensity={0.18} />
        <directionalLight position={[-3, 5, 4]} intensity={1.8} color="#ffffff" />
        <pointLight position={[3.5, 1.5, -1.5]} intensity={0.7} color="#e8eeff" />
        <pointLight position={[0, -2, 3]} intensity={0.22} color="#3b82f6" />
        <hemisphereLight args={["#c8d4ff", "#0a0a14", 0.28]} />
        <PhoneScene mobile={mobile} />
      </SafeSceneCanvas>
      <div className="bg-background px-1 py-3">
        <p className="font-semibold">Smartphone premium</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Cadre titanium, module camera triple optique, Dynamic Island, dos en verre clearcoat.
        </p>
      </div>
    </div>
  );
}
