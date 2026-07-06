import styles from "./style.module.css";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import LineReveal from "@/components/reveal/LineReveal";
import { useTranslation } from "react-i18next";

export default function Aboutme() {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <AnimatedSplit
          key={`${i18n.language}-aboutme-title`}
          text={t("aboutmePage.title")}
          className={styles.header_title}
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
      </header>
      <div className={styles.context}>
        <LineReveal
          key={`${i18n.language}-aboutme-bio1`}
          text={t("aboutmePage.bio_1")}
          className={styles.desc}
          tagName="p"
          start="top 80%"
        />
      </div>
      <div className={styles.context}>
        <LineReveal
          key={`${i18n.language}-aboutme-bio2`}
          text={t("aboutmePage.bio_2")}
          className={styles.desc}
          tagName="p"
          start="top 70%"
        />
      </div>
    </div>
  );
}
