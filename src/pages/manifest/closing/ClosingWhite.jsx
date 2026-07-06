import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";
import PrimerLink from "@/ui/link/PrimerLink";
import LineReveal from "@/components/reveal/LineReveal";

/* return to white — manifesto closing. the page opened with "the weight of white";
   closes the loop with code where 7 ideas bleach to white, leaving one line
   and the [yeqq] signature. same language as other panels: wb50 ground, hairline,
   hop ease, text rising from mask. final line belongs to LineReveal
   (its own ScrollTrigger + safety net); traces and signature play when panel settles. */
export default function ClosingWhite({ isActive = true }) {
  const { t } = useTranslation();
  const threadRefs = useRef([]);
  const signatureRef = useRef(null);

  // 7 ideas spoken, in order — closing is their bleaching to white
  const threads = (t("manifesto.nav", { returnObjects: true }) || []).slice(
    0,
    7,
  );

  useEffect(() => {
    const threadEls = threadRefs.current.filter(Boolean);
    const sig = signatureRef.current;
    if (!threadEls.length || !sig) return;

    // final state: traces stay ghostly (like loss panel ghost lines),
    // signature visible. line reveal is in LineReveal, independent of isActive.
    if (prefersReducedMotion()) {
      gsap.set(threadEls, { opacity: 0.06, y: 0 });
      gsap.set(sig, { autoAlpha: 1, y: 0 });
      return undefined;
    }

    // rewind when panel inactive: replay reveal on return
    if (!isActive) {
      gsap.set(threadEls, { opacity: 0.18, y: 0 });
      gsap.set(sig, { autoAlpha: 0, y: 10 });
      return undefined;
    }

    const tl = gsap.timeline();

    // traces bleach to white — subtraction becomes visible, ghost trace remains
    tl.to(threadEls, {
      opacity: 0.06,
      y: -6,
      delay: 0.5,
      duration: 1.2,
      ease: "hop",
      stagger: 0.05,
    });

    // signature appears — wordmark assembled from chaos in entropy panel, seal at the end
    tl.fromTo(
      sig,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.2",
    );

    return () => tl.kill();
  }, [isActive]);

  return (
    <div className={styles.container}>
      <div className={styles.threads} aria-hidden="true">
        {threads.map((label, i) => (
          <span
            key={i}
            ref={(el) => (threadRefs.current[i] = el)}
            className={styles.thread}
          >
            {label}
          </span>
        ))}
      </div>

      <LineReveal
        key={t("manifesto.closing.line")}
        text={t("manifesto.closing.line")}
        className={styles.line}
        tagName="p"
        start="top 80%"
      />

      <span ref={signatureRef} className={styles.signature}>
        [yeqq]
      </span>
      <PrimerLink
        href="/contact-me"
        buttonText={t("manifesto.closing.door")}
        random
      />
    </div>
  );
}
