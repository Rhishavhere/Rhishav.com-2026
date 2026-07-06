import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import SplitType from "split-type";
import NeumorphismButton from "@/ui/neumorphism-button/NeumorphismButton";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import styles from "./style.module.css";

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ManifestArc() {
  const { t, i18n } = useTranslation();
  const footerRef = useRef(null);
  const readMoreRef = useRef(null);
  const wordsRef = useRef([]);
  const openRef = useRef(false);

  // answer text split with same technique as question AnimatedSplit;
  // difference: triggered by button instead of scroll.
  useEffect(() => {
    if (!footerRef.current) return;

    const split = new SplitType(footerRef.current, {
      types: "lines, words",
      tagName: "span",
    });
    wordsRef.current = split.words || [];

    // on language change keep current state: if button open, text stays open
    gsap.set(wordsRef.current, { y: openRef.current ? "0%" : "110%" });
    gsap.set(footerRef.current, { autoAlpha: 1 });

    return () => {
      try {
        split.revert();
      } catch (e) {
        // noop
      }
    };
  }, [i18n.language]);

  const handleStart = (isChecked) => {
    openRef.current = isChecked;
    const words = wordsRef.current;

    // reduced motion: open/close without animation
    if (reduceMotion()) {
      gsap.set(words, { y: isChecked ? "0%" : "110%" });
      gsap.set(readMoreRef.current, { autoAlpha: isChecked ? 1 : 0, y: 0 });
      return;
    }

    if (isChecked) {
      // answer words rise from mask; then detail link appears
      gsap.to(words, {
        y: "0%",
        duration: 1.2,
        ease: "hop",
        stagger: 0.02,
        overwrite: true,
      });
      gsap.to(readMoreRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "power2.out",
        overwrite: true,
      });
    } else {
      // words sink back into mask, link fades with them
      gsap.to(words, {
        y: "110%",
        duration: 0.6,
        ease: "power2.inOut",
        stagger: 0.006,
        overwrite: true,
      });
      gsap.to(readMoreRef.current, {
        autoAlpha: 0,
        y: 8,
        duration: 0.4,
        ease: "power2.inOut",
        overwrite: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* artwork: alone in vast space, hung on the wall */}
      <div className={styles.main}>
        <NeumorphismButton handleStart={handleStart} />
      </div>

      {/* museum label: bottom-left placard explaining the work */}
      <div className={styles.placard}>
        <h4 className={styles.label}>{t("manifesto.white_on_white.title")}</h4>
        <AnimatedSplit
          key={`question-${i18n.language}`}
          text={t("manifesto.white_on_white.question")}
          className={styles.title}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
        <p
          className={styles.footer}
          ref={footerRef}
          key={`footer-${i18n.language}`}
        >
          {t("manifesto.white_on_white.footer")}
        </p>
        <div className={styles.read_more} ref={readMoreRef}>
          <ReadMore slug="white" />
        </div>
      </div>
    </div>
  );
}
