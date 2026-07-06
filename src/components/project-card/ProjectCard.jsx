import { forwardRef, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = forwardRef(({
  work,
  index,
  className,
  onTouchStart,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
}, forwardedRef) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const setCardRef = (node) => {
    cardRef.current = node;

    if (typeof forwardedRef === "function") {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", y: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 1.2,
          ease: "hop",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const isPriority = index < 2;

  return (
    <Link
      to={work.link}
      className={className || styles.work}
      ref={setCardRef}
      aria-label={`Open case study: ${work.project_name}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
    >
      <div className={styles.work_img} ref={imgRef}>
        <img
          src={`/assets/banners/${work.banner}-800.webp`}
          srcSet={`/assets/banners/${work.banner}-400.webp 400w, /assets/banners/${work.banner}-800.webp 800w, /assets/banners/${work.banner}-1200.webp 1200w, /assets/banners/${work.banner}-1600.webp 1600w`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={work.project_name}
          className={styles.img}
          width="800"
          height="450"
          fetchpriority={isPriority ? "high" : "auto"}
          loading={isPriority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className={styles.works}>
        <h2 className={styles.work_name}>{work.project_name}</h2>
        <div className={styles.work_desc}>{work.company_name}</div>
      </div>
    </Link>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
