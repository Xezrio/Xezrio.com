import Link from "next/link";
import styles from "./site-header.module.css";
import ui from "./ui.module.css";
import logo from "@/public/logo.png"
import Image from "next/image";

const navigation = [
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Salon" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`${ui.shell} ${styles.navShell}`}>
        <Link className={styles.wordmark} href="/" aria-label="return to Home of xezrio.com">
          <Image
            className={styles.logo}
            src={logo}    
            alt=""
            preload
          />
        </Link>
        <nav className={styles.navigation} aria-label="主要导航">
          {navigation.map((item, index) => (
            <Link
              className={`${styles.navLink} ${index > 1 ? styles.hideOnMobile : ""}`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className={styles.status} title="网站正在建设中">
          <i className={styles.statusDot} aria-hidden="true" /> PHASE 01
        </span>
      </div>
    </header>
  );
}
