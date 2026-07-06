import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

gsap.registerPlugin(ScrollTrigger);

/* read wash: characters appear in low ink, scroll progress "reads" them left to
   right to full ink (scrub-linked). derived from manifest's aboutme section.
   text is always visible — the most robust, accessible reveal. for one strong
   sentence per page. */
export default function ReadWash({
  text,
  children,
  className = "",
  tagName = "p",
  from = 0.22,
  start = "top 75%",
  end = "top 35%",
  ...rest
}) {
  const elRef = useRef(null);
  const content = text != null ? text : children;
  const accessibleText = typeof content === "string" ? content : undefined;

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const split = new SplitType(el, { types: "chars", tagName: "span" });
    const chars = split.chars || [];
    if (!chars.length) return;

    // reduced motion: full ink, no wash
    if (prefersReducedMotion()) {
      gsap.set(chars, { opacity: 1 });
      return () => {
        try {
          split.revert();
        } catch (e) {
          // noop
        }
      };
    }

    gsap.set(chars, { opacity: from });
    let settled = false;
    const tween = gsap.to(chars, {
      opacity: 1,
      ease: "none",
      stagger: 0.5,
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: true,
        // safety net: if end position exceeds the page's scrollable limit,
        // wash can never complete; drop scrub and lock text to full ink —
        // don't leave it faded halfway.
        onRefresh: (self) => {
          if (!settled && self.end > ScrollTrigger.maxScroll(window)) {
            settled = true;
            self.disable();
            gsap.set(chars, { opacity: 1 });
          }
        },
      },
    });

    return () => {
      try {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      } catch (e) {
        // noop
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessibleText, from, start, end]);

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
