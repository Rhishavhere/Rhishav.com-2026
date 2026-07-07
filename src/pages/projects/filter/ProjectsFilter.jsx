import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";

const ProjectsFilter = ({ activeFilter, onFilterChange }) => {
  const { t, i18n } = useTranslation();

  const filters = [
    { id: "all", label: t("projects.filters.all") },
    { id: "founder", label: t("projects.filters.founder") },
    { id: "agent", label: t("projects.filters.agent") },
    { id: "browser", label: t("projects.filters.browser") },
    { id: "systems", label: t("projects.filters.systems") },
    { id: "open-source", label: t("projects.filters.openSource") },
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
