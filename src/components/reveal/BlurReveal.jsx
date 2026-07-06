import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

gsap.registerPlugin(ScrollTrigger);

/* focus reveal: block goes from blur to sharp, words rise slightly.
   derived from manifest's dichotomy "bloom" panel. calm, smooth —
   for quiet emotional sentences, hero sublines. */
export default function BlurReveal({
  text,
  children,
  className = "",
  tagName = "p",
  stagger = 0.05,
  duration = 1.1,
  start = "top 85%",
  blur = 10,
  ...rest
}) {
  const elRef = useRef(null);
  const content = text != null ? text : children;
  const accessibleText = typeof content === "string" ? content : undefined;

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const words = el.querySelectorAll("[data-blur-word]");
    if (!words.length) return;

    gsap.set(el, { filter: `blur(${blur}px)` });
    gsap.set(words, { opacity: 0, yPercent: 42 });

    const reveal = gsap.timeline({ paused: true });
    reveal.to(
      el,
      { filter: "blur(0px)", duration: duration * 1.2, ease: "power2.out" },
      0,
    );
    reveal.to(
      words,
      { opacity: 1, yPercent: 0, duration, ease: "power2.out", stagger },
      0,
    );

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      reveal.play();
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: play,
      onRefresh: (self) => {
        if (self.start > ScrollTrigger.maxScroll(window)) play();
      },
    });

    return () => {
      try {
        st.kill();
        reveal.kill();
      } catch (e) {
        // noop
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessibleText, stagger, duration, start, blur]);

  const rendered =
    typeof content === "string"
      ? content.split(/(\s+)/).map((seg, i) => {
          if (!seg) return null;
          if (/\s+/.test(seg)) return seg;
          return (
            <span key={`${seg}-${i}`} data-blur-word className={styles.blurWord}>
              {seg}
            </span>
          );
        })
      : content;

  return React.createElement(
    tagName,
    {
      ref: elRef,
      className: `${styles.text} ${className}`.trim(),
      "aria-label": rest["aria-label"] ?? accessibleText,
      ...rest,
    },
    rendered,
  );
}
