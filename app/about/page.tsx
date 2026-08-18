import type { Metadata } from "next";
import Link from "next/link";
import ui from "@/components/ui.module.css";
import styles from "./about.module.css";
import Image from "next/image";
import pfp from '@/public/pfp-cat.jpg';
import mauuJam from "@/public/mauuJam.gif"

export const metadata: Metadata = {
  title: "关于",
  description: "关于 Xezrio，以及这个个人网站准备记录的内容。",
};

export default function AboutPage() {
  return (
    <main className={`${ui.shell} ${ui.innerPage}`}>
      <header className={styles.intro}>
        <p className={ui.eyebrow}>ABOUT /</p>
        <div className={styles.titleRow}>
          <h1>Hello, I am Xezrio.</h1>
          <Image
            className={styles.titleGif}
            src={mauuJam}
            alt=""
            unoptimized
          />
        </div>

        <p className={styles.description}>Have a cup of tea in my digital garden :D</p>
      </header>

      <div className={styles.layout}>
        <section className={`${ui.glassCard} ${styles.copy}`}>
          <h2>About me</h2>
          <p>I will fill this later</p>
        </section>

        <aside className={styles.side}>
          <div className={`${ui.glassCard} ${styles.avatar}`} aria-label="头像占位区域">
            <Image
              className={styles.pfp}
              src={pfp}
              alt="Xezrio's pfp"
              fill
              sizes="(max-width: 580px) 100vw, (max-width: 800px) 50vw, 35vw"
            />
          </div>
          <div className={`${ui.glassCard} ${styles.contactCard}`}>
            <p className={`${ui.eyebrow} ${styles.contactEyebrow}`}>FIND ME</p>
            <h2>社交链接待补充</h2>
            <p className={styles.contactDescription}>准备好真实链接后，可以在这里加入 GitHub、Bilibili、X、邮箱或其他主页。</p>
          </div>
        </aside>
      </div>

      <section className={styles.bottom}>
        <div><p className={`${ui.eyebrow} ${styles.bottomEyebrow}`}>GET TO KNOW MORE</p><h2>正式经历会放在另一个空间。</h2></div>
        <p> <Link href="resume.xezrio.com">resume.xezrio.com</Link> 会专门展示简历与项目；这里保留更松弛、更个人化的内容。</p>
        <Link className={`${ui.button} ${ui.buttonGhost}`} href="/">返回首页</Link>
      </section>
    </main>
  );
}
