import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import colors from "@/utils/colors";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import BlurReveal from "@/components/reveal/BlurReveal";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const WelcomeSec = () => {
    const { t } = useTranslation();
    
    // State kept only for hover colors;
    // mouse movement (x, y) removed from state.
    const [cursorStyles, setCursorStyles] = useState({
        bg: "var(--main-color500)",
        color: "var(--wb950)",
    });

    const cursorRef = useRef(null);
    const imgRef = useRef(null);

    /* --------------------------
        CURSOR LOGIC (OPTIMIZED)
    --------------------------- */
    const handleMouseMove = (e) => {
        // Direct DOM manipulation instead of state updates
        // Prevents the component from RE-RENDERing on every pixel of mouse movement.
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

    /* --------------------------
       SCROLL ANIMATIONS (OPTIMIZED)
    --------------------------- */
    useEffect(() => {
        // gsap.context: animations are cleaned up on unmount (prevents memory leaks)
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
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <AnimatedSplit
                    key={t('welcome.greeting')}
                    text={t('welcome.greeting')}
                    className={styles.content_text}
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
                    className={styles.link}
                    data-animate
                >
                    <AnimatedSplit
                        key={t('welcome.name')}
                        text={t('welcome.name')}
                        className={styles.name}
                        tagName="h1"
                        stagger={0.03}
                        duration={1.5}
                        start="top 80%"
                    />
                </Link>
            </div>

            <div className={styles.side_image_container}>
                <img
                    ref={imgRef}
                    className={styles.img}
                    src="/assets/yunus-emre-korkmaz/6.webp"
                    alt="Yunus Emre Korkmaz"
                    loading="lazy"
                    decoding="async"
                />
            </div>

            <div className={styles.content}>
                <BlurReveal
                    key={t('welcome.description')}
                    text={t('welcome.description')}
                    className={styles.link}
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
                    scale: 0 // scale 0 to stay hidden initially
                }}
            >
                {t('welcome.cursor')}
            </span>
        </section>
    );
};

export default WelcomeSec;
