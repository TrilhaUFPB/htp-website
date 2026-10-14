import { describe, expect, it } from "vitest";

import { siteConfig } from "@/content/site";
import { buildInviteUrl } from "@/lib/share/invite";

describe("buildInviteUrl", () => {
  it("points at the live site", () => {
    const url = new URL(buildInviteUrl());

    expect(url.origin).toBe(new URL(siteConfig.url).origin);
  });

  it("tags the visit as a waitlist referral", () => {
    const params = new URL(buildInviteUrl()).searchParams;

    expect(params.get("utm_source")).toBe("invite-link");
    expect(params.get("utm_medium")).toBe("referral");
    expect(params.get("utm_campaign")).toBe("waitlist-invite");
  });
});
