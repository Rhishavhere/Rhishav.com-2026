import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

export default function WeightOfChoice() {
  const { t } = useTranslation();
  const [chosen, setChosen] = useState(-1); // -1: not yet chosen

  const doorRefs = useRef([]);
  const doorwayRefs = useRef([]);
  const cellRefs = useRef([]);
  const stageLineRef = useRef(null);
  const sentenceRef = useRef(null);
  const finalRef = useRef(null);

  const doors = t("manifesto.choice.doors", { returnObjects: true }) || [];

  // single move: chosen door opens to dark threshold, others fade to ghost.
  const choose = (idx) => {
    const open = doorRefs.current[idx];
    const otherIdx = doors.map((_, i) => i).filter((i) => i !== idx);

    if (prefersReducedMotion()) {
      gsap.set(open, { rotateY: -68 });
      gsap.set(doorwayRefs.current[idx], { autoAlpha: 1 });
      otherIdx.forEach((i) => gsap.set(cellRefs.current[i], { autoAlpha: 0.12 }));
      gsap.set(stageLineRef.current, { autoAlpha: 0 });
      gsap.set([sentenceRef.current, finalRef.current], { autoAlpha: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();

    // stage line fades out
    tl.to(stageLineRef.current, { autoAlpha: 0, duration: 0.3, ease: "power2.out" });

    // chosen door swings on hinge; dark threshold behind it appears
    tl.to(doorwayRefs.current[idx], { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 0.1);
    tl.to(open, { rotateY: -68, duration: 1.1, ease: "hop" }, 0.1);

    // unchosen doors quietly fade to ghost
    otherIdx.forEach((i, k) => {
      tl.to(
        cellRefs.current[i],
        { autoAlpha: 0.12, scale: 0.97, duration: 0.9, ease: "hop" },
        0.15 + k * 0.06,
      );
    });

    // reward: sentence of the chosen future and final line
    tl.fromTo(
      sentenceRef.current,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "hop" },
      0.9,
    );
    tl.fromTo(
      finalRef.current,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
      1.7,
    );
  };

  // single click / single tap selects (no double-tap on mobile)
  const handleClick = (idx) => {
    if (chosen !== -1) return;
    setChosen(idx);
    choose(idx);
  };

  return (
    <div className={`${styles.container} ${chosen !== -1 ? styles.spent : ""}`}>
      <div className={styles.annotation}>
        <h4>{t("manifesto.choice.title")}</h4>
        <p>{t("manifesto.choice.desc")}</p>
        <ReadMore slug="choice" />
      </div>

      <div className={styles.stage}>
        <div className={styles.choiceGroup}>
          <p ref={stageLineRef} className={styles.stage_line}>
            {t("manifesto.choice.stage")}
          </p>

          <div className={styles.doors}>
            {doors.map((door, i) => (
              <div
                key={i}
                className={styles.cell}
                ref={(el) => (cellRefs.current[i] = el)}
              >
                <div className={styles.frame}>
                  <span
                    className={styles.doorway}
                    ref={(el) => (doorwayRefs.current[i] = el)}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    ref={(el) => (doorRefs.current[i] = el)}
                    className={styles.door}
                    onClick={() => handleClick(i)}
                    disabled={chosen !== -1}
                    aria-label={door.whisper}
                  >
                    <span className={styles.handle} aria-hidden="true" />
                  </button>
                </div>
                <span className={styles.whisper}>{door.whisper}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.outcome}>
          <p ref={sentenceRef} className={styles.sentence}>
            {chosen !== -1 ? doors[chosen]?.full : ""}
          </p>
          <p ref={finalRef} className={styles.final}>
            {t("manifesto.choice.final")}
          </p>
        </div>
      </div>
    </div>
  );
}
