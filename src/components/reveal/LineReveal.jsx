import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

gsap.registerPlugin(ScrollTrigger);

/* line-by-line reveal: text splits into lines, each line rises from its own
   mask. calmer and more editorial than word-by-word AnimatedSplit — for multi-line
   body paragraphs and leads. same API as AnimatedSplit. */
export default function LineReveal({
  text,
  children,
  className = "",
  tagName = "p",
  stagger = 0.12,
  duration = 1,
  start = "top 85%",
  ease = "hop",
  ...rest
}) {
  const elRef = useRef(null);
  const content = text != null ? text : children;
  const accessibleText = typeof content === "string" ? content : undefined;

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const split = new SplitType(el, { types: "lines", tagName: "span" });
    const lines = split.lines || [];
    if (!lines.length) return;

    // turn each line into a mask: wrap content in an inner, set line to overflow:hidden
    const inners = lines.map((line) => {
      const inner = document.createElement("span");
      inner.className = styles.lineInner;
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
      line.classList.add(styles.lineMask);
      return inner;
    });

    gsap.set(inners, { yPercent: 110 });
    const reveal = gsap.fromTo(
      inners,
      { yPercent: 110 },
      { yPercent: 0, duration, ease, stagger, paused: true },
    );

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      reveal.play();
    };

    // trigger or safety net plays: text never stays hidden forever in
    // unreachable sections at the bottom (same robustness as AnimatedSplit)
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
        split.revert();
      } catch (e) {
        // noop
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessibleText, stagger, duration, start, ease]);

  return React.createElement(
    tagName,
    {
      ref: elRef,
      className: `${styles.text} ${className}`.trim(),
      "aria-label": rest["aria-label"] ?? accessibleText,
      ...rest,
    },
    content,
  );
}
