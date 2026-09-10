import { createSupabaseAdmin } from "@/lib/supabase/server";

export type WaitlistInsertInput = {
  email: string;
  source?: string;
  consentAt: Date;
  consentVersion: string;
  userAgent?: string;
};

export async function insertWaitlistEntry(
  input: WaitlistInsertInput,
): Promise<{ inserted: boolean }> {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("waitlist")
    .insert({
      email: input.email,
      source: input.source ?? null,
      consent_at: input.consentAt.toISOString(),
      consent_version: input.consentVersion,
      user_agent: input.userAgent ?? null,
    })
    .select("id");

  if (error) {
    if (error.code === "23505") {
      return { inserted: false };
    }

    throw error;
  }

  return { inserted: (data?.length ?? 0) > 0 };
}

const KEEP_WARM_EMAIL = "keep-warm@internal.hackthepath.com.br";
const KEEP_WARM_CONSENT_VERSION = "keep-warm";

/**
 * Upserts a reserved dummy row so the write always lands on the same email
 * (unique/not null column) instead of accumulating fake signups over time.
 */
export async function keepWaitlistWarm(): Promise<void> {
  const supabase = createSupabaseAdmin();

  const { error } = await supabase.from("waitlist").upsert(
    {
      email: KEEP_WARM_EMAIL,
      source: "keep-warm",
      consent_at: new Date().toISOString(),
      consent_version: KEEP_WARM_CONSENT_VERSION,
    },
    { onConflict: "email" },
  );

  if (error) {
    throw error;
  }
}
