import { readFileSync } from "node:fs";
import { join } from "node:path";

import posthog from "posthog-js";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TRACKED_SECTIONS, track, waitlistFailureReason } from "@/lib/analytics/events";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("track", () => {
  it("forwards the event name and properties to PostHog", () => {
    const capture = vi.spyOn(posthog, "capture").mockImplementation(() => undefined);

    track("faq_opened", { question: "Quanto custa?", position: 3 });

    expect(capture).toHaveBeenCalledWith("faq_opened", {
      question: "Quanto custa?",
      position: 3,
    });
  });
});

describe("waitlistFailureReason", () => {
  it("reads a missing status as a network failure", () => {
    expect(waitlistFailureReason(undefined)).toBe("network");
  });

  it("splits client rejections from server errors", () => {
    expect(waitlistFailureReason(400)).toBe("validation");
    expect(waitlistFailureReason(429)).toBe("validation");
    expect(waitlistFailureReason(500)).toBe("server");
    expect(waitlistFailureReason(503)).toBe("server");
  });
});

describe("TRACKED_SECTIONS", () => {
  const sources = [
    "app/(prod)/page.tsx",
    "components/faq.tsx",
    "components/cta.tsx",
  ].map((path) => readFileSync(join(__dirname, "..", "..", path), "utf8"));

  it("names only ids that exist on the landing page", () => {
    for (const section of TRACKED_SECTIONS) {
      const found = sources.some((source) => source.includes(`id="${section}"`));
      expect(found, `missing id="${section}"`).toBe(true);
    }
  });

  it("has no duplicates", () => {
    expect(new Set(TRACKED_SECTIONS).size).toBe(TRACKED_SECTIONS.length);
  });
});
