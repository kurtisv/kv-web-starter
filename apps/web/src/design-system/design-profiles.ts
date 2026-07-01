/**
 * Design Enhancement Layer — Design Profiles
 *
 * A design profile expresses the visual PERSONALITY of a site beyond its color theme.
 * Themes define WHAT colors to use; profiles define HOW the site should FEEL.
 *
 * Profiles are consumed by demo pages, design-lab previews, and future blueprint manifests.
 * They are pure data — no React, no CSS imports, no side effects.
 */

export type BackgroundStyle =
  | "flat"           // plain bg-background, no texture
  | "soft-gradient"  // subtle radial/linear gradient overlay
  | "noise"          // CSS noise texture via pseudo-element
  | "grid-lines"     // dot grid or line grid overlay
  | "dark-depth";    // layered dark gradients with depth

export type CardStyle =
  | "clean"           // plain border bg-card, no shadow
  | "glass-elevated"  // backdrop-filter blur, semi-transparent bg, subtle border
  | "bordered-sharp"  // thick border, no radius, sharp corners
  | "warm-tinted"     // warm tinted bg-card with soft border
  | "dark-elevated";  // dark bg-card, strong shadow, elevated feel

export type HeroStyle =
  | "centered"          // centered text, gradient bg, default layout
  | "editorial-split"   // left text / right visual, editorial feel
  | "dark-cinematic"    // full-bleed dark gradient, large type, cinematic
  | "warm-editorial"    // centered, warm bg, serif-adjacent weight
  | "full-bleed";       // hero fills viewport, edge-to-edge

export type MotionStyle =
  | "subtle"      // barely-there transitions, short durations, ease-out
  | "expressive"  // spring physics, stagger reveals, personality
  | "editorial"   // slow controlled fades, deliberate pace
  | "cinematic"   // dramatic entries, parallax feel, longer durations
  | "none";       // no motion (accessibility-first, dashboard tools)

export type ImageStyle =
  | "rounded"     // border-radius: lg / xl on images
  | "sharp"       // no border-radius, hard edges
  | "film-grain"  // slight grain overlay on images (CSS filter)
  | "none";       // no specific image treatment

export type DensityStyle =
  | "comfortable"  // py-16 sm:py-24 — standard spacing
  | "compact"      // py-10 sm:py-16 — tighter, tool-like
  | "spacious"     // py-24 sm:py-32 — editorial breathing room
  | "editorial";   // py-20 sm:py-28 + large section titles

export type RadiusScale =
  | "none"   // --radius: 0
  | "sm"     // --radius: 0.125rem
  | "md"     // --radius: 0.375rem
  | "lg"     // --radius: 0.75rem
  | "xl";    // --radius: 1rem

export type ShadowLevel =
  | "none"     // no box shadows
  | "subtle"   // shadow-sm only
  | "elevated" // shadow-md on cards
  | "dramatic";// shadow-xl on featured elements

export type GradientStrength =
  | "none"      // no gradients beyond the hero
  | "soft"      // 10-20% opacity gradient overlays
  | "strong"    // full gradient sections and card borders
  | "editorial";// gradient text and selective strong overlays

export type AccentTreatment =
  | "fill"      // solid filled primary buttons
  | "outline"   // outlined style preferred
  | "ghost"     // ghost / transparent preferred
  | "gradient"  // gradient fill on CTA buttons
  | "glow";     // box-shadow glow on primary elements

export type MoodTag =
  | "professional"
  | "warm"
  | "dark"
  | "premium"
  | "creative"
  | "technical"
  | "minimal"
  | "editorial"
  | "cinematic"
  | "commercial";

export interface DesignProfile {
  id: string;
  label: string;
  description: string;
  mood: MoodTag[];
  recommendedDomains: string[];

  // Visual personality axes
  backgroundStyle: BackgroundStyle;
  cardStyle: CardStyle;
  heroStyle: HeroStyle;
  motionStyle: MotionStyle;
  imageStyle: ImageStyle;
  density: DensityStyle;
  radius: RadiusScale;
  shadow: ShadowLevel;
  gradient: GradientStrength;
  accentTreatment: AccentTreatment;

  // Tailwind utility hints for consumers (not enforced, used as doc)
  typographyNote: string;
  layoutNote: string;
}

