import { pingDatabase } from "@/lib/waitlist/repository";

/**
 * Supabase failures arrive in two shapes: an `Error` from the fetch layer,
 * whose real reason hides in `cause` (a paused project surfaces as a bare
 * "fetch failed"), and a PostgrestError object carrying `message`/`code`/`hint`.
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
    const { message, code, hint } = error as Record<string, unknown>;
    const parts = [message, code && `code=${code}`, hint].filter(Boolean);

    if (parts.length > 0) {
      return parts.map(String).join(" | ");
    }
  }

  return String(error);
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
    await pingDatabase();
  } catch (error) {
    const reason = describeError(error);

    console.error(`[keep-warm] Database ping failed: ${reason}`);

    // Safe to return: this branch is only reachable with a valid cron secret.
    return Response.json(
      { error: "Database ping failed.", reason },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
