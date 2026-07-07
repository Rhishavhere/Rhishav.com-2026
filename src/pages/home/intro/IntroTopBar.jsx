import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import useMusic from "@/hooks/useMusic";

/* bar above the video/marquee square, square width, same language as the
   identity label: live elapsed time left, music button right. separate
   component — per-second re-renders must not affect the marquee (IntroSec). */

const ORIGIN = new Date(2004, 5 - 1, 17, 14, 30, 0); // May (5) 17, 2004 — 2:30 PM local

const fmtElapsed = () => {
  let diff = Math.max(0, Date.now() - ORIGIN.getTime());

  const days = Math.floor(diff / 86_400_000);
  diff %= 86_400_000;
  const hours = Math.floor(diff / 3_600_000);
  diff %= 3_600_000;
  const minutes = Math.floor(diff / 60_000);
  diff %= 60_000;
  const seconds = Math.floor(diff / 1_000);

  const p = (n) => String(n).padStart(2, "0");
  return `${days}d ${hours}h ${p(minutes)}m ${p(seconds)}s`;
};

export default function IntroTopBar() {
  const { t } = useTranslation();
  const [elapsed, setElapsed] = useState(fmtElapsed);
  const { playing, toggle } = useMusic();

  useEffect(() => {
    const id = setInterval(() => setElapsed(fmtElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.topbar}>
      <span className={styles.clock} aria-label={t("intro.clock")}>
        uptime: {elapsed}
      </span>
      <button
        type="button"
        className={styles.music}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? t("music.pause") : t("music.play")}
      >
        <span
          className={styles.musicDot}
          data-on={playing}
          aria-hidden="true"
        />
        {playing ? t("music.pause") : t("music.play")}
      </button>
    </div>
  );
}
