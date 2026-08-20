import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";
import ui from "@/components/ui.module.css";
import { RecordPlayer } from "@/components/record-player";
import { blogPosts, reviews } from "@/lib/content";


export default function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/background.png"
          aria-hidden="true"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={`${ui.shell} ${styles.heroInner}`}>
          <div className={styles.heroTopline}>
            <span>PORTFOLIO /</span>
            <RecordPlayer />
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>XEZRIO&apos;S DIGITAL GARDEN</p>
            <h1 className={styles.heroTitle} id="hero-title">
              where the things I love live.
            </h1>
            <p className={styles.heroLede}>Thoughts, fragments, and what&apos;s on my mind.</p>
            <div className={styles.heroActions}>
              <Link className={styles.heroPrimary} href="#collections">Explore</Link>
              <Link className={styles.heroSecondary} href="/about">About me <span aria-hidden="true">↗</span></Link>
            </div>
          </div>

          <div className={styles.scrollCue} aria-hidden="true">
            <span>SCROLL TO EXPLORE</span>
            <i />
          </div>
        </div>
      </section>

      <section id="collections" className={`${ui.shell} ${styles.collectionSection}`} aria-labelledby="portals-title">
        <div className={styles.sectionTopline}>
          <div>
            <p>COLLECTIONS /</p>
            <h2 id="portals-title">Somewhere to wander.</h2>
          </div>
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
            <p>LATEST SIGNALS /</p>
            <h2 id="latest-title">Lately.</h2>
          </div>
        </div>

        <div className={styles.signalGrid}>
          {latestNotes.map((item, index) => (
            <Link className={styles.signalCard} href={item.href} key={item.href}>
              <div className={styles.signalBody}>
                <div className={styles.signalMeta}>
                  <span>{item.eyebrow}</span>
                  <time dateTime={item.publishedAt}>{item.publishedAtLabel}</time>
                </div>
                {/* choosable title */}
                {item.title ? (
                  <>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                  </>
                ) : (
                  <p className={styles.signalNote}>{item.excerpt}</p>
                )}
              </div>
              <div className={`${styles.signalMedia} ${styles.signalMediaInset}`}>
                {item.image ? (
                  <div className={styles.signalImageFrame}>
                    <Image
                      className={styles.signalImage}
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 760px) calc(100vw - 80px), (max-width: 900px) 248px, 188px"
                    />
                  </div>
                ) : (
                  <div
                    className={`${styles.signalPlaceholder} ${
                      item.kind === "blog"
                        ? styles.signalPlaceholderBlog
                        : styles.signalPlaceholderReview
                    }`}
                    aria-hidden="true"
                  >
                    <span>{item.kind === "blog" ? "WRITING" : "WATCH LOG"}</span>
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.closing} aria-label="结束语">
        <div className={`${ui.shell} ${styles.closingInner}`}>
          <p>PERSIST.</p>
          <h2>Stay Hungry, <span>Stay Foolish.</span></h2>
        </div>
      </section>
    </main>
  );
}

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
      publishedAt: item.publishedAt,
      publishedAtLabel: item.publishedAt.replaceAll("-", "."),
      image: item.image,
      imageAlt: item.imageAlt,
      kind: item.kind,
    };
  });

// The Portal of the three space
const portals = [
  {
    index: "01",
    overline: "WRITING / NOTES",
    display: "WORDS",
    title: "文字与碎片",
    description: "生活随想、技术笔记，以及没有必要被归类的片段。",
    href: "/blog",
    label: "进入博客",
  },
  {
    index: "02",
    overline: "FILM / ANIME",
    display: "FRAME",
    title: "放映室",
    description: "电影与番剧的观看记录，偶尔写一篇长评。",
    href: "/reviews",
    label: "浏览片单",
  },
  {
    index: "03",
    overline: "SMALL / USEFUL",
    display: "TOOLS",
    title: "小工具箱",
    description: "为自己做的浏览器工具，也希望它们刚好能帮到你。",
    href: "/tools",
    label: "翻翻工具箱",
  },
];
