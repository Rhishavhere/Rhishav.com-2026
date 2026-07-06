import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

// Components
import ProjectsHeader from "@/pages/projects/header/ProjectsHeader";
import ProjectsFilter from "@/pages/projects/filter/ProjectsFilter";
import ProjectCard from "@/components/project-card/ProjectCard";
import ProjectSkeleton from "@/components/project-skeleton/ProjectSkeleton";
import ContactHomePage from "@/pages/home/contact/ContactHomePage";

// Context, Hooks & Styles
import styles from "./style.module.css";
import { useProjectCursor } from "@/hooks/useProjectCursor";
import { useProjects } from "@/hooks/useProjects";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: projects, isLoading, isError } = useProjects();

  const cursorWords = t("projects.cursor", { returnObjects: true });

  const {
    cursorRef,
    cursorStylesRef,
    cursorTextRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useProjectCursor(cursorWords);

  const filteredProjects = useMemo(() => {
    const safeProjects = projects || [];
    return activeFilter === "all"
      ? safeProjects
      : safeProjects.filter((project) => project.tags?.includes(activeFilter));
  }, [projects, activeFilter]);

  if (isError)
    return (
      <div className={styles.container}>
        <p className={styles.error}>● {t("projects.error")}</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <ProjectsHeader />

      <ProjectsFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className={styles.main}>
        {isLoading
          ? // show skeletons while data is loading
            Array.from({ length: 6 }).map((_, index) => (
              <ProjectSkeleton key={`skeleton-${index}`} />
            ))
          : // render real projects once data arrives
            filteredProjects.map((work, index) => (
              <ProjectCard
                key={work.link}
                work={work}
                index={index}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            ))}
      </div>

      <ContactHomePage />

      <span
        ref={cursorRef}
        className={styles.customCursor}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          transform: "scale(0)",
          backgroundColor: cursorStylesRef.current.bg,
          color: cursorStylesRef.current.color,
          zIndex: 99999,
        }}
      >
        ● {cursorTextRef.current}
      </span>
    </div>
  );
};

export default ProjectsPage;
