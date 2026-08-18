import Link from "next/link";
import styles from "./site-footer.module.css";
import ui from "./ui.module.css";
import Image from "next/image";
import logo from '@/public/logo.png';
import favicon from '@/app/favicon.ico';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${ui.shell} ${styles.inner}`}>
        <div>
          <Image
            className={styles.logo}
            src={logo}
            alt=""
          />
          <p className={styles.tagline}>Made slowly, with curiosity and late-night music.</p>
          <span className={styles.tagline}>Xezrio © 2026</span>
        </div>
        <div className={styles.links}>
          <span className={styles.tagline}>Contact: </span>
          <a href="mailto:X@xezrio.com">X@xezrio.com</a>
        </div>
      </div>
    </footer>
  );
}
