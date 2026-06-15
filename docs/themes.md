# Themes

Seven visual themes, each targeting a different project category.

| ID                  | Label             | Mode  | Primary Accent | Best For                      |
|---------------------|-------------------|-------|----------------|-------------------------------|
| `corporate-classic` | Corporate Classic | Light | Blue #1e40af   | Portfolio, B2B, consultant    |
| `premium-saas`      | Premium SaaS      | Light | Violet #7c3aed | SaaS, pricing, dashboards     |
| `luxury-auto`       | Luxury Auto       | Dark  | Red #ef4444    | Auto blog, car showcase       |
| `local-business`    | Local Business    | Light | Green #4d7c0f  | Restaurant, massage, local    |
| `real-estate`       | Real Estate       | Light | Sky #0284c7    | Property listings             |
| `ecommerce-clean`   | E-commerce Clean  | Light | Orange #ea580c | Shop, products, checkout      |
| `dark-tech-api`     | Dark Tech / API   | Dark  | Cyan #22d3ee   | Developer portal, API docs    |

## How to Use

Apply at page level via `data-theme` attribute:
```tsx
export default function MyPage() {
  return (
    <div data-theme="luxury-auto">
      ...
    </div>
  );
}
```

Or set globally in `layout.tsx` via `<html data-theme={theme}>`.

## Creating a New Theme

1. Add CSS variable overrides in `globals.css`:
```css
[data-theme="my-theme"] {
  --background: #...;
  --primary: #...;
  /* ... all variables */
}
```
2. Add to `THEMES` array in `design-system/tokens.ts`
3. Add metadata to `THEME_META`
4. Add a `ProjectPreset` in `config/project-presets.ts` if it corresponds to a project type

## --radius

Each theme sets `--radius` to control border-radius globally:
- `0.125rem` (2px) — sharp / luxury
- `0.25rem` (4px) — default / professional
- `0.375rem` (6px) — standard
- `0.5rem` (8px) — soft / welcoming
- `0.75rem` (12px) — rounded / SaaS
