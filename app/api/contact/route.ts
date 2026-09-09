import { NextResponse } from 'next/server';
import { site, siteUrl } from '@/lib/site';

/**
 * Contact endpoint, delivered via Resend.
 *
 * Environment:
 *   RESEND_API_KEY  required to actually send. Without it the route still validates
 *                   the submission and replies `fallback: true`, and the client hands
 *                   off to the visitor's mail client with the message pre-filled.
 *                   Silently accepting a message nobody receives would be worse.
 *   CONTACT_TO      where enquiries land. Defaults to the address on the page.
 *   CONTACT_FROM    the sender. Must be on a domain verified in Resend, otherwise
 *                   Resend rejects the send. Defaults to hello@<the live domain>.
 *
 * Reply-To is set to the enquirer, so hitting reply in the inbox goes to them
 * rather than to the sending address.
 */

const MAX = { name: 200, email: 320, message: 5000, company: 200 } as const;

const clean = (v: unknown, limit: number) => (typeof v === 'string' ? v.trim().slice(0, limit) : '');

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request body.' }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;

  const fields = {
    name: clean(body.name, MAX.name),
    email: clean(body.email, MAX.email),
    message: clean(body.message, MAX.message),
  };

  /* Honeypot. The form renders a "company" field that is hidden from people and from
     assistive technology; bots fill it in because it looks like a normal input. Report
     success so the bot has nothing to tune against, but send nothing. */
  if (clean(body.company, MAX.company)) {
    return NextResponse.json({ ok: true });
  }

  if (!fields.name || !fields.email || !fields.message) {
    return NextResponse.json(
      { ok: false, error: 'Name, email and message are all required.' },
      { status: 422 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) {
    return NextResponse.json({ ok: false, error: 'That email address is not valid.' }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: true, fallback: true });
  }

  const to = process.env.CONTACT_TO?.trim() || site.email;
  const from =
    process.env.CONTACT_FROM?.trim() ||
    `Pointing Forward <hello@${new URL(siteUrl).hostname.replace(/^www\./, '')}>`;

  const plain = [
    `Name:    ${fields.name}`,
    `Email:   ${fields.email}`,
    '',
    fields.message,
    '',
    '--',
    `Sent from the contact form at ${siteUrl}`,
  ].join('\n');

  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#1c1b16">
      <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
      <p style="margin:0 0 16px"><strong>Email:</strong>
        <a href="mailto:${escapeHtml(fields.email)}">${escapeHtml(fields.email)}</a></p>
      <div style="white-space:pre-wrap;border-left:3px solid #e3ded0;padding-left:14px;margin:0 0 20px">${escapeHtml(
        fields.message,
      )}</div>
      <p style="margin:0;font-size:13px;color:#8a8677">
        Sent from the contact form at ${escapeHtml(siteUrl)}
      </p>
    </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: `Website enquiry from ${fields.name}`,
        text: plain,
        html,
      }),
    });

    if (!res.ok) {
      /* Resend's message says exactly what is wrong — usually an unverified sending
         domain or a bad key — so it is worth having in the server log. It is not
         returned to the browser. */
      const detail = await res.text().catch(() => '');
      console.error(`Resend rejected the send (${res.status}): ${detail}`);
      return NextResponse.json(
        { ok: false, error: 'The message could not be delivered. Please email us directly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend request failed', err);
    return NextResponse.json(
      { ok: false, error: 'The message could not be delivered. Please email us directly.' },
      { status: 502 },
    );
  }
}
