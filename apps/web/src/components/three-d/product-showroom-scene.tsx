"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

import { useThreeDQuality } from "./three-d-canvas";
import { HotspotMarker } from "./hotspot-marker";
import {
  PRODUCT_HOTSPOTS,
  type ProductColorOption,
  type ProductMaterialOption,
} from "./product-showroom-data";

export interface ProductShowroomSceneProps {
  color: ProductColorOption;
  material: ProductMaterialOption;
  activeHotspotId: string | null;
  onHotspotSelect: (id: string) => void;
  /** Hide in-scene markers (e.g. on very small screens where the DOM list
   * is the primary surface) */
  showHotspots?: boolean;
}

/** One ear cup: shell + cushion + outer plate. */
function EarCup({
  side,
  color,
  metalness,
  roughness,
}: {
  side: 1 | -1;
  color: string;
  metalness: number;
  roughness: number;
}) {
  return (
    <group position={[side * 1.08, -0.05, 0]} rotation={[0, 0, side * -0.08]}>
      {/* shell */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.46, 0.42, 0.26, 40]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      {/* outer plate */}
      <mesh position={[side * 0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.03, 40]} />
        <meshStandardMaterial
          color={color}
          metalness={Math.min(1, metalness + 0.1)}
          roughness={Math.max(0.05, roughness - 0.1)}
        />
      </mesh>
      {/* cushion */}
      <mesh position={[side * -0.16, 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <torusGeometry args={[0.32, 0.1, 20, 40]} />
        <meshStandardMaterial color="#111827" metalness={0.05} roughness={0.9} />
      </mesh>
    </group>
  );
}

/**
 * Fully procedural premium headphone model (fictional "AeroPod Max").
 * Zero downloads, zero license debt. Colour and material react to the
 * configurator; slow idle sway unless reduced motion is on.
 */
export function ProductShowroomScene({
  color,
  material,
  activeHotspotId,
  onHotspotSelect,
  showHotspots = true,
}: ProductShowroomSceneProps) {
  const groupRef = React.useRef<THREE.Group>(null);
  const { prefersReducedMotion } = useThreeDQuality();

  useFrame((state) => {
    if (prefersReducedMotion || !groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.18) * 0.25;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.04;
  });

  const { metalness, roughness } = material;

  return (
    <group ref={groupRef}>
      {/* headband arc */}
      <mesh rotation={[0, 0, 0]} position={[0, 0.32, 0]}>
        <torusGeometry args={[1.05, 0.07, 24, 60, Math.PI]} />
        <meshStandardMaterial
          color={color.hex}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      {/* headband cushion (inner) */}
      <mesh position={[0, 0.34, 0]}>
        <torusGeometry args={[0.96, 0.045, 16, 48, Math.PI]} />
        <meshStandardMaterial color="#1f2937" metalness={0.05} roughness={0.85} />
      </mesh>
      {/* yokes */}
      {([1, -1] as const).map((side) => (
        <mesh
          key={side}
          position={[side * 1.06, 0.28, 0]}
          rotation={[0, 0, side * -0.15]}
        >
          <cylinderGeometry args={[0.035, 0.035, 0.55, 16]} />
          <meshStandardMaterial
            color={color.hex}
            metalness={metalness}
            roughness={roughness}
          />
        </mesh>
      ))}
      <EarCup side={1} color={color.hex} metalness={metalness} roughness={roughness} />
      <EarCup side={-1} color={color.hex} metalness={metalness} roughness={roughness} />

      {showHotspots &&
        PRODUCT_HOTSPOTS.map((h) => (
          <HotspotMarker
            key={h.id}
            position={h.position}
            label={`Point cle ${h.index}: ${h.title}`}
            glyph={String(h.index)}
            active={activeHotspotId === h.id}
            onSelect={() => onHotspotSelect(h.id)}
          />
        ))}
    </group>
  );
}
