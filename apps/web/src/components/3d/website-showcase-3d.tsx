"use client";

import * as React from "react";
import { RoundedBox, ContactShadows } from "@react-three/drei";
import type { Group } from "three";
import { useMobilePerformance, type ScenePerformanceMode } from "./scene-canvas";
import { SafeSceneCanvas } from "./core/safe-scene-canvas";

// MacBook Pro 16" proportions (355.7 × 248.1 × 16.8 mm)
// Scene scale: 1 unit ≈ 111 mm
// Width W=3.2, Depth D=2.24, BaseH=0.10, LidH=2.01, LidT=0.048

const W = 3.2;   // body width
const D = 2.24;  // body depth front-to-back
const BH = 0.10; // base (keyboard deck) height
const LH = 2.01; // lid panel height
const LT = 0.048; // lid thickness

// Screen dimensions (16:10 aspect, thin bezels)
const SW = W - 0.24;   // 2.96
const SH = LH - 0.30;  // 1.71

// Lid rotation: +14.4° forward = screen faces viewer, lid opens 104° from base
// Positive angle = top of lid tilts TOWARD viewer (+Z direction)
const LID_ROT = Math.PI * 0.08;

// Space Gray palette
const BODY_COLOR = "#6c6c72";
const DARK_SURFACE = "#4e4e54";
const KEY_COLOR = "#3c3c42";
const SCREEN_BG = "#010810";

function LaptopScene({ mobile }: { mobile: boolean }) {
  const hingeZ = -(D / 2);   // -1.12  — back edge of base
  const hingeY = BH;          //  0.10  — top of base

  return (
    <group position={[0, -0.58, 0]}>

      {/* ━━━━ BASE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <RoundedBox
        args={[W, BH, D]}
        radius={0.038}
        smoothness={5}
        position={[0, BH / 2, 0]}
      >
        <meshPhysicalMaterial
          color={BODY_COLOR}
          metalness={0.92}
          roughness={0.18}
          clearcoat={0.20}
          clearcoatRoughness={0.52}
        />
      </RoundedBox>

      {/* Keyboard recess — slightly darker inset surface */}
      <mesh position={[0, BH + 0.0005, 0.04]}>
        <planeGeometry args={[W - 0.18, D - 0.36]} />
        <meshPhysicalMaterial
          color={DARK_SURFACE}
          metalness={0.78}
          roughness={0.44}
        />
      </mesh>

      {/* Function row */}
      <mesh position={[0, BH + 0.001, -0.68]}>
        <planeGeometry args={[W - 0.22, 0.060]} />
        <meshPhysicalMaterial color={KEY_COLOR} metalness={0.52} roughness={0.62} />
      </mesh>

      {/* Alpha key rows (4 rows) */}
      {!mobile &&
        [-0.48, -0.28, -0.08, 0.14].map((z, i) => (
          <mesh key={i} position={[0, BH + 0.001, z]}>
            <planeGeometry args={[W - 0.28 - i * 0.06, 0.106]} />
            <meshPhysicalMaterial
              color={KEY_COLOR}
              metalness={0.5}
              roughness={0.66}
            />
          </mesh>
        ))}

      {/* Spacebar hint */}
      <mesh position={[0, BH + 0.001, 0.34]}>
        <planeGeometry args={[1.28, 0.082]} />
        <meshPhysicalMaterial color={KEY_COLOR} metalness={0.5} roughness={0.62} />
      </mesh>

      {/* Large glass trackpad */}
      <RoundedBox
        args={[1.16, 0.007, 0.84]}
        radius={0.018}
        smoothness={4}
        position={[0, BH + 0.004, 0.82]}
      >
        <meshPhysicalMaterial
          color="#909098"
          metalness={0.74}
          roughness={0.14}
          clearcoat={0.78}
          clearcoatRoughness={0.08}
        />
      </RoundedBox>

      {/* Speaker grilles — 6 slim lines each side */}
      {!mobile &&
        [-1.40, 1.40].map((x) =>
          [0, 0.08, 0.16, 0.24, 0.32, 0.40].map((dz, j) => (
            <mesh key={`${x}-${j}`} position={[x, BH + 0.001, -0.56 + dz]}>
              <planeGeometry args={[0.20, 0.013]} />
              <meshStandardMaterial color="#2e2e34" />
            </mesh>
          ))
        )}

      {/* USB-C port cutouts — left side, 3 ports */}
      {!mobile &&
        [-0.60, -0.34, 0.34].map((z, i) => (
          <mesh key={i} position={[-(W / 2) + 0.003, BH * 0.50, z]}>
            <boxGeometry args={[0.008, 0.048, 0.078]} />
            <meshStandardMaterial color="#28282e" />
          </mesh>
        ))}

      {/* ━━━━ HINGE BAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <mesh
        position={[0, hingeY + 0.022, hingeZ]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.022, 0.022, W - 0.22, 24]} />
        <meshPhysicalMaterial
          color="#7a7a80"
          metalness={0.97}
          roughness={0.12}
        />
      </mesh>

      {/* ━━━━ LID (pivots from hinge at back of base) ━━━━━━━━━━━━━━━━━━━━ */}
      {/*
        LID_ROT = +Math.PI*0.08 ≈ +14.4°
        POSITIVE rotation around X: top of lid swings toward +Z (toward viewer)
        Screen normal after rotation = [0, -sin(LID_ROT), cos(LID_ROT)]
          ≈ [0, -0.242, 0.970] — mostly facing viewer, slightly downward ✓
      */}
      <group position={[0, hingeY, hingeZ]} rotation={[LID_ROT, 0, 0]}>

        {/* Aluminum lid shell */}
        <RoundedBox
          args={[W, LH, LT]}
          radius={0.036}
          smoothness={5}
          position={[0, LH / 2, 0]}
        >
          <meshPhysicalMaterial
            color={BODY_COLOR}
            metalness={0.92}
            roughness={0.18}
            clearcoat={0.16}
            clearcoatRoughness={0.50}
          />
        </RoundedBox>

        {/* Apple-logo embossed circle on aluminum back */}
        {!mobile && (
          <mesh position={[0, LH * 0.50, -(LT / 2 + 0.0008)]}>
            <circleGeometry args={[0.145, 48]} />
            <meshPhysicalMaterial
              color="#787880"
              metalness={0.96}
              roughness={0.10}
              clearcoat={0.50}
            />
          </mesh>
        )}

        {/* Screen bezel (very thin, MacBook Pro style) */}
        <mesh position={[0, LH / 2, LT / 2 + 0.001]}>
          <planeGeometry args={[W - 0.04, LH - 0.04]} />
          <meshStandardMaterial color="#060607" roughness={0.80} />
        </mesh>

        {/* Active display */}
        <mesh position={[0, LH / 2, LT / 2 + 0.002]}>
          <planeGeometry args={[SW, SH]} />
          <meshPhysicalMaterial
            color={SCREEN_BG}
            emissive="#0d2e6e"
            emissiveIntensity={mobile ? 0.22 : 0.45}
            roughness={0.02}
            metalness={0}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
          />
        </mesh>

        {/* MacBook notch — rounded pill housing webcam */}
        <RoundedBox
          args={[0.24, 0.068, 0.006]}
          radius={0.032}
          smoothness={8}
          position={[0, LH / 2 + SH / 2 - 0.042, LT / 2 + 0.003]}
        >
          <meshStandardMaterial color="#000000" />
        </RoundedBox>

        {/* Webcam dot inside notch */}
        <mesh
          position={[0.04, LH / 2 + SH / 2 - 0.042, LT / 2 + 0.006]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.010, 0.010, 0.004, 16]} />
          <meshStandardMaterial color="#1a1a22" emissive="#112244" emissiveIntensity={0.4} />
        </mesh>

        {/* ── SCREEN UI ── */}
        {!mobile && (
          <>
            {/* Top menu bar */}
            <mesh position={[0, LH / 2 + SH / 2 - 0.14, LT / 2 + 0.003]}>
              <planeGeometry args={[SW - 0.04, 0.090]} />
              <meshStandardMaterial
                color="#1a2845"
                emissive="#1e3880"
                emissiveIntensity={0.38}
              />
            </mesh>

            {/* Left sidebar (Finder / VS Code style) */}
            <mesh position={[-(SW / 2) + 0.24, LH / 2 - 0.06, LT / 2 + 0.003]}>
              <planeGeometry args={[0.48, SH - 0.18]} />
              <meshStandardMaterial
                color="#172040"
                opacity={0.65}
                transparent
              />
            </mesh>

            {/* Content rows — varying width to simulate code/text */}
            {[0.72, 0.52, 0.32, 0.12, -0.08, -0.28, -0.48].map((dy, i) => (
              <mesh
                key={i}
                position={[0.20, LH / 2 + dy, LT / 2 + 0.003]}
              >
                <planeGeometry
                  args={[
                    i % 3 === 0 ? 1.90 : i % 3 === 1 ? 1.44 : 2.15,
                    0.058,
                  ]}
                />
                <meshStandardMaterial
                  color="#3b82f6"
                  emissive="#60a5fa"
                  emissiveIntensity={0.14}
                  opacity={0.50 - i * 0.05}
                  transparent
                />
              </mesh>
            ))}

            {/* Bottom dock/status bar */}
            <mesh position={[0, LH / 2 - SH / 2 + 0.06, LT / 2 + 0.003]}>
              <planeGeometry args={[SW - 0.04, 0.072]} />
              <meshStandardMaterial
                color="#162038"
                opacity={0.50}
                transparent
              />
            </mesh>
          </>
        )}
      </group>

      {!mobile && (
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.30}
          scale={6.5}
          blur={1.8}
        />
      )}
    </group>
  );
}

