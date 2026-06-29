"use client";

import * as React from "react";
import { ContactShadows, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { DoubleSide } from "three";
import { useMobilePerformance, type ScenePerformanceMode } from "../scene-canvas";
import { SafeSceneCanvas } from "../core/safe-scene-canvas";

const PAINT = {
  metalness: 0.92,
  roughness: 0.06,
  clearcoat: 1.0,
  clearcoatRoughness: 0.03,
} as const;

function makeGTBodyGeo(W: number): THREE.ExtrudeGeometry {
  const s = new THREE.Shape();
  s.moveTo(2.24, 0.02);
  s.lineTo(-2.24, 0.02);
  s.lineTo(-2.24, 0.36);
  s.bezierCurveTo(-2.22, 0.48, -2.14, 0.52, -2.00, 0.52);
  s.lineTo(-1.80, 0.52);
  s.bezierCurveTo(-1.52, 0.52, -1.18, 0.78, -0.98, 0.96);
  s.bezierCurveTo(-0.76, 1.06, -0.50, 1.08, -0.14, 1.08);
  s.lineTo(0.36, 1.08);
  s.bezierCurveTo(0.60, 1.06, 0.88, 0.90, 1.06, 0.72);
  s.bezierCurveTo(1.24, 0.54, 1.50, 0.48, 1.84, 0.47);
  s.bezierCurveTo(2.04, 0.46, 2.16, 0.44, 2.18, 0.44);
  s.lineTo(2.24, 0.02);
  s.closePath();
  return new THREE.ExtrudeGeometry(s, {
    depth: W,
    bevelEnabled: true,
    bevelThickness: 0.042,
    bevelSize: 0.025,
    bevelSegments: 6,
  });
}

function GTWheel({ x, z, mobile }: { x: number; z: number; mobile: boolean }) {
  const R = 0.268;
  const rW = 0.062;
  const calSide = z > 0 ? 0.072 : -0.072;
  return (
    <group position={[x, R, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R - rW * 0.48, rW, 24, 64]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.90} metalness={0.03} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[R - rW, R - rW, 0.046, 48]} />
        <meshPhysicalMaterial color="#d4d4de" metalness={0.97} roughness={0.05} clearcoat={0.70} clearcoatRoughness={0.03} />
      </mesh>
      {Array.from({ length: 5 }, (_, i) => (
        <group key={i} rotation={[0, (Math.PI * 2 * i) / 5, 0]}>
          <mesh>
            <boxGeometry args={[0.034, 0.38, 0.028]} />
            <meshPhysicalMaterial color="#c6c6d2" metalness={0.96} roughness={0.07} clearcoat={0.55} />
          </mesh>
          <mesh position={[0, 0, 0.008]}>
            <boxGeometry args={[0.020, 0.36, 0.006]} />
            <meshPhysicalMaterial color="#9898a8" metalness={0.88} roughness={0.18} />
          </mesh>
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.050, 0.050, 0.055, 32]} />
        <meshPhysicalMaterial color="#8888a0" metalness={0.90} roughness={0.22} />
      </mesh>
      {!mobile && (
        <mesh position={[calSide, 0.086, 0]}>
          <boxGeometry args={[0.058, 0.18, 0.14]} />
          <meshStandardMaterial color="#c01010" roughness={0.46} metalness={0.42} />
        </mesh>
      )}
    </group>
  );
}

function GTScene({ color, mobile }: { color: string; mobile: boolean }) {
  const W = 1.56;
  const bodyGeo = React.useMemo(() => makeGTBodyGeo(W), []);
  React.useEffect(() => () => bodyGeo.dispose(), [bodyGeo]);

  const glassMat = (
    <meshPhysicalMaterial
      color="#020b18" opacity={0.60} transparent
      roughness={0.01} metalness={0} clearcoat={1}
      clearcoatRoughness={0.01} side={DoubleSide}
    />
  );
  const aAngle = Math.atan2(0.36, 0.70);
  const cAngle = Math.atan2(0.56, 1.66);

  return (
    <group>
      <mesh position={[0, 0, -W / 2]} geometry={bodyGeo}>
        <meshPhysicalMaterial color={color} {...PAINT} />
      </mesh>
      <mesh position={[0.71, 0.90, 0]} rotation={[0, Math.PI / 2, aAngle]}>
        <planeGeometry args={[1.22, 0.54]} />{glassMat}
      </mesh>
      <mesh position={[-0.97, 0.95, 0]} rotation={[0, -Math.PI / 2, cAngle]}>
        <planeGeometry args={[1.72, 0.52]} />{glassMat}
      </mesh>
      {[W / 2 + 0.002, -(W / 2 + 0.002)].map((z) => (
        <React.Fragment key={z}>
          <mesh position={[0.62, 0.88, z]}><planeGeometry args={[0.60, 0.36]} />{glassMat}</mesh>
          <mesh position={[-0.28, 0.84, z]}><planeGeometry args={[0.48, 0.30]} />{glassMat}</mesh>
        </React.Fragment>
      ))}
      <mesh position={[2.22, 0.42, 0]}>
        <boxGeometry args={[0.034, 0.012, 1.46]} />
        <meshStandardMaterial color="#f8f2e0" emissive="#ffe8a0" emissiveIntensity={mobile ? 1.0 : 3.2} />
      </mesh>
      {[-0.56, 0.56].map((z) => (
        <group key={z} position={[2.20, 0.34, z]}>
          <mesh>
            <boxGeometry args={[0.045, 0.16, 0.34]} />
            <meshStandardMaterial color="#f0ecd4" emissive="#ffeaa0" emissiveIntensity={mobile ? 0.7 : 2.2} />
          </mesh>
          {[-0.06, 0, 0.06].map((dz, j) => (
            <mesh key={j} position={[0, 0.04, z > 0 ? dz : -dz]}>
              <sphereGeometry args={[0.013, 8, 8]} />
              <meshStandardMaterial emissive="#ffffff" emissiveIntensity={mobile ? 2 : 7} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[-2.22, 0.46, 0]}>
        <boxGeometry args={[0.032, 0.014, 1.44]} />
        <meshStandardMaterial color="#ffe0e0" emissive="#ff1818" emissiveIntensity={mobile ? 3.0 : 9.0} />
      </mesh>
      {[-0.58, 0.58].map((z) => (
        <mesh key={z} position={[-2.22, 0.38, z]}>
          <boxGeometry args={[0.048, 0.16, 0.30]} />
          <meshStandardMaterial color="#ffe0e0" emissive="#cc0e0e" emissiveIntensity={mobile ? 2.5 : 6.5} />
        </mesh>
      ))}
      <mesh position={[2.28, 0.09, 0]}>
        <boxGeometry args={[0.058, 0.10, 1.38]} />
        <meshPhysicalMaterial color="#0a0a0e" metalness={0.26} roughness={0.70} />
      </mesh>
      <mesh position={[-2.28, 0.16, 0]}>
        <boxGeometry args={[0.058, 0.22, 1.32]} />
        <meshPhysicalMaterial color="#0a0a0e" metalness={0.20} roughness={0.74} />
      </mesh>
      {!mobile && [-0.30, -0.10, 0.10, 0.30].map((z) => (
        <mesh key={z} position={[-2.30, 0.16, z]}>
          <boxGeometry args={[0.016, 0.16, 0.016]} />
          <meshStandardMaterial color="#181820" />
        </mesh>
      ))}
      <mesh position={[-1.76, 0.54, 0]}>
        <boxGeometry args={[0.11, 0.020, 1.30]} />
        <meshPhysicalMaterial color={color} {...PAINT} />
      </mesh>
      {!mobile && [W / 2 + 0.006, -(W / 2 + 0.006)].map((z) => (
        <group key={z} position={[1.38, 0.80, z]}>
          <mesh>
            <boxGeometry args={[0.12, 0.068, 0.048]} />
            <meshPhysicalMaterial color={color} {...PAINT} />
          </mesh>
          <mesh position={[0.004, 0, z > 0 ? 0.025 : -0.025]}>
            <planeGeometry args={[0.10, 0.056]} />
            <meshPhysicalMaterial color="#040810" roughness={0.01} metalness={0.10} clearcoat={1} />
          </mesh>
        </group>
      ))}
      {!mobile && [0.48, -0.20].map((x) =>
        [W / 2 + 0.007, -(W / 2 + 0.007)].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.70, z]}>
            <boxGeometry args={[0.18, 0.036, 0.014]} />
            <meshPhysicalMaterial color="#0e0e14" metalness={0.36} roughness={0.64} />
          </mesh>
        ))
      )}
      <GTWheel x={1.54}  z={ W / 2 + 0.06} mobile={mobile} />
      <GTWheel x={1.54}  z={-(W / 2 + 0.06)} mobile={mobile} />
      <GTWheel x={-1.16} z={ W / 2 + 0.06} mobile={mobile} />
      <GTWheel x={-1.16} z={-(W / 2 + 0.06)} mobile={mobile} />
      {!mobile && <ContactShadows position={[0, 0.005, 0]} opacity={0.72} scale={12} blur={2.6} />}
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 10]} />
        <meshPhysicalMaterial color="#060608" metalness={0.82} roughness={0.38} clearcoat={0.72} clearcoatRoughness={0.12} />
      </mesh>
    </group>
  );
}

