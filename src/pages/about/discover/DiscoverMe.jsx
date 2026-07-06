import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.css";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import PrimerButton from "@/ui/button/PrimerButton";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// visual assets (language-agnostic) — colors from brand tokens
const cardAssets = [
  { id: 1, shape: "puzzle", color: "#989898" }, // purple400
  { id: 2, shape: "pen", color: "#989898" }, // blue300
  { id: 3, shape: "check", color: "#989898" }, // green300
];

// canvas ctx cannot resolve CSS variables — var(--x) resolves from root
const resolveColor = (c) => {
  if (!c.startsWith("var(")) return c;
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(c.slice(4, -1).trim())
      .trim() || "#111"
  );
};

// readable text on accent background: dark on light, light on dark
const onAccentColor = (c) => {
  const m = resolveColor(c).replace("#", "");
  if (m.length !== 6) return "var(--wb50)";
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16) / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.6 ? "var(--wb950)" : "var(--wb50)";
};

const Card = ({ asset, content, index, cursor }) => {
  const { t } = useTranslation();
  const [isRevealed, setIsRevealed] = useState(false);

  const cardRef = useRef(null);
  const ruleRef = useRef(null);
  const curtainRef = useRef(null);
  const contentRef = useRef(null);
  const canvasRef = useRef(null);

  /* paths not read on render; refs instead of state so native touch listeners
     don't capture stale closures. */
  const pathsRef = useRef([]);
  const currentPathRef = useRef([]);
  const lastMidRef = useRef(null);
  const widthRef = useRef(5);
  const drawingRef = useRef(false);
  const revealedRef = useRef(false);

  const setupCanvasAndDrawTemplate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 2;
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    drawTemplate(ctx, asset.shape, canvas.clientWidth, canvas.clientHeight);
  };

  useEffect(() => {
    requestAnimationFrame(setupCanvasAndDrawTemplate);

    // refresh bitmap on resize (old trail becomes invalid)
    const field = canvasRef.current?.parentElement;
    if (!field || typeof ResizeObserver === "undefined") return;
    let first = true;
    const ro = new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      if (drawingRef.current || revealedRef.current) return;
      currentPathRef.current = [];
      pathsRef.current = [];
      setupCanvasAndDrawTemplate();
    });
    ro.observe(field);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset.shape]);

  // entrance animation (scroll) — like the rest of the page: rise + hop
  useEffect(() => {
    if (reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "hop",
          delay: index * 0.1,
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
        },
      );
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  const drawTemplate = (ctx, shape, width, height) => {
    // guide trail: dashed line in card accent color — distinct from neutral grid
    ctx.save();
    ctx.strokeStyle = resolveColor(asset.color);
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.setLineDash([8, 8]);
    const centerX = width / 2;
    const centerY = height / 2;

    if (shape === "puzzle") {
      const w = 120,
        h = 120,
        tab = 20,
        curve = 8;
      const x = centerX - w / 2,
        y = centerY - h / 2;
      ctx.beginPath();
      ctx.moveTo(x + curve, y);
      ctx.lineTo(x + w / 2 - tab, y);
      ctx.arc(x + w / 2, y, tab, Math.PI, 2 * Math.PI, true);
      ctx.lineTo(x + w - curve, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + curve);
      ctx.lineTo(x + w, y + h - curve);
      ctx.quadraticCurveTo(x + w, y + h, x + w - curve, y + h);
      ctx.lineTo(x + w / 2 + tab, y + h);
      ctx.arc(x + w / 2, y + h, tab, 0, Math.PI, false);
      ctx.lineTo(x + curve, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - curve);
      ctx.lineTo(x, y + curve);
      ctx.quadraticCurveTo(x, y, x + curve, y);
      ctx.closePath();
      ctx.stroke();
    } else if (shape === "pen") {
      const bw = 22,
        bh = 90,
        th = 35,
        fh = 12,
        eh = 18;
      const x = centerX,
        y = centerY - (th + bh + fh + eh) / 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - bw / 2, y + th);
      ctx.lineTo(x + bw / 2, y + th);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(x - bw / 2, y + th, bw, bh);
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(x - bw / 2, y + th + bh, bw, fh);
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(x - bw / 2, y + th + bh + fh, bw, eh);
      ctx.stroke();
    } else if (shape === "check") {
      const r = 40;
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(centerX - r * 0.45, centerY + r * 0.05);
      ctx.lineTo(centerX - r * 0.1, centerY + r * 0.45);
      ctx.lineTo(centerX + r * 0.5, centerY - r * 0.3);
      ctx.stroke();
    }
    ctx.restore();
  };

  // ---- DRAWING ----------------------------------------------------------------
  const getMousePos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const sx = rect.width ? canvas.clientWidth / rect.width : 1;
    const sy = rect.height ? canvas.clientHeight / rect.height : 1;
    return {
      x: (clientX - rect.left) * sx,
      y: (clientY - rect.top) * sy,
      t: performance.now(),
    };
  };

  const startDrawing = (e) => {
    if (e.cancelable && e.type.startsWith("touch")) e.preventDefault();
    if (revealedRef.current) return;
    drawingRef.current = true;
    const p = getMousePos(e, canvasRef.current);
    currentPathRef.current = [p];
    lastMidRef.current = p;
    widthRef.current = 5;
  };

  const draw = (e) => {
    if (!drawingRef.current || revealedRef.current) return;
    if (e.cancelable && e.type.startsWith("touch")) e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getMousePos(e, canvas);
    const pts = currentPathRef.current;
    const prev = pts[pts.length - 1];
    pts.push(pos);

    // line width by speed: slow = thick, fast = thin (graphite feel)
    const dt = Math.max(pos.t - prev.t, 1);
    const dist = Math.hypot(pos.x - prev.x, pos.y - prev.y);
    const speed = dist / dt;
    const target = gsap.utils.clamp(2.5, 8, 8 - speed * 3.2);
    widthRef.current += (target - widthRef.current) * 0.35;

    // fluid trail via midpoint smoothing (quadratic) — flat ink, no shine
    const mid = { x: (prev.x + pos.x) / 2, y: (prev.y + pos.y) / 2 };
    ctx.setLineDash([]);
    ctx.strokeStyle = resolveColor(asset.color);
    ctx.lineWidth = widthRef.current;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastMidRef.current.x, lastMidRef.current.y);
    ctx.quadraticCurveTo(prev.x, prev.y, mid.x, mid.y);
    ctx.stroke();
    lastMidRef.current = mid;
  };

  const stopDrawing = () => {
    if (!drawingRef.current || revealedRef.current) return;
    drawingRef.current = false;
    if (currentPathRef.current.length > 5) {
      pathsRef.current = [...pathsRef.current, currentPathRef.current];
      checkShape(pathsRef.current);
    }
    currentPathRef.current = [];
  };

  /* React binds touch events as passive at the root, so preventDefault in JSX
     onTouch* does not work: page scrolls and on iOS tap-focus (.field tabIndex)
     scrolls the field into view and causes a jump.
     drawing gesture therefore uses native, non-passive listeners. */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const opts = { passive: false };
    canvas.addEventListener("touchstart", startDrawing, opts);
    canvas.addEventListener("touchmove", draw, opts);
    canvas.addEventListener("touchend", stopDrawing);
    canvas.addEventListener("touchcancel", stopDrawing);

    return () => {
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
      canvas.removeEventListener("touchcancel", stopDrawing);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkShape = (allPaths) => {
    const canvas = canvasRef.current;
    const centerX = canvas.clientWidth / 2,
      centerY = canvas.clientHeight / 2;
    const allPoints = allPaths.flat();
    if (allPoints.length < 20) return;

    const xs = allPoints.map((p) => p.x),
      ys = allPoints.map((p) => p.y);
    const minX = Math.min(...xs),
      maxX = Math.max(...xs),
      minY = Math.min(...ys),
      maxY = Math.max(...ys);
    const inCenter =
      Math.abs((minX + maxX) / 2 - centerX) < centerX * 0.5 &&
      Math.abs((minY + maxY) / 2 - centerY) < centerY * 0.5;
    if (!inCenter || (maxX - minX) * (maxY - minY) < 1000) return;

    let detected = false;
    if (asset.shape === "puzzle") {
      detected = allPoints.some(
        (p) => p.x > centerX + 45 && Math.abs(p.y - centerY) < 30,
      );
    } else if (asset.shape === "pen") {
      detected =
        allPoints.some((p) => p.y < centerY - 15) &&
        allPoints.some((p) => p.y > centerY + 15);
    } else if (asset.shape === "check") {
      detected =
        allPoints.some((p) => p.x < centerX) &&
        allPoints.some((p) => p.x > centerX);
    }

    if (detected) revealContent();
  };

  // ---- REVEAL / RESET CHOREOGRAPHY -----------------------------------------
  const revealContent = () => {
    setIsRevealed(true);
    revealedRef.current = true;
    cursor?.hide();

    const finish = () => {
      if (curtainRef.current) curtainRef.current.style.display = "none";
    };

    if (reduceMotion()) {
      gsap.set(ruleRef.current, { scaleX: 1 });
      gsap.set(curtainRef.current, { autoAlpha: 0 });
      gsap.set(contentRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(contentRef.current.children, { y: 0, autoAlpha: 1 });
      finish();
      return;
    }

    const tl = gsap.timeline({ onComplete: finish });

    // completion signature: accent line fills hairline from the left
    tl.fromTo(
      ruleRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "hop" },
    );

    // curtain peels upward
    tl.to(
      curtainRef.current,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        autoAlpha: 0,
        duration: 0.55,
        ease: "hop",
      },
      "-=0.25",
    );

    // content opens from below, lines settle in stagger
    tl.fromTo(
      contentRef.current,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "hop" },
      "-=0.35",
    );
    tl.fromTo(
      contentRef.current.children,
      { y: 22, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.55, ease: "hop", stagger: 0.07 },
      "<+0.05",
    );
  };

  const resetCard = () => {
    setIsRevealed(false);
    revealedRef.current = false;
    pathsRef.current = [];
    currentPathRef.current = [];
    requestAnimationFrame(setupCanvasAndDrawTemplate);

    const curtain = curtainRef.current;
    if (curtain) curtain.style.display = "flex";

    if (reduceMotion()) {
      gsap.set(ruleRef.current, { scaleX: 0 });
      gsap.set(curtain, { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1 });
      gsap.set(contentRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
      return;
    }

    const tl = gsap.timeline();
    tl.to(contentRef.current, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 0.45,
      ease: "hop",
    });
    tl.to(ruleRef.current, { scaleX: 0, duration: 0.35, ease: "hop" }, "<");
    tl.fromTo(
      curtain,
      { clipPath: "inset(0% 0% 100% 0%)", autoAlpha: 0 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        autoAlpha: 1,
        duration: 0.55,
        ease: "hop",
      },
      "-=0.15",
    );
  };

  // keyboard discovery: field is focusable, enter/space opens
  const handleFieldKeyDown = (e) => {
    if (isRevealed) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      revealContent();
      // when curtain closes, don't lose focus: move to reset button
      requestAnimationFrame(() => {
        contentRef.current
          ?.querySelector("button")
          ?.focus({ preventScroll: true });
      });
    }
  };

  return (
    <article
      ref={cardRef}
      className={styles.card}
      style={{ "--accent": asset.color }}
    >
      <header className={styles.meta}>
        <span className={styles.metaDot} aria-hidden="true">
          ●
        </span>
        <span className={styles.metaLabel}>
          {t("discover.discovery")} {String(index + 1).padStart(2, "0")}
        </span>
      </header>

      <div className={styles.rule} aria-hidden="true">
        <span ref={ruleRef} className={styles.ruleAccent} />
      </div>

      <div className={styles.stage}>
        <div ref={curtainRef} className={styles.curtain}>
          <AnimatedSplit
            key={content.instruction}
            text={content.instruction}
            className={styles.instruction}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            start="top 80%"
          />
          <div
            className={styles.field}
            data-lenis-prevent
            role="button"
            tabIndex={isRevealed ? -1 : 0}
            aria-label={content.instruction}
            onKeyDown={handleFieldKeyDown}
            onMouseEnter={() =>
              !isRevealed && cursor?.show(t("discover.cursor"))
            }
            onMouseLeave={() => cursor?.hide()}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className={styles.canvas}
            />
          </div>
        </div>

        <div ref={contentRef} className={styles.content}>
          <h3 className={styles.cardTitle}>{content.title}</h3>
          <p className={styles.cardDescription}>{content.description}</p>
          <PrimerButton
            onClick={resetCard}
            buttonText={t("discover.reset")}
            random
          />
        </div>
      </div>
    </article>
  );
};

