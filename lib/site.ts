/**
 * Single source of truth for the site's absolute URL.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL  — set this in Vercel once the real domain is connected
 *  2. VERCEL_PROJECT_PRODUCTION_URL — injected automatically by Vercel, so canonical,
 *     Open Graph and the sitemap are all correct on the .vercel.app host with no config
 *  3. localhost for `next dev`
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`;

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
