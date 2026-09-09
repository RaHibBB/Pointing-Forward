import type { Metadata } from 'next';
import { Fraunces, Work_Sans, IBM_Plex_Mono } from 'next/font/google';
import { site, siteUrl } from '@/lib/site';
import { faqs, prices, services } from '@/lib/content';
import './globals.css';

/* Self-hosted at build time, so there is no render-blocking request to
   fonts.googleapis.com and no layout shift while the faces load. */
/* Fraunces is a variable font: omitting `weight` exposes the whole 100–900 range,
   which the page needs (400 through 700), and lets the optical-size axis vary as
   the original's Google Fonts request did. */
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-fraunces',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-work-sans',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: '/',
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  category: 'Marketing',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#181712' },
  ],
};

/* Built from lib/content.ts, so the FAQ markup can never drift from the FAQ on the
   page — which is what Google requires of FAQPage. */
function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['ProfessionalService', 'Organization'],
        '@id': `${siteUrl}/#organization`,
        name: site.name,
        alternateName: site.shortName,
        url: siteUrl,
        description:
          'London marketing and brand studio offering Google Ads and performance marketing, brand identity and graphic design, and WordPress website design and build. Built on a decade of in-house marketing leadership at regulated brands and a decade of independent brand identity practice.',
        slogan: site.tagline,
        email: site.email,
        image: `${siteUrl}/opengraph-image`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.locality,
          addressRegion: site.region,
          addressCountry: site.country,
        },
        areaServed: [
          { '@type': 'City', name: 'London' },
          { '@type': 'Country', name: 'United Kingdom' },
        ],
        knowsAbout: [
          'Google Ads',
          'Paid search',
          'Performance marketing',
          'Lead generation',
          'Search engine optimisation',
          'Brand identity',
          'Logo design',
          'Brochure and annual report design',
          'WordPress design and build',
          'FCA financial promotion rules',
          'Regulated financial services marketing',
        ],
        founder: [
          { '@id': `${siteUrl}/#william` },
          { '@id': `${siteUrl}/#ludo` },
        ],
        employee: [
          { '@id': `${siteUrl}/#william` },
          { '@id': `${siteUrl}/#ludo` },
          { '@type': 'Person', name: 'Rahib', jobTitle: 'Web Developer' },
        ],
        makesOffer: prices.map((p) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: p.title,
            ...(p.note ? { description: p.note } : {}),
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'GBP',
            minPrice: p.from,
            valueAddedTaxIncluded: false,
          },
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: services.map((s) => ({
            '@type': 'OfferCatalog',
            name: s.title,
            itemListElement: s.items.map((item) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: item },
            })),
          })),
        },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#william`,
        name: 'William Pointing',
        jobTitle: 'Co-Founder & Performance Marketing',
        worksFor: { '@id': `${siteUrl}/#organization` },
        description:
          'Over a decade leading marketing inside regulated financial services brands. Runs strategy, Google Ads and lead-generation partnerships.',
        knowsAbout: ['Google Ads', 'Lead generation', 'Marketing strategy', 'Campaign management'],
        sameAs: ['https://greatdealsmadeeasy.com'],
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#ludo`,
        name: 'Ludovica Quaranta',
        alternateName: 'Ludo Quaranta',
        jobTitle: 'Co-Founder, Brand & Design Partner',
        worksFor: { '@id': `${siteUrl}/#organization` },
        description:
          'Close to a decade building brand identity, logos, brochures and visual systems, first in Milan and then in London.',
        knowsAbout: ['Brand identity', 'Logo design', 'Print design'],
        sameAs: ['https://designedbyludo.com'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        inLanguage: site.lang,
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={site.lang}
      className={`${fraunces.variable} ${workSans.variable} ${plexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // JSON.stringify output is escaped for the one character that can break out
          // of a script element.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData()).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