export default function DiscoverMe() {
  const { t } = useTranslation();
  const translatedCards = t("discover.cards", { returnObjects: true });

  const cursorRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    if (!finePointer()) return;
    xTo.current = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.1,
      ease: "power3",
    });
    yTo.current = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.1,
      ease: "power3",
    });
  }, []);

  const handleMouseMove = (e) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  const cursor = {
    show: (label) => {
      if (!finePointer() || !cursorRef.current) return;
      cursorRef.current.textContent = `● ${label}`;
      gsap.to(cursorRef.current, { scale: 1, duration: 0.25, ease: "hop" });
    },
    hide: () => {
      if (!finePointer() || !cursorRef.current) return;
      gsap.to(cursorRef.current, { scale: 0, duration: 0.25, ease: "hop" });
    },
  };

  return (
    <div className={styles.container} onMouseMove={handleMouseMove}>
      <div className={styles.header}>
        <AnimatedSplit
          key={t("discover.title")}
          text={t("discover.title")}
          className={styles.title}
          tagName="h2"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
        <AnimatedSplit
          key={t("discover.subtitle")}
          text={t("discover.subtitle")}
          className={styles.subtitle}
          tagName="p"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
      </div>
      <div className={styles.cardsGrid}>
        {cardAssets.map((asset, index) => (
          <Card
            key={asset.id}
            asset={asset}
            content={translatedCards[index] || {}}
            index={index}
            cursor={cursor}
          />
        ))}
      </div>
      <span
        ref={cursorRef}
        className={styles.customCursor}
        style={{ top: 0, left: 0, transform: "translate(-50%, -50%) scale(0)" }}
      >
        ●
      </span>
    </div>
  );
}
