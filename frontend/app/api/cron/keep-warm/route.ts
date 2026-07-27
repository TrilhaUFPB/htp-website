import { pingDatabase } from "@/lib/waitlist/repository";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return Response.json({ error: "Cron not configured." }, { status: 500 });
  }

  const authorization = request.headers.get("authorization");

  if (authorization !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await pingDatabase();
  } catch {
    return Response.json({ error: "Database ping failed." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
