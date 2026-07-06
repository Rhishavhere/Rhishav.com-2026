import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useTranslation } from "react-i18next";
import PrimerLink from "@/ui/link/PrimerLink";

gsap.registerPlugin(ScrollTrigger);

const AboutmeHome = () => {
  const { t, i18n } = useTranslation();
  const textRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    let split;
    let ctx = gsap.context(() => {
      split = new SplitType(textRef.current, {
        types: "lines, words, chars",
        tagName: "span",
      });

      gsap.from(split.chars, {
        opacity: 0.15,
        duration: 0.0001,
        ease: "hop",
        stagger: 0.025,
        fontWeight: 100,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 70%",
          end: "top 40%",
          scrub: true,
        },
      });

      gsap.fromTo(
        footerRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "hop",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 40%",
            scrub: false,
          },
        },
      );
    }, textRef);

    return () => {
      ctx.revert();
      if (split) split.revert();
    };
  }, [t]);

  return (
    <div className="relative flex w-full select-none flex-col items-center justify-center gap-[10vh] px-[1vw] py-[20vh] max-[1024px]:gap-[5vh] max-[600px]:gap-[5vh] max-[600px]:px-[5vw] max-[600px]:py-[20vh]">
      <div
        key={i18n.language}
        ref={textRef}
        className="relative w-[20em] text-center text-[1.25em] font-[200] max-[600px]:w-[75vw] max-[600px]:text-[1em]"
        data-animate
      >
        {t("aboutHome.mainText")}
      </div>

      <footer ref={footerRef}>
        <PrimerLink
          href="/about-me"
          buttonText={t("aboutHome.link")}
          random
        />
      </footer>
    </div>
  );
};

export default AboutmeHome;
