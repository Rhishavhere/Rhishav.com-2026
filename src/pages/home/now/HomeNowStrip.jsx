import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import { useTranslation } from "react-i18next";

export default function HomeNowStrip() {
  const { t, i18n } = useTranslation();
  const items = t("now.items", { returnObjects: true });

  return (
    <section
      key={i18n.language}
      className="flex w-full flex-col items-center gap-[5vh] px-[2vw] py-[10vh]"
    >
      <AnimatedSplit
        text={t("now.title")}
        className="!text-[0.875em] !font-[200] opacity-50"
        tagName="h2"
        stagger={0.03}
        duration={1.5}
        start="top 85%"
      />

      <AnimatedSplit
        text={t("now.subtitle")}
        className="!text-[1em] !font-[200] text-[var(--wb950)] opacity-70"
        tagName="p"
        stagger={0.02}
        duration={1.5}
        start="top 85%"
      />

      {Array.isArray(items) && (
        <ul className="flex w-[22em] max-w-[90vw] flex-col items-center gap-[0.65em] text-center">
          {items.map((item, i) => (
            <li key={`${item}-${i}`}>
              <AnimatedSplit
                text={item}
                className="!text-[0.95em] !font-[300] text-[var(--wb950)] opacity-[0.85]"
                tagName="span"
                stagger={0.02}
                duration={1.2}
                start="top 90%"
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
