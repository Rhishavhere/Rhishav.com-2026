import { useTranslation } from "react-i18next";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import styles from "./style.module.css";

/* calm opening before the pinned interactive panel sequence. reads the existing
   bilingual thesis (manifesto.header), then directs the user to the panels
   below. key={language} replays the reveal on language change. */
export default function ManifestIntro() {
  const { t, i18n } = useTranslation();

  return (
    <section className={styles.intro} key={i18n.language}>
      <div className={styles.top}>
        <AnimatedSplit
          text={t("manifesto.header.title")}
          className={styles.eyebrow}
          tagName="span"
          stagger={0.03}
          duration={1.2}
          start="top bottom"
        />
      </div>

      <AnimatedSplit
        text={t("manifesto.header.desc")}
        className={styles.statement}
        tagName="p"
        stagger={0.012}
        duration={1.4}
        start="top bottom"
      />

      <div className={styles.foot}>
        <AnimatedSplit
          text={t("manifesto.intro.scroll")}
          className={styles.cue}
          tagName="span"
          stagger={0.03}
          duration={1.2}
          start="top bottom"
        />
        <span className={styles.arrow} aria-hidden="true" />
      </div>
    </section>
  );
}
