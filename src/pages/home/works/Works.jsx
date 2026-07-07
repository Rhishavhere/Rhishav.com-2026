import { useTranslation } from "react-i18next";
import gsap from "gsap";

import { useProjects } from "@/hooks/useProjects";
import { useProjectCursor } from "@/hooks/useProjectCursor";
import ProjectsShowcase from "@/components/projects/ProjectsShowcase";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import PrimerLink from "@/ui/link/PrimerLink";
import ProjectSkeleton from "@/components/project-skeleton/ProjectSkeleton";
import styles from "./style.module.css";

const Works = () => {
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

  if (isLoading) {
    return (
      <section className="grid w-full grid-cols-2 gap-[5vh] px-[2vw] max-[600px]:grid-cols-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectSkeleton key={`skeleton-${index}`} />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <p className="px-[2vw] py-[6em] text-[0.9em] font-[300] text-[var(--wb500)]">
        ● {t("worksHome.error")}
      </p>
    );
  }

  return (
    <section className="relative flex w-full flex-col items-center gap-[6vh] py-[4vh]">
      <div className="flex w-full max-w-[40em] flex-col items-center gap-[2vh] px-[2vw] text-center">
        <AnimatedSplit
          text={t("worksHome.title")}
          className="!text-[0.875em] !font-[200] opacity-50"
          tagName="h2"
          stagger={0.03}
          duration={1.5}
          start="top 85%"
        />
        <AnimatedSplit
          text={t("worksHome.subtitle")}
          className="!text-[1em] !font-[200] text-[var(--wb950)] opacity-80"
          tagName="p"
          stagger={0.02}
          duration={1.5}
          start="top 85%"
        />
      </div>

      <ProjectsShowcase
        projects={projects}
        limit={6}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
      />

      <div className="self-center">
        <PrimerLink href="/projects" buttonText={t("worksHome.viewAll")} random />
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
    </section>
  );
};

export default Works;
