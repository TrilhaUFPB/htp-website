import { privacyConfig } from "@/content/privacy";

import { insertWaitlistEntry } from "./repository";
import type { WaitlistSource } from "./schema";

export type SubmitWaitlistSignupInput = {
  email: string;
  source?: WaitlistSource;
  consentAccepted: boolean;
  userAgent?: string;
};

export type SubmitWaitlistSignupResult = {
  ok: true;
  inserted: boolean;
};

export function buildWaitlistConsentRecord(consentAccepted: boolean, now = new Date()) {
  if (!consentAccepted) {
    throw new Error("Consent is required.");
  }

  return {
    consentAt: now,
    consentVersion: privacyConfig.waitlistConsentVersion,
  };
}

export async function submitWaitlistSignup(
  input: SubmitWaitlistSignupInput,
): Promise<SubmitWaitlistSignupResult> {
  const { consentAt, consentVersion } = buildWaitlistConsentRecord(input.consentAccepted);

  const { inserted } = await insertWaitlistEntry({
    email: input.email,
    source: input.source,
    consentAt,
    consentVersion,
    userAgent: input.userAgent,
  });

  return { ok: true, inserted };
}

export { privacyConfig as waitlistConsentConfig };
