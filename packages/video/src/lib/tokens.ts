// Mirror of apps/web/src/design-system/tokens.ts — kept in sync manually.
// The video package is a standalone render tool, so it cannot import from @kv/web.

export const THEME_META = {
  "corporate-classic": {
    label: "Corporate Classic",
    accent: "#1e40af",
    bgFrom: "#1e3a8a",
    bgTo: "#1d4ed8",
    text: "#ffffff",
    dark: true,
  },
  "premium-saas": {
    label: "Premium SaaS",
    accent: "#7c3aed",
    bgFrom: "#4c1d95",
    bgTo: "#6d28d9",
    text: "#ffffff",
    dark: true,
  },
  "luxury-auto": {
    label: "Luxury Auto",
    accent: "#ef4444",
    bgFrom: "#0d0000",
    bgTo: "#1a0000",
    text: "#ffffff",
    dark: true,
  },
  "local-business": {
    label: "Local Business",
    accent: "#4d7c0f",
    bgFrom: "#14532d",
    bgTo: "#166534",
    text: "#ffffff",
    dark: true,
  },
  "real-estate": {
    label: "Real Estate",
    accent: "#0284c7",
    bgFrom: "#0284c7",
    bgTo: "#0369a1",
    text: "#ffffff",
    dark: true,
  },
  "ecommerce-clean": {
    label: "E-commerce Clean",
    accent: "#ea580c",
    bgFrom: "#1c0f07",
    bgTo: "#2d1200",
    text: "#ffffff",
    dark: true,
  },
  "dark-tech-api": {
    label: "Dark Tech / API",
    accent: "#22d3ee",
    bgFrom: "#050d1f",
    bgTo: "#030712",
    text: "#f9fafb",
    dark: true,
  },
} as const;

export type ThemeId = keyof typeof THEME_META;