// ── Public export (named as fallback per architecture spec) ───────────────────
export interface ProceduralCarFallbackProps {
  className?: string;
  color?: string;
  performanceMode?: ScenePerformanceMode;
  label?: string;
}

export function ProceduralCarFallback({
  className,
  color = "#10203c",
  performanceMode = "auto",
  label,
}: ProceduralCarFallbackProps) {
  const mobile = useMobilePerformance(performanceMode);
  return (
    <div className={className} data-testid="procedural-car-fallback">
      <SafeSceneCanvas
        aria-label="Voiture 3D — rendu procedural"
        performanceMode={performanceMode}
        fallbackType="car"
        showOrbitControls={false}
        showEnvironment={!mobile}
        className="aspect-video min-h-[280px] rounded-none"
      >
        <PerspectiveCamera makeDefault position={[3.10, 0.54, 2.70]} fov={32} />
        <OrbitControls
          target={[0, 0.30, 0]}
          enablePan={false}
          enableZoom={false}
          autoRotate={!mobile}
          autoRotateSpeed={0.38}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.85}
        />
        <color attach="background" args={["#040408"]} />
        <fog attach="fog" args={["#030306", 12, 28]} />
        <ambientLight intensity={0.05} />
        <directionalLight position={[-7, 12, 5]} intensity={3.2} color="#fff4e8" />
        <pointLight position={[5.5, 4.5, -4.5]} intensity={1.20} color="#b8d0ff" />
        <pointLight position={[0, -1, 3.5]} intensity={0.18} color="#ffe8c0" />
        <pointLight position={[-7, 4, -3]} intensity={0.55} color="#0818b0" />
        <pointLight position={[0, 7, 1]} intensity={0.36} color="#f0f8ff" />
        <GTScene color={color} mobile={mobile} />
      </SafeSceneCanvas>
      {label && (
        <div className="bg-background px-1 py-3">
          <p className="font-semibold">{label}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Grand touring coupe — rendu procedural (fallback). Deposez un .glb dans{" "}
            <code className="text-xs">/public/models/3d/car/</code> pour activer la couche GLB.
          </p>
        </div>
      )}
    </div>
  );
}
