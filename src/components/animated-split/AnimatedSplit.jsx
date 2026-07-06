import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.css";
import { prefersReducedMotion } from "@/utils/motion";

gsap.registerPlugin(ScrollTrigger);

const AnimatedSplit = ({
    text,
    children,
    className = "",
    tagName = "span",
    stagger = 0.05,
    duration = 1.5,
    start = "top 80%",
    ease = "hop",
    ...rest
}) => {
    const elRef = useRef(null);
    const content = text != null ? text : children;
    const accessibleText = typeof content === "string" ? content : undefined;

    useEffect(() => {
        if (!elRef.current) return;
        if (prefersReducedMotion()) return;

        const wordElements = elRef.current.querySelectorAll("[data-split-word-inner]");
        if (!wordElements.length) return;

        gsap.set(wordElements, { y: "110%" });

        // reveal set up paused; trigger or safety net plays it
        const reveal = gsap.fromTo(
            wordElements,
            { y: "110%" },
            { y: "0%", duration, ease, stagger, paused: true }
        );

        let played = false;
        const play = () => {
            if (played) return;
            played = true;
            reveal.play();
        };

        const st = ScrollTrigger.create({
            trigger: elRef.current,
            start,
            once: true,
            onEnter: play,
            // safety net: if a section is at the very bottom and start position
            // exceeds the page's scrollable limit (top 80% line is never reached),
            // text must not stay hidden forever — reveal still plays.
            onRefresh: (self) => {
                if (self.start > ScrollTrigger.maxScroll(window)) play();
            },
        });

        return () => {
            try {
                st.kill();
                reveal.kill();
            } catch (e) {
                // noop
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessibleText, stagger, duration, start, ease]);

    const renderedContent =
        typeof content === "string"
            ? content.split(/(\s+)/).map((segment, index) => {
                if (!segment) return null;
                if (/\s+/.test(segment)) return segment;

                return (
                    <span
                        className={styles.wordMask}
                        data-split-word
                        key={`${segment}-${index}`}
                    >
                        <span className={styles.word} data-split-word-inner>
                            {segment}
                        </span>
                    </span>
                );
            })
            : content;

    return React.createElement(
        tagName,
        {
            ref: elRef,
            className: `${styles.animatedText} ${className}`.trim(),
            "aria-label": rest["aria-label"] ?? accessibleText,
            ...rest,
        },
        renderedContent
    );
};

export default AnimatedSplit; 
