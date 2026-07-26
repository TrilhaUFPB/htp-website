import {
  isHoneypotTriggered,
  parseWaitlistRequest,
} from "@/lib/waitlist/schema";

const GENERIC_VALIDATION_ERROR = "Informe um e-mail válido.";
const GENERIC_REQUEST_ERROR = "Requisição inválida.";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: GENERIC_REQUEST_ERROR }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: GENERIC_REQUEST_ERROR }, { status: 400 });
  }

  const payload = body as { website?: string };

  if (isHoneypotTriggered(payload)) {
    return Response.json({ ok: true });
  }

  const parsed = parseWaitlistRequest(body);

  if (!parsed.success) {
    return Response.json({ error: GENERIC_VALIDATION_ERROR }, { status: 400 });
  }

  // TODO(phase 1): persist waitlist signups (Supabase)
  void parsed.data;

  return Response.json({ ok: true });
}
