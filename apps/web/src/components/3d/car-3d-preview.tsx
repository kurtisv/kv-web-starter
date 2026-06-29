"use client";

import * as React from "react";
import { ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DoubleSide } from "three";
import type { Group } from "three";
import {
  useMobilePerformance,
  type ScenePerformanceMode,
} from "./scene-canvas";
import { SafeSceneCanvas } from "./core/safe-scene-canvas";

// ── shared PBR clearcoat paint ───────────────────────────────────────────────
const PAINT = {
  metalness: 0.88,
  roughness: 0.07,
  clearcoat: 1.0,
  clearcoatRoughness: 0.04,
} as const;

// ── Taycan-inspired side profile (XY plane, extruded along +Z) ───────────────
// Front of car = +X, rear = -X, roof peak ≈ 1.12, wheelbase ≈ 57 % of length
function makeBodyGeo(W: number): THREE.ExtrudeGeometry {
  const s = new THREE.Shape();

  s.moveTo(2.0, 0.02);   // front bumper base

  // bottom sill — runs flat
  s.lineTo(-2.0, 0.02);

  // rear face — short vertical rise
  s.lineTo(-2.0, 0.40);
  s.bezierCurveTo(-2.0, 0.47, -1.96, 0.52, -1.90, 0.53);

  // trunk lid — nearly flat, slightly above sill
  s.lineTo(-1.72, 0.53);

  // fastback C-pillar — the Taycan signature steep curve
  s.bezierCurveTo(-1.50, 0.53, -1.26, 0.70, -1.08, 0.87);
  s.bezierCurveTo(-0.90, 1.04, -0.68, 1.12, -0.50, 1.12);

  // roof — flat
  s.lineTo(0.22, 1.12);

  // A-pillar — steep sports-car rake
  s.bezierCurveTo(0.40, 1.10, 0.60, 0.96, 0.76, 0.80);
  s.bezierCurveTo(0.92, 0.64, 1.10, 0.55, 1.30, 0.53);

  // hood — gentle downslope toward nose
  s.bezierCurveTo(1.50, 0.51, 1.70, 0.46, 1.86, 0.43);
  s.lineTo(2.0, 0.42);

  // front face — vertical close
  s.lineTo(2.0, 0.02);
  s.closePath();

  return new THREE.ExtrudeGeometry(s, {
    depth: W,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.034,
    bevelSegments: 5,
  });
}

// ── Wheel ────────────────────────────────────────────────────────────────────
interface WheelProps {
  x: number;
  z: number;
  mobile: boolean;
}

function Wheel({ x, z, mobile }: WheelProps) {
  const R = 0.265;
  const rWall = 0.068;
  return (
    <group position={[x, R, z]}>
      {/* Rubber */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R - rWall * 0.55, rWall, 20, 56]} />
        <meshStandardMaterial color="#141414" roughness={0.94} metalness={0.02} />
      </mesh>
      {/* Rim disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[R - rWall, R - rWall, 0.056, 40]} />
        <meshPhysicalMaterial
          color="#c2c2cc"
          metalness={0.96}
          roughness={0.08}
          clearcoat={0.55}
        />
      </mesh>
      {/* 5 spokes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} rotation={[0, 0, (Math.PI * 2 * i) / 5]}>
          <boxGeometry args={[0.38, 0.040, 0.022]} />
          <meshPhysicalMaterial color="#b0b0bc" metalness={0.94} roughness={0.10} />
        </mesh>
      ))}
      {/* Hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.064, 24]} />
        <meshPhysicalMaterial color="#88888e" metalness={0.9} roughness={0.22} />
      </mesh>
      {/* Porsche-yellow brake caliper */}
      {!mobile && (
        <mesh position={[z > 0 ? 0.082 : -0.082, 0.09, 0]}>
          <boxGeometry args={[0.065, 0.22, 0.16]} />
          <meshStandardMaterial color="#c8a800" roughness={0.50} metalness={0.38} />
        </mesh>
      )}
    </group>
  );
}

