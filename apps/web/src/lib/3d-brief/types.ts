export type ObjectType =
  | "car"
  | "phone"
  | "laptop"
  | "watch"
  | "shoe"
  | "furniture"
  | "bottle"
  | "generic";

export interface ObjectPreset {
  type: ObjectType;
  /** Human-readable display name */
  name: string;
  /** Opening sentence subject, e.g. "classic grand touring sports car" */
  subjectDescription: string;
  proportions: string[];
  details: string[];
}

export interface DesignArchetype {
  /** Short adjective string used inline, e.g. "timeless luxury" */
  shortLabel: string;
  /** Full design-language description for reference/display */
  fullDescription: string;
}

export interface LightingSetup {
  name: string;
  description: string;
}

/**
 * Fully-expanded 3D scene brief produced by expandRequest().
 * All fields are concrete strings ready for prompt assembly.
 */
export interface Brief3D {
  objectType: ObjectType;
  subjectDescription: string;
  designLanguage: DesignArchetype;
  proportions: string[];
  details: string[];
  materials: string[];
  lighting: LightingSetup;
  camera: string;
  quality: string[];
  negatives: string[];
}

/**
 * Final output of build3DPrompt().
 */
export interface Prompt3DResult {
  brief: Brief3D;
  prompt: string;
}
