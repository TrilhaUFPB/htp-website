const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !emailPattern.test(email)) {
    return Response.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }

  // TODO: persist waitlist signups (Resend)
  return Response.json({ ok: true });
}
