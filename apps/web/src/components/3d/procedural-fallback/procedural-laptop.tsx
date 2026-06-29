"use client";

import * as React from "react";
import { RoundedBox, ContactShadows, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useMobilePerformance, type ScenePerformanceMode } from "../scene-canvas";
import { SafeSceneCanvas } from "../core/safe-scene-canvas";

const W   = 3.21;
const D   = 2.24;
const BH  = 0.068;
const LH  = 2.04;
const LT  = 0.046;
const SW  = 2.98;
const SH  = 1.78;
const LID_ROT = Math.PI * 0.112;
const ALU   = "#6c6c72";
const ALU_D = "#52525a";
const KEY_C = "#2c2c34";
const KEY_W = 0.112;
const KEY_H = 0.009;
const KS    = 0.128;

const ROW_DEFS = [
  { z: -0.68, count: 14 },
  { z: -0.50, count: 13 },
  { z: -0.30, count: 13 },
  { z: -0.10, count: 12 },
  { z:  0.10, count: 11 },
] as const;

function KeyGrid({ yBase }: { yBase: number }) {
  const meshRef = React.useRef<THREE.InstancedMesh>(null);
  const positions = React.useMemo(() => {
    const out: [number, number, number][] = [];
    for (const { z, count } of ROW_DEFS) {
      const span = count * KS;
      const x0 = -span / 2 + KS / 2;
      for (let i = 0; i < count; i++) out.push([x0 + i * KS, yBase + KEY_H / 2, z]);
    }
    return out;
  }, [yBase]);
  const geo = React.useMemo(() => new THREE.BoxGeometry(KEY_W, KEY_H, KEY_W), []);
  const mat = React.useMemo(() => new THREE.MeshPhysicalMaterial({ color: KEY_C, metalness: 0.32, roughness: 0.74 }), []);
  const dummy = React.useMemo(() => new THREE.Object3D(), []);
  React.useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    positions.forEach(([x, y, z], i) => {
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);
  React.useEffect(() => () => { geo.dispose(); mat.dispose(); }, [geo, mat]);
  return <instancedMesh ref={meshRef} args={[geo, mat, positions.length]} />;
}

function MacBookScene({ mobile }: { mobile: boolean }) {
  const hingeZ = -(D / 2);
  const hingeY = BH;
  return (
    <group>
      <RoundedBox args={[W, BH, D]} radius={0.036} smoothness={5} position={[0, BH / 2, 0]}>
        <meshPhysicalMaterial color={ALU} metalness={0.92} roughness={0.16} clearcoat={0.22} clearcoatRoughness={0.48} />
      </RoundedBox>
      <mesh position={[0, BH + 0.0004, 0]}>
        <planeGeometry args={[W - 0.22, D - 0.44]} />
        <meshPhysicalMaterial color={ALU_D} metalness={0.76} roughness={0.44} />
      </mesh>
      {!mobile && <KeyGrid yBase={BH} />}
      {mobile && (
        <mesh position={[0, BH + 0.001, -0.68]}>
          <planeGeometry args={[W - 0.24, 0.064]} />
          <meshPhysicalMaterial color={KEY_C} metalness={0.42} roughness={0.68} />
        </mesh>
      )}
      <mesh position={[0.10, BH + KEY_H / 2, 0.30]}>
        <boxGeometry args={[1.32, KEY_H, KEY_W]} />
        <meshPhysicalMaterial color={KEY_C} metalness={0.32} roughness={0.74} />
      </mesh>
      <RoundedBox args={[1.20, 0.006, 0.86]} radius={0.020} smoothness={5} position={[0, BH + 0.004, 0.82]}>
        <meshPhysicalMaterial color="#8e8e98" metalness={0.72} roughness={0.12} clearcoat={0.85} clearcoatRoughness={0.06} />
      </RoundedBox>
      {!mobile && [-1.42, 1.42].map((x) =>
        [0, 0.09, 0.18, 0.27, 0.36, 0.45].map((dz, j) => (
          <mesh key={`${x}-${j}`} position={[x, BH + 0.001, -0.58 + dz]}>
            <planeGeometry args={[0.18, 0.012]} />
            <meshStandardMaterial color="#1e1e26" />
          </mesh>
        ))
      )}
      {!mobile && [-0.62, -0.36, 0.36].map((z, i) => (
        <mesh key={i} position={[-(W / 2) + 0.002, BH * 0.50, z]}>
          <boxGeometry args={[0.006, 0.044, 0.076]} />
          <meshStandardMaterial color="#242430" />
        </mesh>
      ))}
      <mesh position={[0, hingeY + 0.020, hingeZ]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.020, 0.020, W - 0.24, 28]} />
        <meshPhysicalMaterial color="#7a7a84" metalness={0.97} roughness={0.10} />
      </mesh>

      <group position={[0, hingeY, hingeZ]} rotation={[LID_ROT, 0, 0]}>
        <RoundedBox args={[W, LH, LT]} radius={0.034} smoothness={6} position={[0, LH / 2, 0]}>
          <meshPhysicalMaterial color={ALU} metalness={0.92} roughness={0.16} clearcoat={0.14} clearcoatRoughness={0.52} />
        </RoundedBox>
        {!mobile && (
          <mesh position={[0, LH * 0.50, -(LT / 2 + 0.0007)]}>
            <circleGeometry args={[0.140, 52]} />
            <meshPhysicalMaterial color="#7a7a84" metalness={0.96} roughness={0.08} clearcoat={0.55} />
          </mesh>
        )}
        <mesh position={[0, LH / 2, LT / 2 + 0.001]}>
          <planeGeometry args={[W - 0.03, LH - 0.03]} />
          <meshStandardMaterial color="#050506" roughness={0.82} />
        </mesh>
        <mesh position={[0, LH / 2, LT / 2 + 0.0022]}>
          <planeGeometry args={[SW, SH]} />
          <meshPhysicalMaterial
            color="#010810" emissive="#0a1f5a"
            emissiveIntensity={mobile ? 0.28 : 0.55}
            roughness={0.02} metalness={0} clearcoat={1.0} clearcoatRoughness={0.01}
          />
        </mesh>
        {!mobile && (
          <>
            <mesh position={[0, LH / 2 + SH / 2 - 0.14, LT / 2 + 0.003]}>
              <planeGeometry args={[SW - 0.04, 0.096]} />
              <meshStandardMaterial color="#111520" emissive="#1a2248" emissiveIntensity={0.32} />
            </mesh>
            {[-0.12, -0.06, 0].map((dx, i) => (
              <mesh key={i} position={[-(SW / 2) + 0.14 + dx * (-1), LH / 2 + SH / 2 - 0.14, LT / 2 + 0.004]}>
                <circleGeometry args={[0.013, 12]} />
                <meshStandardMaterial
                  color={i === 0 ? "#ff5f56" : i === 1 ? "#ffbd2e" : "#28c840"}
                  emissive={i === 0 ? "#ff5f56" : i === 1 ? "#ffbd2e" : "#28c840"}
                  emissiveIntensity={0.40}
                />
              </mesh>
            ))}
            <mesh position={[-(SW / 2) + 0.22, LH / 2 - 0.08, LT / 2 + 0.003]}>
              <planeGeometry args={[0.24, SH - 0.20]} />
              <meshStandardMaterial color="#0e1526" opacity={0.80} transparent />
            </mesh>
            {[
              { dy:  0.64, w: 1.76, color: "#7ec8e3", emit: "#7ec8e3" },
              { dy:  0.46, w: 1.30, color: "#c8a2f4", emit: "#c8a2f4" },
              { dy:  0.28, w: 2.00, color: "#80e0a0", emit: "#80e0a0" },
              { dy:  0.10, w: 0.96, color: "#f4d580", emit: "#f4d580" },
              { dy: -0.08, w: 1.68, color: "#f48080", emit: "#f48080" },
              { dy: -0.26, w: 1.44, color: "#7ec8e3", emit: "#7ec8e3" },
              { dy: -0.44, w: 2.10, color: "#80e0a0", emit: "#80e0a0" },
              { dy: -0.62, w: 1.10, color: "#c8a2f4", emit: "#c8a2f4" },
            ].map(({ dy, w, color, emit }, i) => (
              <mesh key={i} position={[0.20, LH / 2 + dy, LT / 2 + 0.003]}>
                <planeGeometry args={[w, 0.052]} />
                <meshStandardMaterial color={color} emissive={emit} emissiveIntensity={0.10 - i * 0.006} opacity={0.60 - i * 0.04} transparent />
              </mesh>
            ))}
            <mesh position={[0, LH / 2 - SH / 2 + 0.058, LT / 2 + 0.003]}>
              <planeGeometry args={[SW - 0.04, 0.070]} />
              <meshStandardMaterial color="#0d1830" opacity={0.60} transparent />
            </mesh>
          </>
        )}
        <RoundedBox args={[0.22, 0.064, 0.007]} radius={0.030} smoothness={8} position={[0, LH / 2 + SH / 2 - 0.040, LT / 2 + 0.003]}>
          <meshStandardMaterial color="#000000" />
        </RoundedBox>
        <mesh position={[0.038, LH / 2 + SH / 2 - 0.040, LT / 2 + 0.006]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.010, 0.010, 0.003, 18]} />
          <meshStandardMaterial color="#18182a" emissive="#0e1840" emissiveIntensity={0.30} />
        </mesh>
      </group>

      {!mobile && <ContactShadows position={[0, 0, 0]} opacity={0.28} scale={7} blur={2.0} />}
    </group>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────
export interface ProceduralLaptopFallbackProps {
  className?: string;
  performanceMode?: ScenePerformanceMode;
}

export function ProceduralLaptopFallback({
  className,
  performanceMode = "auto",
}: ProceduralLaptopFallbackProps) {
  const mobile = useMobilePerformance(performanceMode);
  return (
    <div className={className} data-testid="procedural-laptop-fallback">
      <SafeSceneCanvas
        aria-label="MacBook Pro 3D — rendu procedural"
        performanceMode={performanceMode}
        fallbackType="laptop"
        showOrbitControls={false}
        showEnvironment={!mobile}
        className="aspect-video min-h-[260px] rounded-none"
      >
        <PerspectiveCamera makeDefault position={[2.60, 1.48, 3.10]} fov={28} />
        <OrbitControls
          target={[0, 0.72, -0.30]}
          enablePan={false}
          enableZoom={false}
          autoRotate={!mobile}
          autoRotateSpeed={0.42}
          minPolarAngle={Math.PI / 4.5}
          maxPolarAngle={Math.PI / 2.2}
        />
        <color attach="background" args={["#080a12"]} />
        <ambientLight intensity={0.12} />
        <directionalLight position={[-4, 8, 4]} intensity={2.4} color="#ffffff" />
        <pointLight position={[4.5, 3.5, -2]} intensity={0.80} color="#d8e4ff" />
        <pointLight position={[0, 1.2, 3.5]} intensity={0.30} color="#4060e0" />
        <pointLight position={[0, -1.5, 2.5]} intensity={0.10} color="#b0c4ff" />
        <pointLight position={[-3, 2.5, -3]} intensity={0.22} color="#ffe4c0" />
        <MacBookScene mobile={mobile} />
      </SafeSceneCanvas>
      <div className="bg-background px-1 py-3">
        <p className="font-semibold">MacBook Pro — aluminium Space Gray</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Rendu procedural (fallback). Deposez un .glb dans{" "}
          <code className="text-xs">/public/models/3d/laptop/</code> pour activer la couche GLB.
        </p>
      </div>
    </div>
  );
}
