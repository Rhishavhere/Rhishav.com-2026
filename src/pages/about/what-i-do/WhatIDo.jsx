import { useEffect, useRef } from "react";
import styles from "./style.module.css";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import LineReveal from "@/components/reveal/LineReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIDo() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const orderedImages = [
        imageRefs.current[1],
        imageRefs.current[0],
        imageRefs.current[2],
        imageRefs.current[3],
      ];

      orderedImages.forEach((img, index) => {
        if (!img) return;

        gsap.set(img, { clipPath: "inset(100% 0% 0% 0%)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        tl.to(
          img,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "hop",
            delay: index * 0.15,
          },
          0,
        )
          .to(
            img,
            {
              y: 0,
              duration: 0.8,
              ease: "hop",
              delay: index * 0.12,
            },
            0,
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.image_container}>
        <img
          src="/assets/yunus-emre-korkmaz/12.webp"
          alt="yunus emre korkmaz"
          className={styles.image_1}
          ref={(el) => (imageRefs.current[0] = el)}
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/assets/yunus-emre-korkmaz/5.webp"
          alt="yunus emre korkmaz"
          className={styles.image_2}
          ref={(el) => (imageRefs.current[1] = el)}
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.content}>
        <header className={styles.header}>
          <AnimatedSplit
            key={`${i18n.language}-whatido-title`}
            text={t("whatIDo.title")}
            stagger={0.03}
            duration={1.5}
            start="top 80%"
          />
        </header>
        <div className={styles.context}>
          <LineReveal
            key={`${i18n.language}-whatido-desc1`}
            text={t("whatIDo.desc_1")}
            className={styles.desc}
            tagName="p"
            start="top 80%"
          />
        </div>
        <div className={styles.context}>
          <LineReveal
            key={`${i18n.language}-whatido-desc2`}
            text={t("whatIDo.desc_2")}
            className={styles.desc}
            tagName="p"
            start="top 80%"
          />
        </div>
      </div>
      <div className={styles.image_container}>
        <img
          src="/assets/yunus-emre-korkmaz/3.webp"
          alt="yunus emre korkmaz"
          className={styles.image_3}
          ref={(el) => (imageRefs.current[2] = el)}
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/assets/yunus-emre-korkmaz/11.webp"
          alt="yunus emre korkmaz"
          className={styles.image_4}
          ref={(el) => (imageRefs.current[3] = el)}
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
