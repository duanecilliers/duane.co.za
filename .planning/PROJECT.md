# PROJECT.md — duane.co.za

## What This Is

Personal brand hub for Duane Cilliers — a "maker" identity site that replaces the current outdated duane.co.za. Not a traditional portfolio. A launchpad: single-page hub linking out to projects, social, and content. Inspired by the hub architecture of kitze.io and the micro-interaction polish of brittanychiang.com.

## Core Value

A living personal brand that signals "this person ships" — both products and code. The site captures the dev→entrepreneur narrative and makes Duane discoverable to clients, collaborators, and the tech community.

## What It Looks Like

### Design Direction
- **Dark theme** as default (developer-native), with light mode toggle
- **Brittany Chiang energy**: cursor glow effect, scroll-tracked sticky nav, smooth micro-interactions, single-page flow
- **Kitze hub architecture**: categorized sections, two-tier project display, links-as-currency (site is a launchpad, not a destination)
- **Warm and personal**, not ultra-minimal — more craftz.dog than leerob.com

### Homepage Sections (top to bottom)
1. **Hero** — Name, one-liner (maker/builder identity), location (Cape Town 🇿🇦), social links
2. **Currently/Now** — What he's building, learning, into. Updated monthly. "Alive signal"
3. **Projects** — Two-tier: Featured (REPE, TubeMind) + Client Work (REW, TMG). Card-based with status badges
4. **About/Story** — Dev→entrepreneur narrative. Conversational, not CV
5. **Life/Hobbies** — Visual cards: 🏄 Surfing, 🥋 BJJ, 🥁 Drums, 🖨️ 3D Printing
6. **Contact** — CTA for freelance, email link, availability badge

### Dynamic Widgets
- **Spotify Now Playing** — via Spotify Web API, auto-updating
- **GitHub Activity** — contribution graph or recent commits via GitHub API

### Subpages (Phase 2+)
- `/about` — full story + bio
- `/blog` — MDX content (when ready)
- `/uses` — dev setup, tools, 3D printing gear

## Tech Stack

- **Framework**: Next.js 15 (App Router, React Server Components)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Animation**: Framer Motion (page transitions, scroll, hover)
- **Content**: MDX + Content Collections (or Velite) — for blog when ready
- **Hosting**: Vercel
- **APIs**: Spotify Web API, GitHub API
- **Fonts**: JetBrains Mono (code) + Satoshi or General Sans (body) via next/font
- **Images**: next/image + Vercel image optimization
- **OG**: @vercel/og for dynamic social previews
- **Analytics**: Vercel Analytics or Plausible

## Constraints

- Weekend project — ship MVP fast, iterate over time
- Dummy content acceptable at launch (structure > content)
- Must replace existing duane.co.za eventually (no rush)
- Duane already knows Next.js/React/Tailwind — no learning curve on stack
- No blog content yet — section exists but empty at launch is fine

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single-page hub over multi-page | Kitze model — everything accessible from one scroll. Subpages added later | Approved |
| Dark theme default | Developer-native, matches Brittany Chiang and Kitze aesthetic | Approved |
| Dummy content at launch | "Build structure, fill later" — Duane's explicit instruction | Approved |
| Spotify + GitHub widgets | Duane specifically requested. Auto-updating "alive signals" | Approved |
| Skip blog at MVP | No content ready. Section can be added as a phase when ready | Approved |
| Two-tier project display | Featured products first, client work second — signals entrepreneur identity | Approved |

## Requirements

### Validated

(None yet — greenfield)

### Active

- [ ] Hero section with maker identity one-liner
- [ ] Currently/Now section
- [ ] Two-tier project showcase
- [ ] About/story section
- [ ] Life/hobbies visual section
- [ ] Contact/CTA section
- [ ] Spotify Now Playing widget
- [ ] GitHub activity widget
- [ ] Dark/light mode toggle
- [ ] Cursor glow effect (Brittany Chiang style)
- [ ] Scroll-tracked navigation
- [ ] Smooth page transitions and micro-interactions
- [ ] Responsive design
- [ ] SEO basics (meta, OG images)

### Out of Scope

- Blog/writing section — no content yet, add in future phase
- /uses page — easy content win but not MVP
- Project deep-dive subpages — Phase 2+
- Newsletter signup — no mailing list yet
- Testimonials — no client quotes ready
- Speaking section — no talks yet
- Skill bars/tech logo grids — screams 2018

---
*Last updated: 2026-02-02 after initialization*
