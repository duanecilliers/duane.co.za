# 03-01: Cursor Glow + Animation Polish

## Completed

### Cursor Glow (`src/components/ui/cursor-glow.tsx`)
- Framer Motion `useMotionValue` + `useSpring` for smooth mouse tracking
- 1000px radial gradient with cyan/blue at ~6-7% opacity
- Auto-disabled on touch devices (ontouchstart + pointer: coarse detection)
- Only visible in dark mode (`hidden dark:block`)
- Mounted in root layout before main content

### Animated Section (`src/components/ui/animated-section.tsx`)
- Reusable wrapper: fade-in + translateY(20→0), 0.5s easeOut
- `useInView` with `once: true`
- `useReducedMotion` from framer-motion — skips all animations when user prefers reduced motion

### Animation Polish
- Project cards: added `transition-all duration-200` + `hover:shadow-lg hover:shadow-accent-brand/5`
- Hobby cards: added shadow glow on hover matching project cards
- Social icons: already had `transition-colors` + hover color change to accent-brand; added `duration-200`
- Nav links: already had Framer Motion `layoutId` active indicator
- `scroll-behavior: smooth` and `scroll-padding-top: 5rem` confirmed in globals.css

## Commits
- `feat(03-01): cursor glow spotlight effect`
- `feat(03-01): animation polish and reduced-motion support`
