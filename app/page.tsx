import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";
import ui from "@/components/ui.module.css";
import { blogPosts, reviews } from "@/lib/content";
import heroImage from "@/public/background.png";

const latestNotes = [...blogPosts, ...reviews]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 4)
  .map((item, index) => {
    const isBlogPost = item.kind === "blog";

    return {
      eyebrow: `${isBlogPost ? "WRITTEN NOTE" : "WATCH LOG"} · ${String(index + 1).padStart(2, "0")}`,
      title: item.title,
      excerpt: item.description,
      href: `/${isBlogPost ? "blog" : "reviews"}/${item.slug}`,
      publishedAt: item.publishedAt.replaceAll("-", "."),
      kind: item.kind,
    };
  });

const portals = [
  {
    index: "01",
    overline: "WRITING / NOTES",
    display: "WORDS",
    title: "文字与碎片",
    description: "技术笔记、生活随想，以及没有必要被归类的片段。",
    href: "/blog",
    label: "进入博客",
  },
  {
    index: "02",
    overline: "FILM / ANIME",
    display: "FRAME",
    title: "放映室",
    description: "电影与番剧的观看记录，偶尔也认真写一篇长评。",
    href: "/reviews",
    label: "查看片单",
  },
  {
    index: "03",
    overline: "SMALL / USEFUL",
    display: "TOOLS",
    title: "小工具箱",
    description: "为自己做的浏览器工具，也希望它们刚好能帮到你。",
    href: "/tools",
    label: "打开工具箱",
  },
];

export default function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <Image
          className={styles.heroImage}
          src={heroImage}
          alt=""
          fill
          preload
          sizes="100vw"
        />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={`${ui.shell} ${styles.heroInner}`}>
          <div className={styles.heroTopline}>
            <span>XEZRIO / PERSONAL ARCHIVE</span>
            <span>EST. 2026</span>
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>XEZRIO&apos;S DIGITAL GARDEN</p>
            <h1 className={styles.heroTitle} id="hero-title">
              Where the things I love live.
            </h1>
            <p className={styles.heroLede}>Thoughts, fragments, and what's on my mind.</p>
            <div className={styles.heroActions}>
              <Link className={styles.heroPrimary} href="/blog">Explore</Link>
              <Link className={styles.heroSecondary} href="/about">About me <span aria-hidden="true">↗</span></Link>
            </div>
          </div>

          <div className={styles.scrollCue} aria-hidden="true">
            <span>SCROLL TO EXPLORE</span>
            <i />
          </div>
        </div>
      </section>

      <section className={styles.manifesto} aria-labelledby="manifesto-title">
        <div className={`${ui.shell} ${styles.manifestoInner}`}>
          <div className={styles.manifestoMeta}>
            <span>01</span>
            <span>A PERSONAL ARCHIVE</span>
          </div>
          <div className={styles.manifestoCopy}>
            <h2 id="manifesto-title">A digital garden that grows slowly with curiosity.</h2>
            <p>Come sit for a while.</p>
          </div>
          <p className={styles.manifestoNote}>写下所想，保存所见，也把偶尔做出来的小东西留在这里。</p>
        </div>
      </section>

      <section className={`${ui.shell} ${styles.collectionSection}`} aria-labelledby="portals-title">
        <div className={styles.sectionTopline}>
          <div>
            <p>02 / COLLECTIONS</p>
            <h2 id="portals-title">where you heading to.</h2>
          </div>
          <p>Start with<br />what you interested in.</p>
        </div>

        <div className={styles.portalGrid}>
          {portals.map((portal) => (
            <Link className={styles.portalCard} href={portal.href} key={portal.href}>
              <div className={styles.portalVisual} aria-hidden="true">
                <div className={styles.portalMeta}>
                  <span>{portal.index}</span>
                  <span>{portal.overline}</span>
                </div>
                <strong>{portal.display}</strong>
                <i>↗</i>
              </div>
              <div className={styles.portalBody}>
                <h3>{portal.title}</h3>
                <p>{portal.description}</p>
                <span>{portal.label} <i aria-hidden="true">↗</i></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${ui.shell} ${styles.latestSection}`} aria-labelledby="latest-title">
        <div className={styles.sectionTopline}>
          <div>
            <p>03 / LATEST SIGNALS</p>
            <h2 id="latest-title">最近留下的东西。</h2>
          </div>
          <Link className={styles.quietLink} href="/blog">查看全部内容 ↗</Link>
        </div>

        <div className={styles.signalGrid}>
          {latestNotes.map((item, index) => (
            <Link className={styles.signalCard} href={item.href} key={item.href}>
              <div className={`${styles.signalPoster} ${item.kind === "blog" ? styles.signalPosterBlog : styles.signalPosterReview}`}>
                <div className={styles.posterTopline}>
                  <span>{item.eyebrow}</span>
                  <span>{item.publishedAt}</span>
                </div>
                <span className={styles.posterNumber}>0{index + 1}</span>
                <strong>{item.kind === "blog" ? "NOTE" : "FRAME"}</strong>
                <i>{item.kind === "blog" ? "THOUGHTS IN PROGRESS" : "AFTER THE CREDITS"}</i>
              </div>
              <div className={styles.signalBody}>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <span>打开阅读 <i aria-hidden="true">↗</i></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.closing} aria-label="结束语">
        <div className={`${ui.shell} ${styles.closingInner}`}>
          <p>STILL CURIOUS.</p>
          <h2>继续看，继续想，<span>继续做喜欢的事。</span></h2>
          <Link href="/about">More about Xezrio <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
