import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const thumbRefs = useRef([]);

  const [openIndex, setOpenIndex] = useState(null);

  const safeProjects = projects || [];
  const work = safeProjects.find((p) => p.slug === slug || p.link === `/projects/${slug}`);
  const currentIndex = safeProjects.findIndex(
    (p) => p.slug === slug || p.link === `/projects/${slug}`,
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
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current.children,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "butter",
            stagger: 0.06,
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 85%",
            },
          },
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [slug, currentLang, isLoading, work]);

  if (isLoading) return <LoadingPage />;

  if (!work) {
    return (
      <div
        className="flex min-h-[50vh] flex-col items-start gap-[2em] px-[6vw] py-[18vh] lg:px-[12vw]"
        key={`${slug}-${currentLang}`}
      >
        <AnimatedSplit
          className="!text-[2em] !font-[500]"
          text={t("workSingle.labels.not_found")}
        />
        <Link
          to="/projects"
          onMouseEnter={prefetchProjects}
          className="text-[0.95em] font-[300] opacity-70 hover:opacity-100"
        >
          {t("workSingle.labels.back_link")}
        </Link>
      </div>
    );
  }

  const meta = [
    { label: t("workSingle.labels.context"), value: work.context },
    { label: t("workSingle.labels.role"), value: work.role },
    { label: t("workSingle.labels.type"), value: work.type },
    { label: t("workSingle.labels.tech"), value: work.tech },
    { label: t("workSingle.labels.year"), value: work.year },
  ].filter((m) => m.value);

  const sections = [
    { id: "overview", label: t("workSingle.labels.overview"), body: work.desc },
    { id: "challenge", label: t("workSingle.labels.challenge"), body: work.challenge },
    { id: "approach", label: t("workSingle.labels.approach"), body: work.approach },
    { id: "impact", label: t("workSingle.labels.impact"), body: work.impact },
  ].filter((s) => s.body);

  return (
    <article
      ref={heroRef}
      className="flex w-full flex-col gap-[12vh] px-[5vw] py-[14vh] lg:px-[10vw] lg:py-[16vh]"
      key={`${slug}-${currentLang}`}
    >
      {/* hero — grid exploration style */}
      <header className="grid w-full grid-cols-1 gap-[4vh] border-b border-[var(--wb200)] pb-[8vh] lg:grid-cols-12 lg:gap-[3vw]">
        <div className="flex flex-col gap-[0.5em] lg:col-span-3">
          <span className="text-[0.7em] font-[300] uppercase tracking-[0.16em] text-[var(--wb400)]">
            project {work.index}
          </span>
          <span className="text-[clamp(3rem,8vw,6rem)] font-[600] leading-[0.8] tracking-[-0.06em] text-[var(--wb950)]">
            ({work.index})
          </span>
        </div>

        <div className="flex flex-col gap-[1.5em] lg:col-span-6">
          <AnimatedSplit
            className="!text-[clamp(1.8rem,4vw,3.2rem)] !font-[500] !leading-[0.95] !tracking-[-0.04em]"
            text={work.project_name}
            tagName="h1"
            stagger={0.03}
            duration={1.4}
            start="top 92%"
          />
          <LineReveal
            className="!text-[1.1em] !font-[300] !leading-[1.35] text-[var(--wb800)]"
            text={work.tagline}
            tagName="p"
            start="top 92%"
          />
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-[0.85em] font-[400] text-[var(--wb700)] underline decoration-[var(--wb300)] underline-offset-[0.3em] hover:text-[var(--wb950)]"
            >
              github →
            </a>
          )}
          {work.website && (
            <a
              href={work.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-[0.85em] font-[400] text-[var(--wb700)] underline decoration-[var(--wb300)] underline-offset-[0.3em] hover:text-[var(--wb950)]"
            >
              live →
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 gap-[1.5em] text-[0.85em] lg:col-span-3 lg:grid-cols-1">
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col gap-[0.35em]">
              <span className="font-[300] uppercase tracking-[0.1em] text-[var(--wb400)]">
                {item.label}
              </span>
              <span className="font-[400] text-[var(--wb900)]">{item.value}</span>
            </div>
          ))}
        </div>
      </header>

      {/* case study sections */}
      <section className="flex w-full max-w-[48em] flex-col gap-[8vh]">
        {sections.map((section) => (
          <div
            key={section.id}
            className="grid grid-cols-1 gap-[1em] lg:grid-cols-[minmax(6em,10vw)_1fr]"
          >
            <AnimatedSplit
              className="!text-[0.8em] !font-[300] !uppercase !tracking-[0.12em] !text-[var(--wb400)]"
              text={section.label}
              tagName="h2"
              stagger={0.02}
              duration={1.2}
              start="top 90%"
            />
            <LineReveal
              className="!text-[1.05em] !font-[300] !leading-[1.55] text-[var(--wb850)]"
              text={section.body}
              tagName="p"
              start="top 90%"
            />
          </div>
        ))}
      </section>

      {/* highlights — no big numbers */}
      {work.highlights?.length > 0 && (
        <section className="flex w-full flex-col gap-[4vh]">
          <AnimatedSplit
            className="!text-[0.8em] !font-[300] !uppercase !tracking-[0.12em] !text-[var(--wb400)]"
            text={t("workSingle.labels.highlights")}
            tagName="h2"
            stagger={0.02}
            duration={1.2}
            start="top 90%"
          />
          <ul className="grid grid-cols-1 gap-[3vh] lg:grid-cols-2">
            {work.highlights.map((item) => (
              <li
                key={item.title}
                className="border-t border-[var(--wb200)] pt-[2vh]"
              >
                <h3 className="text-[1.05em] font-[500] text-[var(--wb950)]">
                  {item.title}
                </h3>
                <p className="mt-[0.6em] text-[0.95em] font-[300] leading-[1.45] text-[var(--wb700)]">
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* features */}
      {work.features?.length > 0 && (
        <section className="flex w-full flex-col gap-[2vh]">
          <AnimatedSplit
            className="!text-[0.8em] !font-[300] !uppercase !tracking-[0.12em] !text-[var(--wb400)]"
            text={t("workSingle.labels.features")}
            tagName="h2"
            stagger={0.02}
            duration={1.2}
            start="top 90%"
          />
          <ul className="flex flex-wrap gap-[0.5em]">
            {work.features.map((feat) => (
              <li
                key={feat}
                className="rounded-full border border-[var(--wb300)] px-[1em] py-[0.4em] text-[0.8em] font-[300] text-[var(--wb800)]"
              >
                {feat}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* editorial gallery */}
      {images.length > 0 && (
        <section className="flex w-full flex-col gap-[4vh]">
          <AnimatedSplit
            className="!text-[0.8em] !font-[300] !uppercase !tracking-[0.12em] !text-[var(--wb400)]"
            text={t("workSingle.labels.screens")}
            tagName="h2"
            stagger={0.02}
            duration={1.2}
            start="top 90%"
          />
          <div
            ref={galleryRef}
            className="grid w-full grid-cols-12 gap-[2vw] gap-y-[4vh]"
          >
            {images.map((img, i) => {
              const wide = img.isWide;
              return (
                <button
                  type="button"
                  key={i}
                  ref={(el) => (thumbRefs.current[i] = el)}
                  className={`overflow-hidden bg-[var(--wb100)] text-left ${
                    wide
                      ? "col-span-12 aspect-[21/9]"
                      : "col-span-12 sm:col-span-6 lg:col-span-4 aspect-[4/3]"
                  }`}
                  aria-label={`${t("workSingle.lightbox.open")} ${i + 1}`}
                  onClick={() => setOpenIndex(i)}
                >
                  <img
                    src={`${work.asset}/${img.file}`}
                    alt={`${work.project_name} — ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              );
            })}
          </div>
        </section>
      )}

      <footer className="flex w-full items-center justify-between border-t border-[var(--wb200)] pt-[4vh] text-[0.95em] font-[300]">
        <Link
          to="/projects"
          onMouseEnter={prefetchProjects}
          className="opacity-70 transition-opacity hover:opacity-100"
        >
          {t("workSingle.labels.back")}
        </Link>
        <Link
          to={nextProject ? nextProject.link : "/projects"}
          className="opacity-70 transition-opacity hover:opacity-100"
        >
          {nextProject
            ? `${nextProject.project_name} →`
            : `${t("workSingle.labels.next_project")} →`}
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
    </article>
  );
}
