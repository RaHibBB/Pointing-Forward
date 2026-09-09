/**
 * Single source of truth for the site's absolute URL.
 *
 * The live origin is hardcoded as the default rather than read from the environment.
 * VERCEL_PROJECT_PRODUCTION_URL resolves to the project's *.vercel.app host, not the
 * custom domain, so relying on it silently published canonical tags, og:url, the
 * sitemap and the JSON-LD identity pointing at pointing-forward.vercel.app.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — override, e.g. to test a staging origin
 *  2. PRODUCTION_ORIGIN — the real domain (www, because the apex 308-redirects to it)
 *  3. localhost during `next dev`
 */
const PRODUCTION_ORIGIN = 'https://www.pointingforward.co.uk';

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  // Any Vercel build — production, preview or a branch deploy — should advertise the
  // canonical production origin, never its own ephemeral hostname.
  if (process.env.VERCEL) return PRODUCTION_ORIGIN;

  return 'http://localhost:3000';
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: 'Pointing Forward Marketing',
  shortName: 'Pointing Forward',
  title: 'Pointing Forward Marketing | Google Ads, Brand & Web, London',
  description:
    'London marketing agency run by two senior in-house marketers: Google Ads, brand identity and WordPress builds for businesses that need pipeline, not decks.',
  tagline: 'Marketing in the right direction.',
  locale: 'en_GB',
  lang: 'en-GB',
  email: 'williampointing@gmail.com',
  calendly: 'https://calendly.com/williampointing',
  locality: 'South London',
  region: 'London',
  country: 'GB',
} as const;
