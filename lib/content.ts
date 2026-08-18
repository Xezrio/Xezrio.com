import DigitalGardenPost from "@/content/blog/building-my-digital-garden.mdx";
import AfterTheCreditsReview from "@/content/reviews/after-the-credits.mdx";

// Import an MDX file and register its metadata here to publish a new entry.
export const blogPosts = [
  {
    slug: "building-my-digital-garden",
    title: "It starts today!",
    description: "What should I put here?",
    publishedAt: "2026-08-16",
    readingTime: "<1 min",
    tags: ["建站", "随笔"],
    // Put the file in public, then use a path such as "/articles/my-post.jpg".
    image: "",
    imageAlt: "",
    kind: "blog" as const,
    Component: DigitalGardenPost,
  },
];

export const reviews = [
  {
    slug: "after-the-credits",
    title: "看完之后，还想把这种心情留下来",
    description: "一篇等待被替换的放映室示例：关于散场以后，作品如何继续留在记忆里。",
    publishedAt: "2026-08-16",
    category: "随想",
    rating: "— / 10",
    tags: ["电影", "动画", "示例"],
    image: "",
    imageAlt: "",
    kind: "review" as const,
    Component: AfterTheCreditsReview,
  },
];

export function formatDate(date: string) {
  // Local midnight prevents a date-only value from shifting across time zones.
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
