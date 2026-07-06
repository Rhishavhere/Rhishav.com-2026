import { useEffect, useRef } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const techs = [
  { id: 1, asset: "/assets/svg/html.svg", name: "HTML5" },
  { id: 2, asset: "/assets/svg/css.svg", name: "CSS3" },
  { id: 3, asset: "/assets/svg/sass.svg", name: "SASS" },
  { id: 4, asset: "/assets/svg/js.svg", name: "JavaScript" },
  { id: 5, asset: "/assets/svg/ts.svg", name: "TypeScript" },
  { id: 6, asset: "/assets/svg/react.svg", name: "React" },
  { id: 7, asset: "/assets/svg/next.svg", name: "Next.js" },
  { id: 8, asset: "/assets/svg/expo.svg", name: "Expo" },
  { id: 9, asset: "/assets/svg/tailwind.svg", name: "Tailwind CSS" },
  { id: 10, asset: "/assets/svg/redux.svg", name: "Redux" },
  { id: 11, asset: "/assets/svg/git.svg", name: "Git" },
  { id: 12, asset: "/assets/svg/github.svg", name: "GitHub" },
  { id: 13, asset: "/assets/svg/gsap.svg", name: "GSAP" },
  { id: 14, asset: "/assets/svg/framer.svg", name: "Framer" },
  { id: 15, asset: "/assets/svg/motion.svg", name: "Motion" },
  { id: 16, asset: "/assets/svg/figma.svg", name: "Figma" },
  { id: 17, asset: "/assets/svg/ps.svg", name: "Photoshop" },
  { id: 18, asset: "/assets/svg/ai.svg", name: "Illustrator" },
];

export default function Techstack() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const iconRefs = useRef([]);
  const cursorRef = useRef(null);

  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    xTo.current = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.1,
      ease: "power3",
    });
    yTo.current = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.1,
      ease: "power3",
    });

    let ctx = gsap.context(() => {
      gsap.fromTo(
        iconRefs.current,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.75,
          ease: "hop",
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // global mouse tracking (for cursor)
  const handleMouseMoveGlobal = (e) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  // --- MAGNETIC PHYSICS (NEWLY ADDED) ---
  const handleMouseMoveIcon = (e, index) => {
    const icon = iconRefs.current[index];
    if (!icon) return;

    // find icon center
    const rect = icon.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const iconCenterY = rect.top + rect.height / 2;

    // distance from cursor to center
    const distanceX = e.clientX - iconCenterX;
    const distanceY = e.clientY - iconCenterY;

    // pull icon slightly toward cursor (0.3 is magnet strength)
    gsap.to(icon, {
      x: distanceX * 0.3,
      y: distanceY * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = (techName) => {
    if (cursorRef.current) {
      cursorRef.current.textContent = `● ${techName}`;
    }
    gsap.to(cursorRef.current, { scale: 1, duration: 0.25, ease: "hop" });
  };

  const handleMouseLeaveIcon = (index) => {
    const icon = iconRefs.current[index];
    if (!icon) return;

    // on mouse leave, snap logo back elastically
    gsap.to(icon, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)", // Yeqq-style wobble into place
    });

    // hide cursor
    gsap.to(cursorRef.current, { scale: 0, duration: 0.25, ease: "hop" });
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onMouseMove={handleMouseMoveGlobal}
    >
      <AnimatedSplit
        key={`${i18n.language}-techstack-title`}
        text={t("techstackAbout.title")}
        className={styles.label}
        tagName="h2"
        stagger={0.03}
        duration={1.5}
        start="top 80%"
      />
      <header className={styles.header}>
        {techs.map((tech, index) => (
          <div
            key={tech.id}
            className={styles.icon}
            ref={(el) => (iconRefs.current[index] = el)}
            onMouseMove={(e) => handleMouseMoveIcon(e, index)}
            onMouseEnter={() => handleMouseEnter(tech.name)}
            onMouseLeave={() => handleMouseLeaveIcon(index)}
          >
            <img
              src={tech.asset}
              alt={tech.name}
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </header>

      <span
        ref={cursorRef}
        className={styles.customCursor}
        style={{ top: 0, left: 0, transform: "translate(-50%, -50%) scale(0)" }}
      >
        ●
      </span>
    </div>
  );
}
