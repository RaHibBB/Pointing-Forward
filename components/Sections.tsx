import Image from 'next/image';
import {
  caseStudies,
  faqs,
  formatPrice,
  navLinks,
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
            Google Ads, brand identity and websites for businesses that need pipeline, not decks.
            Built by a decade of in-house marketing leadership and a decade of independent brand
            identity work.
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

        <aside className="hero-panel">
          <div className="hero-panel-faces">
            <Image
              src="/images/team-william-pointing.jpg"
              alt="William Pointing"
              width={76}
              height={76}
              sizes="76px"
              priority
            />
            <Image
              src="/images/team-ludo-quaranta.jpg"
              alt="Ludovica Quaranta"
              width={76}
              height={76}
              sizes="76px"
              priority
            />
          </div>
          <div className="hero-panel-role">Who you actually work with</div>
          <div className="hero-panel-names">William Pointing &amp; Ludo Quaranta</div>
          <p>
            You brief us and we do the work. No account layer, no juniors, and no handover to a team you
            never met.
          </p>
          <div className="hero-panel-proof">
            <div>
              <span className="stat-num mono">2+</span>
              <span className="stat-label">people on the work</span>
            </div>
            <div>
              <span className="stat-num mono">&ndash;</span>
              <span className="stat-label">account layer</span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export function Trust() {
  return (
    <div className="trust">
      <div className="trust-kicker">Brands we&rsquo;ve marketed</div>
      <div
        className="trust-logos"
        role="group"
        aria-label="Brands we have marketed"
        tabIndex={0}
      >
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
              William spent over a decade leading marketing inside some of the UK&rsquo;s best-known
              regulated brands: insurance, investment platforms, commodities and consumer credit. Ludo
              spent that time building brand identity for organisations that need to close the gap
              between what they do and how they&rsquo;re perceived. Together they set up Pointing
              Forward Marketing to bring that rigour to businesses who don&rsquo;t have an in-house team.
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
  const year = new Date().getFullYear();

  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-main">
          <div className="foot-brand">
            <a href="#top" className="wordmark">
              Pointing Forward
              <span className="wordmark-arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 12h16M14 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <p>
              Google Ads, brand identity and websites. A decade of in-house marketing leadership at
              regulated brands, and a decade of independent brand identity work.
            </p>
            <span className="foot-place">{site.locality}, United Kingdom</span>
          </div>

          <nav className="foot-col" aria-label="Sections">
            <h3>Explore</h3>
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="foot-col">
            <h3>What we do</h3>
            <ul>
              {services.map((s) => (
                <li key={s.num}>
                  <a href="#services">{s.title}</a>
                </li>
              ))}
              <li>
                <a href="#pricing">Pricing</a>
              </li>
            </ul>
          </div>

          <div className="foot-col">
            <h3>Get in touch</h3>
            <ul>
              <li>
                <a className="out" href={site.calendly} target="_blank" rel="noopener">
                  Book a consultation
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>Email us</a>
              </li>
              <li>
                <a className="out" href="https://designedbyludo.com" target="_blank" rel="noopener">
                  designedbyludo.com
                </a>
              </li>
              <li>
                <a className="out" href="https://greatdealsmadeeasy.com" target="_blank" rel="noopener">
                  greatdealsmadeeasy.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-bar">
          <span>&copy; {year} Pointing Forward Marketing</span>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
