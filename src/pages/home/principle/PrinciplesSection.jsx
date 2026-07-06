import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";

export default function PrinciplesSection() {
  const { t } = useTranslation();
  const principles = t("principles.list", { returnObjects: true });

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <AnimatedSplit
          key={t("principles.title")}
          text={t("principles.title")}
          className={styles.title}
          tagName="h2"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
        <div className={styles.items}>
          {Array.isArray(principles) &&
            principles.map((p, i) => (
              <AnimatedSplit
                key={`${p}-${i}`}
                text={p}
                className={styles.item}
                tagName="p"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
              />
            ))}
        </div>
      </div>
    </section>
  );
}
