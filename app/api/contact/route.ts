import { NextResponse } from 'next/server';

/**
 * Contact endpoint.
 *
 * Set CONTACT_WEBHOOK_URL in Vercel to a form provider (Formspree, Basin, Zapier,
 * a Slack incoming webhook — anything that accepts a JSON POST) and enquiries are
 * delivered server-side.
 *
 * Until that variable exists the route validates the submission and replies
 * `fallback: true`, and the client hands off to the visitor's mail client with the
 * message pre-filled. That is deliberate: silently accepting a message nobody
 * receives is worse than saying so.
 */

const MAX = { name: 200, email: 320, message: 5000 } as const;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request body.' }, { status: 400 });
  }

  const { name, email, message } = (payload ?? {}) as Record<string, unknown>;

  const clean = (v: unknown, limit: number) =>
    typeof v === 'string' ? v.trim().slice(0, limit) : '';

  const fields = {
    name: clean(name, MAX.name),
    email: clean(email, MAX.email),
    message: clean(message, MAX.message),
  };

  if (!fields.name || !fields.email || !fields.message) {
    return NextResponse.json(
      { ok: false, error: 'Name, email and message are all required.' },
      { status: 422 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) {
    return NextResponse.json({ ok: false, error: 'That email address is not valid.' }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: true, fallback: true });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...fields,
        source: 'pointingforward.co.uk contact form',
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`Provider responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'The message could not be delivered. Please email us directly.' },
      { status: 502 },
    );
  }
}
