# 02-03: About + Life + Contact

## Completed
- **about.tsx**: Prose paragraphs with max-w-2xl. Fade-in on scroll via useInView.
- **life.tsx**: 4-col grid (2 on mobile). Centered emoji cards with hover lift (scale 1.05, y -4). Stagger animation on scroll.
- **contact.tsx**: Availability badge with pulsing green dot (animate-pulse). Mail icon on mailto button. Conditional available/booked state.

## Decisions
- Life cards use centered text layout with large emoji for visual impact
- Contact availability dot uses CSS animate-pulse (simpler than Framer for infinite loop)
- Used bg-card/50 on life cards for subtle differentiation from page background
