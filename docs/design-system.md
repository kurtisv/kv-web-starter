# Design System

kv-web-starter uses a CSS variable-based design system compatible with Tailwind v4.

## Architecture

```
apps/web/src/
  design-system/
    tokens.ts          -- JS constants (BREAKPOINTS, SPACING, TYPOGRAPHY, THEMES, THEME_META)
  app/
    globals.css        -- CSS variable definitions + @theme inline + 7 theme data-attributes
  components/
    ui/                -- Primitives (Button, Card, Badge, EmptyState, LoadingState, ThemePreviewCard)
    sections/          -- Page section blocks (HeroSection, FeatureGrid, PricingSection...)
    dashboard-ui/      -- Dashboard components (DashboardShell, MetricCard, ActivityFeed...)
    layout/            -- Layout helpers (SectionHeader, PageContainer)
```

## CSS Variable Layer

All colors flow through CSS variables defined in `:root` in `globals.css`:
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--border`, `--input`, `--ring`
- `--destructive`, `--success`, `--warning` (+ foreground variants)
- `--accent`, `--accent-foreground`
- `--radius`

Never use raw hex values in components. Always use Tailwind color utilities backed by these variables:
`text-primary`, `bg-muted`, `border-border`, etc.

## Applying a Theme

Add `data-theme="<theme-id>"` to the root element of any page or section:

```tsx
<div data-theme="premium-saas">
  <YourPage />
</div>
```

Available themes: `corporate-classic`, `premium-saas`, `luxury-auto`, `local-business`,
`real-estate`, `ecommerce-clean`, `dark-tech-api`.

Full metadata in `THEME_META` from `@/design-system/tokens`.

## Typography Scale

Use `TYPOGRAPHY` constants from `tokens.ts` for consistent text styles:
```tsx
import { TYPOGRAPHY } from "@/design-system/tokens";
<h1 className={TYPOGRAPHY.h1}>...</h1>
```

## Rules

1. Never hardcode colors in components (`#fff`, `text-green-500`, etc.)
2. Use CSS variable utilities: `text-primary`, `bg-muted`, `border-border`
3. For JS logic needing color values, read the CSS var at runtime or use `THEME_META[themeId].accent`
4. Keep `tokens.ts` in sync with `globals.css`
