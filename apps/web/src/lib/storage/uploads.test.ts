import { describe, expect, it } from "vitest";

import { sanitizeUploadName } from "./uploads";

describe("sanitizeUploadName", () => {
  it("keeps safe names readable", () => {
    expect(sanitizeUploadName("Brand Photo-01.PNG")).toBe("Brand-Photo-01.png");
  });

  it("removes path and unsafe characters", () => {
    expect(sanitizeUploadName("../bad folder/<script>.pdf")).toBe("script.pdf");
  });

  it("falls back when the basename is empty", () => {
    expect(sanitizeUploadName("///...")).toBe("upload");
  });

  it("normalizes hidden file names", () => {
    expect(sanitizeUploadName("///.env")).toBe("env");
  });
});
