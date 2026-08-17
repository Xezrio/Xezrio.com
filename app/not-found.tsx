import Link from "next/link";
import ui from "@/components/ui.module.css";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={`${ui.shell} ${styles.page}`}>
      <p className={`${ui.eyebrow} ${styles.eyebrow}`}>404 / SIGNAL LOST</p>
      <div className={styles.symbol} aria-hidden="true">☂</div>
      <h1>这一页还没有出现在雨里。</h1>
      <p className={styles.description}>可能是链接写错了，也可能这个角落还在等待建设。</p>
      <Link className={`${ui.button} ${ui.buttonPrimary}`} href="/">回到首页</Link>
    </main>
  );
}
