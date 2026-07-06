import styles from "./style.module.css";

const ProjectSkeleton = () => {
  return (
    <div className={`${styles.work} ${styles.skeleton_wrapper}`}>
      <div className={styles.skeleton_img}></div>
    </div>
  );
};

export default ProjectSkeleton;
