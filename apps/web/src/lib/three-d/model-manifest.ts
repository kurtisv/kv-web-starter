import type { ModelLicense } from "./asset-policy";

/** One documented 3D asset (or procedural stand-in) available to demos. */
export interface ThreeDModelManifestItem {
  id: string;
  name: string;
  type: "placeholder" | "product" | "environment" | "logo" | "scene";
  /** Public path to the GLB; absent for procedural placeholders. */
  path?: string;
  fallbackImage?: string;
  license: ModelLicense;
  weightKb?: number;
  recommendedUse: string[];
  notes?: string;
}

/**
 * Single source of truth for every 3D asset the boilerplate knows about.
 * Procedural entries render from components/three-d (zero download);
 * GLB entries live under public/models. See public/models/README.md.
 */
export const THREE_D_MODEL_MANIFEST: ThreeDModelManifestItem[] = [
  // ── Procedural placeholders (no file, no license question) ──────────────
  {
    id: "procedural-device",
    name: "Appareil premium procedural",
    type: "placeholder",
    license: "placeholder",
    recommendedUse: ["product-showroom", "hero produit", "configurateur"],
    notes:
      "ModelPlaceholder variant=device (components/three-d/model-placeholder.tsx). Couleur et matiere pilotables par props.",
  },
  {
    id: "procedural-product-box",
    name: "Boite produit procedurale",
    type: "placeholder",
    license: "placeholder",
    recommendedUse: ["e-commerce", "packaging", "unboxing"],
    notes: "ModelPlaceholder variant=box.",
  },
  {
    id: "procedural-orb",
    name: "Orbe abstrait procedural",
    type: "placeholder",
    license: "placeholder",
    recommendedUse: ["landing immersive", "hero abstrait", "marque tech"],
    notes: "ModelPlaceholder variant=orb.",
  },
  {
    id: "procedural-floating-cards",
    name: "Panneaux dashboard flottants",
    type: "scene",
    license: "placeholder",
    recommendedUse: ["SaaS landing", "sections features", "hero data"],
    notes: "FloatingCardScene (components/three-d/floating-card-scene.tsx).",
  },

  // ── GLB binaries already present in public/models/3d ────────────────────
  {
    id: "glb-phone",
    name: "Telephone generique",
    type: "product",
    path: "/models/3d/phone/default.glb",
    license: "unknown",
    weightKb: 868,
    recommendedUse: ["mockup app mobile"],
    notes:
      "Present avant la mise en place de la politique d'assets. Licence a clarifier avant tout usage dans une nouvelle demo (voir asset-policy).",
  },
  {
    id: "glb-laptop",
    name: "Ordinateur portable generique",
    type: "product",
    path: "/models/3d/laptop/default.glb",
    license: "unknown",
    weightKb: 408,
    recommendedUse: ["mockup site web"],
    notes: "Licence a clarifier avant tout usage dans une nouvelle demo.",
  },
  {
    id: "glb-car",
    name: "Voiture generique",
    type: "product",
    path: "/models/3d/car/default.glb",
    license: "unknown",
    weightKb: 5296,
    recommendedUse: ["demo automobile (desktop uniquement)"],
    notes:
      "HORS BUDGET (max 2048 Ko): ne pas utiliser dans de nouvelles demos. Candidat a compression Draco ou remplacement procedural.",
  },
];

export function getManifestItem(
  id: string
): ThreeDModelManifestItem | undefined {
  return THREE_D_MODEL_MANIFEST.find((item) => item.id === id);
}
