import type { ComponentCapability, ComponentDomain } from "./types";

export interface ComponentFitResult {
  /** Whether the component is suitable for the given domain. */
  fits: boolean;
  /** Warnings about potential misuse or required setup. */
  warnings: string[];
  /** Hard blockers that make the component unsuitable. */
  blockers: string[];
}

/**
 * Validates whether a component is appropriate for a given domain and use context.
 * Returns a structured result with warnings and blockers.
 */
export function validateComponentFit(
  cap: ComponentCapability,
  domain: ComponentDomain
): ComponentFitResult {
  const warnings: string[] = [];
  const blockers: string[] = [];

  // Hard blocker: demo-only components
  if (cap.maturity === "demo-only") {
    blockers.push(
      `${cap.name} is demo-only and contains hard-coded data. It is not suitable for client projects without adaptation.`
    );
  }

  // Hard blocker: experimental
  if (cap.maturity === "experimental") {
    blockers.push(
      `${cap.name} is experimental. API and behavior may change. Use only if you accept breaking changes.`
    );
  }

  // Domain mismatch warning
  if (!cap.domains.includes(domain)) {
    warnings.push(
      `${cap.name} is designed for [${cap.domains.join(", ")}] domains, not "${domain}". Adaptation may be needed.`
    );
  }

  // Surface known limitations as warnings
  for (const limitation of cap.limitations) {
    warnings.push(limitation);
  }

  return {
    fits: blockers.length === 0,
    warnings,
    blockers,
  };
}

/**
 * Returns all components from a list that are valid for a given domain.
 * Excludes demo-only and experimental by default.
 */
export function filterFitComponents(
  components: ComponentCapability[],
  domain: ComponentDomain
): ComponentCapability[] {
  return components.filter((cap) => {
    const result = validateComponentFit(cap, domain);
    return result.fits && cap.domains.includes(domain);
  });
}
