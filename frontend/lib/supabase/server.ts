import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type WaitlistRow = {
  id: string;
  email: string;
  created_at: string;
  source: string | null;
  consent_at: string;
  consent_version: string;
  unsubscribed_at: string | null;
  bounced_at: string | null;
  suppressed_reason: string | null;
  user_agent: string | null;
};

export type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: WaitlistRow;
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          source?: string | null;
          consent_at: string;
          consent_version: string;
          unsubscribed_at?: string | null;
          bounced_at?: string | null;
          suppressed_reason?: string | null;
          user_agent?: string | null;
        };
        Update: Partial<WaitlistRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let adminClient: SupabaseClient<Database> | undefined;

export function createSupabaseAdmin(): SupabaseClient<Database> {
  if (adminClient) {
    return adminClient;
  }

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  adminClient = createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}

/** Resets the cached client — for tests only. */
export function resetSupabaseAdminForTests() {
  adminClient = undefined;
}
