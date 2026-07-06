/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useCallback } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import { throttle } from "lodash-es";
import { useTranslation } from "react-i18next";
import PrimerLink from "@/ui/link/PrimerLink";
import ReadWash from "@/components/reveal/ReadWash";

const ContactHomePage = () => {
  const { t } = useTranslation();

  const contextRef = useRef(null);
  const containerRef = useRef(null);
  const wordIndexRef = useRef(0);
  const styleIndexRef = useRef(0);
  const lastSpawnRef = useRef(null);

  const sentencesData = t("contactHome.sentences", { returnObjects: true });

  const stylesArray = [
    styles.style1,
    styles.style2,
    styles.style3,
    styles.style4,
    styles.style5,
    styles.style6,
    styles.style7,
    styles.style8,
  ];

  const minimumDistance = 60;

  const spawnWord = useCallback(
    (clientX, clientY) => {
      const context = contextRef.current;
      const container = containerRef.current;
      if (!context || !container || !sentencesData || sentencesData.length === 0)
        return;

      const rect = context.getBoundingClientRect();
      const x = clientX - rect.left + (Math.random() * 4 - 2);
      const y = clientY - rect.top + (Math.random() * 4 - 2);

      if (wordIndexRef.current >= sentencesData.length) wordIndexRef.current = 0;
      const word = sentencesData[wordIndexRef.current];
      wordIndexRef.current += 1;

      if (styleIndexRef.current >= stylesArray.length) styleIndexRef.current = 0;
      const styleClass = stylesArray[styleIndexRef.current];
      styleIndexRef.current += 1;

      const span = document.createElement("span");
      span.textContent = word;
      span.className = styleClass;
      Object.assign(span.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        display: "inline-block",
        pointerEvents: "none",
        zIndex: 2,
        willChange: "transform",
      });
      container.appendChild(span);

      gsap.fromTo(
        span,
        { scale: 0 },
        {
          duration: 0.45,
          scale: 1.25,
          ease: "butter",
          rotate: Math.random() * 20 - 10,
          force3D: true,
          onComplete: () => {
            gsap.to(span, {
              duration: 0.55,
              scale: 0,
              ease: "expo.in",
              delay: 0.25,
              force3D: true,
              onComplete: () => span.remove(),
            });
          },
        },
      );
    },
    [sentencesData],
  );

  const handlePointerMove = useCallback(
    throttle((e) => {
      const last = lastSpawnRef.current;
      if (last) {
        const distance = Math.hypot(e.clientX - last.x, e.clientY - last.y);
        if (distance < minimumDistance) return;
      }
      lastSpawnRef.current = { x: e.clientX, y: e.clientY };
      spawnWord(e.clientX, e.clientY);
    }, 30),
    [spawnWord],
  );

  const handlePointerDown = useCallback(
    (e) => {
      lastSpawnRef.current = { x: e.clientX, y: e.clientY };
      const burst = e.pointerType === "touch" ? 3 : 1;
      for (let i = 0; i < burst; i++) {
        spawnWord(
          e.clientX + (Math.random() * 50 - 25),
          e.clientY + (Math.random() * 50 - 25),
        );
      }
    },
    [spawnWord],
  );

  return (
    <div className="relative flex w-screen items-center justify-center bg-[var(--wb50)] p-[1vw]">
      <div
        className="relative flex w-[98vw] items-center justify-center px-[20vw] py-[30vh] max-[1024px]:gap-[0.5em] max-[1024px]:px-[1vw] max-[1024px]:py-[30vh]"
        ref={contextRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
      >
        <div className="flex flex-col items-start justify-center gap-[10vh]">
          <div>
            <ReadWash
              className="text-[1.15em] font-[400] max-[1024px]:text-[1.5em] max-[600px]:text-[1.25em]"
              text={t("contactHome.header")}
              tagName="div"
            />
            <div className="text-[1em] font-[200] opacity-50 max-[1024px]:text-[1.25em] max-[600px]:text-[1.15em]">
              {t("contactHome.subtext")}
            </div>
          </div>
          <PrimerLink
            buttonText={t("contactHome.link")}
            href="/contact-me"
            random
          />
        </div>
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-full"
          ref={containerRef}
        />
      </div>
    </div>
  );
};

export default ContactHomePage;
