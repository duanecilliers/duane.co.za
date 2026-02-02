# Roadmap: duane.co.za

## Overview

Three-phase build: scaffold the Next.js project with layout and navigation, populate all content sections with dummy data, then wire up dynamic widgets and polish animations/SEO. Each phase delivers a deployable state — Phase 1 is a working dark-mode shell, Phase 2 has all sections visible, Phase 3 is launch-ready.

## Phases

- [x] **Phase 1: Foundation** — Next.js 16 project, layout shell, navigation, dark/light mode, responsive
- [x] **Phase 2: Content Sections** — Hero, Now, Projects, About, Life, Contact — all with real content
- [x] **Phase 3: Widgets & Polish** — Spotify, GitHub, cursor glow, animations, SEO, OG images

## Phase Details

### Phase 1: Foundation
**Goal**: A deployed, navigable dark-mode shell with responsive layout and smooth scroll
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, NAV-01, NAV-02, NAV-03, NAV-04
**Success Criteria** (what must be TRUE):
  1. Next.js 15 app runs locally and deploys to Vercel
  2. User sees a dark-themed page with section placeholders and can toggle to light mode
  3. Sticky nav highlights the current section as user scrolls
  4. Layout adapts cleanly from mobile (375px) to desktop (1440px+)
  5. Content data layer exists — sections pull from a single data file
**Plans**: TBD

Plans:
- [ ] 01-01: Project scaffolding and Vercel deployment
- [ ] 01-02: Layout, navigation, dark/light mode, responsive

### Phase 2: Content Sections
**Goal**: All homepage sections populated with real structure and dummy content
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, NOW-01, NOW-02, PROJ-01, PROJ-02, PROJ-03, PROJ-04, ABOUT-01, ABOUT-02, LIFE-01, LIFE-02, CTA-01, CTA-02, CTA-03
**Success Criteria** (what must be TRUE):
  1. Hero displays name, maker one-liner, Cape Town location, and social links
  2. Currently/Now section shows placeholder content about current work
  3. Projects section shows Featured (REPE, TubeMind) and Client Work (REW, TMG) in two-tier layout with status badges
  4. About section tells a dev→entrepreneur story in conversational tone
  5. Life section displays hobby cards with icons (surfing, BJJ, drums, 3D printing)
  6. Contact section has email link, availability badge, and freelance description
**Plans**: TBD

Plans:
- [ ] 02-01: Hero + Currently/Now sections
- [ ] 02-02: Projects section (two-tier with badges)
- [ ] 02-03: About + Life + Contact sections

### Phase 3: Widgets & Polish
**Goal**: Dynamic widgets live, micro-interactions polished, SEO ready for launch
**Depends on**: Phase 2
**Requirements**: HERO-03, WIDGET-01, WIDGET-02, ANIM-01, ANIM-02, ANIM-03, SEO-01, SEO-02, SEO-03
**Success Criteria** (what must be TRUE):
  1. Cursor glow effect follows mouse on hero/page (Brittany Chiang style)
  2. Spotify widget shows current/recent track (fallback if nothing playing)
  3. GitHub widget shows contribution activity or recent commits
  4. Sections animate in on scroll, cards have hover interactions
  5. Page has proper meta tags, dynamic OG images, and favicon
**Plans**: TBD

Plans:
- [ ] 03-01: Cursor glow + Framer Motion animations
- [ ] 03-02: Spotify + GitHub API widgets
- [ ] 03-03: SEO, OG images, favicon

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Foundation | 2/2 | Complete | 2026-02-02 |
| 2. Content Sections | 3/3 | Complete | 2026-02-02 |
| 3. Widgets & Polish | 3/3 | Complete | 2026-02-02 |
