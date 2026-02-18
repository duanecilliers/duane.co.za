import type { MetadataRoute } from "next";
import { posts } from "#site/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `https://duane.co.za/blog/${post.slugAsParams}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    {
      url: "https://duane.co.za",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://duane.co.za/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts,
  ];
}
