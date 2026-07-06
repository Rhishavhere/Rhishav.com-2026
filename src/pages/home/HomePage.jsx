import { lazy, Suspense, useEffect, useState } from "react";
import SignatureIntro from "@/components/signature-intro/SignatureIntro";
import IntroSec from "./intro/IntroSec";
import styles from "./style.module.css";

const WelcomeSec = lazy(() => import("./welcome/WelcomeSec"));
const AboutmeHome = lazy(() => import("./aboutme/AboutmeHome"));
const Works = lazy(() => import("./works/Works"));
const PrinciplesSection = lazy(() => import("./principle/PrinciplesSection"));
const ManifestHomePage = lazy(() => import("./manifest/ManifestHomePage"));
const ContactHomePage = lazy(() => import("./contact/ContactHomePage"));

const HomePage = () => {
  // const [isAnimationPlayed, setIsAnimationPlayed] = useState(
  //   () => sessionStorage.getItem("animationPlayed") === "true",
  // );

    // TODO: restore sessionStorage gate when intro visuals are finalized
    const [isAnimationPlayed, setIsAnimationPlayed] = useState(false);

  useEffect(() => {
    const warmHomeSections = () => {
      import("./welcome/WelcomeSec");
      import("./aboutme/AboutmeHome");
      import("./works/Works");
      import("./principle/PrinciplesSection");
      import("./manifest/ManifestHomePage");
      import("./contact/ContactHomePage");
    };

    if (typeof window === "undefined") return undefined;

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warmHomeSections, {
        timeout: 1800,
      });
      return () => window.cancelIdleCallback(id);
    }

    const timeout = window.setTimeout(warmHomeSections, 900);
    return () => window.clearTimeout(timeout);
  }, []);

  const handleAnimationComplete = () => {
    setIsAnimationPlayed(true);
    // sessionStorage.setItem("animationPlayed", "true");
  };

  return (
    <div className={styles.container}>
      {!isAnimationPlayed && (
        <SignatureIntro onAnimationComplete={handleAnimationComplete} />
      )}
      <IntroSec active={isAnimationPlayed} />
      {/* mounting 6 heavy sections below (3 read layout via ScrollTrigger) while the
          signature plays drops frames. warm prefetches chunks on idle; mount after
          signature ends → signature and sections never on screen together; opening
          stays smooth. */}
      {isAnimationPlayed && (
        <Suspense fallback={null}>
          <WelcomeSec />
          <AboutmeHome />
          <Works />
          <PrinciplesSection />
          <ManifestHomePage />
          <ContactHomePage />
        </Suspense>
      )}
    </div>
  );
};

export default HomePage;
