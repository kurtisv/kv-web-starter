"use client";

import * as React from "react";
import { Check, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OrbitProductViewer } from "@/components/three-d/orbit-product-viewer";
import { ThreeDFallback } from "@/components/three-d/three-d-fallback";
import { PerformanceBadge } from "@/components/three-d/performance-badge";
import { ProductShowroomScene } from "@/components/three-d/product-showroom-scene";
import { ProductConfiguratorPanel } from "@/components/three-d/product-configurator-panel";
import { ProductHotspotList } from "@/components/three-d/product-hotspot-list";
import {
  PRODUCT_COLORS,
  PRODUCT_MATERIALS,
  PRODUCT_NAME,
  PRODUCT_PRICE,
} from "@/components/three-d/product-showroom-data";

/**
 * Client island for the showroom: owns the configurator state shared by
 * the 3D scene, the swatches, the hotspot list and the mock cart CTA.
 * Everything around it stays server-rendered.
 */
export function ProductShowroomExperience() {
  const [color, setColor] = React.useState(PRODUCT_COLORS[0]);
  const [material, setMaterial] = React.useState(PRODUCT_MATERIALS[0]);
  const [activeHotspotId, setActiveHotspotId] = React.useState<string | null>(
    null
  );
  const [addedToCart, setAddedToCart] = React.useState(false);

  const toggleHotspot = (id: string) =>
    setActiveHotspotId((current) => (current === id ? null : id));

  const staticFallback = (
    <ThreeDFallback
      variant="product"
      label={`Apercu statique du ${PRODUCT_NAME}`}
      description={`${PRODUCT_NAME} en finition ${color.label} - la version interactive necessite WebGL.`}
      className="absolute inset-0 min-h-0 rounded-none"
    />
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      {/* Viewer */}
      <div className="relative">
        <OrbitProductViewer
          interactive
          aria-label={`Visualisation 3D du ${PRODUCT_NAME} en ${color.label}`}
          className="h-[360px] rounded-2xl bg-[radial-gradient(circle_at_50%_25%,rgba(45,212,191,0.14),transparent_45%),linear-gradient(160deg,#0b1020,#111827_60%,#1e1b4b)] sm:h-[480px]"
          camera={{ position: [0, 0.4, 4.6], fov: 38 }}
          performance="balanced"
          minDistance={3.2}
          maxDistance={7}
          fallback={staticFallback}
          reducedMotionFallback={staticFallback}
          stage={{ accentColor: "#2dd4bf" }}
        >
          <ProductShowroomScene
            color={color}
            material={material}
            activeHotspotId={activeHotspotId}
            onHotspotSelect={toggleHotspot}
          />
        </OrbitProductViewer>
        <PerformanceBadge className="absolute left-4 top-4" />
      </div>

      {/* Configurator + hotspots + CTA */}
      <div className="flex flex-col gap-8">
        <ProductConfiguratorPanel
          color={color}
          material={material}
          onColorChange={setColor}
          onMaterialChange={setMaterial}
        />

        <div>
          <h3 className="text-sm font-medium text-foreground">
            Points cles du produit
          </h3>
          <ProductHotspotList
            className="mt-3"
            activeHotspotId={activeHotspotId}
            onHotspotSelect={toggleHotspot}
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {PRODUCT_NAME} - {color.label}, {material.label}
              </p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {PRODUCT_PRICE}
              </p>
            </div>
            <Button
              type="button"
              data-testid="showroom-cta"
              onClick={() => setAddedToCart(true)}
              aria-live="polite"
            >
              {addedToCart ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Ajoute (demo)
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  Ajouter au panier
                </>
              )}
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Panier fictif: aucune commande reelle n&apos;est passee dans cette demo.
          </p>
        </div>
      </div>
    </div>
  );
}
