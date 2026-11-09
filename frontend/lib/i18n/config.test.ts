import { describe, expect, it } from "vitest";

import { resolveLocale } from "@/lib/i18n/config";

describe("resolveLocale", () => {
  it("lets the saved choice outrank the browser", () => {
    expect(resolveLocale("pt", "en-US,en;q=0.9")).toBe("pt");
    expect(resolveLocale("en", "pt-BR,pt;q=0.9")).toBe("en");
  });

  it("ignores a cookie it does not recognise", () => {
    expect(resolveLocale("fr", "en-US")).toBe("en");
  });

  it("opens in English when the browser ranks English first", () => {
    expect(resolveLocale(undefined, "en-US,en;q=0.9,pt;q=0.5")).toBe("en");
    expect(resolveLocale(undefined, "pt;q=0.4, en-GB;q=0.8")).toBe("en");
  });

  it("stays Portuguese for Portuguese and for every other language", () => {
    expect(resolveLocale(undefined, "pt-BR,pt;q=0.9,en;q=0.8")).toBe("pt");
    expect(resolveLocale(undefined, "es-AR,es;q=0.9,en;q=0.5")).toBe("pt");
    expect(resolveLocale(undefined, null)).toBe("pt");
    expect(resolveLocale(undefined, "")).toBe("pt");
  });
});
