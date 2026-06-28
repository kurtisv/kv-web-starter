import { describe, expect, it } from "vitest";

import { defaultLocale, getLocaleOrDefault, isLocale, localizePath } from "./config";
import { getMessages } from "./messages";

describe("i18n config", () => {
  it("validates supported locales", () => {
    expect(defaultLocale).toBe("fr");
    expect(isLocale("fr")).toBe(true);
    expect(isLocale("es")).toBe(false);
    expect(getLocaleOrDefault("bad")).toBe("fr");
  });

  it("localizes paths while keeping default locale clean", () => {
    expect(localizePath("/pricing", "fr")).toBe("/pricing");
    expect(localizePath("/pricing", "en")).toBe("/en/pricing");
    expect(localizePath("/", "en")).toBe("/en");
  });

  it("loads messages by locale", () => {
    expect(getMessages("fr").nav.pricing).toBe("Tarifs");
    expect(getMessages("en").nav.pricing).toBe("Pricing");
  });
});
