import { useTranslation } from "react-i18next";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import styles from "./style.module.css";

const ProjectsHeader = () => {
  const { t, i18n } = useTranslation();

  return (
    <header className={styles.header}>
      <AnimatedSplit
        key={`title-${i18n.language}`}
        text={t("projects.header_title")}
        className={styles.header_title}
        tagName="h1"
        stagger={0.05}
        duration={1.5}
        start="top 90%"
      />

      <AnimatedSplit
        key={`desc-${i18n.language}`}
        text={t("projects.header_desc")}
        className={styles.header_desc}
        tagName="p"
        stagger={0.03}
        duration={1.5}
        start="top 90%"
      />
    </header>
  );
};

export default ProjectsHeader;
