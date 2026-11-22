import { keepWaitlistWarm } from "@/lib/waitlist/repository";

// A failed attempt can take ~16s before the fetch gives up, so three attempts
// plus backoff need more than the default function timeout.
export const maxDuration = 60;

const MAX_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [1000, 2000];

/**
 * Supabase failures arrive in two shapes: an `Error` from the fetch layer,
 * whose real reason hides in `cause` (a paused project surfaces as a bare
 * "fetch failed"), and a PostgrestError object carrying `message`/`code`/`hint`.
 * postgrest-js turns network errors into the second shape, putting the
 * "Caused by: ..." line in `details`, followed by a stack trace we drop.
 * Both need flattening into one line, or the logs say nothing useful.
 */
function describeError(error: unknown): string {
  if (error instanceof Error) {
    const cause = error.cause;

    if (cause) {
      const causeMessage = cause instanceof Error ? cause.message : String(cause);
      return `${error.message}: ${causeMessage}`;
    }

    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const { message, code, hint, details } = error as Record<string, unknown>;
    const causedBy =
      typeof details === "string"
        ? details.match(/Caused by: (.+)/)?.[1]
        : undefined;
    const parts = [message, causedBy, code && `code=${code}`, hint].filter(
      Boolean,
    );

    if (parts.length > 0) {
      return parts.map(String).join(" | ");
    }
  }

  return String(error);
}

/** Retries transient failures (e.g. "fetch failed") with a short backoff. */
async function keepWarmWithRetry(): Promise<void> {
  for (let attempt = 1; ; attempt++) {
    try {
      await keepWaitlistWarm();
      return;
    } catch (error) {
      if (attempt >= MAX_ATTEMPTS) {
        throw error;
      }

      console.warn(
        `[keep-warm] Attempt ${attempt} failed, retrying: ${describeError(error)}`,
      );

      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAYS_MS[attempt - 1]),
      );
    }
  }
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("[keep-warm] CRON_SECRET is not set.");
    return Response.json({ error: "Cron not configured." }, { status: 500 });
  }

  const authorization = request.headers.get("authorization");

  if (authorization !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await keepWarmWithRetry();
  } catch (error) {
    const reason = describeError(error);

    console.error(`[keep-warm] Keep-warm write failed: ${reason}`);

    // Safe to return: this branch is only reachable with a valid cron secret.
    return Response.json(
      { error: "Keep-warm write failed.", reason },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
