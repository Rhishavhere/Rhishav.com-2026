import styles from "./style.module.css";
import HeroAbout from "./hero/HeroAbout";
import Aboutme from "./about-me/Aboutme";
import WhatIDo from "./what-i-do/WhatIDo";
import SelectedWorks from "./selected-works/SelectedWorks";
import DiscoverMe from "./discover/DiscoverMe";
import Techstack from "./techstack/Techstack";
import Backstage from "./backstage/Backstage";
import ManifestHomePage from "../home/manifest/ManifestHomePage";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <HeroAbout />
      <Aboutme />
      <WhatIDo />
      <SelectedWorks />
      <DiscoverMe />
      <Techstack />
      <Backstage />
      <ManifestHomePage />
    </div>
  );
}
