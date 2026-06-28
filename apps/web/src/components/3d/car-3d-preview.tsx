"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import type { Group } from "three";
import { SceneCanvas, useMobilePerformance, type ScenePerformanceMode } from "./scene-canvas";

function CarScene({ mobilePerformance, color }: { mobilePerformance: boolean; color: string }) {
  const groupRef = React.useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    if (mobilePerformance) {
      groupRef.current.rotation.y += 0.004;
    } else {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.35;
    }
  });

  const bodyMat = { color, metalness: 0.75, roughness: 0.22 };
  const wheelMat = { color: "#1a1a1a", metalness: 0.4, roughness: 0.6 };
  const glassMat = { color: "#b0c4de", metalness: 0.1, roughness: 0.05, opacity: 0.55, transparent: true };

  const wheelPositions: [number, number, number][] = [
    [1.1, -0.4, 0.85],
    [-1.1, -0.4, 0.85],
    [1.1, -0.4, -0.85],
    [-1.1, -0.4, -0.85],
  ];

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      {/* Body lower */}
      <mesh position={[0, -0.28, 0]}>
        <boxGeometry args={[2.8, 0.45, 1.35]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Hood (front slope) */}
      <mesh position={[0.75, -0.06, 0]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[1.3, 0.28, 1.3]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Trunk (rear) */}
      <mesh position={[-0.75, -0.12, 0]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[1.2, 0.32, 1.3]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Cabin (top) */}
      <mesh position={[-0.1, 0.15, 0]}>
        <boxGeometry args={[1.8, 0.55, 1.1]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0.65, 0.1, 0]} rotation={[0, 0, -0.7]}>
        <planeGeometry args={[0.65, 1.0]} />
        <meshStandardMaterial {...glassMat} />
      </mesh>

      {/* Rear glass */}
      <mesh position={[-0.82, 0.08, 0]} rotation={[0, 0, 0.6]}>
        <planeGeometry args={[0.52, 0.95]} />
        <meshStandardMaterial {...glassMat} />
      </mesh>

      {/* Headlights */}
      <mesh position={[1.4, -0.22, 0.42]}>
        <boxGeometry args={[0.08, 0.1, 0.28]} />
        <meshStandardMaterial color="#fffbe0" emissive="#fde68a" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[1.4, -0.22, -0.42]}>
        <boxGeometry args={[0.08, 0.1, 0.28]} />
        <meshStandardMaterial color="#fffbe0" emissive="#fde68a" emissiveIntensity={1.2} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-1.4, -0.22, 0.42]}>
        <boxGeometry args={[0.06, 0.1, 0.26]} />
        <meshStandardMaterial color="#ff3a3a" emissive="#dc2626" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[-1.4, -0.22, -0.42]}>
        <boxGeometry args={[0.06, 0.1, 0.26]} />
        <meshStandardMaterial color="#ff3a3a" emissive="#dc2626" emissiveIntensity={0.9} />
      </mesh>

      {/* Wheels */}
      {wheelPositions.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.38, 0.38, 0.3, 24]} />
            <meshStandardMaterial {...wheelMat} />
          </mesh>
          {/* Rim */}
          <mesh>
            <cylinderGeometry args={[0.24, 0.24, 0.32, 12]} />
            <meshStandardMaterial color="#9ca3af" metalness={0.85} roughness={0.12} />
          </mesh>
        </group>
      ))}

      {!mobilePerformance && (
        <ContactShadows position={[0, -0.68, 0]} opacity={0.4} scale={6} blur={2} far={3} />
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
        <color attach="background" args={["#0d0d10"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 4]} intensity={1.6} color="#fffaf0" />
        <pointLight position={[-4, 3, 2]} intensity={0.6} color="#1d4ed8" />
        <pointLight position={[0, -1, 3]} intensity={0.3} color="#f87171" />
        <CarScene mobilePerformance={mobilePerformance} color={color} />
      </SceneCanvas>
      {label && (
        <div className="bg-background px-1 py-3">
          <p className="font-semibold">{label}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Geometrie composee, emissifs phares/feux, OrbitControls.
          </p>
        </div>
      )}
    </div>
  );
}
