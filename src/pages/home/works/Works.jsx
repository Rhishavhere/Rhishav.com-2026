import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import gsap from "gsap";

import { useProjects } from "@/hooks/useProjects";
import { useProjectCursor } from "@/hooks/useProjectCursor";
import ProjectCard from "@/components/project-card/ProjectCard";
import ProjectSkeleton from "@/components/project-skeleton/ProjectSkeleton";
import styles from "./style.module.css";

const WorksHomePage = () => {
  const { t } = useTranslation();
  const { data: projects, isLoading, isError } = useProjects();

  const cursorWords = t("worksHome.cursorWords", { returnObjects: true });

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
    gsap.fromTo(el, { scale: 0.97 }, { scale: 1, duration: 0.3, ease: "hop" });
  };

  const lastThreeWorks = useMemo(() => projects?.slice(0, 6) || [], [projects]);

  if (isLoading) {
    return (
      <div className="relative flex w-screen flex-col items-start gap-[10vh]">
        <div className="grid w-screen grid-cols-4 gap-x-0 gap-y-[10vh] max-[1024px]:grid-cols-2 max-[1024px]:gap-y-[5vh] max-[600px]:grid-cols-1 max-[600px]:gap-y-[2.5vh]">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <div className="relative flex w-screen flex-col items-start gap-[10vh]">
        <p className="px-[1vw] py-[6em] !text-[0.9em] !font-[300] text-[var(--wb500)]">
          ● {t("worksHome.error")}
        </p>
      </div>
    );

  return (
    <div className="relative flex w-screen flex-col items-start gap-[10vh]">
      <div className="grid w-screen grid-cols-4 gap-x-0 gap-y-[10vh] max-[1024px]:grid-cols-2 max-[1024px]:gap-y-[5vh] max-[600px]:grid-cols-1 max-[600px]:gap-y-[2.5vh]">
        {lastThreeWorks.map((work, index) => (
          <ProjectCard
            key={work.link}
            work={work}
            index={index}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
          />
        ))}
      </div>

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

export default WorksHomePage;
