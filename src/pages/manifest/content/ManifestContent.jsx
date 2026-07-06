import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ManifestArc from "@/pages/manifest/arc/ManifestArc";
import ObserverEffect from "@/pages/manifest/observer/ObserverEffect";
import CostOfOrder from "@/pages/manifest/cost/CostOfOrder";
import ParetoDistribution from "@/pages/manifest/pareto/ParetoDistribution";
import WeightOfChoice from "@/pages/manifest/choice/WeightOfChoice";
import AsymmetryOfLoss from "@/pages/manifest/assymetry/AsymmetryOfLoss";
import PrisonersDilemma from "@/pages/manifest/dilemma/PrisonersDilemma";
import ClosingWhite from "@/pages/manifest/closing/ClosingWhite";
import ManifestProgress from "@/pages/manifest/progress/ManifestProgress";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";
import TheDichotomy from "../dichotomy/TheDichotomy";

gsap.registerPlugin(ScrollTrigger);

/* order = manifesto narrative arc: birth (white) → laws of the world
   (entropy, pareto) → bridge of perception (observer) → self (dichotomy, choice,
   loss) → other (dilemma) → what remains (closing). labelIndex now matches
   position in the array; one-to-one with nav labels. */
const PANELS = [
  { id: "white", labelIndex: 0, Component: ManifestArc },
  { id: "entropy", labelIndex: 1, Component: CostOfOrder },
  { id: "pareto", labelIndex: 2, Component: ParetoDistribution },
  { id: "observer", labelIndex: 3, Component: ObserverEffect },
  { id: "dichotomy", labelIndex: 4, Component: TheDichotomy },
  { id: "choice", labelIndex: 5, Component: WeightOfChoice },
  { id: "loss", labelIndex: 6, Component: AsymmetryOfLoss },
  { id: "dilemma", labelIndex: 7, Component: PrisonersDilemma },
  { id: "remains", labelIndex: 8, Component: ClosingWhite },
];

/* after each transition the panel rests on screen for a while (plateau).
   transition = 1 unit (100% viewport scroll), plateau = DWELL units.
   plateau absorbs extra scroll: when a new panel settles, the next one
   doesn't start peeking in from below. the first panel (white on white) arrives
   via pin, not transition; so an opening plateau (LEAD) is added so it stays
   on screen like the others and doesn't start sliding on the first scroll. */
const DWELL = 1;
const SEG = 1 + DWELL;
const LAST = PANELS.length - 1;
const LEAD = DWELL; // opening plateau for the first panel
const TOTAL = LEAD + LAST * SEG; // opening + plateau after each transition
const PANEL_RENDER_RADIUS = 1;

/* active panel from timeline position t: first panel during opening plateau;
   afterward the incoming panel is active once past halfway through each transition */
const activeAt = (t) => {
  if (t <= LEAD) return 0;
  const u = t - LEAD;
  const b = Math.floor(u / SEG);
  const local = u - b * SEG;
  // local < 1: transition (incoming panel after halfway); local >= 1: plateau (incoming panel)
  const idx = local < 1 ? (local >= 0.5 ? b + 1 : b) : b + 1;
  return Math.min(LAST, idx);
};

