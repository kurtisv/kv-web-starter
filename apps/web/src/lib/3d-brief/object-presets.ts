import type { ObjectPreset, ObjectType } from "./types";

export const OBJECT_PRESETS: Record<ObjectType, ObjectPreset> = {
  car: {
    type: "car",
    name: "Classic Grand Touring Sports Car",
    subjectDescription: "classic grand touring sports car",
    proportions: [
      "long sculpted hood",
      "low aggressive stance",
      "wide wheelbase",
      "elegant sweeping roofline",
      "clean body panel surfaces",
    ],
    details: [
      "thin signature LED headlights",
      "premium alloy wheels with realistic tires",
      "subtle gloss black trim",
      "chrome exhaust tips",
      "flush door handles",
    ],
  },

  phone: {
    type: "phone",
    name: "Flagship Premium Smartphone",
    subjectDescription: "flagship premium smartphone",
    proportions: [
      "thin titanium frame with precision-machined edges",
      "full-bleed display with minimal bezels",
      "slender side rail profile",
    ],
    details: [
      "triple-lens camera module with sapphire glass",
      "Dynamic Island pill cutout",
      "frosted or ceramic glass back",
      "titanium side rails",
      "USB-C port with fine machined chamfer",
    ],
  },

  laptop: {
    type: "laptop",
    name: "Ultrathin Aluminium Luxury Laptop",
    subjectDescription: "ultrathin aluminum luxury laptop",
    proportions: [
      "feather-thin aluminium unibody chassis",
      "wide-format display with subtle bezels",
      "full-width seamless trackpad",
    ],
    details: [
      "machined aluminium Space Gray finish",
      "backlit scissor-mechanism keyboard with uniform key spacing",
      "glass trackpad with haptic feedback surface",
      "slim USB-C ports on side edge",
      "active display showing a code editor or UI",
    ],
  },

  watch: {
    type: "watch",
    name: "Luxury Mechanical Smartwatch",
    subjectDescription: "luxury mechanical smartwatch",
    proportions: [
      "mid-size rounded rectangular case",
      "flat sapphire crystal display face",
      "fine-machined crown and side buttons",
    ],
    details: [
      "titanium or stainless steel case",
      "fluoroelastomer or Horween leather band",
      "always-on OLED display with layered dial depth",
      "precision brushed and polished alternating surface finish",
    ],
  },

  shoe: {
    type: "shoe",
    name: "Premium Sneaker Product Render",
    subjectDescription: "premium sneaker product render",
    proportions: [
      "correct anatomical shoe proportions",
      "lightweight perforated upper",
      "sculpted midsole with visible cushioning technology",
    ],
    details: [
      "premium leather or engineered mesh upper",
      "rubber outsole with traction pattern",
      "heel counter with structured support",
      "subtle brand detailing and woven tongue lining",
    ],
  },

  furniture: {
    type: "furniture",
    name: "High-End Interior Design Furniture",
    subjectDescription: "high-end interior design furniture piece",
    proportions: [
      "refined proportions with balanced negative space",
      "slender tapered legs with solid joinery",
      "generous seating or surface area",
    ],
    details: [
      "natural oak, walnut, or marble surface",
      "linen or cashmere upholstery",
      "brushed brass or matte black hardware",
      "hand-finished mortise and tenon joints",
    ],
  },

  bottle: {
    type: "bottle",
    name: "Luxury Product Packaging Render",
    subjectDescription: "luxury product packaging render",
    proportions: [
      "elegant tall silhouette with weighted base",
      "refined neck taper with precise shoulder",
      "flush cap or stopper integration",
    ],
    details: [
      "frosted glass or clear crystal body",
      "embossed or debossed label with foil accent",
      "precision metal or cork closure",
      "subtle gradient fill suggesting liquid depth",
    ],
  },

  generic: {
    type: "generic",
    name: "Premium Product Hero Render",
    subjectDescription: "premium product hero render",
    proportions: [
      "clean balanced proportions",
      "purposeful negative space",
    ],
    details: [
      "high-quality surface materials",
      "refined edge finishing",
      "controlled specular highlights",
    ],
  },
};
