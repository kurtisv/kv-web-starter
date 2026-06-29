"use client";

import * as React from "react";
import {
  useGLTF,
  ContactShadows,
  PerspectiveCamera,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import { type ScenePerformanceMode, useMobilePerformance } from "./scene-canvas";
import { SafeSceneCanvas } from "./core/safe-scene-canvas";

// ── GLB load error boundary ───────────────────────────────────────────────────
// Catches useGLTF failures so Smart3DObject can fall back to procedural
// rather than letting SceneErrorBoundary swallow the error into a CSS fallback.
class GlbLoadErrorBoundary extends React.Component<
  { onError: () => void; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  componentDidCatch(_err: Error): void {
    this.props.onError();
  }

  render(): React.ReactNode {
    return this.state.failed ? null : this.props.children;
  }
}

// ── Auto-fit: center + scale model to a target bounding size ─────────────────
function useAutoFit(
  scene: THREE.Object3D,
  targetSize: number
): { position: [number, number, number]; scale: number } {
  return React.useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? targetSize / maxDim : 1;
    // Shift so the model bottom sits at Y=0 and XZ is centered
    const groundY = box.min.y * scale;
    return {
      position: [-center.x * scale, -groundY, -center.z * scale],
      scale,
    };
  }, [scene, targetSize]);
}

// ── The mesh itself (suspends while loading) ──────────────────────────────────
function GLBMesh({ url, targetSize }: { url: string; targetSize: number }) {
  const { scene } = useGLTF(url, undefined, undefined, (err) => {
    // Suppress texture/asset warnings — non-fatal, model still renders
    if (process.env.NODE_ENV === "development") {
      console.warn("[GlbSceneViewer] asset load warning:", err);
    }
  });
  const { position, scale } = useAutoFit(scene, targetSize);
  return <primitive object={scene} scale={scale} position={position} />;
}

// ── Progress chip + state tracker (rendered outside the canvas) ───────────────
function useGlbLoadState(): "loading" | "loaded" {
  const { active } = useProgress();
  return active ? "loading" : "loaded";
}

function LoadingChip() {
  const { progress, active } = useProgress();
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-4">
      <div className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
        {Math.round(progress)}%
      </div>
    </div>
  );
}

// ── Public props ──────────────────────────────────────────────────────────────
export interface GlbSceneViewerProps {
  /** Path to the .glb file (relative to /public, e.g. "/models/3d/car/taycan.glb") */
  modelUrl: string;

  className?: string;
  performanceMode?: ScenePerformanceMode;

  /** Camera position in scene units. Defaults to a 3/4 elevated view. */
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  /** Point the camera looks at / orbit centre. */
  orbitTarget?: [number, number, number];

  /** The model is auto-scaled so its longest axis equals this many scene units. */
  modelTargetSize?: number;

  autoRotate?: boolean;
  autoRotateSpeed?: number;

  backgroundColor?: string;

  /** Called when the GLB fails to load so the parent can switch layers. */
  onError?: () => void;

  "aria-label"?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function GlbSceneViewer({
  modelUrl,
  className,
  performanceMode = "auto",
  cameraPosition = [0, 1.4, 4.2],
  cameraFov = 38,
  orbitTarget = [0, 0.6, 0],
  modelTargetSize = 2.2,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  backgroundColor = "#0a0a0e",
  onError,
  "aria-label": ariaLabel = "Modele 3D",
}: GlbSceneViewerProps) {
  const mobile = useMobilePerformance(performanceMode);
  const handleError = React.useCallback(() => onError?.(), [onError]);
  const glbState = useGlbLoadState();

  return (
    <div
      className={`relative ${className ?? ""}`}
      data-testid="glb-viewer"
      data-glb-state={glbState}
    >
      <SafeSceneCanvas
        aria-label={ariaLabel}
        performanceMode={performanceMode}
        fallbackType="abstract"
        showOrbitControls={false}
        showEnvironment
        className="aspect-video min-h-[260px] rounded-none"
      >
        {/* Scene-level background override */}
        <color attach="background" args={[backgroundColor]} />

        {/* Custom camera so each model can have its own framing */}
        <PerspectiveCamera makeDefault position={cameraPosition} fov={cameraFov} />
        <OrbitControls
          target={orbitTarget}
          enablePan={false}
          enableZoom={!mobile}
          autoRotate={autoRotate && !mobile}
          autoRotateSpeed={autoRotateSpeed}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.9}
        />

        {/* Ground shadow */}
        {!mobile && (
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.55}
            scale={8}
            blur={2.0}
          />
        )}

        {/* GLB — catches load errors before SceneErrorBoundary can swallow them */}
        <GlbLoadErrorBoundary onError={handleError}>
          <React.Suspense fallback={null}>
            <GLBMesh url={modelUrl} targetSize={modelTargetSize} />
          </React.Suspense>
        </GlbLoadErrorBoundary>
      </SafeSceneCanvas>

      {/* Progress % shown as a chip outside the canvas */}
      <LoadingChip />
    </div>
  );
}

// Preload helper — call at module level to warm the GLTF cache
GlbSceneViewer.preload = (url: string) => useGLTF.preload(url);
