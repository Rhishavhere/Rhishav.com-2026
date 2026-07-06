import { useEffect, useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

/* screen inspector (lightbox): opens at full resolution when a contact sheet
   thumbnail is clicked. images stay quiet while reading the page, one click
   away at full quality when you want to inspect. open/close driven by css
   transitions (butter bezier); instant with reduced motion. */
const EXIT_MS = 420;

export default function Lightbox({
  images = [],
  asset = "",
  projectName = "",
  index,
  onClose,
  onNavigate,
}) {
  const { t } = useTranslation();
  const open = index !== null && index >= 0;
  const total = images.length;

  // render: in DOM? | active: visible? (triggers transition)
  const [render, setRender] = useState(open);
  const [active, setActive] = useState(false);
  const [shown, setShown] = useState(open ? index : 0);

  const closeRef = useRef(null);

  const go = useCallback(
    (dir) => {
      if (total < 2) return;
      onNavigate((index + dir + total) % total);
    },
    [index, total, onNavigate],
  );

  // mount + enter / exit transition
  useEffect(() => {
    let raf1, raf2, timer;
    if (open) {
      setShown(index);
      setRender(true);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setActive(true));
      });
    } else {
      setActive(false);
      timer = setTimeout(
        () => setRender(false),
        prefersReducedMotion() ? 0 : EXIT_MS,
      );
    }
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timer);
    };
  }, [open, index]);

  // scroll lock + keyboard (esc closes, arrows navigate)
  useEffect(() => {
    if (!open) return;

    window.lenis?.stop?.();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.lenis?.start?.();
    };
  }, [open, go, onClose]);

  if (!render) return null;

  const current = images[shown];
  if (!current) return null;

  return (
    <div
      className={`${styles.overlay} ${active ? styles.active : ""}`}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={projectName}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className={styles.close}
        aria-label={t("workSingle.lightbox.close")}
        onClick={onClose}
      >
        ✕
      </button>

      {total > 1 && (
        <span className={styles.counter} aria-hidden="true">
          {t("workSingle.lightbox.counter", {
            current: shown + 1,
            total,
          })}
        </span>
      )}

      {total > 1 && (
        <button
          type="button"
          className={`${styles.nav} ${styles.prev}`}
          aria-label={t("workSingle.lightbox.prev")}
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
        >
          ←
        </button>
      )}

      <figure className={styles.stage} onClick={(e) => e.stopPropagation()}>
        <img
          key={shown}
          className={styles.image}
          src={`${asset}/${current.file}`}
          alt={`${projectName} — ${shown + 1}`}
          decoding="async"
        />
      </figure>

      {total > 1 && (
        <button
          type="button"
          className={`${styles.nav} ${styles.next}`}
          aria-label={t("workSingle.lightbox.next")}
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
        >
          →
        </button>
      )}
    </div>
  );
}