export default function ManifestContent() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const renderAllPanels = prefersReducedMotion();

  const setActivePanel = useCallback((next) => {
    setActive((current) => (current === next ? current : next));
  }, []);

  const rawLabels = t("manifesto.nav", { returnObjects: true });
  const labels = PANELS.map(({ labelIndex }, i) =>
    Array.isArray(rawLabels) && rawLabels[labelIndex]
      ? rawLabels[labelIndex]
      : `section ${i + 1}`,
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panels = gsap.utils.toArray("[data-manifest-panel]", container);
    if (panels.length < 2) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        // progress nav appears once past intro into content
        ScrollTrigger.create({
          trigger: container,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => setNavVisible(self.isActive),
        });
        panels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => self.isActive && setActivePanel(i),
          });
          // calm crossfade instead of a flat stack — reduced motion uses
          // opacity only, not movement, but still avoids feeling "magic-less"
          gsap.fromTo(
            panel,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 0.5,
              ease: "power1.out",
              scrollTrigger: { trigger: panel, start: "top 90%", once: true },
            },
          );
        });
        return;
      }

      gsap.set(panels.slice(1), { yPercent: 100 });

      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${TOTAL * 40}%`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // progress nav appears when curtain is pinned (intro passed)
          onToggle: (self) => setNavVisible(self.isActive),
          onUpdate: (self) => {
            setActivePanel(activeAt(self.progress * TOTAL));
          },
        },
      });

      // opening plateau: white on white panel stays on screen when pin engages,
      // like the others; doesn't start sliding on first scroll
      tl.to({}, { duration: LEAD });

      panels.slice(1).forEach((panel, i) => {
        const outgoing = panels[i]; // previous panel
        // incoming panel slides up from below
        tl.to(panel, { yPercent: 0 });
        // outgoing panel recedes slightly at the same time: not flat slide,
        // layered depth. background is wb50 everywhere, shrinking panel leaves
        // no seam — recede reads inside the white.
        tl.to(
          outgoing,
          { scale: 0.94, yPercent: -6, transformOrigin: "center center" },
          "<",
        );
        tl.to({}, { duration: DWELL }); // plateau: panel rests on screen
      });

      triggerRef.current = tl.scrollTrigger;
    }, container);

    /* when scroll stops, settle a half-finished transition to the nearest plateau.
       lenis.scrollTo instead of ScrollTrigger's built-in snap:
       avoids clashing with lenis's internal target (same path as nav click). */
    const onScrollEnd = () => {
      const st = triggerRef.current;
      if (!st) return;

      const p = st.progress;
      if (p <= 0.0005 || p >= 0.9995) return;

      const t = p * TOTAL;
      if (t <= LEAD) return; // on opening plateau: no snap
      const u = t - LEAD;
      const b = Math.floor(u / SEG);
      const local = u - b * SEG;
      if (local > 1) return; // already on plateau: no snap

      // past halfway → forward (incoming panel's plateau); otherwise back
      // (outgoing panel's plateau) — target is that plateau's midpoint
      const settled =
        local < 0.5
          ? b === 0
            ? LEAD / 2
            : LEAD + b * SEG - DWELL / 2
          : LEAD + b * SEG + 1 + DWELL / 2;
      const target = st.start + (st.end - st.start) * (settled / TOTAL);
      if (Math.abs(target - st.scroll()) < 2) return;

      if (window.lenis) {
        window.lenis.scrollTo(target, { duration: 0.9 });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    };

    ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);

    return () => {
      ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
      triggerRef.current = null;
      ctx.revert();
    };
  }, [setActivePanel]);

  const scrollToPanel = useCallback((index) => {
    const st = triggerRef.current;

    if (st) {
      // first panel sits on opening plateau; panel i at end of (i-1) transition's
      // plateau — target is that plateau's midpoint
      const settled =
        index === 0 ? LEAD / 2 : LEAD + (index - 1) * SEG + 1 + DWELL / 2;
      const y = st.start + (st.end - st.start) * (settled / TOTAL);

      if (window.lenis) {
        window.lenis.scrollTo(y, { duration: 1.2 });
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
      }

      return;
    }

    const panel = containerRef.current?.querySelectorAll(
      "[data-manifest-panel]",
    )[index];

    panel?.scrollIntoView({ behavior: "auto", block: "start" });
  }, []);

  return (
    <>
      <ManifestProgress
        active={active}
        sectionCount={PANELS.length}
        labels={labels}
        onSelect={scrollToPanel}
        visible={navVisible}
      />

      <div ref={containerRef} className={styles.manifest}>
        <div className={styles.stage}>
          {PANELS.map(({ id, Component }, i) => {
            const isActive = active === i;
            const shouldRender =
              renderAllPanels || Math.abs(active - i) <= PANEL_RENDER_RADIUS;

            return (
              <section
                key={id}
                data-active={isActive}
                data-manifest-panel
                className={styles.panel}
                inert={isActive ? undefined : ""}
              >
                <div className={styles.panelInner}>
                  {shouldRender && <Component isActive={isActive} />}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
