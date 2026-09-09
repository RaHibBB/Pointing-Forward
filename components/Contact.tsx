'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

type Status = { state: 'idle' } | { state: 'sending' } | { state: 'ok'; msg: string } | { state: 'error'; msg: string };

export function Contact() {
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    // Honeypot: hidden from people, irresistible to bots. Sent as-is; the server
    // decides what to do with it.
    const company = String(data.get('company') ?? '').trim();

    if (!name || !email || !message) {
      setStatus({ state: 'error', msg: 'Please fill in your name, email and message so we can reply.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setStatus({ state: 'error', msg: 'That email address does not look right. Check it and try again.' });
      return;
    }

    setStatus({ state: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company }),
      });
      const body = (await res.json()) as { ok?: boolean; error?: string; fallback?: boolean };

      if (!res.ok || !body.ok) {
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }

      if (body.fallback) {
        // No delivery provider configured yet — hand off to the visitor's mail client
        // with the message pre-filled, which is honest about what just happened.
        setStatus({ state: 'ok', msg: 'Opening your email app with this message ready to send.' });
        const subject = `Website enquiry from ${name}`;
        const mailBody = `${message}\n\n--\n${name}\n${email}`;
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
        return;
      }

      form.reset();
      setStatus({ state: 'ok', msg: 'Thanks, that reached us. We reply within one working day.' });
    } catch {
      setStatus({
        state: 'error',
        msg: `Something went wrong sending that. Please email ${site.email} directly.`,
      });
    }
  }

  const sending = status.state === 'sending';

  return (
    <section id="contact">
      <div className="contact">
        <div className="contact-watermark" aria-hidden="true">
          Pointing
          <br />
          Forward
        </div>
        <div>
          <div className="contact-mark" aria-hidden="true">
            <span className="pf-badge">PF</span>
          </div>
          <span className="section-kicker">Ready when you are</span>
          <h2>
            Let&rsquo;s point your marketing <em>forward</em>.
          </h2>
          <p>
            Whether it&rsquo;s a Google Ads account that needs rescuing, a brand that needs a proper
            identity, or a WordPress site that needs building, get in touch and let&rsquo;s talk about it.
          </p>
        </div>
        <div className="contact-links">
          <a
            className="contact-link contact-link-primary"
            href={site.calendly}
            target="_blank"
            rel="noopener"
          >
            Book a free 30 minute consultation{' '}
            <span className="arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
          <a className="contact-link" href={`mailto:${site.email}`}>
            Email us today{' '}
            <span className="arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
          <a className="contact-link" href="#top">
            Back to top{' '}
            <span className="arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      </div>

      <div className="contact-form-card">
        <h3>Or send us a message</h3>
        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="cf-name">Name</label>
              <input id="cf-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="form-field">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="form-field full">
              <label htmlFor="cf-message">Message</label>
              <textarea id="cf-message" name="message" rows={5} required />
            </div>
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="cf-company">Company</label>
              <input
                id="cf-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          </div>
          <button className="btn btn-primary form-submit" type="submit" disabled={sending} aria-busy={sending}>
            {sending ? 'Sending…' : 'Send message'}
          </button>

          <p
            className="form-status"
            data-state={status.state}
            role="status"
            aria-live="polite"
            hidden={status.state === 'idle' || sending}
          >
            {status.state === 'ok' || status.state === 'error' ? status.msg : ''}
          </p>
          <p className="form-privacy">
            We use your details only to reply to this enquiry. We never pass them on.
          </p>
        </form>
      </div>
    </section>
  );
}
