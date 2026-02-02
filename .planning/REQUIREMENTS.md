# REQUIREMENTS.md — duane.co.za

## v1 Requirements

### Layout & Navigation
- [ ] **NAV-01**: Single-page hub with smooth scroll between sections
- [ ] **NAV-02**: Sticky navigation bar that highlights active section on scroll
- [ ] **NAV-03**: Dark mode as default with light mode toggle (persisted to localStorage)
- [ ] **NAV-04**: Fully responsive layout (mobile → tablet → desktop)

### Hero
- [ ] **HERO-01**: Display name, one-liner (maker/builder identity), and Cape Town location
- [ ] **HERO-02**: Social links (GitHub, LinkedIn, X/Twitter)
- [ ] **HERO-03**: Cursor glow/spotlight effect following mouse (Brittany Chiang style)

### Currently/Now
- [ ] **NOW-01**: "Currently" section showing what Duane is building/learning/into
- [ ] **NOW-02**: Placeholder content that's easy to update (single data file or MDX)

### Projects
- [ ] **PROJ-01**: Two-tier project display — Featured projects (large cards) and Client Work (compact cards)
- [ ] **PROJ-02**: Featured: REPE and TubeMind with description, tech stack tags, status badge, and link
- [ ] **PROJ-03**: Client Work: REW and TMG with brief description and tech stack tags
- [ ] **PROJ-04**: Status badges (Active, Shipped, Client Work) on project cards

### About
- [ ] **ABOUT-01**: Dev→entrepreneur narrative section on homepage
- [ ] **ABOUT-02**: Conversational tone, not a CV — tells the story arc

### Life/Hobbies
- [ ] **LIFE-01**: Visual hobby cards with icons/emoji: Surfing, BJJ, Drums, 3D Printing
- [ ] **LIFE-02**: Lightweight section — icons/photos, not a full page

### Contact
- [ ] **CTA-01**: Contact section with email link and availability badge
- [ ] **CTA-02**: "Available for freelance" indicator (toggleable green/red badge)
- [ ] **CTA-03**: Brief line about what kind of work Duane takes on

### Dynamic Widgets
- [ ] **WIDGET-01**: Spotify Now Playing — current/recent track via Spotify Web API
- [ ] **WIDGET-02**: GitHub Activity — contribution graph or recent commits via GitHub API

### Polish & Animation
- [ ] **ANIM-01**: Framer Motion page/section entrance animations
- [ ] **ANIM-02**: Hover micro-interactions on cards and links
- [ ] **ANIM-03**: Smooth scroll behavior between sections

### SEO & Meta
- [ ] **SEO-01**: Meta tags (title, description, keywords)
- [ ] **SEO-02**: Dynamic OG images via @vercel/og
- [ ] **SEO-03**: Favicon and site manifest

### Infrastructure
- [ ] **INFRA-01**: Next.js 15 project with App Router and TypeScript
- [ ] **INFRA-02**: Tailwind CSS 4 + shadcn/ui setup
- [ ] **INFRA-03**: Vercel deployment configuration
- [ ] **INFRA-04**: Content data layer — single data file or content collections for easy content updates

## v2 Requirements (Deferred)
- `/about` full story subpage
- `/blog` with MDX + Content Collections
- `/uses` page (dev setup, tools, 3D printing gear)
- Project deep-dive subpages (`/projects/[slug]`)
- Newsletter/email capture
- RSS feed for blog
- Reading shelf / current book widget
- Photo grid in hobbies section (actual photos vs icons)

## Out of Scope
- Speaking section — no talks to show
- Testimonials — no client quotes ready
- Skill bars / tech logo grids — dated pattern
- Resume/CV download — not job hunting
- YouTube studio section — insufficient content
- CMS (Sanity, Notion) — overkill for personal site, MDX is enough

## Traceability

| REQ-ID | Phase | Status |
|--------|-------|--------|
| NAV-01 | Phase 1 | Pending |
| NAV-02 | Phase 1 | Pending |
| NAV-03 | Phase 1 | Pending |
| NAV-04 | Phase 1 | Pending |
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| INFRA-03 | Phase 1 | Pending |
| INFRA-04 | Phase 1 | Pending |
| HERO-01 | Phase 2 | Pending |
| HERO-02 | Phase 2 | Pending |
| NOW-01 | Phase 2 | Pending |
| NOW-02 | Phase 2 | Pending |
| PROJ-01 | Phase 2 | Pending |
| PROJ-02 | Phase 2 | Pending |
| PROJ-03 | Phase 2 | Pending |
| PROJ-04 | Phase 2 | Pending |
| ABOUT-01 | Phase 2 | Pending |
| ABOUT-02 | Phase 2 | Pending |
| LIFE-01 | Phase 2 | Pending |
| LIFE-02 | Phase 2 | Pending |
| CTA-01 | Phase 2 | Pending |
| CTA-02 | Phase 2 | Pending |
| CTA-03 | Phase 2 | Pending |
| HERO-03 | Phase 3 | Pending |
| WIDGET-01 | Phase 3 | Pending |
| WIDGET-02 | Phase 3 | Pending |
| ANIM-01 | Phase 3 | Pending |
| ANIM-02 | Phase 3 | Pending |
| ANIM-03 | Phase 3 | Pending |
| SEO-01 | Phase 3 | Pending |
| SEO-02 | Phase 3 | Pending |
| SEO-03 | Phase 3 | Pending |

Coverage: 32/32 requirements mapped ✓

---
*Last updated: 2026-02-02*
