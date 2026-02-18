---
title: Hello World
description: The first post on my new blog, built with Next.js and Obsidian.
date: 2026-02-05
published: true
tags:
  - meta
  - nextjs
---

# Hello World

Welcome to my blog. This is the first post, written directly in Obsidian and statically built with Next.js.

## Why Obsidian?

I've been using Obsidian for my personal knowledge management for a while now. It's fast, flexible, and works with plain markdown files. The idea of writing blog posts in the same place I keep my notes just makes sense.

## The Setup

This blog is powered by:

- **Next.js 16** - The React framework
- **Velite** - Transforms markdown into type-safe data at build time
- **Obsidian** - Where I write everything

The posts live in my Obsidian vault at `~/brain/projects/duane.co.za/blog/`. When I build the site, Velite reads the markdown files, parses the frontmatter, and generates static pages.

## Code Example

Here's a simple TypeScript snippet:

```typescript
const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greeting("World"));
```

## What's Next

I'll be writing about web development, design, and whatever else interests me. Stay tuned.
