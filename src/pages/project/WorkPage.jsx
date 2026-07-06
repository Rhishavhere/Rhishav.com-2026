import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.css";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import LineReveal from "@/components/reveal/LineReveal";
import Lightbox from "@/components/lightbox/Lightbox";
import { useTranslation } from "react-i18next";
import { useProjects } from "@/hooks/useProjects";
import { prefersReducedMotion } from "@/utils/motion";
import LoadingPage from "@/components/loading/LoadingPage";

gsap.registerPlugin(ScrollTrigger);

export default function WorkSinglePage() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const currentLang = i18n.language;

  const { data: projects, isLoading } = useProjects();

  const factsRef = useRef(null);
  const metricsRef = useRef(null);
  const sheetRef = useRef(null);
  const thumbRefs = useRef([]);

  const [openIndex, setOpenIndex] = useState(null);

  const safeProjects = projects || [];
  const work = safeProjects.find((p) => p.link === `/projects/${slug}`);
  const currentIndex = safeProjects.findIndex(
    (p) => p.link === `/projects/${slug}`,
  );

  const nextProject =
    currentIndex === -1 || safeProjects.length === 0
      ? null
      : safeProjects[(currentIndex + 1) % safeProjects.length];

  const prefetchProjects = () => import("@/pages/projects/ProjectsPage");

  const images = work?.images || [];

  const handleClose = useCallback(() => {
    setOpenIndex((i) => {
      if (i != null) {
        requestAnimationFrame(() =>
          thumbRefs.current[i]?.focus?.({ preventScroll: true }),
        );
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (isLoading || !work) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const stagger = (target, vars = {}) => {
        if (!target) return;
        gsap.from(target.children, {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.8,
          ease: "butter",
          scrollTrigger: { trigger: target, start: "top 88%" },
          ...vars,
        });
      };

      stagger(factsRef.current);
      stagger(metricsRef.current, { y: 28, stagger: 0.1 });

      if (sheetRef.current) {
        gsap.fromTo(
          sheetRef.current.children,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "butter",
            stagger: 0.07,
            scrollTrigger: { trigger: sheetRef.current, start: "top 85%" },
          },
        );
      }
    });

    return () => ctx.revert();
  }, [slug, currentLang, isLoading, work]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!work) {
    return (
      <div className={styles.container} key={`${slug}-${currentLang}`}>
        <section className={styles.hero}>
          <AnimatedSplit
            className={styles.title}
            text={t("workSingle.labels.not_found") || "Project Not Found"}
          />
          <Link to="/projects" onMouseEnter={prefetchProjects}>
            <AnimatedSplit
              text={t("workSingle.labels.back_link") || "Back to Projects"}
            />
          </Link>
        </section>
      </div>
    );
  }

  const facts = [
    { label: t("workSingle.labels.company"), value: work.company_name },
    {
      label: t("workSingle.labels.role"),
      value: work.role || t("workSingle.defaults.role"),
    },
    {
      label: t("workSingle.labels.type"),
      value: work.type || t("workSingle.defaults.type"),
    },
    {
      label: t("workSingle.labels.tech"),
      value: work.tech || t("workSingle.defaults.tech"),
    },
  ];

  const caseStudySections = [
    { id: "challenge", label: t("workSingle.labels.challenge"), body: work.challenge },
    { id: "approach", label: t("workSingle.labels.approach"), body: work.approach },
    { id: "impact", label: t("workSingle.labels.impact"), body: work.impact },
  ].filter((section) => section.body);

  return (
    <div className={styles.container} key={`${slug}-${currentLang}`}>
      {/* HERO — type-led, no imagery */}
      <section className={styles.hero}>
        <AnimatedSplit
          key={`title-${currentLang}`}
          className={styles.title}
          text={work.project_name}
          tagName="h1"
          stagger={0.03}
          duration={1.5}
          start="top 90%"
        />

        {(work.desc || work.company_name) && (
          <LineReveal
            key={`lede-${currentLang}`}
            className={styles.lede}
            text={work.desc || work.company_name}
            tagName="p"
            start="top 90%"
          />
        )}

        <div className={styles.facts} ref={factsRef}>
          {facts.map((fact) => (
            <div className={styles.fact} key={fact.label}>
              <span className={styles.factLabel}>{fact.label}</span>
              <span className={styles.factValue}>{fact.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDY — single column, label on the left */}
      {caseStudySections.length > 0 && (
        <section className={styles.caseStudy}>
          {caseStudySections.map((section) => (
            <article key={section.id} className={styles.caseStudyItem}>
              <AnimatedSplit
                className={styles.sectionTitle}
                text={section.label}
                tagName="h2"
                stagger={0.03}
                duration={1.2}
                start="top 88%"
              />
              <LineReveal
                className={styles.caseText}
                text={section.body}
                tagName="p"
                start="top 88%"
              />
            </article>
          ))}
        </section>
      )}

      {/* METRICS — large number left, text right */}
      {work.achievements && work.achievements.length > 0 && (
        <section className={styles.metrics}>
          <AnimatedSplit
            className={styles.sectionTitle}
            text={t("workSingle.labels.achievements")}
            tagName="h2"
            stagger={0.03}
            duration={1.2}
            start="top 88%"
          />
          <ul className={styles.metrics_list} ref={metricsRef}>
            {work.achievements.map((a, i) => (
              <li key={i} className={styles.metric}>
                <span className={styles.metricNumber}>{a.number}</span>
                <div className={styles.metric_context}>
                  <h3 className={styles.metricTitle}>{a.title}</h3>
                  <p className={styles.metricDesc}>{a.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* SCREENS — quiet contact sheet, click → lightbox */}
      {images.length > 0 && (
        <section className={styles.screens}>
          <AnimatedSplit
            className={styles.sectionTitle}
            text={t("workSingle.labels.screens")}
            tagName="h2"
            stagger={0.03}
            duration={1.2}
            start="top 90%"
          />
          <div className={styles.sheet} ref={sheetRef}>
            {images.map((img, i) => (
              <button
                type="button"
                key={i}
                ref={(el) => (thumbRefs.current[i] = el)}
                className={styles.thumb}
                aria-label={`${t("workSingle.lightbox.open")} ${i + 1}`}
                onClick={() => setOpenIndex(i)}
              >
                <img
                  src={`${work.asset}/${img.file}`}
                  alt={`${work.project_name} — ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </section>
      )}

      <footer className={styles.next}>
        <Link to="/projects" onMouseEnter={prefetchProjects} className={styles.button}>
          <AnimatedSplit
            text={t("workSingle.labels.back") || "Back"}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            start="top 90%"
          />
        </Link>
        <Link to={nextProject ? nextProject.link : "/projects"}>
          <AnimatedSplit
            key={`next-${currentLang}`}
            text={
              nextProject
                ? `${nextProject.project_name} ●`
                : `${t("workSingle.labels.next_project") || "Next Project"} ●`
            }
            className={styles.button}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            start="top 90%"
          />
        </Link>
      </footer>

      <Lightbox
        images={images}
        asset={work.asset}
        projectName={work.project_name}
        index={openIndex}
        onClose={handleClose}
        onNavigate={setOpenIndex}
      />
    </div>
  );
}
