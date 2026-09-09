import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Pointing Forward Marketing — Google Ads, brand identity and websites, London';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* next/og renders in an isolated Satori environment with no access to next/font,
   so the display face is loaded from disk. Read once per build. */
async function frauncesData() {
  return readFile(join(process.cwd(), 'assets', 'Fraunces-SemiBold.ttf'));
}

/* The social card the site never had. Built from the page's own palette and
   composition so a shared link looks like the site it points at. */
export default async function Image() {
  const fraunces = await frauncesData();

  const ink = '#1c1b16';
  const paper = '#f5f3ee';
  const green = '#0f7a4f';
  const inkSoft = '#57544a';
  const line = '#e3ded0';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: paper,
          padding: '72px 80px',
          fontFamily: 'Fraunces',
        }}
      >
        {/* wordmark + arrow, echoing the header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 38, fontWeight: 700, color: ink, letterSpacing: '-0.02em' }}>
            Pointing Forward
          </div>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12h16M14 6l6 6-6 6"
              stroke={green}
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              color: ink,
              lineHeight: 1.02,
              letterSpacing: '-0.015em',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <span>Marketing in the&nbsp;</span>
            <span style={{ color: green }}>right</span>
            <span>&nbsp;direction.</span>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              color: inkSoft,
              fontFamily: 'system-ui, sans-serif',
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            Google Ads, brand identity and websites — a decade of in-house marketing
            leadership, a decade of independent brand identity work.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${line}`,
            paddingTop: 28,
            fontSize: 22,
            fontFamily: 'system-ui, sans-serif',
            color: inkSoft,
            letterSpacing: '0.06em',
          }}
        >
          <div style={{ textTransform: 'uppercase' }}>London performance marketing &amp; design</div>
          <div style={{ color: green }}>South London, UK</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Fraunces', data: fraunces, style: 'normal', weight: 600 }],
    },
  );
}
