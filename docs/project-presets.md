# Project Presets

A preset bundles all configuration for a given project type: theme, navigation, CTA, modules, copy.

## Available Project Types

| Type             | Theme               | Modules                         |
|------------------|---------------------|---------------------------------|
| `portfolio`      | corporate-classic   | dashboard                       |
| `saas`           | premium-saas        | billing, dashboard, api         |
| `booking`        | local-business      | booking, billing                |
| `api`            | dark-tech-api       | api, billing, dashboard         |
| `real-estate`    | real-estate         | booking, billing                |
| `local-business` | local-business      | booking, billing                |
| `auto-blog`      | luxury-auto         | billing                         |
| `ecommerce`      | ecommerce-clean     | ecommerce, billing              |
| `dashboard`      | premium-saas        | billing, api, dashboard         |

## Using a Preset

### Via env var (runtime)

Set in `.env`:
```
NEXT_PUBLIC_PROJECT_TYPE=saas
```

Read in components:
```ts
import { getProjectPreset } from "@/config/project-presets";
const preset = getProjectPreset();
// null if env var not set — falls back to siteConfig
```

### Via direct import (build-time)

```ts
import { PROJECT_PRESETS } from "@/config/project-presets";
const saasPreset = PROJECT_PRESETS.saas;
```

## Demo Pages

Each preset has a matching demo page at `/demo/<type>`.
These pages showcase the theme and a realistic product layout.

## Customizing a Preset

Edit `apps/web/src/config/project-presets.ts` directly.
All fields are typed (`ProjectPreset`). The shape is stable — you can safely extend it with
additional fields (e.g. `logo`, `heroImage`, `socialLinks`) without breaking existing consumers.
