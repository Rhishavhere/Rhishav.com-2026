import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./style.module.css";
import { prefersReducedMotion } from "@/utils/motion";

/* signature moment — the site opening states its thesis: simplify complexity.
   beats: (1) particles arrange from chaos into the [rshv] mark (identity),
   (2) scatter and settle row-by-row into a regular grid filling the square,
   (3) dots grow into a real square without overflowing, then the overlay fades
   and the clean hero (IntroSec) underneath remains — same square, handed off to
   the video frame. same engine as the entropy panel: Outfit text drawn on a
   hidden canvas and sampled on a grid. monochrome, hairline dots — no glow. the
   same [rshv] mark arranged from chaos in the entropy panel, signed at manifest
   close — the site is bracketed by it at both ends. plays once on first visit
   (sessionStorage), never with reduced motion.

   performance: instead of creating separate tweens for ~324 particles across 3
   beats (thousands of tweens + stagger = heavy main-thread load), advance a
   single linear "clock" tween; each particle's eased position/radius is computed
   in the draw loop. ease (butter) and timing preserved exactly; main-thread tween
   count drops from ~970 to 2. opening flows smoothly as a result. */

const NAME = "[rshv]";

// [rshv] density naturally caps at ~398 points at g=5; ~400 is the sweet spot
// (no waste), fewer looks sparse. minimum for mobile readability.
const particleCount = () => {
  if (typeof window === "undefined") return 324;
  const w = window.innerWidth;
  if (w <= 600) return 81; // 9² — readable minimum
  if (w <= 1024) return 144; // 12²
  return 324; // 18²
};

// video frame edge: same as IntroSec .vid (desktop 60vh, ≤1024 60vw)
const squareSide = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return (w <= 1024 ? w : h) * 0.6;
};

const resolveInk = () => {
  if (typeof window === "undefined") return "#111";
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--wb950")
    .trim();
  return v || "#111";
};

// draw Outfit text large, sample on a grid → center-aligned target points.
// (entropy panel's buildTargets, generalized for arbitrary text + target count)
const sampleText = (text, count, maxWidth) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const fs = 80;
  const font = `400 ${fs}px "Outfit", sans-serif`;

  ctx.font = font;
  canvas.width = Math.ceil(ctx.measureText(text).width) + 8;
  canvas.height = Math.ceil(fs * 1.6);
  ctx.font = font; // canvas context resets when canvas is resized
  ctx.textBaseline = "middle";
  ctx.fillText(text, 4, canvas.height / 2);

  const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const filled = (x, y) => img[(y * canvas.width + x) * 4 + 3] > 128;

  // grow grid step until filled cell count drops below target:
  // one cell per point, no empty targets left
  let pts = [];
  for (let g = 3; g <= 22; g++) {
    pts = [];
    for (let y = Math.floor(g / 2); y < canvas.height; y += g) {
      for (let x = Math.floor(g / 2); x < canvas.width; x += g) {
        if (filled(x, y)) {
          pts.push({ x: x - canvas.width / 2, y: y - canvas.height / 2 });
        }
      }
    }
    if (pts.length && pts.length <= count) break;
  }
  if (!pts.length) return null;

  const scale = maxWidth / canvas.width;
  const out = [];
  for (let i = 0; i < count; i++) {
    const p = pts[i % pts.length];
    out.push({ x: p.x * scale, y: p.y * scale });
  }
  return out;
};

// regular grid filling the square (center-aligned, row-by-row = index order).
// inset: edge padding so growing dots don't overflow the square. also returns cell
// so final radius each dot grows to is computed from the cell size.
const squareFill = (count, side) => {
  const cols = Math.ceil(Math.sqrt(count));

  const usable = side;
  const cell = usable / cols;

  const x0 = -usable / 2;
  const y0 = -usable / 2;

  const out = new Array(count);

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = (i / cols) | 0;

    out[i] = {
      x: x0 + cell * (col + 0.5),
      y: y0 + cell * (row + 0.5),
    };
  }

  return { targets: out, cell };
};

