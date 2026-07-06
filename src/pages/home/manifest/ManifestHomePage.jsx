import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import styles from "./style.module.css";
import PrimerLink from "@/ui/link/PrimerLink";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ManifestHomePage = () => {
  const { t, i18n } = useTranslation();

  const [activeTopic, setActiveTopic] = useState("aesthetic");

  const topics = t("manifest.topics", { returnObjects: true });
  const keys = Object.keys(topics);

  const listRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    if (reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowsRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "hop",
          stagger: 0.08,
          scrollTrigger: { trigger: listRef.current, start: "top 85%" },
        },
      );
    }, listRef);
    return () => ctx.revert();
  }, [i18n.language]);

  return (
    <section
      className="flex w-[98vw] items-center justify-center bg-[var(--wb50)] px-[2.5vw] py-[12vh] max-[600px]:px-[15vw] max-[600px]:py-[12vh]"
      key={i18n.language}
    >
      <div className="flex w-[30vw] flex-col gap-[6vh] pt-[3vh] max-[1024px]:w-[50vw] max-[600px]:w-full max-[600px]:gap-[5vh]">
        <AnimatedSplit
          text={t("manifest.title")}
          className="!text-[0.875em] !font-[200] text-[var(--wb950)] opacity-50"
          tagName="h2"
          stagger={0.012}
          duration={1.5}
          start="top 80%"
        />

        <AnimatedSplit
          text={t("manifest.desc")}
          className="!text-[1em] !font-[200] tracking-[-2.5%] text-[var(--wb950)] max-[1024px]:!text-[1.5em] max-[600px]:max-w-full max-[600px]:!text-[1.3em]"
          tagName="p"
          stagger={0.012}
          duration={1.5}
          start="top 80%"
        />

        <div className={styles.index} ref={listRef}>
          {keys.map((key, i) => {
            const isActive = activeTopic === key;
            return (
              <div
                key={key}
                className={styles.row}
                ref={(el) => (rowsRef.current[i] = el)}
              >
                <button
                  type="button"
                  aria-pressed={isActive}
                  className={`${styles.rowButton} ${isActive ? styles.rowActive : ""}`}
                  onClick={() => setActiveTopic(key)}
                  aria-expanded={isActive}
                  aria-controls={`manifest-facet-${key}`}
                >
                  <span className={styles.rowIndex}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.rowLabel}>{topics[key].label}</span>
                </button>
                <div
                  id={`manifest-facet-${key}`}
                  role="region"
                  className={`${styles.panel} ${isActive ? styles.panelOpen : ""}`}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.panelText}>{topics[key].text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="self-end">
          <PrimerLink
            href="/manifest"
            buttonText={t("manifest.button")}
            random
          />
        </div>
      </div>
    </section>
  );
};

export default ManifestHomePage;