// ── Main scene ───────────────────────────────────────────────────────────────
function TaycanScene({ mobile, color }: { mobile: boolean; color: string }) {
  const groupRef = React.useRef<Group>(null);
  const W = 1.59;

  const bodyGeo = React.useMemo(() => makeBodyGeo(W), []);
  React.useEffect(() => () => bodyGeo.dispose(), [bodyGeo]);

  useFrame((state) => {
    if (!groupRef.current || mobile) return;
    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.22) * 0.46 - 0.30;
  });

  // A-pillar angle from horizontal: atan(Δy / Δx) = atan(0.32 / 0.54) ≈ 0.534 rad
  const aAngle = Math.atan2(0.32, 0.54);
  // C-pillar (fastback) angle: atan(Δy / Δx) = atan(0.25 / 0.58) ≈ 0.406 rad (shallower = steeper car)
  const cAngle = Math.atan2(0.25, 0.58);

  const glassMat = (
    <meshPhysicalMaterial
      color="#030c1c"
      opacity={0.52}
      transparent
      roughness={0.02}
      metalness={0}
      clearcoat={1}
      clearcoatRoughness={0.02}
      side={DoubleSide}
    />
  );

  return (
    <group ref={groupRef} rotation={[0.04, -0.30, 0]} position={[0, 0, 0]}>

      {/* ── BODY (extruded Taycan fastback profile) ── */}
      <mesh position={[0, 0, -W / 2]} geometry={bodyGeo}>
        <meshPhysicalMaterial color={color} {...PAINT} />
      </mesh>

      {/* ── WINDSHIELD ── angled at A-pillar rake ── */}
      <mesh
        position={[0.49, 0.96, 0]}
        rotation={[0, Math.PI / 2, aAngle]}
      >
        <planeGeometry args={[1.44, 0.62]} />
        {glassMat}
      </mesh>

      {/* ── REAR GLASS ── fastback pitch ── */}
      <mesh
        position={[-0.80, 0.99, 0]}
        rotation={[0, -Math.PI / 2, cAngle]}
      >
        <planeGeometry args={[1.40, 0.60]} />
        {glassMat}
      </mesh>

      {/* ── SIDE WINDOWS ── flat planes at body sides ── */}
      {[0.76, -0.76].map((z) => (
        <React.Fragment key={z}>
          {/* Front door */}
          <mesh position={[0.44, 0.90, z]}>
            <planeGeometry args={[0.68, 0.44]} />
            {glassMat}
          </mesh>
          {/* Rear door / quarter */}
          <mesh position={[-0.26, 0.88, z]}>
            <planeGeometry args={[0.54, 0.40]} />
            {glassMat}
          </mesh>
        </React.Fragment>
      ))}

      {/* ── FRONT LED HEADLIGHTS (4-point DRL signature) ── */}
      {[0.54, -0.54].map((z) => (
        <group key={z} position={[1.97, 0.36, z]}>
          {/* Main matrix cluster */}
          <mesh>
            <boxGeometry args={[0.055, 0.18, 0.22]} />
            <meshStandardMaterial
              color="#fefce8"
              emissive="#fde68a"
              emissiveIntensity={mobile ? 1.2 : 3.2}
            />
          </mesh>
          {/* 4 DRL dots */}
          {[0, 0.055, 0.11, 0.165].map((dz, j) => (
            <mesh key={j} position={[0, 0.08, z > 0 ? -dz - 0.02 : dz + 0.02]}>
              <sphereGeometry args={[0.013, 8, 8]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={mobile ? 2 : 5.5}
              />
            </mesh>
          ))}
        </group>
      ))}
      {/* DRL bridge strip */}
      <mesh position={[1.97, 0.44, 0]}>
        <boxGeometry args={[0.042, 0.014, 1.14]} />
        <meshStandardMaterial
          color="#fefce8"
          emissive="#fde68a"
          emissiveIntensity={mobile ? 0.7 : 1.8}
        />
      </mesh>

      {/* ── REAR FULL-WIDTH LED BAR (Taycan signature) ── */}
      <mesh position={[-1.97, 0.50, 0]}>
        <boxGeometry args={[0.040, 0.018, 1.52]} />
        <meshStandardMaterial
          color="#ffe4e4"
          emissive="#ef4444"
          emissiveIntensity={mobile ? 2.8 : 7.0}
        />
      </mesh>
      {/* Taillight clusters */}
      {[0.64, -0.64].map((z) => (
        <mesh key={z} position={[-1.97, 0.44, z]}>
          <boxGeometry args={[0.052, 0.14, 0.24]} />
          <meshStandardMaterial
            color="#ffe4e4"
            emissive="#dc2626"
            emissiveIntensity={mobile ? 2.2 : 5.0}
          />
        </mesh>
      ))}

      {/* ── FRONT SPLITTER ── */}
      <mesh position={[2.03, 0.08, 0]}>
        <boxGeometry args={[0.06, 0.10, 1.50]} />
        <meshPhysicalMaterial color="#0c0c11" metalness={0.30} roughness={0.70} />
      </mesh>

      {/* ── REAR DIFFUSER with louvres ── */}
      <mesh position={[-2.03, 0.15, 0]}>
        <boxGeometry args={[0.06, 0.22, 1.42]} />
        <meshPhysicalMaterial color="#0c0c11" metalness={0.22} roughness={0.74} />
      </mesh>
      {!mobile &&
        [-0.36, -0.12, 0.12, 0.36].map((z) => (
          <mesh key={z} position={[-2.06, 0.15, z]}>
            <boxGeometry args={[0.02, 0.14, 0.018]} />
            <meshStandardMaterial color="#1a1a20" />
          </mesh>
        ))}

      {/* ── REAR SPOILER LIP ── */}
      <mesh position={[-1.70, 0.54, 0]}>
        <boxGeometry args={[0.14, 0.024, 1.36]} />
        <meshPhysicalMaterial color={color} {...PAINT} />
      </mesh>

      {/* ── AIR OUTLET BEHIND FRONT WHEELS ── */}
      {[0.76, -0.76].map((z) => (
        <mesh key={z} position={[0.96, 0.38, z]}>
          <boxGeometry args={[0.18, 0.10, 0.018]} />
          <meshPhysicalMaterial color="#0c0c11" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}

      {/* ── DOOR HANDLE RECESSES (flush Taycan handles) ── */}
      {!mobile &&
        [0.40, -0.22].map((x) =>
          [0.77, -0.77].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.72, z]}>
              <boxGeometry args={[0.22, 0.04, 0.018]} />
              <meshPhysicalMaterial color="#0c0c12" metalness={0.4} roughness={0.6} />
            </mesh>
          ))
        )}

      {/* ── WHEELS (front axle X=1.34, rear axle X=-0.94) ── */}
      <Wheel x={1.34} z={0.80} mobile={mobile} />
      <Wheel x={1.34} z={-0.80} mobile={mobile} />
      <Wheel x={-0.94} z={0.80} mobile={mobile} />
      <Wheel x={-0.94} z={-0.80} mobile={mobile} />

      {/* ── GROUND SHADOW ── */}
      {!mobile && (
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.62}
          scale={10}
          blur={2.2}
        />
      )}
    </group>
  );
}

