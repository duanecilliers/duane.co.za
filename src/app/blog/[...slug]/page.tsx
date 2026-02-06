import { posts } from "#site/content";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import "@/styles/mdx.css";

interface PostPageProps {
  params: Promise<{ slug: string[] }>;
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const { slug } = await params;
  const slugPath = slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slugPath);
  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Duane Cilliers`,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground no-underline hover:text-foreground"
        >
          ← Back to blog
        </Link>

        <header className="not-prose mb-8">
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
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-4 text-lg text-muted-foreground">
              {post.description}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
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
        </header>

        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>
    </main>
  );
}
