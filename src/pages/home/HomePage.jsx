import { lazy, Suspense, useEffect, useState } from "react";
import SignatureIntro from "@/components/signature-intro/SignatureIntro";
import IntroSec from "./intro/IntroSec";

const WelcomeSec = lazy(() => import("./welcome/WelcomeSec"));
const AboutmeHome = lazy(() => import("./aboutme/AboutmeHome"));
const HomeNowStrip = lazy(() => import("./now/HomeNowStrip"));
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
      import("./now/HomeNowStrip");
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
    <div className="flex w-full flex-col items-center gap-[22vh] max-[1024px]:gap-[14vh] max-[600px]:gap-[10vh]">
      {!isAnimationPlayed && (
        <SignatureIntro onAnimationComplete={handleAnimationComplete} />
      )}
      <IntroSec active={isAnimationPlayed} />
      {isAnimationPlayed && (
        <Suspense fallback={null}>
          <WelcomeSec />
          <AboutmeHome />
          <HomeNowStrip />
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
