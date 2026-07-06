import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.css";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import PrimerLink from "@/ui/link/PrimerLink";
import works from "@/utils/projects";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

// Featured work: own startup + one public web platform + one social mobile
// app. matched by link so projects.js stays the single source of truth.
const FEATURED = [
  "/projects/skynotech-smart-site-systems",
  "/projects/balikesir-istihdam-ofisi",
  "/projects/yakin-kart",
];

export default function SelectedWorks() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const rowsRef = useRef([]);

  const featured = FEATURED.map((link) =>
    works.find((w) => w.link === link),
  ).filter(Boolean);

  useEffect(() => {
    let ctx = gsap.context(() => {
      rowsRef.current.forEach((row, index) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "hop",
            delay: index * 0.08,
            scrollTrigger: { trigger: row, start: "top 90%" },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.header}>
        <AnimatedSplit
          key={`${i18n.language}-selworks-title`}
          text={t("selectedWorks.title")}
          className={styles.title}
          tagName="h2"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
        <AnimatedSplit
          key={`${i18n.language}-selworks-subtitle`}
          text={t("selectedWorks.subtitle")}
          className={styles.subtitle}
          tagName="p"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
      </div>

      <div className={styles.right}>
        <ul className={styles.list}>
          {featured.map((work, index) => (
            <li
              key={work.link}
              className={styles.row}
              ref={(el) => (rowsRef.current[index] = el)}
            >
              <Link to={work.link} className={styles.rowLink}>
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.name}>{work.name}</span>
                <span className={styles.type}>{work.type}</span>
              </Link>
            </li>
          ))}
        </ul>

        <footer className={styles.footer}>
          <PrimerLink
            href="/projects"
            buttonText={t("selectedWorks.viewAll")}
            random
          />
        </footer>
      </div>
    </div>
  );
}
