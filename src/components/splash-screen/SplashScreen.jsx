import React, { useEffect, useRef, useMemo } from "react";
import styles from "./style.module.css";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/utils/motion";

const SPLASH_IMAGE_COUNT = 8;

export default function SplashScreen({ onAnimationComplete }) {
  const containerRef = useRef(null);
  const originalOverflow = useRef({ body: "", html: "" });

  const artImages = useMemo(() => {
    return Array.from(
      { length: SPLASH_IMAGE_COUNT },
      (_, i) => `/assets/modern-art/${i + 1}.webp`,
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // With reduced motion preference, skip opening choreography and go straight to content.
    if (prefersReducedMotion()) {
      onAnimationComplete?.();
      return;
    }

    originalOverflow.current.body = document.body.style.overflow || "";
    originalOverflow.current.html =
      document.documentElement.style.overflow || "";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const cleanupAndClose = () => {
      document.body.style.overflow = originalOverflow.current.body;
      document.documentElement.style.overflow = originalOverflow.current.html;

      if (onAnimationComplete) {
        onAnimationComplete();
      }
    };

    let ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);
      const artCards = q(`.${styles.artCard}`);

      gsap.set(containerRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
      });

      gsap.set(artCards, {
        x: 0,
        y: 0,
        scale: 0.25,
        rotateZ: (i) => i * 2,
        // use inset so cards also open razor-sharp from the center
        clipPath: "inset(50% 50% 50% 50%)",
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        defaults: { ease: "butter" },
        onComplete: cleanupAndClose,
      });

      // 1. Cards open outward with razor-sharp corners
      tl.to(artCards, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.4,
        stagger: 0.2,
      });

      // 2. Rotation resets to zero
      tl.to(
        artCards,
        {
          rotateZ: 0,
          duration: 0.6,
          ease: "butterSlow",
        },
        "-=0.2",
      );

      // 3. Cards reach full size
      tl.to(
        artCards,
        {
          scale: 1,
          duration: 0.8,
          ease: "butterSlow",
        },
        "-=0.4",
      );

      // 4. Entire screen collapses inward as a sharp rectangular mask
      tl.to(
        containerRef.current,
        {
          clipPath: "inset(50% 50% 50% 50%)",
          duration: 0.8,
          ease: "butterSlow",
        },
        "-=0.3",
      );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = originalOverflow.current.body;
      document.documentElement.style.overflow = originalOverflow.current.html;
    };
  }, [artImages, onAnimationComplete]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.cardsWrapper}>
        {artImages.map((src, index) => (
          <img
            key={index}
            className={styles.artCard}
            src={src}
            alt=""
            aria-hidden="true"
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
          />
        ))}
      </div>
    </div>
  );
}
