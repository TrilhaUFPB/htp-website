import { z } from "zod";

/** RFC 5321 maximum length for an email address. */
export const WAITLIST_EMAIL_MAX_LENGTH = 254;

export const WAITLIST_SOURCES = ["hero", "footer"] as const;

export type WaitlistSource = (typeof WAITLIST_SOURCES)[number];

export const waitlistRequestSchema = z.object({
  email: z
    .string({ error: "Informe um e-mail válido." })
    .trim()
    .min(1, { error: "Informe um e-mail válido." })
    .max(WAITLIST_EMAIL_MAX_LENGTH, { error: "Informe um e-mail válido." })
    .pipe(z.email({ error: "Informe um e-mail válido." }))
    .transform((value) => value.toLowerCase()),
  source: z.enum(WAITLIST_SOURCES).optional(),
  consent: z.literal(true, {
    error: "É necessário aceitar o uso dos dados para entrar na lista.",
  }),
  /** Honeypot — bots fill this; humans never see it. */
  website: z.string().optional(),
});

export type WaitlistRequest = z.infer<typeof waitlistRequestSchema>;

export function normalizeWaitlistEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isHoneypotTriggered(body: { website?: string | undefined }): boolean {
  return Boolean(body.website?.trim());
}

export function parseWaitlistRequest(body: unknown) {
  return waitlistRequestSchema.safeParse(body);
}
