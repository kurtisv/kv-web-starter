import type { Brief3D, Prompt3DResult } from "./types";
import { expandRequest } from "./expand-3d-request";

/**
 * Assembles a Brief3D into the final prompt string.
 *
 * Template mirrors the example in the Creative Director spec:
 *   1. Subject sentence
 *   2. Design language + proportions + details
 *   3. Materials
 *   4. Lighting
 *   5. Camera
 *   6. Negative constraints
 */
export function buildPromptFromBrief(brief: Brief3D): string {
  const {
    objectType,
    subjectDescription,
    designLanguage,
    proportions,
    details,
    materials,
    lighting,
    camera,
    negatives,
  } = brief;

  // Combine proportions + details into a single comma-separated list
  const featureList = [...proportions, ...details].join(", ");

  // Limit negatives to the most impactful ones for a concise sentence
  const negativeList = negatives
    .filter(Boolean)
    .slice(0, 9)
    .join(", ");

  return [
    `Create a premium realistic 3D render of a ${subjectDescription}.`,
    `The ${objectType} should have ${designLanguage.shortLabel} proportions: ${featureList}.`,
    `Use ${materials.join(", ")}.`,
    `Render it in a ${lighting.description}.`,
    `Camera angle: ${camera}.`,
    `Do not make it ${negativeList}.`,
  ].join(" ");
}

/**
 * Main entry point for the 3D Creative Director.
 *
 * Takes a short free-form request (e.g. "voiture en 3D") and returns
 * both the structured Brief3D and the final assembled prompt string.
 *
 * No external API calls — pure synchronous transformation.
 */
export function build3DPrompt(input: string): Prompt3DResult {
  const brief = expandRequest(input);
  const prompt = buildPromptFromBrief(brief);
  return { brief, prompt };
}
