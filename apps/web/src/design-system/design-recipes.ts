/**
 * Design Enhancement Layer — Design Recipes
 *
 * A recipe combines a profile with concrete CSS class hints and component config
 * so an agent or developer can assemble a page without guessing which classes go
 * together. Recipes are higher-level than profiles: one recipe = one fully-
 * configured visual personality for a specific domain.
 *
 * Profiles answer "how should this feel?".
 * Recipes answer "exactly which CSS classes and variants to use to achieve that feel?".
 */

export interface DesignRecipe {
  id: string;
  name: string;
  /** Preset IDs this recipe targets */
  targetPresets: string[];
  /** Profile ID from design-profiles.ts */
  profileId: string;
  /** Outer wrapper className */
  wrapperClass: string;
  /** Hero title span className (gradient text treatment) */
  heroTextClass: string;
  /** Card className for content sections */
  cardClass: string;
  /** Hero media / preview card className */
  heroCardClass: string;
  /** Accent button className */
  accentClass: string;
  /** Section padding Tailwind classes */
  sectionPadding: string;
  /** Feature card element to use: "spotlight" | "glass" | "gradient-border" | "plain" */
  featureCard: "spotlight" | "glass" | "gradient-border" | "plain";
  /** Badge treatment for featured items */
  badgeClass: "shimmer" | "filled" | "outline" | "none";
  description: string;
}

export const DESIGN_RECIPES: Record<string, DesignRecipe> = {
  "premium-saas": {
    id: "premium-saas",
    name: "Premium SaaS",
    targetPresets: ["saas"],
    profileId: "premium-saas",
    wrapperClass: "bg-profile-soft-gradient",
    heroTextClass: "text-gradient-primary",
    cardClass: "card-glass",
    heroCardClass: "card-glass rounded-xl p-6",
    accentClass: "btn-gradient",
    sectionPadding: "py-16 sm:py-24",
    featureCard: "spotlight",
    badgeClass: "shimmer",
    description:
      "Glass cards, spotlight hover effects, gradient text. High-trust B2B product feel.",
  },

  "minimal-dashboard": {
    id: "minimal-dashboard",
    name: "Minimal Dashboard",
    targetPresets: ["dashboard"],
    profileId: "minimal-dashboard",
    wrapperClass: "",
    heroTextClass: "",
    cardClass: "",
    heroCardClass: "border rounded-xl p-6 bg-card",
    accentClass: "",
    sectionPadding: "py-10 sm:py-16",
    featureCard: "plain",
    badgeClass: "filled",
    description:
      "Clean borders, no gradients, tight spacing. Professional analytics tool feel.",
  },

  "dark-api": {
    id: "dark-api",
    name: "Dark Tech API",
    targetPresets: ["api"],
    profileId: "dark-technical",
    wrapperClass: "bg-profile-dark-depth",
    heroTextClass: "text-gradient-primary",
    cardClass: "card-dark-elevated",
    heroCardClass: "card-dark-elevated rounded-xl p-6",
    accentClass: "btn-gradient",
    sectionPadding: "py-16 sm:py-24",
    featureCard: "gradient-border",
    badgeClass: "shimmer",
    description:
      "Dark depth background, gradient-border feature cards, glow accents. Developer portal feel.",
  },

  "warm-booking": {
    id: "warm-booking",
    name: "Warm Booking",
    targetPresets: ["booking", "local-business"],
    profileId: "warm-local",
    wrapperClass: "bg-profile-soft-gradient",
    heroTextClass: "text-gradient-editorial",
    cardClass: "",
    heroCardClass: "border rounded-xl p-6 bg-card shadow-sm",
    accentClass: "",
    sectionPadding: "py-16 sm:py-24",
    featureCard: "plain",
    badgeClass: "filled",
    description:
      "Soft gradient, warm editorial text, clean cards. Wellness and service business feel.",
  },

  "editorial-portfolio": {
    id: "editorial-portfolio",
    name: "Editorial Portfolio",
    targetPresets: ["portfolio"],
    profileId: "creative-portfolio",
    wrapperClass: "bg-profile-noise",
    heroTextClass: "text-gradient-editorial",
    cardClass: "",
    heroCardClass: "border rounded-xl p-6 bg-card",
    accentClass: "",
    sectionPadding: "py-20 sm:py-28",
    featureCard: "plain",
    badgeClass: "outline",
    description:
      "Noise texture, editorial gradient text, generous spacing. Creative professional feel.",
  },

  "cinematic-auto": {
    id: "cinematic-auto",
    name: "Cinematic Auto",
    targetPresets: ["auto-blog"],
    profileId: "auto-performance",
    wrapperClass: "bg-profile-dark-depth",
    heroTextClass: "text-gradient-editorial",
    cardClass: "card-dark-elevated",
    heroCardClass: "card-dark-elevated rounded-xl p-6",
    accentClass: "btn-gradient",
    sectionPadding: "py-20 sm:py-28",
    featureCard: "gradient-border",
    badgeClass: "shimmer",
    description:
      "Dark cinematic depth, gradient-border cards, dramatic entries. Luxury auto editorial feel.",
  },

  "ecommerce-clean": {
    id: "ecommerce-clean",
    name: "Ecommerce Clean",
    targetPresets: ["ecommerce"],
    profileId: "commerce-clean",
    wrapperClass: "bg-profile-soft-gradient",
    heroTextClass: "text-gradient-primary",
    cardClass: "",
    heroCardClass: "border rounded-xl p-6 bg-card shadow-sm",
    accentClass: "",
    sectionPadding: "py-16 sm:py-24",
    featureCard: "spotlight",
    badgeClass: "shimmer",
    description:
      "Soft gradient, spotlight product cards, clean product typography. Consumer commerce feel.",
  },

  "real-estate-premium": {
    id: "real-estate-premium",
    name: "Real Estate Premium",
    targetPresets: ["real-estate"],
    profileId: "real-estate-luxe",
    wrapperClass: "bg-profile-soft-gradient",
    heroTextClass: "text-gradient-editorial",
    cardClass: "",
    heroCardClass: "border rounded-xl p-6 bg-card shadow-sm",
    accentClass: "",
    sectionPadding: "py-16 sm:py-24",
    featureCard: "plain",
    badgeClass: "outline",
    description:
      "Soft gradient, editorial text, property cards with clear hierarchy. High-end realty feel.",
  },
};

export const DESIGN_RECIPE_IDS = Object.keys(DESIGN_RECIPES) as (keyof typeof DESIGN_RECIPES)[];

export function getRecipeForPreset(preset: string): DesignRecipe | undefined {
  return Object.values(DESIGN_RECIPES).find((r) => r.targetPresets.includes(preset));
}

export function getRecipe(id: string): DesignRecipe | undefined {
  return DESIGN_RECIPES[id];
}
