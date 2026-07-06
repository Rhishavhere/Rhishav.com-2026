import { useState } from "react";
import styles from "./style.module.css";
import { randomColor } from "@/utils/colors";

export default function PrimerButton({
  buttonText,
  color,
  backgroundColor,
  onClick,
  type = "button",
  ariaLabel,
  random = false,
}) {
  // Pick a color once per instance so it stays fixed (doesn't change on every render).
  const [randomStyle] = useState(() => (random ? randomColor() : null));

  return (
    <button
      type={type}
      className={styles.button}
      style={
        random
          ? { backgroundColor: randomStyle.bg, color: randomStyle.color }
          : { color, backgroundColor }
      }
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {buttonText}
    </button>
  );
}
