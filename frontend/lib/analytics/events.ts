import posthog from "posthog-js";

/**
 * Every custom event the site sends, with the properties each one carries.
 * Keeping the names in one map means a dashboard never breaks on a typo, and
 * TypeScript rejects a capture with the wrong properties.
 */
export type AnalyticsEvents = {
  waitlist_opened: { source: string };
  waitlist_joined: { source: string };
  waitlist_failed: { source: string; reason: WaitlistFailureReason };
  waitlist_invite_copied: { source: string };
  faq_opened: { question: string; position: number };
  section_viewed: { section: string };
  sponsor_clicked: { sponsor: string };
};

export type AnalyticsEventName = keyof AnalyticsEvents;

/**
 * Why a waitlist submit failed, as a fixed category. The API's message text is
 * never sent, so nothing a person typed can reach analytics.
 */
export type WaitlistFailureReason = "validation" | "server" | "network";

export function waitlistFailureReason(status: number | undefined): WaitlistFailureReason {
  if (status === undefined) return "network";
  return status >= 500 ? "server" : "validation";
}

/** posthog.capture is a no-op until init runs, so this is safe without a key. */
export function track<Name extends AnalyticsEventName>(
  name: Name,
  properties: AnalyticsEvents[Name],
) {
  posthog.capture(name, properties);
}

/**
 * Sections, top to bottom, that report a section_viewed event once they reach
 * the viewport. Their order is what turns these events into a scroll-depth
 * funnel. The ids must exist on the page; the section-tracker test checks them.
 */
export const TRACKED_SECTIONS = [
  "patrocinadores",
  "evento",
  "programacao",
  "numeros",
  "quando",
  "faq",
  "inscricao",
] as const;
