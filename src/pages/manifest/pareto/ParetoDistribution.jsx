import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

/* pareto / power-law geometry.
   at rest: all bars equal and short — "the world shares equally" illusion.
   on tap: bars settle into the power law — a few bars rise, the rest collapse
   into a long flat tail. the average line stays just above the baseline: almost
   nothing is at the average. thin line, monochrome, single tap. */
const N = 22;
const HEAD = 4; // vital minority (~20%)
const MAXH = 42;
const BASE_Y = 50;
const X0 = 8;
const X1 = 92;
const BAR_W = 1.6;
const EVEN = 0.18;

// power law: value = (1 / rank)^1.15, tail flattens at 0.06. max = 1.
const PARETO = Array.from({ length: N }, (_, i) =>
  Math.max(Math.pow(1 / (i + 1), 1.15), 0.06),
);
const AVG = PARETO.reduce((s, v) => s + v, 0) / N;
const XS = Array.from({ length: N }, (_, i) => X0 + (X1 - X0) * (i / (N - 1)));

export default function ParetoDistribution({ isActive = true }) {
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState(false);
  const barsRef = useRef([]);
  const avgRef = useRef(null);
  const firstRun = useRef(true);

  // return to illusion when panel leaves the viewport
  useLayoutEffect(() => {
    if (!isActive) setRevealed(false);
  }, [isActive]);

  useLayoutEffect(() => {
    const bars = barsRef.current.filter(Boolean);
    if (!bars.length) return;

    const instant = firstRun.current || prefersReducedMotion() || !isActive;

    bars.forEach((bar, i) => {
      const v = revealed ? PARETO[i] : EVEN;
      const h = v * MAXH;
      const op = revealed ? (i < HEAD ? 1 : 0.16) : 0.4;

      if (instant) {
        gsap.set(bar, { attr: { height: h, y: BASE_Y - h }, opacity: op });
      } else {
        gsap.to(bar, {
          attr: { height: h, y: BASE_Y - h },
          opacity: op,
          duration: 0.85,
          ease: "hop",
          delay: i * 0.02,
          overwrite: true,
        });
      }
    });

    if (avgRef.current) {
      const o = revealed ? 0.55 : 0;
      if (instant) gsap.set(avgRef.current, { opacity: o });
      else gsap.to(avgRef.current, { opacity: o, duration: 0.6, ease: "hop" });
    }

    firstRun.current = false;
  }, [revealed, isActive]);

  const evenH = EVEN * MAXH;

  return (
    <div className={styles.container}>
      <div className={styles.annotation}>
        <h4>{t("manifesto.pareto.title")}</h4>
        <p>{t("manifesto.pareto.desc")}</p>
        <ReadMore slug="pareto" />
      </div>

      <button
        type="button"
        className={styles.stage}
        aria-pressed={revealed}
        aria-label={t("manifesto.pareto.toggle")}
        onClick={() => setRevealed((r) => !r)}
      >
        <svg
          className={styles.chart}
          viewBox="0 0 100 56"
          role="img"
          aria-label={t("manifesto.pareto.title")}
        >
          <line
            className={styles.baseline}
            x1={X0 - 3}
            y1={BASE_Y}
            x2={X1 + 3}
            y2={BASE_Y}
          />
          <line
            ref={avgRef}
            className={styles.avg}
            x1={X0 - 1}
            y1={BASE_Y - AVG * MAXH}
            x2={X1 + 1}
            y2={BASE_Y - AVG * MAXH}
          />
          {XS.map((x, i) => (
            <rect
              key={i}
              ref={(el) => (barsRef.current[i] = el)}
              className={styles.bar}
              x={x - BAR_W / 2}
              y={BASE_Y - evenH}
              width={BAR_W}
              height={evenH}
              rx={BAR_W / 2}
            />
          ))}
        </svg>

        <span key={revealed ? "real" : "even"} className={styles.readout}>
          {revealed ? t("manifesto.pareto.real") : t("manifesto.pareto.even")}
        </span>

        <span className={styles.labels} data-on={revealed ? "true" : "false"}>
          <span className={styles.labelHead}>{t("manifesto.pareto.head")}</span>
          <span className={styles.labelTail}>{t("manifesto.pareto.tail")}</span>
        </span>

        <span className={styles.hint}>{t("manifesto.pareto.hint")}</span>
      </button>
    </div>
  );
}
