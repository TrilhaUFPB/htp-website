import { describe, expect, it } from "vitest";

import { privacyConfig } from "@/content/privacy";

import { buildWaitlistConsentRecord } from "./service";

describe("buildWaitlistConsentRecord", () => {
  it("records consent timestamp and version when accepted", () => {
    const now = new Date("2026-07-27T12:00:00.000Z");

    const record = buildWaitlistConsentRecord(true, now);

    expect(record.consentAt).toBe(now);
    expect(record.consentVersion).toBe(privacyConfig.waitlistConsentVersion);
  });

  it("rejects signup without consent", () => {
    expect(() => buildWaitlistConsentRecord(false)).toThrow("Consent is required.");
  });
});
