import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import ui from "@/components/ui.module.css";
import { formatDate, reviews } from "@/lib/content";
import styles from "./reviews.module.css";

export const metadata: Metadata = {
  title: "放映室",
  description: "Xezrio 的电影、番剧观看记录与作品评论。",
};

export default function ReviewsPage() {
  return (
    <main className={`${ui.shell} ${ui.innerPage}`}>
      <PageIntro
        eyebrow="SCREENING ROOM / 放映室"
        title="散场以后，再多停留一会儿。"
        description="电影、番剧和那些值得反复回想的片段。长评与三两句观看记录都会在这里出现。"
      />

      <div className={styles.grid}>
        {reviews.map((item) => (
          <Link className={`${ui.glassCard} ${styles.card}`} href={`/reviews/${item.slug}`} key={item.slug}>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.posterTopline}><span>WATCH LOG</span><span>01</span></div>
              <span>FRAME</span>
              <i>AFTER THE CREDITS</i>
            </div>
            <div className={styles.body}>
              <div className={ui.contentMeta}>
                <span>{item.category}</span>
                <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
              </div>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.bottom}><span>{item.rating}</span><span>阅读全文 ↗</span></div>
            </div>
          </Link>
        ))}
        <div className={`${styles.card} ${styles.placeholder}`}>
          <span aria-hidden="true">02</span>
          <p>NEXT SCREENING</p>
          <h2>下一篇评论留给你真正想记录的作品。</h2>
        </div>
      </div>
    </main>
  );
}
