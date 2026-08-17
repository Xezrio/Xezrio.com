import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ui from "@/components/ui.module.css";
import { formatDate, reviews } from "@/lib/content";

type ReviewPageProps = { params: Promise<{ slug: string }> };

// Pre-render one static page for every review slug in the content registry.
export function generateStaticParams() {
  return reviews.map(({ slug }) => ({ slug }));
}

// Give each generated review its own search and social metadata.
export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = reviews.find((review) => review.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    openGraph: { title: item.title, description: item.description, type: "article", publishedTime: item.publishedAt },
    twitter: { title: item.title, description: item.description },
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const item = reviews.find((review) => review.slug === slug);

  // Unknown slugs use the shared app/not-found.tsx page.
  if (!item) notFound();
  const { Component } = item;

  return (
    <main className={`${ui.shell} ${ui.articlePage}`}>
      <Link className={ui.backLink} href="/reviews">← 返回放映室</Link>
      <header className={ui.articleHeader}>
        <div className={ui.contentMeta}>
          <span>{item.category}</span>
          <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
          <span>{item.rating}</span>
        </div>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <div className={ui.tagRow}>{item.tags.map((tag: string) => <span key={tag}>#{tag}</span>)}</div>
      </header>
      <article className={ui.prose}><Component /></article>
      <nav className={ui.articleEnd} aria-label="评论结束后的导航">
        <span>END CREDITS · ◐</span>
        <Link href="/reviews">回到放映室 ↗</Link>
      </nav>
    </main>
  );
}
