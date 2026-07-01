/**
 * UI Quality Levels
 *
 * A shared vocabulary for the visual and UX intensity a component or page should achieve.
 * Agents and developers pick a level before composing, not after.
 */

export type UiQualityLevelId =
  | "basic"
  | "polished"
  | "premium"
  | "conversion"
  | "editorial"
  | "dashboard"
  | "technical"
  | "luxury";

export interface UiQualityLevel {
  id: UiQualityLevelId;
  label: string;
  description: string;
  visualIntensity: "low" | "medium" | "medium-high" | "high" | "very-high";
  spacing: "compact" | "comfortable" | "spacious" | "editorial";
  motion: "none" | "minimal" | "subtle" | "expressive" | "cinematic" | "editorial";
  surfaceTreatment: "flat" | "subtle" | "elevated" | "glass" | "cinematic";
  primaryUseCases: string[];
  avoidWhen: string[];
  requiredStates: string[];
  checklist: string[];
}

export const UI_QUALITY_LEVELS: Record<UiQualityLevelId, UiQualityLevel> = {
  basic: {
    id: "basic",
    label: "Basic",
    description: "Minimal styling. Functional first. Useful for internal tools, prototypes and scaffolding.",
    visualIntensity: "low",
    spacing: "compact",
    motion: "none",
    surfaceTreatment: "flat",
    primaryUseCases: ["admin-only tools", "internal dashboards", "prototypes", "data-entry forms"],
    avoidWhen: ["client-facing pages", "marketing pages", "any page with conversion goals"],
    requiredStates: ["default", "disabled"],
    checklist: [
      "Functional and readable",
      "Labels are clear",
      "No broken layout on mobile",
    ],
  },

  polished: {
    id: "polished",
    label: "Polished",
    description: "Clean, coherent, professional. Borders, shadows and spacing are consistent. Suitable for most SaaS tools and dashboards.",
    visualIntensity: "medium",
    spacing: "comfortable",
    motion: "minimal",
    surfaceTreatment: "subtle",
    primaryUseCases: ["saas-app pages", "dashboard views", "settings pages", "authenticated workflows"],
    avoidWhen: ["high-emotion marketing pages", "luxury or editorial brands"],
    requiredStates: ["default", "hover", "focus-visible", "disabled", "loading", "empty"],
    checklist: [
      "Consistent border, radius and spacing",
      "All interactive states visible",
      "Empty and loading states present",
      "No hardcoded brand colors",
      "Mobile 390px without overflow",
    ],
  },

  premium: {
    id: "premium",
    label: "Premium",
    description: "High-trust feel with glass surfaces, subtle gradients and expressive hover states. For SaaS products wanting to signal quality.",
    visualIntensity: "medium-high",
    spacing: "comfortable",
    motion: "subtle",
    surfaceTreatment: "glass",
    primaryUseCases: ["saas-marketing", "product-landing", "pricing-pages", "feature-highlight-sections"],
    avoidWhen: ["dense data tables", "admin tools", "legal pages"],
    requiredStates: ["default", "hover", "focus-visible", "active", "disabled", "loading", "empty"],
    checklist: [
      "Glass or elevated card surfaces",
      "Gradient or spotlight accents",
      "Subtle motion on entry or hover",
      "Reduced-motion respected",
      "Trust signal or social proof visible",
      "Primary CTA visually dominant",
    ],
  },

  conversion: {
    id: "conversion",
    label: "Conversion",
    description: "Designed to drive action. Strong hierarchy, clear CTA, trust signals and low friction. Scannability and clarity are paramount.",
    visualIntensity: "medium-high",
    spacing: "comfortable",
    motion: "subtle",
    surfaceTreatment: "elevated",
    primaryUseCases: ["pricing", "product-card", "checkout", "booking", "lead-capture", "trial-signup"],
    avoidWhen: ["dense dashboards", "legal pages", "read-only documentation"],
    requiredStates: ["default", "hover", "focus-visible", "loading", "success", "error"],
    checklist: [
      "Primary CTA is visually dominant",
      "Trust signal is visible (rating, badge, testimonial)",
      "User knows what happens after the action",
      "Error and success states are human-readable",
      "No unnecessary friction (minimal fields, clear labels)",
      "Price or key metric is prominent",
    ],
  },

  editorial: {
    id: "editorial",
    label: "Editorial",
    description: "Content-first with generous spacing, large typography and controlled motion. For portfolios, blogs and brand-forward pages.",
    visualIntensity: "medium",
    spacing: "editorial",
    motion: "editorial",
    surfaceTreatment: "flat",
    primaryUseCases: ["portfolio", "blog", "case-study", "brand-editorial", "auto-blog"],
    avoidWhen: ["conversion-first pages", "dashboards", "dense data"],
    requiredStates: ["default", "hover", "focus-visible"],
    checklist: [
      "Typography is the primary design element",
      "Generous whitespace around content",
      "Motion is slow and deliberate",
      "No competing visual elements",
      "Images are treated editorially (captions, ratios)",
    ],
  },

  dashboard: {
    id: "dashboard",
    label: "Dashboard",
    description: "Data-dense, scannability-first. Tight spacing, clear labels and minimal decoration. Metrics must be readable at a glance.",
    visualIntensity: "low",
    spacing: "compact",
    motion: "none",
    surfaceTreatment: "flat",
    primaryUseCases: ["analytics-dashboard", "admin-panel", "operations-view", "monitoring"],
    avoidWhen: ["marketing pages", "conversion flows", "creative or editorial contexts"],
    requiredStates: ["default", "hover", "focus-visible", "loading", "empty", "error"],
    checklist: [
      "Metrics are scannable in under 2 seconds",
      "Color is used semantically only (success/error/warning)",
      "Labels are concise",
      "Empty and loading states for every data widget",
      "No decorative animation",
      "Sidebar and nav are keyboard accessible",
    ],
  },

  technical: {
    id: "technical",
    label: "Technical",
    description: "Developer-facing. Dark depth, monospace accents, code syntax, copyable examples. Precision over aesthetics.",
    visualIntensity: "medium",
    spacing: "compact",
    motion: "minimal",
    surfaceTreatment: "elevated",
    primaryUseCases: ["api-docs", "developer-portal", "code-reference", "sdk-landing"],
    avoidWhen: ["consumer-facing marketing", "wellness or lifestyle brands"],
    requiredStates: ["default", "hover", "focus-visible", "disabled"],
    checklist: [
      "Code blocks are syntax-highlighted and copyable",
      "Endpoint structure is clear",
      "Dark theme is well-supported",
      "Response examples are accurate",
      "Navigation allows jumping to sections",
    ],
  },

  luxury: {
    id: "luxury",
    label: "Luxury",
    description: "High-end, restrained, cinematic. Every pixel justifies its place. Gold, dark depth, slow dramatic motion. Reserved for premium brands.",
    visualIntensity: "very-high",
    spacing: "spacious",
    motion: "cinematic",
    surfaceTreatment: "cinematic",
    primaryUseCases: ["luxury-real-estate", "high-end-automotive", "premium-jewelry", "bespoke-services"],
    avoidWhen: ["SaaS tools", "dashboards", "budget-conscious products", "high-frequency user interfaces"],
    requiredStates: ["default", "hover", "focus-visible"],
    checklist: [
      "Full-bleed imagery or video",
      "Cinematic entry motion with reduced-motion fallback",
      "Monochromatic palette with one accent",
      "Typography is editorial and large",
      "CTAs are understated but clear",
      "No visual clutter",
    ],
  },
};

export const UI_QUALITY_LEVEL_IDS = Object.keys(UI_QUALITY_LEVELS) as UiQualityLevelId[];

export function getUiQualityLevel(id: string): UiQualityLevel | undefined {
  return UI_QUALITY_LEVELS[id as UiQualityLevelId];
}
