import { memo, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import { prefersReducedMotion } from "@/utils/motion";
import IntroTopBar from "./IntroTopBar";

// base speed and hover behavior in px/s
const BASE_SPEED = 240; // normal flow (left)
const FAST_MULT = 3; // hover left → speed up
const REVERSE_MULT = -1.4; // hover right → reverse
const SMOOTH = 6; // speed transition smoothness (higher = settles faster)

const IntroSec = ({ active = true }) => {
  const { t } = useTranslation();
  const text = t("intro.marqueeText");

  const containerRef = useRef(null);
  const hoverRef = useRef(null);
  const whiteTrackRef = useRef(null);
  const darkTrackRef = useRef(null);
  const [copies, setCopies] = useState(4);

  // animation mutable state (does not trigger render)
  const anim = useRef({
    pos: 0, // current position (px)
    vel: BASE_SPEED, // instantaneous speed
    target: BASE_SPEED, // target speed
    wrap: (v) => v, // wraps into [-unitW, 0)
  });

  useEffect(() => {
    const white = whiteTrackRef.current;
    const dark = darkTrackRef.current;
    const container = containerRef.current;
    const hover = hoverRef.current;
    if (!white || !dark || !container || !hover) return;

    const setWhite = gsap.quickSetter(white, "x", "px");
    const setDark = gsap.quickSetter(dark, "x", "px");
    const s = anim.current;
    const reduce = prefersReducedMotion();

    // measure one "unit" width → perfect modular wrap distance
    const measure = () => {
      const unit = white.querySelector("[data-unit]");
      if (!unit) return;
      const unitW = unit.getBoundingClientRect().width;
      if (!unitW) return;
      s.wrap = gsap.utils.wrap(-unitW, 0);
      s.pos = s.wrap(s.pos);
      // ensure enough copies to fill the container with one unit
      const needed = Math.ceil(container.offsetWidth / unitW) + 2;
      setCopies((c) => (needed > c ? needed : c));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);

    // with reduced motion, keep marquee static: no drift, no hover speed-up.
    if (reduce) {
      setWhite(s.pos);
      setDark(s.pos);
      return () => ro.disconnect();
    }

    // single position source → both layers always in sync
    const tick = (_time, deltaMS) => {
      const dt = Math.min(deltaMS, 50) / 1000; // prevent jump on tab switch
      const k = 1 - Math.exp(-dt * SMOOTH); // frame-rate-independent smoothing
      s.vel += (s.target - s.vel) * k;
      s.pos = s.wrap(s.pos - s.vel * dt); // vel > 0 → left; modular wrap = zero jump
      setWhite(s.pos);
      setDark(s.pos);
    };

    // run when visible, save CPU when off-screen
    let running = false;
    const start = () => {
      if (!running) {
        running = true;
        gsap.ticker.add(tick);
      }
    };
    const stop = () => {
      if (running) {
        running = false;
        gsap.ticker.remove(tick);
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(container);

    // hover only on the marquee strip: left → speed up, center → stop, right → reverse
    const onMove = (e) => {
      const rect = hover.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      if (x < 0.34) s.target = BASE_SPEED * FAST_MULT;
      else if (x > 0.66) s.target = BASE_SPEED * REVERSE_MULT;
      else s.target = 0;
    };
    const onLeave = () => {
      s.target = BASE_SPEED;
    };

    hover.addEventListener("mousemove", onMove);
    hover.addEventListener("mouseleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      hover.removeEventListener("mousemove", onMove);
      hover.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const units = Array.from({ length: copies }, (_, i) => (
    <span key={i} data-unit className="flex-none pr-[15px]">
      {text}
    </span>
  ));

  return (
    <div className={styles.container} ref={containerRef}>
      <IntroTopBar />
      <p className={styles.identity} aria-hidden="true">{t("welcome.name")}</p>
      <div className={styles.vid}>
        <img
          className={styles.vidMedia}
          src="/assets/me/back.jpg"
          alt=""
          fetchPriority={active ? "high" : "auto"}
        />
      </div>

      <div className={styles.marquee_div}>
        <div className={styles.marquee_div_content}>
          <div className={styles.track} ref={whiteTrackRef}>
            {units}
          </div>
        </div>

        <div className={styles.marquee_div_2}>
          <div className={styles.track} ref={darkTrackRef}>
            {units}
          </div>
        </div>

        {/* transparent hover region covering only the marquee strip */}
        <div className={styles.marquee_hover} ref={hoverRef} aria-hidden="true" />
      </div>
    </div>
  );
};

export default memo(IntroSec);
