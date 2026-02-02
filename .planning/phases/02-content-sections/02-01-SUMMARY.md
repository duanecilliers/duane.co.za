# 02-01: Hero + Now Sections

## Completed
- **hero.tsx**: Full-height hero with name, title, subtitle, location. Social links as icon buttons (Github, Linkedin, Twitter via lucide-react). Framer Motion staggered fade-in + slide-up on mount.
- **now.tsx**: "What I'm doing now" with updated date. Bullet list with cyan dot markers. useInView-triggered stagger animation on scroll.

## Decisions
- Added `name` display above title (font-mono, muted) for identity context
- Social icons use bordered square buttons rather than text links for visual weight
- Used `as const` on ease strings to satisfy Framer Motion's strict TypeScript types
