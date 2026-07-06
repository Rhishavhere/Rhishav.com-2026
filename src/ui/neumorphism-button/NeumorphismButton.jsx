import styles from "./style.module.css";

const NeumorphismButton = ({ handleStart }) => {
  return (
    <div className={styles.light}>
      <label className={styles.circle}>
        <input
          type="checkbox"
          className={styles.input}
          onChange={(e) => handleStart(e.target.checked)}
        />
        <div className={styles.visual_element}></div>
      </label>
    </div>
  );
};

export default NeumorphismButton;
