import ManifestIntro from "@/pages/manifest/intro/ManifestIntro";
import ManifestContent from "@/pages/manifest/content/ManifestContent";
import styles from "./style.module.css";

export default function ManifestPage() {
  return (
    <div className={styles.container}>
      <ManifestIntro />
      <ManifestContent />
    </div>
  );
}
