import { useEffect, useRef } from "react";
import styles from "./style.module.css";

/* Thin horizontal bar at the top of the page showing scroll position.
   window scroll event is sufficient because Lenis drives native scroll;
   ResizeObserver refreshes when lazy-loaded sections change page height. */
export default function ScrollProgress() {
  const fillRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const update = () => {
      frameRef.current = 0;
      const fill = fillRef.current;
      if (!fill) return;

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      fill.style.transform = `scaleX(${progress})`;
    };

    const schedule = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    let observer;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(schedule);
      observer.observe(document.body);
    }

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={fillRef} className={styles.fill} />
    </div>
  );
}
