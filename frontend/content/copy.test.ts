import { describe, expect, it } from "vitest";

import { copy } from "@/content/copy";

describe("copy", () => {
  it("keeps the two languages the same shape", () => {
    expect(copy.en.faq.items).toHaveLength(copy.pt.faq.items.length);
    expect(copy.en.about.features).toHaveLength(copy.pt.about.features.length);
    expect(copy.en.schedule.days).toHaveLength(copy.pt.schedule.days.length);
    expect(copy.en.stats).toHaveLength(copy.pt.stats.length);
  });

  it("keeps the animated numbers identical, since only the labels are translated", () => {
    const numbers = (stats: typeof copy.pt.stats) =>
      stats.map(({ count, prefix, suffix, accent }) => ({ count, prefix, suffix, accent }));

    expect(numbers(copy.en.stats)).toEqual(numbers(copy.pt.stats));
    expect(copy.en.schedule.days.map((d) => d.count)).toEqual(
      copy.pt.schedule.days.map((d) => d.count),
    );
  });

  it("uses the same {placeholders} in both languages", () => {
    for (const locale of ["pt", "en"] as const) {
      const placeholders = JSON.stringify(copy[locale]).match(/\{\w+\}/g) ?? [];
      expect(new Set(placeholders)).toEqual(
        new Set(JSON.stringify(copy.pt).match(/\{\w+\}/g) ?? []),
      );
    }
  });
});
