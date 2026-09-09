import Image from 'next/image';
import {
  caseStudies,
  faqs,
  formatPrice,
  prices,
  services,
  team,
  testimonials,
  trustLogos,
  values,
} from '@/lib/content';
import { site } from '@/lib/site';

function SectionHead({ kicker, heading, num }: { kicker: string; heading: string; num: string }) {
  return (
    <div className="section-head">
      <div>
        <span className="section-kicker">{kicker}</span>
        <h2>{heading}</h2>
      </div>
      <span className="section-num mono">{num}</span>
    </div>
  );
}

export function Hero() {
  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <span className="eyebrow">London performance marketing &amp; design agency</span>
          <h1>
            Marketing in the <span className="highlight">right</span> direction.
          </h1>
          <p className="hero-sub">
            Pointing Forward Marketing, a London agency, is founded by William Pointing. He spent over a
            decade managing marketing for regulated financial services brands. Joining Pointing is Ludo
            Quaranta, who has dedicated the same time to crafting brand identities for organisations
            striving to bridge the gap between their actions and perceptions. Together they deliver
            rigorous performance campaigns, brand design and website development without the burden of
            corporate overhead.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#work">
              See the work
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export function Trust() {
  return (
    <div className="trust">
      <div className="trust-kicker">Brands we&rsquo;ve marketed</div>
      <div className="trust-logos">
        {trustLogos.map((logo) => (
          <span className="trust-logo-chip" key={logo.src}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="180px"
              priority
            />
          </span>
        ))}
      </div>

      <h2 className="sr-only">How we work</h2>
      <div className="values">
        {values.map((v, i) => (
          <div className="value-item" key={v.title}>
            <span className="vnum mono">{String(i + 1).padStart(2, '0')}</span>
            <h3>{v.title}</h3>
            <p>{v.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about">
      <SectionHead kicker="The founders' story" heading="A decade in-house, now working for you." num="01" />
      <div className="about">
        <div>
          <div className="about-body">
            <p>
              William &amp; Ludo spent over a decade leading marketing inside some of the UK&rsquo;s
              best-known regulated brands, including insurance, investment platforms, Commodities and
              consumer credit, before setting up Pointing Forward Marketing to bring that same rigour to
              businesses who don&rsquo;t have an in-house team.
            </p>
            <p>
              That means campaigns built around what a board actually wants to see: leads, activation,
              revenue, not vanity metrics. And it means design and web work that&rsquo;s built to be
              measured, not just admired.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services">
      <SectionHead kicker="What we do" heading="Three disciplines, one accountable team." num="02" />
      <div className="services">
        {services.map((s) => (
          <div className="service" key={s.num}>
            <span className="num mono">{s.num}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <ul>
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing">
      <SectionHead kicker="Investment" heading="Straightforward pricing, no surprises." num="03" />
      <div className="pricing-grid">
        {prices.map((p) => (
          <div className="price-card" key={p.title}>
            <h3>{p.title}</h3>
            <div className="price">
              From {formatPrice(p.from)}
              {p.note ? <span>{p.note}</span> : null}
            </div>
          </div>
        ))}
      </div>
      <p className="pricing-note">
        Every project is scoped to fit, so please book a free 30 minute consultation to get an accurate
        quote. <a href="#contact">Get in touch &rarr;</a>
      </p>
    </section>
  );
}

export function Work() {
  return (
    <section id="work">
      <SectionHead kicker="Selected work" heading="Real budgets, real markets, real results." num="04" />
      <div className="work-grid">
        {caseStudies.map((c) => (
          <div className="case" key={c.name}>
            {c.shot ? (
              <div className="case-shot">
                {c.shot.chrome ? (
                  <div className="chrome">
                    <span />
                    <span />
                    <span />
                  </div>
                ) : null}
                <Image
                  src={c.shot.src}
                  alt={c.shot.alt}
                  width={c.shot.width}
                  height={c.shot.height}
                  sizes="(max-width: 760px) 100vw, 480px"
                />
              </div>
            ) : null}

            {c.compare ? (
              <div className="case-compare case-compare-single">
                <div>
                  <Image
                    src={c.compare.src}
                    alt={c.compare.alt}
                    width={c.compare.width}
                    height={c.compare.height}
                    sizes="(max-width: 760px) 100vw, 480px"
                  />
                </div>
              </div>
            ) : null}

            <div className="case-top">
              <div>
                <div className="case-name">{c.name}</div>
                <div className="case-sector">{c.sector}</div>
              </div>
              <span className="case-role">{c.role}</span>
            </div>

            <p className="desc">{c.desc}</p>

            {c.stats ? (
              <div className="case-stats">
                {c.stats.map((s) => (
                  <div key={s.label}>
                    <span className="stat-num mono">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {c.link ? (
              <a className="team-credit" href={c.link.href} target="_blank" rel="noopener">
                {c.link.label}
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section id="team">
      <SectionHead kicker="Who's behind it" heading="A small agency, not a solo act." num="05" />
      <div className="team-grid">
        {team.map((m) => (
          <div className="team-card" key={m.name}>
            {m.photo ? (
              <Image
                className="team-avatar"
                src={m.photo.src}
                alt={m.photo.alt}
                width={m.photo.width}
                height={m.photo.height}
                sizes="84px"
              />
            ) : (
              <div className="team-avatar" style={{ background: 'var(--brass)' }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="8" cy="9.4" r="3.3" fill="var(--paper)" />
                  <circle cx="16" cy="9.4" r="3.3" fill="var(--paper)" opacity="0.78" />
                  <circle cx="12" cy="15.8" r="3.3" fill="var(--paper)" opacity="0.92" />
                </svg>
              </div>
            )}
            <div className="team-name">{m.name}</div>
            <div className="team-role">{m.role}</div>
            <p className="team-bio">{m.bio}</p>
            {m.aside ? <p className="team-aside">{m.aside}</p> : null}
            <div className="team-tags">
              {m.tags.map((t) => (
                <span className="team-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            {m.link ? (
              <a className="team-credit" href={m.link.href} target="_blank" rel="noopener">
                {m.link.label}
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials">
      <SectionHead kicker="Word of mouth" heading="What clients say." num="06" />
      <div className="quotes">
        {testimonials.map((t) => (
          <div className="quote" key={t.author + t.org}>
            <span className="mark" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote>{t.quote}</blockquote>
            <footer>
              <strong>{t.author}</strong>
              {t.org}
            </footer>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq">
      <SectionHead
        kicker="Common questions"
        heading="What people ask before getting in touch."
        num="07"
      />
      <div className="faq">
        {faqs.map((f) => (
          <div className="faq-item" key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap foot-row">
        <span>&copy; {new Date().getFullYear()} Pointing Forward Marketing</span>
        <span>
          {site.locality}, UK
        </span>
      </div>
    </footer>
  );
}
