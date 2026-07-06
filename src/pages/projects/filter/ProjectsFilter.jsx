import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";

const ProjectsFilter = ({ activeFilter, onFilterChange }) => {
  const { t, i18n } = useTranslation();

  const filters = [
    { id: "all", label: t("projects.filters.all") },
    { id: "municipal", label: t("projects.filters.municipal") },
    { id: "startup", label: t("projects.filters.startup") },
    { id: "dashboard", label: t("projects.filters.dashboard") },
    { id: "uiux", label: t("projects.filters.uiux") },
    { id: "webapp", label: t("projects.filters.webapp") },
    { id: "mobile", label: t("projects.filters.mobile") },
  ];

  return (
    <section className={styles.filter_container}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          aria-pressed={activeFilter === filter.id}
          aria-label={filter.label}
          className={`${styles.filter_btn} ${
            activeFilter === filter.id ? styles.active : ""
          }`}
          onClick={() => onFilterChange(filter.id)}
        >
          <AnimatedSplit
            key={`${filter.id}-${i18n.language}`}
            text={`• ${filter.label}`}
            tagName="span"
            stagger={0.025}
            duration={1.5}
            start="top 90%"
          />
        </button>
      ))}
    </section>
  );
};

export default ProjectsFilter;
