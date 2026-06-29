import type { LightingSetup, ObjectType } from "./types";

export const LIGHTING_PRESETS: Record<ObjectType, LightingSetup> = {
  car: {
    name: "Dark Luxury Showroom",
    description:
      "dark luxury showroom with cinematic studio lighting, soft rim lights from upper-left and upper-right, controlled body reflections, subtle floor reflection, warm key light and cool fill",
  },

  phone: {
    name: "Clean Product Studio",
    description:
      "clean white infinity-curve studio with soft top-diffused lighting, rim light catching the titanium frame edge, gradient bottom fill, and no harsh shadows",
  },

  laptop: {
    name: "Minimal Studio",
    description:
      "minimal light-grey studio setup with soft overhead area light, subtle side catch-light on the aluminium lid, and a gentle floor shadow",
  },

  watch: {
    name: "Jewellery Spot Lighting",
    description:
      "dark velvet background with jewellery-style spot lighting: hard key light highlighting the brushed-polished contrast, controlled crystal flare, and soft fill to preserve dial legibility",
  },

  shoe: {
    name: "Floating Product Lighting",
    description:
      "neutral white or gradient-grey background, top soft-box key light, frontal fill diffuser, sharp specular highlight on midsole edge, and a subtle drop shadow below the sole",
  },

  furniture: {
    name: "Interior Editorial",
    description:
      "bright Scandinavian interior ambient, large window sidelight simulation, warm secondary fill, subtle wood-grain catch-light, lifestyle editorial mood",
  },

  bottle: {
    name: "Beauty Product Lighting",
    description:
      "dark gradient background, strong backlit rim to outline silhouette, frontal diffused key, refracted prismatic light through glass body, dramatic controlled depth",
  },

  generic: {
    name: "Three-Point Hero Studio",
    description:
      "neutral dark-to-gradient studio with three-point lighting: warm key, cool fill, rim separation light, and a soft floor shadow",
  },
};
