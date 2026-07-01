/**
 * Frontend Experience Score
 *
 * A lightweight scoring system for evaluating the UX quality of a page or component.
 * Scores drive prioritization and communicate the gap between current and target state.
 */

export interface FrontendExperienceScore {
  /** Visual hierarchy: is the most important content immediately obvious? (0-10) */
  visualHierarchy: number;
  /** UX clarity: does the user always know what to do next? (0-10) */
  uxClarity: number;
  /** Accessibility: keyboard, ARIA, contrast, reduced-motion (0-10) */
  accessibility: number;
  /** Responsive: mobile 390px no overflow, touch targets (0-10) */
  responsive: number;
  /** Feedback: are user actions acknowledged visually? (0-10) */
  feedback: number;
  /** States: loading, empty, error, success implemented where relevant (0-10) */
  states: number;
  /** Conversion: CTA clarity, trust signals, friction level (0-10) */
  conversion: number;
  /** Consistency: tokens, spacing, typography, color (0-10) */
  consistency: number;
  /** Performance perception: skeleton usage, no layout shift (0-10) */
  performancePerception: number;
  /** Agent reusability: can an agent reuse this without adaptation? (0-10) */
  agentReusability: number;
}

export type FrontendExperienceGrade = "A+" | "A" | "B" | "C" | "D" | "F";

export interface FrontendExperienceResult {
  score: FrontendExperienceScore;
  average: number;
  grade: FrontendExperienceGrade;
  recommendations: string[];
}

const SCORE_KEYS = [
  "visualHierarchy",
  "uxClarity",
  "accessibility",
  "responsive",
  "feedback",
  "states",
  "conversion",
  "consistency",
  "performancePerception",
  "agentReusability",
] as const satisfies readonly (keyof FrontendExperienceScore)[];

export function calculateFrontendExperienceScore(score: FrontendExperienceScore): number {
  const total = SCORE_KEYS.reduce((sum, key) => sum + score[key], 0);
  return Math.round((total / SCORE_KEYS.length) * 10) / 10;
}

export function getFrontendExperienceGrade(average: number): FrontendExperienceGrade {
  if (average >= 9.5) return "A+";
  if (average >= 9.0) return "A";
  if (average >= 8.0) return "B";
  if (average >= 7.0) return "C";
  if (average >= 6.0) return "D";
  return "F";
}

const THRESHOLDS: { key: keyof FrontendExperienceScore; min: number; message: string }[] = [
  { key: "visualHierarchy",       min: 7, message: "Visual hierarchy is weak — establish a clearer content priority order." },
  { key: "uxClarity",             min: 7, message: "UX clarity is low — ensure the user always knows what to do next." },
  { key: "accessibility",         min: 7, message: "Accessibility needs work — check focus-visible, ARIA roles and color contrast." },
  { key: "responsive",            min: 7, message: "Responsive quality is low — test at 390px and fix overflow and touch targets." },
  { key: "feedback",              min: 7, message: "User feedback is missing — acknowledge every action with a visible signal." },
  { key: "states",                min: 7, message: "States are incomplete — implement loading, empty and error states where applicable." },
  { key: "conversion",            min: 7, message: "Conversion readiness is low — clarify the primary CTA and add a trust signal." },
  { key: "consistency",           min: 7, message: "Design consistency is low — use theme tokens and standardize spacing and radius." },
  { key: "performancePerception", min: 7, message: "Performance perception is poor — add skeleton states and eliminate layout shift." },
  { key: "agentReusability",      min: 7, message: "Agent reusability is low — expose className, use theme tokens, document props." },
];

export function getFrontendExperienceRecommendations(score: FrontendExperienceScore): string[] {
  return THRESHOLDS.filter(({ key, min }) => score[key] < min).map(({ message }) => message);
}

export function evaluateFrontendExperience(score: FrontendExperienceScore): FrontendExperienceResult {
  const average = calculateFrontendExperienceScore(score);
  return {
    score,
    average,
    grade: getFrontendExperienceGrade(average),
    recommendations: getFrontendExperienceRecommendations(score),
  };
}
