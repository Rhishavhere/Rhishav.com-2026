import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import useMusic from "@/hooks/useMusic";

/* bar above the video/marquee square, square width, same language as the
   identity label: live clock left, music button right. separate component —
   per-second clock re-renders must not affect the marquee animation (IntroSec). */

const fmtTime = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};

export default function IntroTopBar() {
  const { t } = useTranslation();
  const [time, setTime] = useState(fmtTime);
  const { playing, toggle } = useMusic();

  useEffect(() => {
    const id = setInterval(() => setTime(fmtTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.topbar}>
      <span className={styles.clock} aria-label={t("intro.clock")}>
        {time}
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
