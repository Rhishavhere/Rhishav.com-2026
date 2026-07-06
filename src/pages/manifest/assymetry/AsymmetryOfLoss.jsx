import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

/* the line does not forget — telemetry of loss asymmetry.
   one live-flowing hairline: gain jumps up and springs back to baseline
   (event); loss shifts the baseline itself downward and the old baseline
   remains behind as a ghost reference line (state). equal + and − counts
   leave the line far below where it started: Kahneman, without a word of explanation. */

/* canvas cannot read css var(); token equivalents as fixed hex */
const INK = "#111"; /* wb950 */
const GHOST = "#dcdcdc"; /* wb200 */
const LOSS_RED = "#da1e37"; /* red600 */

const STEP = 1.4; /* px / sample — line flow step */
const HEAD_RATIO = 0.5; /* "now" point at graph center; right side empty: future not yet drawn */
const FRAME = 1000 / 60; /* sampling period (ms): speed independent of display */
const AMP = 0.16; /* jump/drop height (fraction of graph height) */
const HEAL = 1.2; /* px / s — baseline slowly "adapts", never returns */
const GHOST_GAP = 10; /* baseline stops this far from ghost line at most */
const BASE_RATIO = 0.32; /* initial baseline in upper third: room to fall */

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function AsymmetryOfLoss({ isActive = true }) {
  const { t, i18n } = useTranslation();
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [stats, setStats] = useState({ gains: 0, losses: 0 });

  /* animation state stays out of react: changes every frame */
  const s = useRef({
    ctx: null,
    w: 0,
    h: 0,
    cols: 0,
    hist: null, // y per column: line memory
    baseline: 0,
    initial: 0,
    transient: { v: 0 }, // temporary offset of gain jump
    ghosts: [], // old baselines: permanent reference lines
    cliffs: [], // loss moments: red notches sliding left with the flow
    noiseT: 0,
    acc: 0,
    visible: true,
    active: isActive,
    reduced: false,
  }).current;

  const draw = () => {
    const { ctx, w, h } = s;
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    /* ghost baselines: dashed, faint — reference points that aren't forgotten */
    ctx.save();
    ctx.strokeStyle = GHOST;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    s.ghosts.forEach((y) => {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    });
    ctx.restore();

    /* loss cliffs: the only color on the panel — the drop itself is red.
       notch doesn't appear at once; draws downward with the falling line
       (p: 0 → 1) */
    ctx.strokeStyle = LOSS_RED;
    ctx.lineWidth = 1.5;
    s.cliffs.forEach((c) => {
      if (c.x < 0 || c.p <= 0) return;
      ctx.beginPath();
      ctx.moveTo(c.x, c.from);
      ctx.lineTo(c.x, c.from + (c.to - c.from) * c.p);
      ctx.stroke();
    });

    /* the line itself */
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.25;
    ctx.lineJoin = "round";
    ctx.beginPath();
    for (let i = 0; i < s.cols; i++) {
      const x = i * STEP;
      if (i === 0) ctx.moveTo(x, s.hist[i]);
      else ctx.lineTo(x, s.hist[i]);
    }
    ctx.stroke();

    /* tip point: the "now" of the heart monitor */
    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.arc((s.cols - 1) * STEP, s.hist[s.cols - 1], 2.2, 0, Math.PI * 2);
    ctx.fill();
  };

  /* advance one sample: memory shifts left, "now" written from the right */
  const advance = () => {
    /* baseline adaptation: barely visible rise; never touches ghost */
    const ceiling = s.ghosts.length
      ? s.ghosts[s.ghosts.length - 1] + GHOST_GAP
      : s.initial;
    if (s.baseline > ceiling) {
      s.baseline = Math.max(ceiling, s.baseline - HEAL * (FRAME / 1000));
    }

    /* subtle life vibration */
    s.noiseT += FRAME / 1000;
    const noise =
      Math.sin(s.noiseT * 1.7) * 1.1 + Math.sin(s.noiseT * 3.1 + 1) * 0.6;

    const value = clamp(s.baseline + s.transient.v + noise, 6, s.h - 6);

    s.hist.copyWithin(0, 1);
    s.hist[s.cols - 1] = value;
    s.cliffs.forEach((c) => (c.x -= STEP));
    s.cliffs = s.cliffs.filter((c) => c.x > -2);
  };

  const tick = (_time, deltaTime) => {
    if (!s.active || !s.visible || !s.ctx) return;
    /* fixed-period sampling: line doesn't speed up on 120hz displays */
    s.acc = Math.min(s.acc + deltaTime, FRAME * 4);
    let dirty = false;
    while (s.acc >= FRAME) {
      advance();
      s.acc -= FRAME;
      dirty = true;
    }
    if (dirty) draw();
  };

  /* reduced motion: no flow, snapshot of current state */
  const drawStatic = () => {
    if (!s.ctx) return;
    s.hist?.fill(s.baseline);
    draw();
  };

  /* gain: event. jumps, springs back to baseline, leaves no trace. */
  const gain = () => {
    if (!s.active) return;

    setStats((p) => ({ ...p, gains: p.gains + 1 }));
    if (s.reduced) return;

    gsap.killTweensOf(s.transient);
    gsap
      .timeline()
      .to(s.transient, { v: -s.h * AMP, duration: 0.16, ease: "power3.out" })
      .to(s.transient, { v: 0, duration: 1.3, ease: "power2.inOut" });
  };

  /* loss: state. baseline shifts down, old one remains as ghost. */
  const loss = () => {
    if (!s.active) return;

    setStats((p) => ({ ...p, losses: p.losses + 1 }));

    const from = s.baseline;
    const drop = Math.min(s.h * AMP, s.h * 0.92 - from);

    if (s.reduced) {
      if (drop >= 12) {
        s.ghosts.push(from);
        s.baseline = from + drop;
      }
      drawStatic();
      return;
    }

    if (drop < 12) {
      /* at the bottom: nowhere left to fall, line only shakes */
      gsap.killTweensOf(s.transient);
      gsap.fromTo(
        s.transient,
        { v: 0 },
        { v: 5, duration: 0.07, yoyo: true, repeat: 5, ease: "power1.inOut" },
      );
      return;
    }

    s.ghosts.push(from);
    const cliff = { x: (s.cols - 1) * STEP, from, to: from + drop, p: 0 };
    s.cliffs.push(cliff);
    /* same duration and ease: red tip descent matches falling line exactly */
    gsap.to(cliff, { p: 1, duration: 0.45, ease: "power4.in" });
    gsap.to(s, { baseline: from + drop, duration: 0.45, ease: "power4.in" });
  };

  const reset = () => {
    if (!s.active) return;

    gsap.killTweensOf([s, s.transient, ...s.cliffs]);
    s.ghosts = [];
    s.cliffs = [];
    s.baseline = s.initial;
    s.transient.v = 0;
    s.hist?.fill(s.initial);
    setStats({ gains: 0, losses: 0 });
    draw();
  };

  useEffect(() => {
    s.active = isActive;
    if (!isActive) s.acc = 0;
  }, [isActive, s]);

  useEffect(() => {
    s.reduced = prefersReducedMotion();
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const init = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* on resize scale state proportionally; on first setup upper third */
      gsap.killTweensOf(s);
      const factor = s.h ? h / s.h : 0;
      s.baseline = factor ? s.baseline * factor : h * BASE_RATIO;
      s.ghosts = factor ? s.ghosts.map((g) => g * factor) : [];
      s.cliffs = [];
      s.initial = h * BASE_RATIO;
      s.cols = Math.max(2, Math.floor((w * HEAD_RATIO) / STEP) + 1);
      s.hist = new Float32Array(s.cols).fill(s.baseline);
      s.ctx = ctx;
      s.w = w;
      s.h = h;

      if (s.reduced) drawStatic();
      else draw();
    };

    init();

    const ro = new ResizeObserver(init);
    ro.observe(wrap);

    /* don't draw when panel is off-screen inside the deck */
    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting;
    });
    io.observe(wrap);

    if (!s.reduced) gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      io.disconnect();
      gsap.killTweensOf([s, s.transient]);
      s.ctx = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.annotation} key={i18n.language}>
        <h4>{t("manifesto.asymmetry.title")}</h4>
        <p>{t("manifesto.asymmetry.desc")}</p>
        <ReadMore slug="loss" />
      </div>

      <div className={styles.stage}>
        <div ref={wrapRef} className={styles.chart}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-hidden="true"
          />
        </div>

        <div className={styles.controls}>
          <button type="button" className={styles.action_btn} onClick={gain}>
            {t("manifesto.asymmetry.build")}
          </button>
          <button type="button" className={styles.action_btn} onClick={loss}>
            {t("manifesto.asymmetry.destruct")}
          </button>
        </div>

        <div className={styles.meta} aria-live="polite">
          <span>
            {t("manifesto.asymmetry.gain_word")} {stats.gains}
          </span>
          <span aria-hidden="true">/</span>
          <span>
            {t("manifesto.asymmetry.loss_word")} {stats.losses}
          </span>
          <button
            type="button"
            className={`${styles.reset} ${
              stats.gains + stats.losses > 0 ? styles.reset_visible : ""
            }`}
            onClick={reset}
            tabIndex={stats.gains + stats.losses > 0 ? 0 : -1}
          >
            [{t("manifesto.asymmetry.reset_label")}]
          </button>
        </div>
      </div>
    </div>
  );
}
