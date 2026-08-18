import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import styles from "./layout.module.css";
import localFont from "next/font/local"
import { Nunito } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://xezrio.com"),
  title: { default: "Xezrio - Digital Garden", template: "%s - Xezrio" },
  description: "Xezrio 的个人数字花园，收藏文字、影像、灵感与亲手制作的小工具。",
  applicationName: "xezrio.com",
  openGraph: {
    title: "Xezrio — Personal Digital Garden",
    description: "一个收藏文字、影像、灵感与小作品的个人网络角落。",
    url: "https://xezrio.com",
    siteName: "xezrio.com",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "xezrio.com Personal Digital Garden",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xezrio — Personal Digital Garden",
    description: "一个收藏文字、影像、灵感与小作品的个人网络角落。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${handwriting.variable} ${nunito.variable}`}
    >
      <body>
        <div className={styles.ambientBackground} aria-hidden="true">
          <span className={`${styles.aurora} ${styles.auroraOne}`} />
          <span className={`${styles.aurora} ${styles.auroraTwo}`} />
          <span className={styles.grain} />
          <span className={styles.rainLines} />
        </div>
        <SiteHeader />
          {children}
        <SiteFooter />
      </body>
    </html>
  );
}

const handwriting = localFont({
  src: [
    {
      path: "./fonts/BradleysPen.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/BradleyHandBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-handwriting",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});