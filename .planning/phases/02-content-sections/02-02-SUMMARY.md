# 02-02: Projects Section

## Completed
- **project-card.tsx**: Reusable card with `featured` and `compact` variants. StatusBadge (green/blue/purple) and TechTags extracted as internal components. whileHover scale animation. ExternalLink + Github icons from lucide-react.
- **projects.tsx**: Two-tier layout — Featured (large cards) then Client Work (compact). Both grids use useInView stagger animations independently.

## Decisions
- Compact variant uses `line-clamp-2` on description to keep cards uniform
- Featured variant uses slightly larger padding and title size
- StatusBadge moved from page.tsx inline component into project-card.tsx
