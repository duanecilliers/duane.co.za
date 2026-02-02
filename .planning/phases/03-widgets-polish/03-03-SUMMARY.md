# 03-03: SEO, OG Image, Favicon

## Completed

### Meta Tags (`src/app/layout.tsx`)
- metadataBase: https://duane.co.za
- title: "Duane Cilliers — Maker"
- description, keywords array
- openGraph: title, description, url, siteName, type: "website"
- twitter: card: "summary_large_image"

### OG Image (`src/app/opengraph-image.tsx`)
- Edge runtime, @vercel/og ImageResponse
- Dark background (#0a0a0b), "Duane Cilliers" large white text
- "Maker · Developer · Cape Town" subtitle in muted gray
- Cyan accent bar, 1200×630px

### Favicon (`src/app/icon.tsx`)
- Dynamic 32×32 ImageResponse
- "DC" monogram, cyan text on dark background

### Robots (`src/app/robots.ts`)
- Allow all, sitemap: https://duane.co.za/sitemap.xml

### Sitemap (`src/app/sitemap.ts`)
- Single entry: https://duane.co.za, monthly, priority 1

## Commits
- `feat(03-03): meta tags and dynamic OG image`
- `feat(03-03): favicon, robots.txt, and sitemap`
