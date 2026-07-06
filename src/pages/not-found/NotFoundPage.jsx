import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import styles from "./style.module.css";

export default function NotFoundPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.container}>
      <AnimatedSplit
        key={`${i18n.language}-404-title`}
        text={t("notFound.title")}
        className={styles.title}
        tagName="h1"
        stagger={0.03}
        duration={1.5}
        start="top 100%"
      />
      <AnimatedSplit
        key={`${i18n.language}-404-text`}
        text={t("notFound.text")}
        className={styles.text}
        tagName="p"
        stagger={0.03}
        duration={1.5}
        start="top 100%"
      />
      <Link to="/" className={styles.link}>
        <AnimatedSplit
          key={`${i18n.language}-404-link`}
          text={`● ${t("notFound.link")}`}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 100%"
        />
      </Link>
    </div>
  );
}
