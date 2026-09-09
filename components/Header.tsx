import { navLinks } from '@/lib/content';
import { site } from '@/lib/site';

export function Header() {
  return (
    <header className="site">
      <div className="wrap nav">
        <a href="#top" className="wordmark">
          Pointing Forward
          <span className="wordmark-arrow" aria-hidden="true">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        <nav aria-label="Primary">
          <ul className="navlinks">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-ctas">
          <a
            className="nav-cta nav-cta-alt"
            href={site.calendly}
            target="_blank"
            rel="noopener"
          >
            Free consultation
          </a>
          <a className="nav-cta" href="#contact">
            Start a project
          </a>
        </div>
      </div>
    </header>
  );
}
