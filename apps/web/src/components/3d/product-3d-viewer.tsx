"use client";

import * as React from "react";
import { ContactShadows } from "@react-three/drei";

import { FloatingModel } from "./floating-model";
import { ParticleBackground } from "./particle-background";
import { SceneCanvas, type ScenePerformanceMode, useMobilePerformance } from "./scene-canvas";

interface Product3DViewerProps {
  className?: string;
  color?: string;
  performanceMode?: ScenePerformanceMode;
  title?: string;
}

function ProductScene({ color, mobilePerformance }: { color: string; mobilePerformance: boolean }) {
  return (
    <>
      <ParticleBackground mobilePerformance={mobilePerformance} />
      <FloatingModel color={color} mobilePerformance={mobilePerformance} />
      {!mobilePerformance && (
        <ContactShadows position={[0, -1.45, 0]} opacity={0.34} scale={8} blur={2.6} far={4} />
      )}
    </>
  );
}

export function Product3DViewer({
  className,
  color = "#14b8a6",
  performanceMode = "auto",
  title = "Product 3D viewer",
}: Product3DViewerProps) {
  const mobilePerformance = useMobilePerformance(performanceMode);

  return (
    <div className={className} data-testid="product-3d-viewer">
      <SceneCanvas
        aria-label={title}
        performanceMode={performanceMode}
        className="aspect-[4/3] min-h-[300px] rounded-none md:aspect-[16/7]"
      >
        <ProductScene color={color} mobilePerformance={mobilePerformance} />
      </SceneCanvas>
      <div className="grid gap-2 bg-background px-1 py-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal">Experience produit 3D</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Canvas interactif avec rendu reduit automatiquement sur mobile et en preference de mouvement reduit.
          </p>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          Mode {mobilePerformance ? "mobile" : "haute fidelite"}
        </span>
      </div>
    </div>
  );
}
