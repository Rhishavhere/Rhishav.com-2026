import { useTranslation } from "react-i18next";
import styles from "./style.module.css";

export default function ManifestProgress({
  active = 0,
  sectionCount = 0,
  labels: customLabels,
  onSelect,
  visible = false,
}) {
  const { t } = useTranslation();

  const rawLabels = t("manifesto.nav", { returnObjects: true });

  const labels =
    customLabels ??
    Array.from({ length: sectionCount }, (_, i) => {
      if (Array.isArray(rawLabels) && rawLabels[i]) {
        return rawLabels[i];
      }

      return `section ${i + 1}`;
    });

  return (
    <nav
      className={styles.progress}
      data-visible={visible ? "true" : "false"}
      aria-hidden={visible ? undefined : "true"}
      aria-label="manifesto progress"
    >
      {labels.map((label, i) => (
        <button
          key={i}
          type="button"
          style={{ "--i": i }}
          className={`${styles.item} ${active === i ? styles.active : ""}`}
          onClick={() => onSelect?.(i)}
          aria-current={active === i ? "true" : undefined}
        >
          <span className={styles.tick} />

          <span className={styles.meta}>
            <span className={styles.index}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={styles.label}>{label}</span>
          </span>
        </button>
      ))}
    </nav>
  );
}
