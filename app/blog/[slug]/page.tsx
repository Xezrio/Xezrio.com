import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ui from "@/components/ui.module.css";
import { blogPosts, formatDate } from "@/lib/content";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-render one static page for every blog slug in the content registry.
export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

// Give each generated article its own search and social metadata.
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = blogPosts.find((post) => post.slug === slug);

  if (!item) return {};

  const metadataTitle = item.title ?? `文字片段 · ${formatDate(item.publishedAt)}`;

  return {
    title: metadataTitle,
    description: item.description,
    openGraph: {
      title: metadataTitle,
      description: item.description,
      type: "article",
      publishedTime: item.publishedAt,
    },
    twitter: { title: metadataTitle, description: item.description },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const item = blogPosts.find((post) => post.slug === slug);

  // Unknown slugs use the shared app/not-found.tsx page.
  if (!item) notFound();

  const { Component } = item;

  return (
    <main className={`${ui.shell} ${ui.articlePage}`}>
      <Link className={ui.backLink} href="/blog">← 返回博客</Link>
      <header className={ui.articleHeader}>
        <div className={ui.contentMeta}>
          <span>{item.title ? "BLOG" : "NOTE"}</span>
          <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
          {item.readingTime && <span>{item.readingTime}</span>}
        </div>
        {item.title ? (
          <>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </>
        ) : (
          <h1 className={ui.visuallyHidden}>文字片段</h1>
        )}
        <div className={ui.tagRow}>{item.tags.map((tag: string) => <span key={tag}>#{tag}</span>)}</div>
      </header>
      <article className={ui.prose}><Component /></article>
      <nav className={ui.articleEnd} aria-label="文章结束后的导航">
        <span>END OF SIGNAL · ✦</span>
        <Link href="/blog">继续浏览文章 ↗</Link>
      </nav>
    </main>
  );
}
