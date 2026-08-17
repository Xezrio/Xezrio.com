import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import ui from "@/components/ui.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "关于",
  description: "关于 Xezrio，以及这个个人网站准备记录的内容。",
};

export default function AboutPage() {
  return (
    <main className={`${ui.shell} ${ui.innerPage}`}>
      <PageIntro
        eyebrow="ABOUT / 关于"
        title="你好，我是 Xezrio。"
        description="Developer, researcher, and builder. 这一页仍然是一张等待你亲自填写的自我介绍。"
      />

      <div className={styles.layout}>
        <section className={`${ui.glassCard} ${styles.copy}`}>
          <h2>关于我</h2>
          <p>我对前端交互、深度学习算法和个人数字工具感兴趣，也喜欢把看过的电影、动画与偶然出现的想法记录下来。</p>
          <p>相比一份被固定下来的网络简历，我更希望这个网站能随着兴趣不断变化。今天可能多出一篇技术笔记，明天也可能只是增加一首适合雨夜播放的背景音乐。</p>
          <p className={styles.editableHint}>这里的文字是根据当前主页整理的占位版本，可以直接替换成你的正式 bio。</p>
        </section>

        <aside className={styles.side}>
          <div className={`${ui.glassCard} ${styles.avatar}`} aria-label="头像占位区域">
            <span>X</span>
            <small>YOUR AVATAR HERE</small>
          </div>
          <div className={`${ui.glassCard} ${styles.contactCard}`}>
            <p className={`${ui.eyebrow} ${styles.contactEyebrow}`}>FIND ME</p>
            <h2>社交链接待补充</h2>
            <p className={styles.contactDescription}>准备好真实链接后，可以在这里加入 GitHub、Bilibili、X、邮箱或其他主页。</p>
          </div>
        </aside>
      </div>

      <section className={styles.bottom}>
        <div><p className={`${ui.eyebrow} ${styles.bottomEyebrow}`}>ELSEWHERE</p><h2>正式经历会放在另一个空间。</h2></div>
        <p>未来的 <code>resume.xezrio.com</code> 会专门展示简历与项目；这里继续保留更松弛、更个人化的内容。</p>
        <Link className={`${ui.button} ${ui.buttonGhost}`} href="/">返回首页</Link>
      </section>
    </main>
  );
}
