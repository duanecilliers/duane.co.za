import { posts } from "#site/content";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Duane Cilliers",
  description: "Thoughts on web development, design, and building things.",
};

export default function BlogPage() {
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-12 text-4xl font-bold tracking-tight">Blog</h1>

        {publishedPosts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon.</p>
        ) : (
          <ul className="space-y-8">
            {publishedPosts.map((post) => (
              <li key={post.slug}>
                <article className="group">
                  <Link href={`/blog/${post.slugAsParams}`} className="block">
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
                    <h2 className="mt-1 text-xl font-semibold group-hover:underline">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="mt-2 text-muted-foreground">
                        {post.description}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