export const DESIGN_PROFILES: Record<string, DesignProfile> = {
  "premium-saas": {
    id: "premium-saas",
    label: "Premium SaaS",
    description:
      "Glass cards, violet gradients, expressive spring motion. High-trust B2B product feel with personality.",
    mood: ["premium", "professional"],
    recommendedDomains: ["saas", "dashboard"],

    backgroundStyle: "soft-gradient",
    cardStyle: "glass-elevated",
    heroStyle: "centered",
    motionStyle: "expressive",
    imageStyle: "rounded",
    density: "comfortable",
    radius: "lg",
    shadow: "elevated",
    gradient: "strong",
    accentTreatment: "gradient",

    typographyNote: "Semibold headlines, tracking-tight. Eyebrow in violet.",
    layoutNote: "Feature grid with glass cards. Stats in gradient banner.",
  },

  "minimal-dashboard": {
    id: "minimal-dashboard",
    label: "Minimal Dashboard",
    description:
      "Ultra-clean tool aesthetic. No gradients, no gimmicks. Information density over decoration.",
    mood: ["minimal", "technical"],
    recommendedDomains: ["dashboard"],

    backgroundStyle: "flat",
    cardStyle: "bordered-sharp",
    heroStyle: "centered",
    motionStyle: "none",
    imageStyle: "sharp",
    density: "compact",
    radius: "sm",
    shadow: "subtle",
    gradient: "none",
    accentTreatment: "fill",

    typographyNote: "Medium weight, mono for metrics, uppercase labels.",
    layoutNote: "Stats grid front and center. No decorative sections.",
  },

  "luxury-editorial": {
    id: "luxury-editorial",
    label: "Luxury Editorial",
    description:
      "Slow editorial motion, generous spacing, gradient text headlines. Magazine/luxury agency feel.",
    mood: ["editorial", "premium", "creative"],
    recommendedDomains: ["portfolio", "agency", "editorial"],

    backgroundStyle: "noise",
    cardStyle: "clean",
    heroStyle: "editorial-split",
    motionStyle: "editorial",
    imageStyle: "film-grain",
    density: "editorial",
    radius: "md",
    shadow: "none",
    gradient: "editorial",
    accentTreatment: "ghost",

    typographyNote: "Large tracking-tight headlines. Eyebrow with wide letter-spacing.",
    layoutNote: "Split hero with image right. Project showcase as full-bleed rows.",
  },

  "warm-local": {
    id: "warm-local",
    label: "Warm Local",
    description:
      "Friendly, approachable, warm tones. Local business trust signals: photos, hours, map, reviews.",
    mood: ["warm", "commercial"],
    recommendedDomains: ["local-business", "booking", "restaurant", "spa"],

    backgroundStyle: "flat",
    cardStyle: "warm-tinted",
    heroStyle: "warm-editorial",
    motionStyle: "subtle",
    imageStyle: "rounded",
    density: "comfortable",
    radius: "lg",
    shadow: "subtle",
    gradient: "soft",
    accentTreatment: "fill",

    typographyNote: "Readable weight, friendly sizing. No uppercase eyebrows.",
    layoutNote: "Services grid with images. Testimonials prominent. Hours section.",
  },

  "dark-technical": {
    id: "dark-technical",
    label: "Dark Technical",
    description:
      "Cyan-on-dark developer aesthetic. Code blocks, metrics, terminal feel. Zero warmth, maximum precision.",
    mood: ["dark", "technical", "minimal"],
    recommendedDomains: ["api", "developer", "devtools"],

    backgroundStyle: "dark-depth",
    cardStyle: "dark-elevated",
    heroStyle: "dark-cinematic",
    motionStyle: "subtle",
    imageStyle: "sharp",
    density: "comfortable",
    radius: "sm",
    shadow: "dramatic",
    gradient: "soft",
    accentTreatment: "glow",

    typographyNote: "Mono for code/metrics. Sans for copy. Cyan accent on key labels.",
    layoutNote: "Endpoint list as main feature. Code tabs prominent. Metrics dashboard.",
  },

  "commerce-clean": {
    id: "commerce-clean",
    label: "Commerce Clean",
    description:
      "Orange CTA urgency, trust greens, product-forward. Convert-first design with clean whitespace.",
    mood: ["commercial", "professional"],
    recommendedDomains: ["ecommerce"],

    backgroundStyle: "flat",
    cardStyle: "clean",
    heroStyle: "dark-cinematic",
    motionStyle: "subtle",
    imageStyle: "rounded",
    density: "comfortable",
    radius: "md",
    shadow: "subtle",
    gradient: "soft",
    accentTreatment: "fill",

    typographyNote: "Product names bold, prices large. Trust badges near CTA.",
    layoutNote: "Product grid up top. Filter bar sticky. Cart summary sidebar.",
  },

  "academy-premium": {
    id: "academy-premium",
    label: "Academy Premium",
    description:
      "Soft premium learning experience: glass cards, gradient progress UI, calm expressive motion.",
    mood: ["premium", "editorial"],
    recommendedDomains: ["academy", "saas", "learning"],

    backgroundStyle: "soft-gradient",
    cardStyle: "glass-elevated",
    heroStyle: "centered",
    motionStyle: "expressive",
    imageStyle: "rounded",
    density: "spacious",
    radius: "xl",
    shadow: "elevated",
    gradient: "strong",
    accentTreatment: "gradient",

    typographyNote: "Large h1, progress-forward copy. Eyebrow tracks course/module context.",
    layoutNote: "Course cards with progress bars. Stats section with enrolled/completion.",
  },

  "auto-performance": {
    id: "auto-performance",
    label: "Auto Performance",
    description:
      "Dark cinematic, red accents, sharp radius. Speed, power, exclusivity. Car showcase aesthetic.",
    mood: ["dark", "cinematic", "editorial"],
    recommendedDomains: ["auto-blog", "automotive", "luxury"],

    backgroundStyle: "dark-depth",
    cardStyle: "dark-elevated",
    heroStyle: "dark-cinematic",
    motionStyle: "cinematic",
    imageStyle: "film-grain",
    density: "editorial",
    radius: "none",
    shadow: "dramatic",
    gradient: "strong",
    accentTreatment: "glow",

    typographyNote: "Heavy weight headlines, uppercase labels, red accent numbers.",
    layoutNote: "Car grid full-bleed with overlay text. Spec comparison table.",
  },

  "real-estate-luxe": {
    id: "real-estate-luxe",
    label: "Real Estate Luxe",
    description:
      "Sky blue + gold trust palette. Clean property cards, financial calculator, neighborhood scores.",
    mood: ["professional", "premium", "commercial"],
    recommendedDomains: ["real-estate"],

    backgroundStyle: "flat",
    cardStyle: "glass-elevated",
    heroStyle: "editorial-split",
    motionStyle: "subtle",
    imageStyle: "rounded",
    density: "comfortable",
    radius: "md",
    shadow: "elevated",
    gradient: "soft",
    accentTreatment: "fill",

    typographyNote: "Price in large semibold. Stats as prominent data points.",
    layoutNote: "Property grid with filters. Map placeholder. Agent profile card.",
  },

  "creative-portfolio": {
    id: "creative-portfolio",
    label: "Creative Portfolio",
    description:
      "Strong typographic presence, case study layout, editorial motion. For developers and designers.",
    mood: ["creative", "editorial", "professional"],
    recommendedDomains: ["portfolio"],

    backgroundStyle: "noise",
    cardStyle: "bordered-sharp",
    heroStyle: "editorial-split",
    motionStyle: "editorial",
    imageStyle: "film-grain",
    density: "spacious",
    radius: "none",
    shadow: "none",
    gradient: "editorial",
    accentTreatment: "ghost",

    typographyNote: "Large tracking-tight h1. Project titles prominent. Skills as tags.",
    layoutNote: "Project showcase full rows. Timeline for experience. Contact minimal.",
  },
};

export type DesignProfileId = keyof typeof DESIGN_PROFILES;

export const DESIGN_PROFILE_IDS = Object.keys(DESIGN_PROFILES) as DesignProfileId[];

/**
 * Returns the design profile for a given profile ID.
 * Falls back to "premium-saas" if the ID is not found.
 */
export function getDesignProfile(id: string): DesignProfile {
  return DESIGN_PROFILES[id] ?? DESIGN_PROFILES["premium-saas"];
}

/**
 * Maps each project preset type to its recommended design profile ID.
 * Presets with the same theme can now have distinct visual personalities.
 */
export const PRESET_TO_PROFILE: Record<string, DesignProfileId> = {
  portfolio: "creative-portfolio",
  saas: "premium-saas",
  booking: "warm-local",
  api: "dark-technical",
  "real-estate": "real-estate-luxe",
  "local-business": "warm-local",
  "auto-blog": "auto-performance",
  ecommerce: "commerce-clean",
  dashboard: "minimal-dashboard",
};

/**
 * Returns the recommended design profile for a given preset type.
 */
export function getProfileForPreset(presetType: string): DesignProfile {
  const profileId = PRESET_TO_PROFILE[presetType] ?? "premium-saas";
  return getDesignProfile(profileId);
}
