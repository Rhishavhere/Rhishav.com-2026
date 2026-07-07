import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

import ProjectsHeader from "@/pages/projects/header/ProjectsHeader";
import ProjectsFilter from "@/pages/projects/filter/ProjectsFilter";
import ProjectsShowcase from "@/components/projects/ProjectsShowcase";
import ProjectSkeleton from "@/components/project-skeleton/ProjectSkeleton";
import ContactHomePage from "@/pages/home/contact/ContactHomePage";

import { useProjectCursor } from "@/hooks/useProjectCursor";
import { useProjects } from "@/hooks/useProjects";
import styles from "./style.module.css";

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

  const handleTouchStart = (e) => {
    const el = e.currentTarget;
    gsap.fromTo(el, { scale: 0.98 }, { scale: 1, duration: 0.3, ease: "hop" });
  };

  const filteredProjects = useMemo(() => {
    const safeProjects = projects || [];
    return activeFilter === "all"
      ? safeProjects
      : safeProjects.filter((project) => project.tags?.includes(activeFilter));
  }, [projects, activeFilter]);

  if (isError) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center px-[4vw]">
        <p className="text-[0.95em] font-[300] text-[var(--wb500)]">
          ● {t("projects.error")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-[8vh] pb-[12vh] pt-[14vh]">
      <ProjectsHeader />

      <div className="flex w-full flex-col items-center gap-[4vh]">
        <ProjectsFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {isLoading ? (
        <div className="grid w-full grid-cols-2 gap-[5vh] px-[2vw] max-[600px]:grid-cols-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <ProjectsShowcase
          projects={filteredProjects}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
        />
      )}

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
