import { describe, expect, it } from "vitest";

import {
  WAITLIST_EMAIL_MAX_LENGTH,
  isHoneypotTriggered,
  normalizeWaitlistEmail,
  parseWaitlistRequest,
} from "./schema";

describe("normalizeWaitlistEmail", () => {
  it("trims whitespace and lowercases", () => {
    expect(normalizeWaitlistEmail("  User@Example.COM  ")).toBe("user@example.com");
  });
});

describe("isHoneypotTriggered", () => {
  it("returns false when honeypot is empty or absent", () => {
    expect(isHoneypotTriggered({})).toBe(false);
    expect(isHoneypotTriggered({ website: "" })).toBe(false);
    expect(isHoneypotTriggered({ website: "   " })).toBe(false);
  });

  it("returns true when honeypot has content", () => {
    expect(isHoneypotTriggered({ website: "https://spam.example" })).toBe(true);
  });
});

describe("parseWaitlistRequest", () => {
  it("accepts a valid email and normalizes it", () => {
    const result = parseWaitlistRequest({
      email: "  User@Example.COM  ",
      source: "hero",
      consent: true,
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
      expect(result.data.source).toBe("hero");
    }
  });

  it("rejects missing email", () => {
    const result = parseWaitlistRequest({ email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = parseWaitlistRequest({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects email longer than RFC 5321 limit", () => {
    const localPart = "a".repeat(WAITLIST_EMAIL_MAX_LENGTH);
    const result = parseWaitlistRequest({ email: `${localPart}@example.com` });
    expect(result.success).toBe(false);
  });

  it("rejects unknown source values", () => {
    const result = parseWaitlistRequest({
      email: "user@example.com",
      source: "sidebar",
    });
    expect(result.success).toBe(false);
  });

  it("rejects signup without consent", () => {
    const result = parseWaitlistRequest({
      email: "user@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects explicit false consent", () => {
    const result = parseWaitlistRequest({
      email: "user@example.com",
      consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("does not fail when honeypot is present but empty", () => {
    const result = parseWaitlistRequest({
      email: "user@example.com",
      consent: true,
      website: "",
    });
    expect(result.success).toBe(true);
  });
});
