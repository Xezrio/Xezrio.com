import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import ui from "@/components/ui.module.css";
import { blogPosts, formatDate } from "@/lib/content";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Xezrio 的技术笔记、生活随想，以及没有必要被归类的文字碎片。",
};

export default function BlogPage() {
  return (
    <main className={`${ui.shell} ${ui.innerPage}`}>
      <PageIntro
        eyebrow="BLOG / 文字与碎片"
        title="Something left unsaid."
        description="Anything that pop up to me :)"
      />

      <div className={styles.list}>
        {blogPosts.map((item) => (
          <Link className={styles.card} href={`/blog/${item.slug}`} key={item.slug}>
            <div className={styles.copy}>
              <div className={ui.contentMeta}>
                <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
              </div>
              {/* 可选标题 */}
              {item.title ? (
                <>
                  <h2 className={styles.title}>{item.title}</h2>
                  <p className={styles.description}>{item.description}</p>
                </>
              ) : (
                <p className={styles.notePreview}>{item.description}</p>
              )}
              <div className={ui.tagRow}>
                {item.tags.map((tag: string) => <span key={tag}>#{tag}</span>)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
