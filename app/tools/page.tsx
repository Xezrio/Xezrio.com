import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import ui from "@/components/ui.module.css";
import styles from "./tools.module.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Toolbox",
  description: "Toolbox made for you.",
};

const tools = [
  {
    index: "01",
    symbol: "/tools/icons/audio-cutter.png",
    title: "在线音频裁剪器",
    description: "上传本地音频，选择片段并在浏览器导出。",
    state: "NEXT UP",
  },
  {
    index: "02",
    symbol: "/",
    title: "More Tools",
    description: "Coming soon.",
    state: "PLANNED",
  },
];

export default function ToolsPage() {
  return (
    <main className={`${ui.shell} ${ui.innerPage}`}>
      <PageIntro
        eyebrow="TOOLS / 小工具箱"
        title=""
        description=""
      />

      <div className={styles.grid}>
        {tools.map((tool) => (
          <article className={`${ui.glassCard} ${styles.card}`} key={tool.title}>
            {tool.symbol && (
              <div className={styles.symbolFrame}>
                <Image
                  src={tool.symbol}
                  alt=""
                  fill
                  sizes="100px"
                  aria-hidden="true"
                />
              </div>
            )}
            <h2 className={styles.title}>{tool.title}</h2>
            <p className={styles.description}>{tool.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
