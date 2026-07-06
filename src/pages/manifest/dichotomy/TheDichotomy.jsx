import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

/* two circles (r28) overlap; centers at (40,50)-(60,50). intersection points
   at (50, 23.8) and (50, 76.2). lens = vesica connecting those two points. */
const LENS = "M50,23.8 A28,28 0 0 1 50,76.2 A28,28 0 0 1 50,23.8 Z";

const GLYPHS = "∑∫∂√π∞λθµ∇∆∈∉⊕⊗≈≠≤≥01+−×÷=∧∨¬⇒φψΩ";
const randGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

/* rational: text "decodes" left to right from math symbols */
function DecodeText({ text }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll("[data-c]"));

    if (prefersReducedMotion()) {
      spans.forEach((s) => {
        s.textContent = s.dataset.c;
        s.dataset.locked = "1";
      });
      return;
    }

    // start with symbols before first paint — real text must not flash
    spans.forEach((s) => {
      if (s.dataset.c !== " ") s.textContent = randGlyph();
    });

    const LEAD = 160;
    const STEP = 12;
    const SCRAMBLE = 55;
    const start = performance.now();
    let last = 0;
    let raf;

    const tick = (now) => {
      const t = now - start;
      if (now - last >= SCRAMBLE) {
        last = now;
        spans.forEach((s, i) => {
          const ch = s.dataset.c;
          if (ch === " " || s.dataset.locked) return;
          if (t >= LEAD + i * STEP) {
            s.textContent = ch;
            s.dataset.locked = "1";
          } else {
            s.textContent = randGlyph();
          }
        });
      }
      if (t < LEAD + spans.length * STEP + 120) {
        raf = requestAnimationFrame(tick);
      } else {
        spans.forEach((s) => {
          s.textContent = s.dataset.c;
          s.dataset.locked = "1";
        });
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return (
    <p className={`${styles.readout} ${styles.decodeReadout}`} ref={ref}>
      {text.split("").map((c, i) => (
        <span key={i} data-c={c} className={styles.glyph}>
          {c}
        </span>
      ))}
    </p>
  );
}

/* emotional: blur to clarity; words rise gently */
function BloomText({ text }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll("[data-w]");

    const tl = gsap.timeline();
    tl.fromTo(
      el,
      { filter: "blur(10px)" },
      { filter: "blur(0px)", duration: 1.3, ease: "power2.out" },
      0,
    );
    tl.fromTo(
      words,
      { opacity: 0, yPercent: 42 },
      { opacity: 1, yPercent: 0, duration: 1.1, ease: "power2.out", stagger: 0.05 },
      0,
    );

    return () => tl.kill();
  }, [text]);

  return (
    <p className={`${styles.readout} ${styles.bloomReadout}`} ref={ref}>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span data-w className={styles.bloomWord}>
            {w}
          </span>{" "}
        </Fragment>
      ))}
    </p>
  );
}

/* human: striking; closing line rises from mask at large size */
function HumanText({ text }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll("[data-hw]");

    const tl = gsap.fromTo(
      words,
      { yPercent: 120 },
      { yPercent: 0, duration: 0.9, ease: "hop", stagger: 0.07 },
    );

    return () => tl.kill();
  }, [text]);

  return (
    <p className={`${styles.readout} ${styles.humanReadout}`} ref={ref}>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span className={styles.humanMask}>
            <span data-hw className={styles.humanWord}>
              {w}
            </span>
          </span>{" "}
        </Fragment>
      ))}
    </p>
  );
}

export default function TheDichotomy() {
  const { t } = useTranslation();
  const [mode, setMode] = useState("rational");

  return (
    <div className={styles.container} data-mode={mode}>
      <div className={styles.annotation}>
        <h4>{t("manifesto.dichotomy.title")}</h4>
        <p>{t("manifesto.dichotomy.desc")}</p>
        <ReadMore slug="dichotomy" />
      </div>

      <div className={styles.stage}>
        <svg
          className={styles.venn}
          viewBox="0 0 100 100"
          role="img"
          aria-label={t("manifesto.dichotomy.title")}
        >
          <circle
            className={`${styles.circle} ${styles.circleLeft}`}
            cx="40"
            cy="50"
            r="28"
            onClick={() => setMode("rational")}
          />
          <circle
            className={`${styles.circle} ${styles.circleRight}`}
            cx="60"
            cy="50"
            r="28"
            onClick={() => setMode("emotional")}
          />
          <path
            className={styles.lens}
            d={LENS}
            onClick={() => setMode("human")}
          />
        </svg>

        <div className={styles.sides}>
          <button
            type="button"
            className={styles.side}
            aria-pressed={mode === "rational"}
            onClick={() => setMode("rational")}
          >
            {t("manifesto.dichotomy.left_title")}
          </button>
          <span className={styles.sep} aria-hidden="true" />
          <button
            type="button"
            className={`${styles.side} ${styles.sideCenter}`}
            aria-pressed={mode === "human"}
            onClick={() => setMode("human")}
          >
            {t("manifesto.dichotomy.center_label")}
          </button>
          <span className={styles.sep} aria-hidden="true" />
          <button
            type="button"
            className={styles.side}
            aria-pressed={mode === "emotional"}
            onClick={() => setMode("emotional")}
          >
            {t("manifesto.dichotomy.right_title")}
          </button>
        </div>

        <div className={styles.readoutSlot}>
          {mode === "rational" && (
            <DecodeText key="rational" text={t("manifesto.dichotomy.left_desc")} />
          )}
          {mode === "emotional" && (
            <BloomText key="emotional" text={t("manifesto.dichotomy.right_desc")} />
          )}
          {mode === "human" && (
            <HumanText key="human" text={t("manifesto.dichotomy.center_desc")} />
          )}
        </div>

        <span className={styles.hint}>{t("manifesto.dichotomy.hint")}</span>
      </div>
    </div>
  );
}
