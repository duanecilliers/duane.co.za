"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { ArrowRight } from "lucide-react";

interface Post {
  slug: string;
  slugAsParams: string;
  title: string;
  description?: string;
  date: string;
  published: boolean;
  tags?: string[];
}

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export function Blog({ posts }: { posts: Post[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const latestPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (latestPosts.length === 0) return null;

  return (
    <Section id="blog" title="Blog">
      <motion.div
        ref={ref}
        className="grid gap-6"
        variants={grid}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {latestPosts.map((post) => (
          <motion.article key={post.slug} variants={card}>
            <Link
              href={`/blog/${post.slugAsParams}`}
              className="group block rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent-brand/50 hover:bg-accent/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <time
                    dateTime={post.date}
                    className="text-sm text-muted-foreground"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="mt-1 text-lg font-semibold group-hover:text-accent-brand">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-2 text-muted-foreground line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <ArrowRight className="mt-1 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent-brand" />
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>

      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all posts
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
