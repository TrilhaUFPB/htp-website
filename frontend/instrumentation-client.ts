import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// Without a key (local dev, previews) analytics stays off and every
// posthog.capture call is a no-op.
if (token) {
  posthog.init(token, {
    // First-party path, rewritten to PostHog in next.config.ts, so ad blockers
    // that drop *.posthog.com requests still let the events through.
    api_host: "/ingest",
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.posthog.com",
    defaults: "2026-08-30",
    // No cookies or browser storage, so the site needs no cookie banner under
    // the LGPD. Cookieless mode must also be switched on in the project settings.
    cookieless_mode: "always",
    person_profiles: "never",
    disable_session_recording: true,
  });
}
