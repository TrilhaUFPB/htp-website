import {
  isHoneypotTriggered,
  parseWaitlistRequest,
} from "@/lib/waitlist/schema";
import { submitWaitlistSignup } from "@/lib/waitlist/service";

const GENERIC_VALIDATION_ERROR = "Informe um e-mail válido.";
const GENERIC_REQUEST_ERROR = "Requisição inválida.";
const GENERIC_SERVER_ERROR = "Não foi possível enviar. Tente de novo.";

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

  try {
    await submitWaitlistSignup({
      email: parsed.data.email,
      source: parsed.data.source,
      consentAccepted: parsed.data.consent,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });
  } catch {
    return Response.json({ error: GENERIC_SERVER_ERROR }, { status: 500 });
  }

  return Response.json({ ok: true });
}
