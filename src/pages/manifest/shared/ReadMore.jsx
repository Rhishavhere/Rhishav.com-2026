import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import { randomColor } from "@/utils/colors";

// Link from below a manifesto section to its essay/reading page.
// react-router <Link>: client-side navigation — a plain <a> triggers a full page reload
// and resets out-of-tree singletons (e.g. background music).
export default function ReadMore({ slug }) {
  const { t } = useTranslation();
  // Pick color once per instance, show on hover (don't change on every render).
  const [randomBg] = useState(() => randomColor().bg);
  return (
    <Link
      to={`/manifest/${slug}`}
      className={styles.read_more}
      style={{ "--hover-color": randomBg }}
    >
      <span>● {t("manifesto.read_more")}</span>
    </Link>
  );
}
