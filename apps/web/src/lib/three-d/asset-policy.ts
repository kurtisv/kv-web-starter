/** 3D asset policy for the boilerplate.
 *
 * Philosophy: procedural first. A demo must look premium with ZERO model
 * downloads; a real GLB is an upgrade, never a requirement. Every binary
 * asset that does ship must be documented in the model manifest with an
 * explicit license.
 */

/** Where 3D model binaries live, relative to apps/web/public. */
export const MODELS_PUBLIC_ROOT = "/models";

/** Preferred model format. Draco-compressed GLB decodes via the local
 * decoder in public/draco-gltf (no CDN dependency). */
export const PREFERRED_FORMAT = ".glb";

/** Weight budgets, in kilobytes. */
export const ASSET_WEIGHT_BUDGET_KB = {
  /** Hard ceiling for any single model shipped with the boilerplate. */
  max: 2048,
  /** Target for models that must load on mobile connections. */
  mobileTarget: 512,
  /** Above this, the page MUST show a meaningful placeholder while loading
   * and SHOULD only fetch the model on interaction or when in view. */
  deferThreshold: 1024,
} as const;

/** Non-negotiable rules for adding a model to the repo. */
export const ASSET_RULES = [
  "GLB en priorite (Draco accepte, decodeur local deja vendore)",
  "Chaque modele est declare dans model-manifest.ts avec sa licence",
  "Pas de modele sans licence claire (cc0, public-domain ou interne)",
  "Chaque modele a une image fallback OU un placeholder procedural",
  "Chaque usage fournit un texte alternatif descriptif",
  "Au-dela du budget mobile, prevoir un chargement differe",
  "Aucun asset charge depuis un CDN externe au runtime",
] as const;

export type ModelLicense =
  | "internal"
  | "placeholder"
  | "public-domain"
  | "cc0"
  | "unknown";

/** Licenses acceptable for NEW assets. "unknown" is quarantined: existing
 * files keep working but must not be used in new demos until clarified. */
export const ALLOWED_NEW_ASSET_LICENSES: ReadonlyArray<ModelLicense> = [
  "internal",
  "placeholder",
  "public-domain",
  "cc0",
];

export function isWithinWeightBudget(weightKb: number): boolean {
  return weightKb <= ASSET_WEIGHT_BUDGET_KB.max;
}

export function requiresDeferredLoading(weightKb: number): boolean {
  return weightKb > ASSET_WEIGHT_BUDGET_KB.deferThreshold;
}
