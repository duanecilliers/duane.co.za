# duane.co.za

My personal website and blog.

## Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS v4
- **Blog**: Markdown via [Velite](https://velite.js.org)
- **Deployment**: Vercel

## Development

```bash
pnpm install
pnpm dev
```

## Blog

Posts live in `content/blog/` as markdown files with YAML frontmatter. Velite processes them at build time.

```bash
# Sync posts from Obsidian vault
pnpm sync-blog

# Build
pnpm build
```

## License

MIT
