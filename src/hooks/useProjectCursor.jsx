import { useRef } from "react";
import gsap from "gsap";
import colors from "@/utils/colors";

export const useProjectCursor = (cursorWords) => {
  const cursorRef = useRef(null);
  const cursorStylesRef = useRef({
    bg: "var(--main-color500)",
    color: "var(--wb950)",
  });
  const cursorTextRef = useRef("see more");
  const lastColorIndexRef = useRef(null);
  const lastWordIndexRef = useRef(null);

  // Store GSAP quickSetters here
  const setters = useRef({ x: null, y: null });

  // Function that initializes the engine (runs once on first mouse move)
  const initSetters = () => {
    if (cursorRef.current && (!setters.current.x || !setters.current.y)) {
      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
      setters.current.x = gsap.quickSetter(cursorRef.current, "x", "px");
      setters.current.y = gsap.quickSetter(cursorRef.current, "y", "px");
    }
  };

  const getRandomIndexExcept = (length, except) => {
    let newIndex = Math.floor(Math.random() * length);
    while (newIndex === except) {
      newIndex = Math.floor(Math.random() * length);
    }
    return newIndex;
  };

  const handleMouseMove = (e) => {
    initSetters(); // Set up the engine if not already initialized
    if (setters.current.x && setters.current.y) {
      setters.current.x(e.clientX);
      setters.current.y(e.clientY);
    }
  };

  const handleMouseEnter = () => {
    initSetters(); // Set up the engine if not already initialized

    const newColorIndex = getRandomIndexExcept(
      colors.length,
      lastColorIndexRef.current,
    );
    const newColor = colors[newColorIndex];
    lastColorIndexRef.current = newColorIndex;

    if (cursorRef.current) {
      cursorRef.current.style.backgroundColor = newColor.bg;
      cursorRef.current.style.color = newColor.color;
    }

    const newWordIndex = getRandomIndexExcept(
      cursorWords.length,
      lastWordIndexRef.current,
    );
    lastWordIndexRef.current = newWordIndex;
    cursorTextRef.current = cursorWords[newWordIndex];

    if (cursorRef.current) {
      const textNode = cursorRef.current.childNodes[1];
      if (textNode) {
        textNode.textContent = cursorTextRef.current;
      }
    }

    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.25,
      ease: "hop",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 0,
      duration: 0.25,
      ease: "hop",
    });
  };

  return {
    cursorRef,
    cursorStylesRef,
    cursorTextRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
};
