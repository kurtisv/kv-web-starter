import type { ObjectType } from "./types";

/** Constraints that apply to every object type */
export const UNIVERSAL_NEGATIVES: string[] = [
  "cartoon",
  "toy-like",
  "childish",
  "low-poly",
  "flat shaded",
  "hand-drawn",
  "cheap plastic",
  "unrealistic proportions",
  "exaggerated fantasy design",
  "anime",
  "stylized",
  "claymation",
  "cel-shaded",
  "illustrated",
  "watercolor",
  "vector art",
  "clip art",
];

/** Additional per-object constraints stacked on top of universal ones */
export const OBJECT_NEGATIVES: Record<ObjectType, string[]> = {
  car: [
    "monster truck",
    "rally livery",
    "cartoon racing decals",
    "rubber-band proportions",
    "tiny wheels relative to body",
  ],
  phone: [
    "huge bezels",
    "physical qwerty keyboard",
    "candy-colored plastic body",
    "outdated brick form factor",
  ],
  laptop: [
    "thick plastic chassis",
    "visible seam lines on lid",
    "cooling vents on the top surface",
    "sticker-covered deck",
  ],
  watch: [
    "digital toy watch",
    "plastic wristband",
    "blurry or unreadable dial",
    "off-proportion crown",
  ],
  shoe: [
    "platform clown proportions",
    "floating disconnected sole",
    "cartoon bubble silhouette",
  ],
  furniture: [
    "particle board texture",
    "flat-pack look",
    "synthetic laminate surface",
    "visible screws on decorative faces",
  ],
  bottle: [
    "crooked or wrinkled label",
    "air bubbles in glass",
    "cheap screw cap",
    "toy bottle proportions",
  ],
  generic: [
    "blurry textures",
    "low-resolution surface maps",
    "z-fighting rendering artifacts",
  ],
};
