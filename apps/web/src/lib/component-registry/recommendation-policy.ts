import { COMPONENT_REGISTRY } from "./component-registry";
import type {
  ComponentCapability,
  ComponentCategory,
  ComponentDomain,
  ComponentRecommendationLevel,
} from "./types";

export interface ComponentRecommendationPolicyInput {
  domain: ComponentDomain;
  clientProject?: boolean;
  allowExperimental?: boolean;
}

export interface ComponentRecommendationReport {
  domain: ComponentDomain;
  recommended: ComponentCapability[];
  acceptable: ComponentCapability[];
  avoid: Array<{ component: ComponentCapability; reason: string }>;
  gaps: string[];
  warnings: string[];
  componentsWithVariables: ComponentCapability[];
  demoOnly: ComponentCapability[];
  nextAction: string;
}

const DOMAIN_REQUIRED_CATEGORIES: Record<ComponentDomain, ComponentCategory[]> = {
  general: ["section", "card", "form"],
  academy: ["section", "filter", "card", "metric"],
  saas: ["section", "metric", "card"],
  ecommerce: ["section", "filter", "card", "drawer"],
  booking: ["form", "card", "section"],
  "real-estate": ["filter", "card", "section"],
  dashboard: ["layout", "metric", "table", "filter"],
  api: ["card", "metric", "section"],
  portfolio: ["section", "card", "form"],
  "local-business": ["section", "form", "card"],
  "auto-blog": ["section", "filter", "card", "media"],
};

const DOMAIN_KNOWN_GAPS: Partial<Record<ComponentDomain, string[]>> = {
  academy: [
    "CourseCard stable",
    "LessonList",
    "CertificateCard",
    "LearningProgressCard",
    "InstructorCard",
  ],
};

export function getComponentRecommendationLevel(
  component: ComponentCapability,
  input: ComponentRecommendationPolicyInput,
): ComponentRecommendationLevel {
  if (component.maturity === "experimental" && !input.allowExperimental) {
    return "avoid";
  }

  if (component.maturity === "demo-only" && input.clientProject !== false) {
    return "avoid";
  }

  if (!component.domains.includes(input.domain)) {
    return "acceptable";
  }

  if (component.maturity === "stable") {
    return "recommended";
  }

  if (component.maturity === "beta") {
    return "acceptable";
  }

  return "avoid";
}

export function getRecommendedComponentsForDomain(
  domain: ComponentDomain,
  registry: ComponentCapability[] = COMPONENT_REGISTRY,
): ComponentCapability[] {
  return registry
    .filter((component) =>
      getComponentRecommendationLevel(component, { domain }) === "recommended",
    )
    .sort(byName);
}

export function getAvoidedComponentsForDomain(
  domain: ComponentDomain,
  registry: ComponentCapability[] = COMPONENT_REGISTRY,
): Array<{ component: ComponentCapability; reason: string }> {
  return registry
    .filter((component) =>
      getComponentRecommendationLevel(component, { domain }) === "avoid",
    )
    .map((component) => ({
      component,
      reason:
        component.maturity === "demo-only"
          ? "demo-only components require adaptation before client use"
          : "experimental components are not agent-safe defaults",
    }))
    .sort((a, b) => byName(a.component, b.component));
}

export function getGapsForDomain(
  domain: ComponentDomain,
  registry: ComponentCapability[] = COMPONENT_REGISTRY,
): string[] {
  const recommended = getRecommendedComponentsForDomain(domain, registry);
  const gaps = [...(DOMAIN_KNOWN_GAPS[domain] ?? [])];

  for (const category of DOMAIN_REQUIRED_CATEGORIES[domain]) {
    const hasCategory = recommended.some((component) => component.category === category);
    if (!hasCategory) {
      gaps.push(`No recommended ${category} component for ${domain}`);
    }
  }

  return Array.from(new Set(gaps)).sort();
}

export function generateComponentRecommendationReport(
  domain: ComponentDomain,
  registry: ComponentCapability[] = COMPONENT_REGISTRY,
): ComponentRecommendationReport {
  const recommended = getRecommendedComponentsForDomain(domain, registry);
  const avoid = getAvoidedComponentsForDomain(domain, registry);
  const acceptable = registry
    .filter((component) =>
      getComponentRecommendationLevel(component, { domain }) === "acceptable",
    )
    .sort(byName);
  const gaps = getGapsForDomain(domain, registry);
  const componentsWithVariables = registry
    .filter((component) => component.compatibleVariables.length > 0)
    .filter((component) => component.domains.includes(domain))
    .sort(byName);
  const demoOnly = registry
    .filter((component) => component.maturity === "demo-only")
    .sort(byName);

  return {
    domain,
    recommended,
    acceptable,
    avoid,
    gaps,
    warnings: buildWarnings(domain, recommended, gaps),
    componentsWithVariables,
    demoOnly,
    nextAction:
      gaps.length > 0
        ? "Document gaps before creating new components."
        : "Use recommended components before adapting acceptable components.",
  };
}

function buildWarnings(
  domain: ComponentDomain,
  recommended: ComponentCapability[],
  gaps: string[],
): string[] {
  const warnings: string[] = [];
  if (recommended.length === 0) {
    warnings.push(`No recommended components found for ${domain}.`);
  }
  if (gaps.length > 0) {
    warnings.push(`${gaps.length} gap(s) must be reviewed before custom work.`);
  }
  return warnings;
}

function byName(a: ComponentCapability, b: ComponentCapability): number {
  return a.name.localeCompare(b.name);
}
