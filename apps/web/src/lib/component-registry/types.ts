/** Component Capability Registry — core types.
 *
 * Philosophy: Describe first. Recommend second. Generate last.
 * No external dependencies. No AI calls. Pure data + scoring.
 */

/** Business domain a component is designed for. */
export type ComponentDomain =
  | "general"
  | "academy"
  | "saas"
  | "ecommerce"
  | "real-estate"
  | "auto-blog"
  | "booking"
  | "local-business"
  | "dashboard"
  | "api"
  | "portfolio";

/** Structural role of the component. */
export type ComponentCategory =
  | "section"
  | "card"
  | "filter"
  | "form"
  | "table"
  | "metric"
  | "navigation"
  | "layout"
  | "badge"
  | "button"
  | "media"
  | "chart"
  | "timeline"
  | "dialog"
  | "drawer";

/** Interactive or data states the component can represent. */
export type ComponentState =
  | "default"
  | "loading"
  | "empty"
  | "error"
  | "disabled"
  | "readonly"
  | "selected"
  | "expanded";

/** Readiness level. */
export type ComponentMaturity =
  | "stable"
  | "beta"
  | "experimental"
  | "demo-only";

/** Prescriptive action level for agent and report workflows. */
export type ComponentRecommendationLevel =
  | "recommended"
  | "acceptable"
  | "avoid"
  | "gap";

/** A concrete usage example for the registry. */
export interface ComponentExample {
  /** One-line label for this example. */
  label: string;
  /** How to import. */
  importStatement: string;
  /** Minimal JSX usage snippet. */
  usage: string;
}

/** Full capability descriptor for a single component. */
export interface ComponentCapability {
  /** Unique, kebab-case ID derived from the exported function name. */
  id: string;
  /** Display name (matches the exported function name). */
  name: string;
  /** Relative import path from `@/`. */
  importPath: string;
  /** Structural role. */
  category: ComponentCategory;
  /** Business domains this component is designed for. */
  domains: ComponentDomain[];
  /** One-sentence description of what the component renders. */
  description: string;
  /** Typical use cases (1-4 bullet phrases). */
  useCases: string[];
  /** IDs of `ComponentVariable` presets that drive this component (if any). */
  compatibleVariables: string[];
  /** States the component can visually represent. */
  supportedStates: ComponentState[];
  /** Readiness level. */
  maturity: ComponentMaturity;
  /** Known limitations or usage caveats (empty array = none). */
  limitations: string[];
  /** Free-form search tags. */
  tags: string[];
  /** Optional usage examples. */
  examples?: ComponentExample[];
}

/** Input to the recommendation engine. */
export interface ComponentRecommendationInput {
  /** Target domain (used for domain-match scoring). */
  domain?: ComponentDomain;
  /** Preferred category (used for category-match scoring). */
  category?: ComponentCategory;
  /** Free-text description of what you need. */
  query?: string;
  /** Maturity gates — exclude components below this level. */
  minMaturity?: ComponentMaturity;
  /** Only include components compatible with these variable IDs. */
  requireVariables?: string[];
  /** Maximum number of results. Default: 5. */
  limit?: number;
}

/** A single recommendation result. */
export interface ComponentRecommendation {
  component: ComponentCapability;
  /** Higher is better. */
  score: number;
  /** Human-readable reasons why this component was recommended. */
  reasons: string[];
}