// ── Public component ─────────────────────────────────────────────────────────
interface WebsiteShowcase3DProps {
  className?: string;
  performanceMode?: ScenePerformanceMode;
}

export function WebsiteShowcase3D({
  className,
  performanceMode = "auto",
}: WebsiteShowcase3DProps) {
  const mobile = useMobilePerformance(performanceMode);

  return (
    <div className={className} data-testid="website-showcase-3d">
      <SafeSceneCanvas
        aria-label="MacBook Pro 3D showcase"
        performanceMode={performanceMode}
        fallbackType="laptop"
        className="aspect-video min-h-[260px] rounded-none"
      >
        <color attach="background" args={["#0a0c14"]} />
        <ambientLight intensity={0.14} />
        {/* Key light — upper-left (main shape light) */}
        <directionalLight position={[-4, 7, 3]} intensity={2.2} color="#ffffff" />
        {/* Right rim — catches the edge of the aluminium */}
        <pointLight position={[4, 3, -2]} intensity={0.70} color="#dde8ff" />
        {/* Screen glow spill — warm blue from display */}
        <pointLight position={[0, 1.4, 3]} intensity={0.36} color="#3b6fe8" />
        {/* Underside cool fill */}
        <pointLight position={[0, -2, 2]} intensity={0.12} color="#c8d8ff" />
        <hemisphereLight args={["#c8d4ff", "#080812", 0.22]} />
        <LaptopScene mobile={mobile} />
      </SafeSceneCanvas>
      <div className="bg-background px-1 py-3">
        <p className="font-semibold">MacBook Pro — aluminium brossé</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Unibody Space Gray, notch webcam, trackpad verre, grilles haut-parleur, UI ecran simulee.
        </p>
      </div>
    </div>
  );
}
