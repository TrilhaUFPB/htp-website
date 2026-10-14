import { describe, expect, it } from "vitest";

import { siteConfig } from "@/content/site";
import { buildInviteUrl, buildWhatsAppUrl, inviteMessage } from "@/lib/share/invite";

describe("buildInviteUrl", () => {
  it("points at the live site", () => {
    const url = new URL(buildInviteUrl("copy"));

    expect(url.origin).toBe(new URL(siteConfig.url).origin);
  });

  it("tags the visit as a waitlist referral from the given channel", () => {
    const params = new URL(buildInviteUrl("whatsapp")).searchParams;

    expect(params.get("utm_source")).toBe("whatsapp");
    expect(params.get("utm_medium")).toBe("referral");
    expect(params.get("utm_campaign")).toBe("waitlist-invite");
  });
});

describe("buildWhatsAppUrl", () => {
  it("prefills the invite message and the tagged link", () => {
    const url = new URL(buildWhatsAppUrl());
    const text = url.searchParams.get("text") ?? "";

    expect(url.origin).toBe("https://wa.me");
    expect(text).toContain(inviteMessage);
    expect(text).toContain(buildInviteUrl("whatsapp"));
  });
});
