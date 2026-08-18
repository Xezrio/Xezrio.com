import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import ui from "@/components/ui.module.css";
import { formatDate, reviews } from "@/lib/content";
import styles from "./reviews.module.css";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Xezrio 的电影、番剧观看记录与作品评论。",
};

export default function ReviewsPage() {
  return (
    <main className={`${ui.shell} ${ui.innerPage}`}>
      <PageIntro
        eyebrow="SCREENING ROOM / 放映室"
        title="Linger on it a little longer."
        description="Albums. TV Serires. Just my kind of things."
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
          <h2>下一部印象深刻的作品</h2>
        </div>
      </div>
    </main>
  );
}
