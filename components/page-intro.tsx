import styles from "./page-intro.module.css";
import ui from "./ui.module.css";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className={styles.intro}>
      <p className={ui.eyebrow}>{eyebrow}</p>
      <h1>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>
  );
}