export default function SignatureIntro({ onAnimationComplete }) {
  const overlayRef = useRef(null);
  const canvasRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    // reduced motion: no choreography, go straight to clean hero
    if (prefersReducedMotion()) {
      onAnimationComplete?.();
      return undefined;
    }

    const prevBody = document.body.style.overflow || "";
    const prevHtml = document.documentElement.style.overflow || "";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      onAnimationComplete?.();
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ink = resolveInk();
    const ease = gsap.parseEase("butter") || ((p) => p);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = particleCount();
    const cx = w / 2;
    const cy = h / 2;
    const side = squareSide();

    // clip is static (square never moves) → set up once instead of save/clip/restore
    // every frame. clearRect is bounded by this clip; only the square interior clears.
    ctx.beginPath();
    ctx.rect(cx - side / 2, cy - side / 2, side, side);
    ctx.clip();
    ctx.fillStyle = ink;

    // position/radius state in parallel arrays (no tween objects):
    // chaos = start (fine dots scattered across the screen)
    const chaosX = new Float64Array(count);
    const chaosY = new Float64Array(count);
    const r0 = new Float64Array(count);
    // targets filled in begin(); until then chaos = target → motionless chaos
    const nameX = new Float64Array(count);
    const nameY = new Float64Array(count);
    const fillX = new Float64Array(count);
    const fillY = new Float64Array(count);
    // per-particle random delay for each beat (stagger "from random")
    const d1 = new Float64Array(count);
    const d2 = new Float64Array(count);
    const d3 = new Float64Array(count);
    let rFinal = 1;

    for (let i = 0; i < count; i++) {
      const x = gsap.utils.random(-w / 2, w / 2);
      const y = gsap.utils.random(-h / 2, h / 2);
      chaosX[i] = nameX[i] = fillX[i] = x;
      chaosY[i] = nameY[i] = fillY[i] = y;
      r0[i] = gsap.utils.random(0.7, 1.1);
    }

    // beat timing (s) — identical to old timeline:
    // B1: chaos→[rshv]  B2: [rshv]→square-grid  B3: dots grow  → overlay fades
    const s1 = 0.2;
    const d1dur = 0.66;
    const A1 = 0.66; // B1 ends: 0.2 + 0.66 + 0.66 = 1.52
    const s2 = 2.02; // B1 end + 0.5
    const d2dur = 1.2;
    const A2 = 1; // B2 ends: 2.02 + 1 + 1.2 = 4.22
    const s3 = 4.27; // B2 end + 0.05
    const d3dur = 0.33;
    const A3 = 0.33; // B3 ends: 4.27 + 0.33 + 0.33 = 4.93
    const s4 = 5.08; // B3 end + 0.15
    const fadeDur = 0.33;
    const TOTAL = s4 + fadeDur; // 5.41

    const clock = { t: 0 };

    // single position source: each particle's eased state from clock.t.
    // position has two segments (chaos→name, name→square); radius has one.
    const draw = () => {
      const t = clock.t;
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();

      for (let i = 0; i < count; i++) {
        let px;
        let py;
        if (t < s2) {
          let p = (t - s1 - d1[i]) / d1dur;
          p = p < 0 ? 0 : p > 1 ? 1 : p;
          const e = ease(p);
          px = chaosX[i] + (nameX[i] - chaosX[i]) * e;
          py = chaosY[i] + (nameY[i] - chaosY[i]) * e;
        } else {
          let p = (t - s2 - d2[i]) / d2dur;
          p = p < 0 ? 0 : p > 1 ? 1 : p;
          const e = ease(p);
          px = nameX[i] + (fillX[i] - nameX[i]) * e;
          py = nameY[i] + (fillY[i] - nameY[i]) * e;
        }

        let pr = (t - s3 - d3[i]) / d3dur;
        pr = pr < 0 ? 0 : pr > 1 ? 1 : pr;
        const r = r0[i] + (rFinal - r0[i]) * ease(pr);

        const dx = cx + px;
        const dy = cy + py;
        ctx.moveTo(dx + r, dy);
        ctx.arc(dx, dy, r, 0, Math.PI * 2);
      }

      ctx.fill();
    };

    gsap.ticker.add(draw);

    let tl;
    const begin = () => {
      if (doneRef.current) return;
      const fill = squareFill(count, side);
      const nameTargets =
        sampleText(NAME, count, Math.min(w * 0.28, 340)) || fill.targets;

      for (let i = 0; i < count; i++) {
        nameX[i] = nameTargets[i].x;
        nameY[i] = nameTargets[i].y;
        fillX[i] = fill.targets[i].x;
        fillY[i] = fill.targets[i].y;
        d1[i] = Math.random() * A1;
        d2[i] = Math.random() * A2;
        d3[i] = Math.random() * A3;
      }
      rFinal = fill.cell * 0.75;

      // only 2 tweens on the main thread: linear clock + overlay fade.
      tl = gsap.timeline({ onComplete: finish });
      tl.to(clock, { t: TOTAL, duration: TOTAL, ease: "none" }, 0);
      tl.to(
        overlayRef.current,
        { autoAlpha: 0, duration: fadeDur, ease: "butter" },
        s4,
      );
    };

    // sampling before Outfit loads gives wrong shape; chaos covers this delay
    if (document.fonts?.load) {
      document.fonts.load('600 100px "Outfit"').then(begin).catch(begin);
    } else {
      begin();
    }

    return () => {
      gsap.ticker.remove(draw);
      if (tl) tl.kill();
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.overlay} ref={overlayRef} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
