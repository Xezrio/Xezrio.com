import type { Metadata } from "next";
import Link from "next/link";
import ui from "@/components/ui.module.css";
import styles from "./about.module.css";
import Image from "next/image";
import mauuJam from "@/public/mauuJam.gif"
import mauExcited from "@/public/mauExcited.gif"
import { VideoBackground } from "@/components/video-background";
import {
  SiGithub,
  SiBilibili,
  SiInstagram,
  SiDiscord,
  SiX,
} from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import { AboutPaper } from "./about-paper";

export const metadata: Metadata = {
  title: "About",
  description: "About Xezrio.",
};

export default function AboutPage() {
  return (
    <main className={`${styles.page} ${ui.innerPage}`}>
      <VideoBackground
        src="/backgrounds/about/about-background.mp4"
        poster="/backgrounds/about/about-background.png"
      />
      <div className={ui.shell}>
        <header className={styles.intro}>
          <p className={`${ui.eyebrow} ${styles.eyebrowAdjust}`}>ABOUT /</p>
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
          <AboutPaper />
          {/* FIND ME */}
          <aside className={`${styles.contactCard}`}>
            <p className={`${ui.eyebrow} ${styles.contactEyebrow} ${styles.eyebrowAdjust}`}>FOLLOW ME ON</p>
            <div className={styles.findMeRow}>
              <h2>my social links!</h2>
              <Image
                className={styles.findMeGif}
                src={mauExcited}
                alt=""
                unoptimized
              />
            </div>
            <nav className={styles.socialList} aria-label="社交链接">
              {socialLinks.map(({ label, username, href, Icon, external }) => (
                <a
                  className={styles.socialLink}
                  href={href}
                  key={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  <span className={styles.socialIcon}>
                    <Icon aria-hidden="true" />
                  </span>
                  <span>{label}</span>
                </a>
              ))}
            </nav>
          </aside>
        </div>

        <section className={styles.bottom}>
          <div>
            <p className={`${ui.eyebrow} ${styles.bottomEyebrow}`}>GET TO KNOW MORE</p>
            <h2>A few scattered pieces of who I am.</h2>
          </div>
          <p> <Link href="me.xezrio.com" className={styles.meLink}>me.xezrio.com</Link> for more about my personality.</p>
          <Link className={`${ui.button} ${ui.buttonGhost} ${styles.toHomepage}`} href="/">Homepage</Link>
        </section>
      </div>
    </main>
  );
}

const socialLinks = [
  {
    label: "GitHub",
    username: "Xezrio",
    href: "https://github.com/Xezrio",
    Icon: SiGithub,
    external: true,
  },
  {
    label: "Bilibili",
    username: "Xezrio",
    href: "https://space.bilibili.com/283449632",
    Icon: SiBilibili,
    external: true,
  },
  {
    label: "Twitter",
    username: "Maxezrio",
    href: "https://x.com/maxezrio",
    Icon: SiX,
    external: true,
  },
  {
    label: "Instagram",
    username: "xezrio_",
    href: "https://www.instagram.com/xezrio_/",
    Icon: SiInstagram,
    external: true,
  },
    {
    label: "Discord",
    username: "X@xezrio.com",
    href: "https://discord.gg/zuFeS2kUT",
    Icon: SiDiscord,
    external: true,
  },
  {
    label: "Email",
    username: "X@xezrio.com",
    href: "mailto:X@xezrio.com",
    Icon: MdOutlineEmail,
    external: false,
  },
];