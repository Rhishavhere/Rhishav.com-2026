import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

const TOTAL_ROUNDS = 5;

/* figure geometry: two horizontal traces, one segment per round.
   silent + silent → traces swap lanes and cross (braid knot)
   betray        → trace escapes outward (tear); if other stayed silent, reaches toward them */
const LEAD_X = 60; // x where the lead-in straight ends
const SEG_W = 100;
const Y_ME = 80;
const Y_YOU = 120;
const VIEW_W = LEAD_X + SEG_W * TOTAL_ROUNDS + 20;

const bump = (x0, yBase, yPeak) =>
  `M ${x0} ${yBase} ` +
  `C ${x0 + 35} ${yBase}, ${x0 + 30} ${yPeak}, ${x0 + 50} ${yPeak} ` +
  `C ${x0 + 70} ${yPeak}, ${x0 + 65} ${yBase}, ${x0 + SEG_W} ${yBase}`;

const segmentPaths = (you, me, x0) => ({
  /* betraying trace tears outward; if other stayed silent, reaches to midline
     (unrequited); if both stayed silent, traces swap lanes (braid) */
  you: bump(x0, Y_YOU, you === "d" ? 168 : me === "d" ? 100 : Y_ME),
  me: bump(x0, Y_ME, me === "d" ? 32 : you === "d" ? 100 : Y_YOU),
});

export default function PrisonersDilemma() {
  const { t } = useTranslation();

  const [rounds, setRounds] = useState([]);
  const [phase, setPhase] = useState("choose"); // choose | playing | done
  const [liveMsg, setLiveMsg] = useState("");

  const roundsRef = useRef([]);
  const phaseRef = useRef("choose");
  const pendingRef = useRef(null); // click during draw: play next round when segment finishes
  const braidRef = useRef(null);
  const verdictRef = useRef(null);

  /* pure tit-for-tat: I open with trust on the first round, then mirror your
     last move. no grudge, no forgiveness — if you defect, I defect one round later. */
  const decideMyMove = () => {
    const history = roundsRef.current;
    if (!history.length) return "c";
    return history[history.length - 1].you;
  };

  const moveWord = (m) =>
    m === "c"
      ? t("manifesto.dilemma.silent_word")
      : t("manifesto.dilemma.betray_word");

  const play = (move) => {
    /* impatient clicks aren't lost: next round plays as soon as the draw finishes */
    if (phaseRef.current === "playing") {
      pendingRef.current = move;
      return;
    }
    if (phaseRef.current !== "choose") return;

    const my = decideMyMove();
    const isLast = roundsRef.current.length + 1 >= TOTAL_ROUNDS;
    roundsRef.current = [...roundsRef.current, { you: move, me: my }];

    if (prefersReducedMotion()) {
      if (isLast) {
        phaseRef.current = "done";
        setPhase("done");
      }
    } else {
      phaseRef.current = "playing";
      setPhase("playing");
    }

    setRounds(roundsRef.current);
    setLiveMsg(
      `${t("manifesto.dilemma.you_label")} ${moveWord(move)} · ${t(
        "manifesto.dilemma.me_label",
      )} ${moveWord(my)}`,
    );
  };

  /* new segment pair draws at once — the dilemma's essence in one beat */
  useLayoutEffect(() => {
    if (phase !== "playing") return;

    const seg = rounds.length - 1;
    const paths = braidRef.current?.querySelectorAll(`[data-seg="${seg}"]`);
    if (!paths?.length) return;

    const isLast = rounds.length >= TOTAL_ROUNDS;

    paths.forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });

    const tl = gsap.timeline({
      onComplete: () => {
        phaseRef.current = isLast ? "done" : "choose";
        setPhase(isLast ? "done" : "choose");

        if (!isLast && pendingRef.current) {
          const queued = pendingRef.current;
          pendingRef.current = null;
          play(queued);
        }
      },
    });

    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 0.9,
      ease: "hop",
      delay: 0.3, // held breath
    });

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, rounds.length]);

  /* verdict: three variants based on your behavior */
  const defections = rounds.filter((r) => r.you === "d").length;
  const verdictKey =
    defections === 0
      ? "verdict_coop"
      : defections >= 3
        ? "verdict_betray"
        : "verdict_mixed";

  // verdict words rise from mask (same language as dichotomy)
  useLayoutEffect(() => {
    if (phase !== "done") return;
    setLiveMsg(t(`manifesto.dilemma.${verdictKey}`));
    if (prefersReducedMotion()) return;

    const words = verdictRef.current?.querySelectorAll(`.${styles.word}`);
    if (!words?.length) return;

    const tl = gsap.timeline();
    tl.fromTo(
      words,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.8, ease: "hop", stagger: 0.025 },
    );
    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const replay = () => {
    roundsRef.current = [];
    setRounds([]);
    setLiveMsg("");
    phaseRef.current = "choose";
    setPhase("choose");
  };

  return (
    <div className={styles.container}>
      <div className={styles.annotation}>
        <h4>{t("manifesto.dilemma.title")}</h4>
        <p>{t("manifesto.dilemma.desc")}</p>
        <p className={styles.strategy}>{t("manifesto.dilemma.strategy")}</p>
        <ReadMore slug="dilemma" />
      </div>

      <div className={styles.stage}>
        <svg
          ref={braidRef}
          className={styles.braid}
          viewBox={`0 0 ${VIEW_W} 200`}
          aria-hidden="true"
        >
          <text className={styles.strandLabelMe} x="0" y="84">
            {t("manifesto.dilemma.me_label")}
          </text>
          <text className={styles.strandLabelYou} x="0" y="124">
            {t("manifesto.dilemma.you_label")}
          </text>

          <path className={styles.strandMe} d={`M 36 ${Y_ME} H ${LEAD_X}`} />
          <path className={styles.strandYou} d={`M 36 ${Y_YOU} H ${LEAD_X}`} />

          {rounds.map((r, i) => {
            const seg = segmentPaths(r.you, r.me, LEAD_X + i * SEG_W);
            return (
              <Fragment key={i}>
                <path data-seg={i} className={styles.strandMe} d={seg.me} />
                <path data-seg={i} className={styles.strandYou} d={seg.you} />
              </Fragment>
            );
          })}
        </svg>

        {phase !== "done" ? (
          <>
            <div className={styles.choices}>
              <button
                type="button"
                className={styles.choiceBtn}
                data-move="c"
                disabled={phase !== "choose"}
                onClick={() => play("c")}
              >
                ● {t("manifesto.dilemma.silent_btn")}
              </button>
              <button
                type="button"
                className={styles.choiceBtn}
                data-move="d"
                disabled={phase !== "choose"}
                onClick={() => play("d")}
              >
                ● {t("manifesto.dilemma.betray_btn")}
              </button>
            </div>
            <span className={styles.hint}>{t("manifesto.dilemma.hint")}</span>
          </>
        ) : (
          <div ref={verdictRef} className={styles.verdict}>
            <p className={styles.verdictText}>
              {t(`manifesto.dilemma.${verdictKey}`)
                .split(" ")
                .map((w, i) => (
                  <Fragment key={i}>
                    <span className={styles.mask}>
                      <span className={styles.word}>{w}</span>
                    </span>{" "}
                  </Fragment>
                ))}
            </p>
            <button type="button" className={styles.replayBtn} onClick={replay}>
              ● {t("manifesto.dilemma.replay")}
            </button>
          </div>
        )}

        <span className={styles.srOnly} aria-live="polite">
          {liveMsg}
        </span>
      </div>
    </div>
  );
}
