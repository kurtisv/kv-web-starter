import type {
  ComponentCapability,
  ComponentMaturity,
  ComponentRecommendation,
  ComponentRecommendationInput,
} from "./types";
import { COMPONENT_REGISTRY } from "./component-registry";

const MATURITY_RANK: Record<ComponentMaturity, number> = {
  stable: 3,
  beta: 2,
  experimental: 1,
  "demo-only": 0,
};

/**
 * Score a single component against the input criteria.
 * Returns a numeric score and a list of human-readable reasons.
 * Higher score = better match.
 */
function scoreComponent(
  cap: ComponentCapability,
  input: ComponentRecommendationInput
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  let primarySignals = 0;

  // Domain match
  if (input.domain && cap.domains.includes(input.domain)) {
    score += 30;
    primarySignals++;
    reasons.push(`Designed for the "${input.domain}" domain`);
  }

  // Category match
  if (input.category && cap.category === input.category) {
    score += 25;
    primarySignals++;
    reasons.push(`Matches category "${input.category}"`);
  }

  // Variable compatibility
  if (input.requireVariables && input.requireVariables.length > 0) {
    const matched = input.requireVariables.filter((v) =>
      cap.compatibleVariables.includes(v)
    );
    if (matched.length > 0) {
      score += matched.length * 10;
      primarySignals++;
      reasons.push(`Compatible with variable preset(s): ${matched.join(", ")}`);
    }
  }

  // Query keyword matching against name, description, tags, useCases
  if (input.query) {
    const q = input.query.toLowerCase();
    const searchable = [
      cap.name.toLowerCase(),
      cap.description.toLowerCase(),
      ...cap.tags.map((t) => t.toLowerCase()),
      ...cap.useCases.map((u) => u.toLowerCase()),
    ].join(" ");

    const words = q.split(/\s+/).filter(Boolean);
    const matchedWords = words.filter((w) => searchable.includes(w));
    if (matchedWords.length > 0) {
      const kwScore = matchedWords.length * 8;
      score += kwScore;
      primarySignals++;
      reasons.push(`Keyword match: ${matchedWords.join(", ")}`);
    }
  }

  // No input criteria specified at all — treat every component as a match
  const hasAnyCriteria = !!(input.domain || input.category || input.query ||
    (input.requireVariables && input.requireVariables.length > 0));

  if (!hasAnyCriteria) {
    primarySignals++;
  }

  // Maturity bonus and penalties — only applied when at least one primary signal matched
  if (primarySignals > 0) {
    const maturityRank = MATURITY_RANK[cap.maturity];
    score += maturityRank * 5;
    if (cap.maturity === "stable") reasons.push("Stable component");

    if (cap.maturity === "demo-only") {
      score -= 20;
      reasons.push("Note: demo-only component — contains hard-coded data");
    }
  }

  return { score, reasons };
}

/**
 * Returns the top-N components from the registry that best match the input criteria.
 * Deterministic — no AI, no external calls.
 */
export function recommendComponents(
  input: ComponentRecommendationInput,
  registry: ComponentCapability[] = COMPONENT_REGISTRY
): ComponentRecommendation[] {
  const minRank = input.minMaturity
    ? MATURITY_RANK[input.minMaturity]
    : MATURITY_RANK["beta"];

  const limit = input.limit ?? 5;

  const scored = registry
    .filter((cap) => MATURITY_RANK[cap.maturity] >= minRank)
    .map((cap) => {
      const { score, reasons } = scoreComponent(cap, input);
      return { component: cap, score, reasons };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}
