import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectImage from "@/components/projects/ProjectImage";

gsap.registerPlugin(ScrollTrigger);

export default function StoryCard({
  work,
  index,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
}) {
  const cardRef = useRef(null);
  const reversed = index % 2 === 1;
  const hasSecond = work.images?.length > 1;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "butter",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
        },
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <Link
      to={work.link}
      ref={cardRef}
      className={`group grid w-full grid-cols-1 items-center gap-[6vw] py-[4vh] lg:grid-cols-12 ${
        reversed ? "lg:[direction:rtl]" : ""
      }`}
      aria-label={`open ${work.project_name}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
    >
      <div
        className={`relative lg:col-span-6 ${reversed ? "lg:[direction:ltr]" : ""}`}
      >
        <ProjectImage
          work={work}
          aspect="aspect-[3/4]"
          priority={index < 2}
          className="w-full max-w-[22em] mx-auto lg:mx-0"
        />
        {hasSecond && (
          <div
            className={`absolute hidden w-[42%] border border-[var(--wb50)] shadow-[0_1em_3em_rgba(0,0,0,0.08)] lg:block ${
              reversed ? "-left-[8%] bottom-[10%]" : "-right-[8%] bottom-[8%]"
            }`}
          >
            <ProjectImage
              work={work}
              aspect="aspect-square"
              useAsset
              imageIndex={1}
            />
          </div>
        )}
      </div>

      <div
        className={`flex flex-col gap-[1.5em] lg:col-span-5 ${reversed ? "lg:[direction:ltr] lg:col-start-8" : "lg:col-start-7"}`}
      >
        <span className="text-[0.75em] font-[300] uppercase tracking-[0.2em] text-[var(--wb400)]">
          [{work.index}] — {work.context}
        </span>
        <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-[500] leading-[0.95] tracking-[-0.04em] text-[var(--wb950)]">
          {work.project_name}
        </h2>
        <p className="text-[1.05em] font-[300] leading-[1.4] text-[var(--wb800)]">
          {work.tagline}
        </p>
        <p className="max-w-[32em] text-[0.9em] font-[300] leading-[1.5] text-[var(--wb600)]">
          {work.desc}
        </p>
        <span className="text-[0.8em] font-[400] text-[var(--wb950)] opacity-0 transition-opacity group-hover:opacity-100">
          read case →
        </span>
      </div>
    </Link>
  );
}
