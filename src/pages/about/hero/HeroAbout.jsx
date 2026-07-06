import { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import BlurReveal from "@/components/reveal/BlurReveal";
import { useTranslation } from "react-i18next";
import { prefersReducedMotion } from "@/utils/motion";

gsap.registerPlugin(ScrollTrigger);

export default function HeroAbout() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  const workImages = [
    "/assets/yunus-emre-korkmaz/13.webp",
    "/assets/yunus-emre-korkmaz/1.webp",
    "/assets/yunus-emre-korkmaz/21.webp",
  ];

  // entrance: three vertical columns open from below (existing clip language preserved)
  useEffect(() => {
    let ctx = gsap.context(() => {
      const cols = gsap.utils.toArray(`.${styles.col}`);

      cols.forEach((col, index) => {
        const img = col.querySelector(`.${styles.col_img}`);
        if (!img) return;

        gsap.set(img, { clipPath: "inset(100% 0% 0% 0%)" });

        gsap.fromTo(
          img,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.6,
            ease: "hop",
            delay: index * 0.12,
            scrollTrigger: { trigger: col, start: "top 100%" },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* scroll-driven cinematic: three columns drift at different speeds (speed delta =
     depth), text layer drifts slower. same language as footer. */
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(`.${styles.col}:nth-child(1) .${styles.col_img}`, { yPercent: -12, ease: "none" }, 0);
      tl.to(`.${styles.col}:nth-child(2) .${styles.col_img}`, { yPercent: -26, ease: "none" }, 0);
      tl.to(`.${styles.col}:nth-child(3) .${styles.col_img}`, { yPercent: -18, ease: "none" }, 0);
      tl.to(`.${styles.overlay}`, { yPercent: -8, ease: "none" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header} ref={headerRef}>
        {/* three full-height vertical columns — intentionally misaligned, bleed past edges */}
        <div className={styles.cols} aria-hidden="true">
          {workImages.map((src, idx) => (
            <div key={idx} className={styles.col}>
              <img
                src={src}
                alt=""
                className={styles.col_img}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>

        {/* text layer cuts across columns horizontally */}
        <div className={styles.overlay}>
          <AnimatedSplit
            key={`${i18n.language}-hero-title`}
            text={t("heroAbout.title")}
            className={styles.title}
            tagName="h1"
            stagger={0.03}
            duration={1.5}
            start="top 80%"
          />
          <div className={styles.desc}>
            <BlurReveal
              key={`${i18n.language}-hero-desc-1`}
              text={t("heroAbout.content_text_1")}
              className={styles.desc_line}
              tagName="span"
              start="top 90%"
            />
            <BlurReveal
              key={`${i18n.language}-hero-desc-2`}
              text={t("heroAbout.content_text_2")}
              className={styles.desc_line}
              tagName="span"
              start="top 90%"
            />
          </div>
        </div>
      </header>
    </div>
  );
}
