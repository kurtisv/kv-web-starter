"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import { cn } from "@/lib/utils";

export type ScenePerformanceMode = "auto" | "high" | "mobile";

interface SceneCanvasProps {
  "aria-label"?: string;
  children: React.ReactNode;
  className?: string;
  performanceMode?: ScenePerformanceMode;
}

export function useMobilePerformance(mode: ScenePerformanceMode = "auto") {
  const [autoMobile, setAutoMobile] = React.useState(false);

  React.useEffect(() => {
    if (mode !== "auto") return;

    const media = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");
    const frame = window.requestAnimationFrame(() => setAutoMobile(media.matches));
    const update = () => setAutoMobile(media.matches);

    media.addEventListener("change", update);
    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", update);
    };
  }, [mode]);

  return mode === "mobile" || (mode === "auto" && autoMobile);
}

export function SceneCanvas({
  "aria-label": ariaLabel = "Interactive 3D scene",
  children,
  className,
  performanceMode = "auto",
}: SceneCanvasProps) {
  const mobilePerformance = useMobilePerformance(performanceMode);

  return (
    <div
      className={cn(
        "relative min-h-[320px] w-full overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(20,184,166,0.20),transparent_34%),linear-gradient(135deg,#0b1020,#171717_54%,#2f2417)]",
        className
      )}
      role="img"
      aria-label={ariaLabel}
    >
      <Canvas
        camera={{ position: [0, 0.7, mobilePerformance ? 6 : 5], fov: mobilePerformance ? 42 : 38 }}
        dpr={mobilePerformance ? [1, 1.25] : [1, 2]}
        gl={{ alpha: true, antialias: !mobilePerformance, preserveDrawingBuffer: true }}
      >
        <color attach="background" args={["#0b1020"]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 5]} intensity={1.25} />
        <pointLight position={[-3, 2, 3]} intensity={mobilePerformance ? 0.35 : 0.8} color="#2dd4bf" />
        <React.Suspense fallback={null}>{children}</React.Suspense>
        {!mobilePerformance && <Environment preset="city" />}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={!mobilePerformance}
          autoRotateSpeed={0.7}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.85}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/50 to-transparent" />
    </div>
  );
}
