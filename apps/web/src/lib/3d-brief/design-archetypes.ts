import type { DesignArchetype, ObjectType } from "./types";

export const DESIGN_ARCHETYPES: Record<ObjectType, DesignArchetype> = {
  car: {
    shortLabel: "timeless luxury",
    fullDescription:
      "timeless luxury grand touring design language with clean sculpted body panels, precision lighting signatures, long hood proportions, and restrained ornamentation",
  },

  phone: {
    shortLabel: "flagship industrial",
    fullDescription:
      "flagship industrial design language with precision-machined titanium chassis, optically bonded display, invisible antenna lines, and minimal visible seams",
  },

  laptop: {
    shortLabel: "unibody premium",
    fullDescription:
      "unibody aluminium industrial design language with clean CNC-machined surfaces, tight machined tolerances, minimal external ports, and seamless lid closure",
  },

  watch: {
    shortLabel: "horological luxury",
    fullDescription:
      "Swiss-inspired horological design with round or rectangular case, layered dial depth, alternating brushed and polished surface finishing, and signed crown",
  },

  shoe: {
    shortLabel: "performance-heritage",
    fullDescription:
      "performance-heritage sneaker design language with clean upper lines, intentional perforations, sculpted midsole geometry, and purposeful heel counter structure",
  },

  furniture: {
    shortLabel: "warm minimalist",
    fullDescription:
      "mid-century modern meets Scandinavian minimalism: organic tapered forms, natural grain materials, visible joinery details, and warm neutral palette",
  },

  bottle: {
    shortLabel: "luxury editorial",
    fullDescription:
      "luxury perfume and spirits packaging design language with heavy glass base, elegant silhouette taper, premium closure, and typographically refined label",
  },

  generic: {
    shortLabel: "premium CGI",
    fullDescription:
      "premium product CGI archetype: hero composition, neutral gradient background, clean shadow plane, and controlled controlled specular reflections",
  },
};
