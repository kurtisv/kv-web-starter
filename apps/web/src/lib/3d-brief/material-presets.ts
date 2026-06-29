import type { ObjectType } from "./types";

export const MATERIAL_PRESETS: Record<ObjectType, string[]> = {
  car: [
    "deep metallic paint with realistic clearcoat reflections",
    "tinted tempered glass with subtle green tint",
    "satin-finish alloy wheels",
    "matte rubber tires with sidewall texture",
    "anodized gloss black trim elements",
  ],

  phone: [
    "brushed titanium or polished stainless steel frame",
    "ceramic or frosted glass back",
    "sapphire crystal front glass with anti-reflective coating",
    "matte anodized side button surfaces",
  ],

  laptop: [
    "CNC-machined anodized aluminium in Space Gray or Silver",
    "glass trackpad surface with subtle glare point",
    "soft-touch ABS keyboard keycaps",
    "anti-glare coated IPS or mini-LED display",
  ],

  watch: [
    "Grade 5 titanium or surgical stainless steel case",
    "sapphire crystal glass face",
    "fluoroelastomer or Horween leather band",
    "polished ceramic bezel inserts",
  ],

  shoe: [
    "premium full-grain leather or engineered Flyknit upper",
    "EVA foam midsole with visible cushioning pod details",
    "vulcanized rubber outsole",
    "woven fabric tongue lining",
  ],

  furniture: [
    "natural European white oak with hand-rubbed oil finish",
    "Scandinavian linen or boucle upholstery fabric",
    "cold-cast brushed brass hardware",
    "hand-applied matte lacquer on exposed underframe",
  ],

  bottle: [
    "borosilicate glass with subtle tint and internal refraction",
    "gold-plated zamak cap with knurled grip",
    "heat-stamped foil label",
    "satin ribbon neck tie",
  ],

  generic: [
    "premium PBR materials with accurate reflectance values",
    "controlled specular highlights and soft diffuse response",
    "subtle ambient occlusion at contact points",
  ],
};
