import { useRef, useEffect } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import { useTranslation } from "react-i18next";

const images = [
  "/assets/modern-art/1.webp",
  "/assets/modern-art/2.webp",
  "/assets/modern-art/5.webp",
  "/assets/modern-art/7.webp",
  "/assets/modern-art/9.webp",
  "/assets/modern-art/3.webp",
  "/assets/modern-art/11.webp",
];

export default function ManifestHeader() {
  const { t, i18n } = useTranslation();
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.8,
        ease: "hop",
        stagger: 0.08,
      },
    );
  }, []);

  return (
    <div className={styles.container} key={i18n.language}>
      <header className={styles.header}>
        <AnimatedSplit
          text={t("manifesto.header.title")}
          className={styles.title}
          tagName="span"
          stagger={0.03}
          duration={1.8}
          start="top 80%"
        />
        <AnimatedSplit
          text={t("manifesto.header.desc")}
          className={styles.desc}
          tagName="span"
          stagger={0.02}
          duration={1.8}
          start="top 80%"
        />
      </header>
      <div className={styles.content}>
        {images.map((src, i) => (
          <div
            key={i}
            className={styles.card}
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <img
              className={styles.img}
              src={src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
