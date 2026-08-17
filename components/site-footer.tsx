import Link from "next/link";
import styles from "./site-footer.module.css";
import ui from "./ui.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${ui.shell} ${styles.inner}`}>
        <div>
          <p className={styles.mark}>XEZRIO</p>
          <p className={styles.tagline}>Made slowly, with curiosity and late-night music.</p>
        </div>
        {/* <div className={styles.links}> */}
          <span className={styles.tagline}>Xezrio © 2026</span>
        {/* </div> */}
      </div>
    </footer>
  );
}
