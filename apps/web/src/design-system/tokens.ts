// Source of truth for Tailwind CSS v4 custom properties.
// These mirror the values declared in globals.css.
// Use these constants in JS/TS logic — never hardcode raw values.

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const SPACING = {
  pagePaddingX: "px-6",
  pageMaxWidth: "max-w-6xl",
  sectionPaddingY: "py-16 sm:py-24",
  sectionPaddingYSm: "py-10 sm:py-16",
  dashboardSidebarWidth: 256, // px — matches w-64
} as const;

export const TYPOGRAPHY = {
  eyebrow: "text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground",
  h1: "text-4xl font-semibold tracking-tight text-balance sm:text-6xl",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-xl font-semibold",
  h4: "text-base font-semibold",
  body: "text-base leading-7 text-muted-foreground",
  bodyLarge: "text-lg leading-8 text-muted-foreground",
  label: "text-sm font-medium",
  caption: "text-xs text-muted-foreground",
  code: "font-mono text-sm bg-muted px-1.5 py-0.5 rounded",
} as const;

export const ANIMATION = {
  fast: "150ms",
  default: "200ms",
  slow: "300ms",
  verySlow: "600ms",
} as const;

// CSS variable names matching globals.css
export const CSS_VARS = {
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  border: "--border",
  input: "--input",
  ring: "--ring",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  destructive: "--destructive",
  destructiveForeground: "--destructive-foreground",
  success: "--success",
  successForeground: "--success-foreground",
  warning: "--warning",
  warningForeground: "--warning-foreground",
  radius: "--radius",
} as const;

// Available theme identifiers (match data-theme attribute values in globals.css)
export const THEMES = [
  "corporate-classic",
  "premium-saas",
  "luxury-auto",
  "local-business",
  "real-estate",
  "ecommerce-clean",
  "dark-tech-api",
] as const;

export type ThemeId = typeof THEMES[number];

export const THEME_META: Record<ThemeId, { label: string; description: string; dark: boolean; accent: string; bg: string; fg: string; heroFrom: string }> = {
  "corporate-classic": {
    label: "Corporate Classic",
    description: "Professional blue — B2B, portfolio, consultant",
    dark: false,
    accent: "#1e40af",
    bg: "#f8fafc",
    fg: "#0f172a",
    heroFrom: "#1e3a8a",
  },
  "premium-saas": {
    label: "Premium SaaS",
    description: "Violet gradients — SaaS product, pricing, dashboards",
    dark: false,
    accent: "#7c3aed",
    bg: "#ffffff",
    fg: "#0f172a",
    heroFrom: "#4c1d95",
  },
  "luxury-auto": {
    label: "Luxury Auto",
    description: "Dark + red — automotive blog, car showcase",
    dark: true,
    accent: "#ef4444",
    bg: "#09090b",
    fg: "#fafafa",
    heroFrom: "#0d0000",
  },
  "local-business": {
    label: "Local Business",
    description: "Warm + green — restaurant, massage, local services",
    dark: false,
    accent: "#4d7c0f",
    bg: "#fefce8",
    fg: "#292524",
    heroFrom: "#14532d",
  },
  "real-estate": {
    label: "Real Estate",
    description: "Sky blue + gold — property listings, real estate",
    dark: false,
    accent: "#0284c7",
    bg: "#ffffff",
    fg: "#0f172a",
    heroFrom: "#0284c7",
  },
  "ecommerce-clean": {
    label: "E-commerce Clean",
    description: "Orange CTA + trust — products, cart, checkout",
    dark: false,
    accent: "#ea580c",
    bg: "#ffffff",
    fg: "#111827",
    heroFrom: "#1c0f07",
  },
  "dark-tech-api": {
    label: "Dark Tech / API",
    description: "Cyan on dark — developer portal, API docs, metrics",
    dark: true,
    accent: "#22d3ee",
    bg: "#030712",
    fg: "#f9fafb",
    heroFrom: "#050d1f",
  },
};
