import { siteConfig } from "@/content/site";

export type InviteChannel = "native" | "whatsapp" | "copy";

/**
 * The link a waitlist member passes to their team. The UTM tags let analytics
 * tell referred visits apart from the ones that came straight from Instagram.
 */
export function buildInviteUrl(channel: InviteChannel): string {
  const url = new URL(siteConfig.url);
  url.searchParams.set("utm_source", channel);
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "waitlist-invite");
  return url.toString();
}

export const inviteMessage =
  "Entrei na lista do Hack The Path: hackathon gratuito, 20 e 21 de fevereiro de 2027. Bora montar o time?";

export function buildWhatsAppUrl(): string {
  const text = `${inviteMessage} ${buildInviteUrl("whatsapp")}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
