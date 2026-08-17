import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import ui from "@/components/ui.module.css";
import styles from "./tools.module.css";

export const metadata: Metadata = {
  title: "Toolbox",
  description: "Toolbox made for you.",
};

const tools = [
  {
    index: "01",
    symbol: "⌁",
    title: "在线音频裁剪器",
    description: "上传本地音频，选择片段并在浏览器内完成导出。文件不会离开你的设备。",
    state: "NEXT UP",
  },
  {
    index: "02",
    symbol: "◫",
    title: "更多小工具",
    description: "这里会慢慢加入那些因为自己需要，所以顺手做出来的实用小东西。",
    state: "PLANNED",
  },
];

export default function ToolsPage() {
  return (
    <main className={`${ui.shell} ${ui.innerPage}`}>
      <PageIntro
        eyebrow="TOOLS / 小工具箱"
        title="小而顺手，打开就能用。"
        description="这些工具会尽可能在浏览器本地运行，不要求注册，也不把你的文件留在服务器上。"
      />

      <div className={styles.grid}>
        {tools.map((tool) => (
          <article className={`${ui.glassCard} ${styles.card}`} key={tool.title}>
            <div className={styles.topline}><span>{tool.index}</span><span>{tool.state}</span></div>
            <div className={styles.symbol} aria-hidden="true">{tool.symbol}</div>
            <h2 className={styles.title}>{tool.title}</h2>
            <p className={styles.description}>{tool.description}</p>
            <span className={styles.state}>第一阶段先预留入口</span>
          </article>
        ))}
      </div>

      <aside className={styles.principle}>
        <span aria-hidden="true">✦</span>
        <div><h2>工具制作原则</h2><p>少收集数据、说明处理方式、优先本地完成，并认真照顾手机端和键盘操作。</p></div>
      </aside>
    </main>
  );
}
