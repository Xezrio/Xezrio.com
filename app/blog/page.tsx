import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import ui from "@/components/ui.module.css";
import { blogPosts, formatDate } from "@/lib/content";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "博客",
  description: "Xezrio 的技术笔记、生活随想，以及没有必要被归类的文字碎片。",
};

export default function BlogPage() {
  return (
    <main className={`${ui.shell} ${ui.innerPage}`}>
      <PageIntro
        eyebrow="BLOG / 文字与碎片"
        title="Something left unsaid."
        description="技术、生活与偶尔冒出来的念头。文章目前以 MDX 文件保存，打开编辑器就可以继续写。"
      />

      <div className={styles.list}>
        {blogPosts.map((item, index) => (
          <Link className={styles.card} href={`/blog/${item.slug}`} key={item.slug}>
            <div className={styles.poster} aria-hidden="true">
              <div className={styles.posterTopline}>
                <span>WRITTEN NOTE</span>
                <span>0{index + 1}</span>
              </div>
              <span className={styles.posterOrbit} />
              <strong>NOTE</strong>
              <i>THOUGHTS IN PROGRESS</i>
            </div>
            <div className={styles.copy}>
              <div className={ui.contentMeta}>
                <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                <span>{item.readingTime}</span>
              </div>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.description}>{item.description}</p>
              <div className={ui.tagRow}>
                {item.tags.map((tag: string) => <span key={tag}>#{tag}</span>)}
              </div>
              <span className={styles.readMore}>打开阅读 ↗</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
