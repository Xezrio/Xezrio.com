import type { MetadataRoute } from "next";
import { blogPosts, reviews } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://xezrio.com";
  const routes = ["", "/blog", "/reviews", "/tools", "/about"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-08-16"),
  }));

  // Include every registered article alongside the fixed application routes.
  return [
    ...routes,
    ...blogPosts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: new Date(post.publishedAt) })),
    ...reviews.map((review) => ({ url: `${baseUrl}/reviews/${review.slug}`, lastModified: new Date(review.publishedAt) })),
  ];
}
