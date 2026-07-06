import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.css";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function Backstage() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  const items = t("now.items", { returnObjects: true });
  const list = Array.isArray(items) ? items : [];

  useEffect(() => {
    let ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "hop",
            delay: index * 0.08,
            scrollTrigger: { trigger: item, start: "top 92%" },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [i18n.language]);

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <AnimatedSplit
          key={`${i18n.language}-now-title`}
          text={t("now.title")}
          className={styles.title}
          tagName="h2"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
      </header>

      <ul className={styles.list}>
        {list.map((item, index) => (
          <li
            key={index}
            className={styles.item}
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <span className={styles.itemText}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