// ── Public component ─────────────────────────────────────────────────────────
interface Car3DPreviewProps {
  className?: string;
  color?: string;
  performanceMode?: ScenePerformanceMode;
  label?: string;
}

export function Car3DPreview({
  className,
  color = "#0c2352",
  performanceMode = "auto",
  label = "Apercu 3D",
}: Car3DPreviewProps) {
  const mobile = useMobilePerformance(performanceMode);

  return (
    <div className={className} data-testid="car-3d-preview">
      <SafeSceneCanvas
        aria-label="Car 3D preview"
        performanceMode={performanceMode}
        fallbackType="car"
        className="aspect-video min-h-[280px] rounded-none"
      >
        <color attach="background" args={["#060610"]} />
        <ambientLight intensity={0.08} />
        {/* Key light — upper-left */}
        <directionalLight position={[-5, 8, 4]} intensity={2.6} color="#fff8f0" />
        {/* Right rim */}
        <pointLight position={[4.5, 3, -4]} intensity={0.95} color="#ddeeff" />
        {/* Ground bounce */}
        <pointLight position={[0, -2, 3]} intensity={0.18} color="#ffffff" />
        {/* Rear fill */}
        <pointLight position={[-5, 2, 0]} intensity={0.48} color="#e8f0ff" />
        <hemisphereLight args={["#b8c8ff", "#050508", 0.18]} />
        <TaycanScene mobile={mobile} color={color} />
      </SafeSceneCanvas>
      {label && (
        <div className="bg-background px-1 py-3">
          <p className="font-semibold">{label}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Silhouette fastback extrudee, barre LED pleine largeur Taycan, 5 branches, clearcoat brillant.
          </p>
        </div>
      )}
    </div>
  );
}
