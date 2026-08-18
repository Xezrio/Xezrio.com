import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { FiUser } from "react-icons/fi";
import styles from "./site-header.module.css";
import ui from "./ui.module.css";
import logo from "@/public/logo.png";

const navigation = [
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Reviews" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
];

type HeaderUser = {
  name: string;
  avatar: string | StaticImageData;
};

type SiteHeaderProps = {
  user?: HeaderUser | null;
};

export function SiteHeader({ user = null }: SiteHeaderProps) {
  const displayName = user?.name ?? "Login";

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
        <Link
          className={styles.profileLink}
          href="/about"
          aria-label={user ? `${displayName} 's Personal Page'` : "Register"}
          title={user ? displayName : "Guest"}
        >
          <span className={styles.username}>{displayName}</span>
          <span className={styles.avatarFrame}>
            {user ? (
              <Image
                className={styles.pfp}
                src={user.avatar}
                alt=""
                width={30}
                height={30}
              />
            ) : (
              <FiUser className={styles.guestAvatar} aria-hidden="true" />
            )}
          </span>
        </Link>
      </div>
    </header>
  );
}
