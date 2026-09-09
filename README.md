# Pointing Forward Marketing

One-page marketing site for Pointing Forward Marketing, a London performance
marketing and brand design agency.

## Contents

| File | Description |
|---|---|
| `pointing-forward_5.html` | The complete site — a single self-contained HTML file |

## Running it

No build step and no dependencies. Open the file directly in a browser, or
serve the folder over HTTP:

```bash
npx serve .
```

## How it is built

- Single self-contained HTML file; all images are inlined as base64 data URIs
- No JavaScript and no external assets beyond the webfonts
- Typography: Fraunces (display), Work Sans (body), IBM Plex Mono (labels and figures), loaded from Google Fonts
- Light and dark themes via `prefers-color-scheme`, with a `data-theme` attribute override
- Responsive down to 320px
