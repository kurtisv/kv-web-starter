import type { Brief3D, ObjectType } from "./types";
import { OBJECT_PRESETS } from "./object-presets";
import { DESIGN_ARCHETYPES } from "./design-archetypes";
import { MATERIAL_PRESETS } from "./material-presets";
import { LIGHTING_PRESETS } from "./lighting-presets";
import { CAMERA_PRESETS } from "./camera-presets";
import { UNIVERSAL_NEGATIVES, OBJECT_NEGATIVES } from "./negative-prompts";

// ── Detection table ────────────────────────────────────────────────────────────
// Order matters: more-specific entries are listed first.
const DETECTION_MAP: Array<{ keywords: string[]; type: ObjectType }> = [
  {
    keywords: [
      "voiture", "car", "auto", "véhicule", "vehicule", "vehicle",
      "taycan", "ferrari", "porsche", "bmw", "mercedes", "audi", "lamborghini",
      "bugatti", "maserati", "bentley", "rolls", "pagani",
      "sports car", "berline", "coupé", "coupe", "cabriolet", "roadster",
      "suv", "tesla", "mustang",
    ],
    type: "car",
  },
  {
    keywords: [
      "téléphone", "telephone", "phone", "smartphone", "iphone",
      "android", "mobile", "cellphone", "cellulaire", "flagship",
      "pixel", "galaxy", "oneplus",
    ],
    type: "phone",
  },
  {
    keywords: [
      "laptop", "ordinateur", "computer", "macbook", "pc portable",
      "notebook", "ultrabook", "chromebook",
    ],
    type: "laptop",
  },
  {
    keywords: [
      "montre", "watch", "smartwatch", "horloge", "rolex", "omega",
      "timepiece", "chronographe", "chronograph", "wristwatch",
    ],
    type: "watch",
  },
  {
    keywords: [
      "chaussure", "shoe", "sneaker", "basket", "adidas", "nike",
      "jordan", "boot", "botte", "mocassin", "loafer",
    ],
    type: "shoe",
  },
  {
    keywords: [
      "meuble", "furniture", "chaise", "table", "sofa", "canapé",
      "canape", "chair", "desk", "bureau", "armchair", "fauteuil",
      "lampe", "lamp", "shelf", "etagere",
    ],
    type: "furniture",
  },
  {
    keywords: [
      "bouteille", "bottle", "parfum", "perfume", "flacon",
      "packaging", "flask", "fiole", "vial", "carafe",
    ],
    type: "bottle",
  },
];

// ── Normalisation helper ───────────────────────────────────────────────────────
function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Detects the object type from a free-form request string.
 * Returns "generic" when no object keyword is found.
 */
export function detectObjectType(input: string): ObjectType {
  const n = normalise(input);
  for (const { keywords, type } of DETECTION_MAP) {
    if (keywords.some((kw) => n.includes(normalise(kw)))) {
      return type;
    }
  }
  return "generic";
}

/**
 * Expands a short free-form request into a structured Brief3D.
 * The brief is fully self-contained — all fields are concrete strings
 * ready for prompt assembly, no further inference needed.
 */
export function expandRequest(input: string): Brief3D {
  const objectType = detectObjectType(input);

  return {
    objectType,
    subjectDescription: OBJECT_PRESETS[objectType].subjectDescription,
    designLanguage: DESIGN_ARCHETYPES[objectType],
    proportions: OBJECT_PRESETS[objectType].proportions,
    details: OBJECT_PRESETS[objectType].details,
    materials: MATERIAL_PRESETS[objectType],
    lighting: LIGHTING_PRESETS[objectType],
    camera: CAMERA_PRESETS[objectType],
    quality: [
      "premium realistic CGI",
      "PBR materials",
      "clean industrial design",
      "realistic proportions",
      "studio lighting",
      "controlled reflections",
      "soft shadows",
      "hero product composition",
    ],
    negatives: [...UNIVERSAL_NEGATIVES, ...OBJECT_NEGATIVES[objectType]],
  };
}
