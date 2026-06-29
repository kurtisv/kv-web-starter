import { describe, it, expect } from "vitest";

import { build3DPrompt } from "./build-3d-prompt";
import { detectObjectType } from "./expand-3d-request";
import { UNIVERSAL_NEGATIVES } from "./negative-prompts";

// ── detectObjectType ──────────────────────────────────────────────────────────
describe("detectObjectType", () => {
  it('detects "car" from French input', () => {
    expect(detectObjectType("Donne-moi une voiture en 3D")).toBe("car");
  });

  it('detects "car" from English input', () => {
    expect(detectObjectType("give me a car")).toBe("car");
  });

  it('detects "phone" from French input', () => {
    expect(detectObjectType("téléphone premium en 3D")).toBe("phone");
    expect(detectObjectType("je veux un telephone")).toBe("phone");
  });

  it('detects "phone" from English input', () => {
    expect(detectObjectType("flagship smartphone render")).toBe("phone");
  });

  it('detects "laptop" from English', () => {
    expect(detectObjectType("show me a laptop")).toBe("laptop");
  });

  it('detects "laptop" from French', () => {
    expect(detectObjectType("ordinateur portable aluminium")).toBe("laptop");
  });

  it('detects "watch" from French', () => {
    expect(detectObjectType("une montre de luxe en 3D")).toBe("watch");
  });

  it('detects "shoe" from French', () => {
    expect(detectObjectType("une chaussure sneaker")).toBe("shoe");
  });

  it('detects "furniture" from French', () => {
    expect(detectObjectType("un canapé haut de gamme")).toBe("furniture");
  });

  it('detects "bottle" from French', () => {
    expect(detectObjectType("flacon de parfum luxe")).toBe("bottle");
  });

  it('returns "generic" for unrecognised input', () => {
    expect(detectObjectType("donne-moi un objet stylé")).toBe("generic");
    expect(detectObjectType("something random")).toBe("generic");
    expect(detectObjectType("make me a 3D thing")).toBe("generic");
    expect(detectObjectType("")).toBe("generic");
  });

  it("is case-insensitive", () => {
    expect(detectObjectType("VOITURE SPORT")).toBe("car");
    expect(detectObjectType("iPhone 3D")).toBe("phone");
  });

  it("handles accented characters without normalisation in input", () => {
    expect(detectObjectType("Véhicule électrique")).toBe("car");
    expect(detectObjectType("téléphone")).toBe("phone");
  });
});

// ── build3DPrompt — subject detection ─────────────────────────────────────────
describe("build3DPrompt — subject line", () => {
  it('uses "classic grand touring sports car" for car inputs', () => {
    const { prompt } = build3DPrompt("voiture 3D");
    expect(prompt).toContain("classic grand touring sports car");
  });

  it('uses "flagship premium smartphone" for phone inputs', () => {
    const { prompt } = build3DPrompt("téléphone 3D");
    expect(prompt).toContain("flagship premium smartphone");
  });

  it('uses "ultrathin aluminum luxury laptop" for laptop inputs', () => {
    const { prompt } = build3DPrompt("laptop ultra-fin");
    expect(prompt).toContain("ultrathin aluminum luxury laptop");
  });

  it('uses "luxury mechanical smartwatch" for watch inputs', () => {
    const { prompt } = build3DPrompt("montre de luxe");
    expect(prompt).toContain("luxury mechanical smartwatch");
  });

  it('uses "premium sneaker product render" for shoe inputs', () => {
    const { prompt } = build3DPrompt("sneaker premium");
    expect(prompt).toContain("premium sneaker product render");
  });
});

// ── build3DPrompt — completeness: every prompt has all required sections ───────
describe("build3DPrompt — completeness", () => {
  const INPUTS = [
    "voiture sportive",
    "téléphone",
    "laptop",
    "montre",
    "chaussure",
    "canapé",
    "parfum",
    "un objet quelconque",         // generic fallback
    "3D",                          // vague — generic
  ];

  for (const input of INPUTS) {
    it(`"${input}" includes materials, lighting, camera, and negative constraints`, () => {
      const { prompt, brief } = build3DPrompt(input);

      // Must include at least one material term
      expect(prompt.toLowerCase()).toMatch(/use /i);
      // Must include a lighting setup description
      expect(prompt.toLowerCase()).toMatch(/render it in a /i);
      // Must include a camera description
      expect(prompt.toLowerCase()).toMatch(/camera angle:/i);
      // Must include negative constraint sentence
      expect(prompt.toLowerCase()).toMatch(/do not make it/i);

      // Brief must have populated arrays
      expect(brief.materials.length).toBeGreaterThan(0);
      expect(brief.negatives.length).toBeGreaterThan(0);
      expect(brief.proportions.length).toBeGreaterThan(0);
      expect(brief.quality.length).toBeGreaterThan(0);
    });
  }
});

// ── Anti-cartoon constraints ───────────────────────────────────────────────────
describe("anti-cartoon constraints", () => {
  it("every output prompt contains the word 'cartoon' in the Do-not sentence", () => {
    for (const input of ["voiture", "téléphone", "laptop", "objet"]) {
      const { prompt } = build3DPrompt(input);
      // The negative sentence must include "cartoon"
      const doNotPart = prompt.split("Do not make it")[1] ?? "";
      expect(doNotPart).toContain("cartoon");
    }
  });

  it("universal negatives are part of every brief regardless of object type", () => {
    const inputs = ["voiture", "phone", "meuble", "random thing"];
    for (const input of inputs) {
      const { brief } = build3DPrompt(input);
      for (const neg of ["cartoon", "toy-like", "low-poly", "childish"]) {
        expect(brief.negatives).toContain(neg);
      }
    }
  });

  it("UNIVERSAL_NEGATIVES exports a non-empty array including core constraints", () => {
    expect(UNIVERSAL_NEGATIVES).toContain("cartoon");
    expect(UNIVERSAL_NEGATIVES).toContain("low-poly");
    expect(UNIVERSAL_NEGATIVES).toContain("flat shaded");
    expect(UNIVERSAL_NEGATIVES).toContain("toy-like");
    expect(UNIVERSAL_NEGATIVES.length).toBeGreaterThan(5);
  });
});

// ── build3DPrompt — brief structure ───────────────────────────────────────────
describe("build3DPrompt — brief structure", () => {
  it("brief includes objectType, designLanguage, lighting name, camera", () => {
    const { brief } = build3DPrompt("Donne-moi une voiture en 3D");
    expect(brief.objectType).toBe("car");
    expect(brief.designLanguage.shortLabel).toBeTruthy();
    expect(brief.designLanguage.fullDescription).toBeTruthy();
    expect(brief.lighting.name).toBeTruthy();
    expect(brief.lighting.description).toBeTruthy();
    expect(brief.camera).toBeTruthy();
  });

  it("returns both brief and prompt in result", () => {
    const result = build3DPrompt("phone premium");
    expect(result.brief).toBeDefined();
    expect(result.prompt).toBeDefined();
    expect(typeof result.prompt).toBe("string");
    expect(result.prompt.length).toBeGreaterThan(50);
  });
});
