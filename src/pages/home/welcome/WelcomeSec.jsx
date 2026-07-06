import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import colors from "@/utils/colors";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import BlurReveal from "@/components/reveal/BlurReveal";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const WelcomeSec = () => {
  const { t } = useTranslation();

  const [cursorStyles, setCursorStyles] = useState({
    bg: "var(--main-color500)",
    color: "var(--wb950)",
  });

  const cursorRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
  };

  const handleMouseEnter = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];

    setCursorStyles({
      bg: randomColor.bg,
      color: randomColor.color,
    });

    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.25,
      ease: "hop",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: "hop",
    });
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(50% 50% 50% 50%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "hop",
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 80%",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex w-full items-center justify-evenly px-[1vw] py-[10vh] max-[600px]:flex-col max-[600px]:justify-center max-[600px]:gap-[10vh] max-[600px]:px-[1vw] max-[600px]:py-[0vh]">
      <div className="flex w-[17.5em] flex-col items-start text-[1em] font-[500] max-[600px]:items-center max-[600px]:text-center">
        <AnimatedSplit
          key={t("welcome.greeting")}
          text={t("welcome.greeting")}
          className="h-[1.4em] overflow-hidden"
          tagName="p"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
        <Link
          to="/about-me"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="overflow-hidden font-[200]"
          data-animate
        >
          <AnimatedSplit
            key={t("welcome.name")}
            text={t("welcome.name")}
            className="!text-[1em] !font-[200]"
            tagName="h1"
            stagger={0.03}
            duration={1.5}
            start="top 80%"
          />
        </Link>
      </div>

      <div className="aspect-[2/3] w-[10em]">
        <img
          ref={imgRef}
          className={`${styles.img} h-full w-full object-cover`}
          src="/assets/yunus-emre-korkmaz/6.webp"
          alt="Yunus Emre Korkmaz"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex w-[17.5em] flex-col items-start text-[1em] font-[500] max-[600px]:items-center max-[600px]:text-center">
        <BlurReveal
          key={t("welcome.description")}
          text={t("welcome.description")}
          className="overflow-hidden font-[200]"
          tagName="span"
          start="top 85%"
        />
      </div>

      <span
        ref={cursorRef}
        className={styles.customCursor}
        style={{
          backgroundColor: cursorStyles.bg,
          color: cursorStyles.color,
          opacity: 0,
          scale: 0,
        }}
      >
        {t("welcome.cursor")}
      </span>
    </section>
  );
};

export default WelcomeSec;
