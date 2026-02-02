# Plan 01-01: Project Scaffolding — Summary

## Completed: 2026-02-02

### What was built

**Task 1: Next.js 15 Project Scaffold**
- Initialized Next.js 16.1.6 (latest) with TypeScript, Tailwind CSS v4, ESLint, App Router, src directory
- Installed framer-motion, next-themes, @vercel/og
- Initialized shadcn/ui with default config and added Button component
- Build passes clean with zero warnings

**Task 2: Theme, Fonts, Root Layout**
- Geist Sans (body, `--font-sans`) and JetBrains Mono (code/accent, `--font-mono`) configured via next/font
- ThemeProvider wrapping app: dark default, class-based toggling, no system preference
- Custom CSS properties for dark (#0a0a0b bg) and light (#ffffff bg) modes
- Accent colors: cyan (#22d3ee dark / #0ea5e9 light) — used as `accent-brand`
- Metadata set: "Duane Cilliers — Maker"

**Task 3: Centralized Site Data**
- `src/data/site.ts` with full TypeScript interfaces (SocialLink, Project, Hobby, NavItem)
- All content data: hero, about, now, projects (featured + client), hobbies, contact, nav
- `.env.local.example` with placeholder comments

### Commits
1. `feat(01-01): scaffold next.js 15 project with dependencies`
2. `feat(01-01): configure theme, fonts, and root layout`
3. `feat(01-01): add centralized site data layer`
