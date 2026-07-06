import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import LineReveal from "@/components/reveal/LineReveal";
import PrimerLink from "@/ui/link/PrimerLink";
import styles from "./style.module.css";

// ordered list of concepts (same order as landing).
// used for "next" navigation and page index (01 / 06).
const ORDER = [
  "white",
  "entropy",
  "pareto",
  "observer",
  "dichotomy",
  "choice",
  "loss",
  "dilemma",
];

const pad = (n) => String(n).padStart(2, "0");

export default function ManifestArticle() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();

  const article = t(`manifesto.articles.${slug}`, { returnObjects: true });
  const isValid =
    article && typeof article === "object" && Boolean(article.title);

  if (!isValid) {
    return (
      <div className={styles.container}>
        <div className={styles.notfound}>
          <h1 className={styles.nf_title}>{t("manifesto.article_not_found")}</h1>
          <PrimerLink
            href="/manifest"
            buttonText={t("manifesto.article_back")}
            random
          />
        </div>
      </div>
    );
  }

  // cycle only among concepts that have content
  const existing = ORDER.filter((s) => {
    const a = t(`manifesto.articles.${s}`, { returnObjects: true });
    return a && typeof a === "object" && Boolean(a.title);
  });
  const pos = existing.indexOf(slug);
  const nextSlug =
    existing.length > 1 && pos !== -1
      ? existing[(pos + 1) % existing.length]
      : null;

  const idx = ORDER.indexOf(slug);
  const sections = Array.isArray(article.sections) ? article.sections : [];

  return (
    <article className={styles.container} key={`${slug}-${i18n.language}`}>
      <header className={styles.header}>
        <div className={styles.meta_row}>
          <span className={styles.label}>[ {article.label} ]</span>
          {idx !== -1 && (
            <span className={styles.index}>
              {pad(idx + 1)} / {pad(ORDER.length)}
            </span>
          )}
        </div>

        <h1 className={styles.title}>
          <AnimatedSplit
            text={article.title}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            start="top 80%"
          />
        </h1>

        {article.lead && (
          <LineReveal
            className={styles.lead}
            text={article.lead}
            tagName="p"
            start="top 80%"
          />
        )}
      </header>

      {/* body: each block one small step right of the previous (--i) —
          diagonal carried by spacing; collapses to single column on narrow screens */}
      <div className={styles.body}>
        {sections.map((s, i) => {
          if (s.quote) {
            return (
              <blockquote key={i} className={styles.quote} style={{ "--i": i }}>
                <p className={styles.quote_text}>
                  <AnimatedSplit
                    text={s.quote}
                    tagName="span"
                    stagger={0.02}
                    duration={1.5}
                    start="top 85%"
                  />
                </p>
                {s.cite && <cite className={styles.cite}>— {s.cite}</cite>}
              </blockquote>
            );
          }

          // quotes don't get numbers; prose blocks numbered among themselves
          const proseNo = sections.slice(0, i).filter((x) => !x.quote).length + 1;

          return (
            <section key={i} className={styles.section} style={{ "--i": i }}>
              <div className={styles.heading_row}>
                <span className={styles.sec_index} aria-hidden="true">
                  {pad(proseNo)}
                </span>
                {s.heading && (
                  <h2 className={styles.heading}>
                    <AnimatedSplit
                      text={s.heading}
                      tagName="span"
                      stagger={0.02}
                      duration={1.5}
                      start="top 85%"
                    />
                  </h2>
                )}
              </div>
              {s.body && (
                <LineReveal
                  className={styles.text}
                  text={s.body}
                  tagName="p"
                  start="top 85%"
                />
              )}
            </section>
          );
        })}
      </div>

      <footer className={styles.footer}>
        <PrimerLink
          href="/manifest"
          buttonText={t("manifesto.article_back")}
          random
        />
        {nextSlug && (
          <PrimerLink
            href={`/manifest/${nextSlug}`}
            buttonText={t("manifesto.article_next")}
            random
          />
        )}
      </footer>
    </article>
  );
}
