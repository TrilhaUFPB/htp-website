import { siteConfig } from "@/content/site";

/**
 * The link a waitlist member passes to their team. The UTM tags let analytics
 * tell referred visits apart from the ones that came straight from Instagram.
 */
export function buildInviteUrl(): string {
  const url = new URL(siteConfig.url);
  url.searchParams.set("utm_source", "invite-link");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "waitlist-invite");
  return url.toString();
}
