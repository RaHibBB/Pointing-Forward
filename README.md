# Pointing Forward Marketing

One-page marketing site for Pointing Forward Marketing, a London performance
marketing and brand design agency. Next.js App Router, deployed on Vercel.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

## Environment variables

All are optional: the site builds and deploys without them, but the contact form
cannot deliver until `RESEND_API_KEY` is set.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The live origin, e.g. `https://pointingforward.co.uk`. Drives the canonical URL, `og:url`, `sitemap.xml` and the JSON-LD identity. **Set this in Vercel once the real domain is connected.** Until then it falls back to `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel injects automatically, so everything is still correct on the `.vercel.app` host. |
| `RESEND_API_KEY` | Required for the contact form to actually send. **While this is unset the form validates the submission and then hands off to the visitor's mail client with the message pre-filled**, rather than pretending to deliver something nobody receives. |
| `CONTACT_TO` | Where enquiries land. Defaults to the address shown on the page. |
| `CONTACT_FROM` | The sender, e.g. `Pointing Forward <hello@pointingforward.co.uk>`. Must be on a domain verified in Resend or Resend rejects the send. Defaults to `hello@` the live domain. |

## Layout

```
app/
  layout.tsx            Metadata, self-hosted fonts, JSON-LD
  page.tsx              Section composition
  globals.css           The full stylesheet, ported verbatim from the original build
  robots.ts             Generates /robots.txt
  sitemap.ts            Generates /sitemap.xml
  opengraph-image.tsx   Generates the 1200x630 social card
  api/contact/route.ts  Contact form endpoint
components/
  Header.tsx            Wordmark and nav
  Sections.tsx          Hero, trust strip, values, about, services, pricing,
                        work, team, testimonials, FAQ, footer
  Contact.tsx           Contact panel and form (client component)
lib/
  site.ts               Site URL resolution and shared constants
  content.ts            All copy and data
public/images/          The 15 site images
assets/                 Fraunces TTF, used only by the OG image renderer
reference/              The original single-file HTML build, kept as the design
                        source of truth
```

`lib/content.ts` is the single source of truth for copy. The FAQ and price list are
each consumed twice — once by the rendered section and once by the JSON-LD in
`app/layout.tsx`. Google requires FAQPage markup to match the visible text, so
sharing one array is what guarantees they cannot drift apart.

## SEO and AI visibility

- `ProfessionalService` + `Organization` structured data with London/UK service area,
  both founders as linked `Person` entities, and an `OfferCatalog` carrying the real
  starting prices as GBP `minPrice`
- `FAQPage` structured data generated from the visible FAQ
- Generated `robots.txt` that explicitly allows AI search and training crawlers
  (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and others)
- `public/llms.txt` — a plain-markdown brief for LLM ingestion
- Generated `sitemap.xml`, canonical URL, Open Graph and Twitter card metadata
- Generated Open Graph image, rendered in the site's own display face

## Performance

The original build was a single 662KB HTML file with every image inlined as a
base64 data URI, which meant nothing could be cached separately and all of it
blocked first paint.

| | Before | After |
|---|---|---|
| HTML document | 662 KB | 110 KB |
| Biachem logo (renders at 180px) | 54.6 KB | 1.4 KB |
| Founder portrait (renders at 84px) | 31.5 KB | 0.9 KB (AVIF) |

`next/image` serves AVIF/WebP at the size each image is actually displayed, and
`next/font` self-hosts the three typefaces so there is no render-blocking request
to `fonts.googleapis.com`.

## Contact form

Submissions POST to `app/api/contact/route.ts`, which sends via Resend with
`Reply-To` set to the enquirer, so replying in the inbox goes to them.

To enable it:

1. Add `pointingforward.co.uk` as a domain in Resend and create the DKIM/SPF
   records it gives you in Hostinger's DNS. Resend refuses to send from an
   unverified domain.
2. Set `RESEND_API_KEY`, and `CONTACT_TO` if enquiries should go somewhere other
   than the address on the page.
3. Redeploy.

A hidden "company" honeypot field guards against bot spam: it is positioned
off-screen rather than `display:none` (some bots skip unrendered fields), hidden
from assistive technology, and out of tab order. A submission with it filled in
gets a success response and is dropped, so the bot has nothing to tune against.

## Known issues

- **No mobile navigation** — `.navlinks` is hidden below 760px with no menu to
  replace it, so on a phone the only nav control is "Start a project". Everything
  else is reachable only by scrolling.
- **FAQ copy is drafted, not approved.** Every answer is assembled from facts already
  stated elsewhere on the page, but William should read all eight before launch — in
  particular the pricing summary and the regulated-industry claims. See the comment
  above `faqs` in `lib/content.ts`.
- **Testimonials are unsigned-off**, which is why there is deliberately no `Review`
  or `AggregateRating` structured data. Marking up unverified reviews risks a manual
  action. Once the quotes are confirmed, that markup becomes both safe and valuable.
- **Contact address is a personal Gmail**, and the footer carries no company number,
  VAT number or registered address — all of which UK B2B procurement checks look for.
