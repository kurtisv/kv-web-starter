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
  dashboardSidebarWidth: 256, // px — matches w-64
} as const;

export const TYPOGRAPHY = {
  eyebrow: "text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground",
  h1: "text-4xl font-semibold tracking-normal text-balance sm:text-6xl",
  h2: "text-3xl font-semibold",
  h3: "text-xl font-semibold",
  body: "text-base leading-7 text-muted-foreground",
  bodyLarge: "text-lg leading-8 text-muted-foreground",
  label: "text-sm font-medium",
  caption: "text-xs text-muted-foreground",
} as const;

export const ANIMATION = {
  fast: "150ms",
  default: "200ms",
  slow: "300ms",
} as const;

// CSS variable names matching globals.css
export const CSS_VARS = {
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  border: "--border",
  input: "--input",
  ring: "--ring",
  destructive: "--destructive",
} as const;
