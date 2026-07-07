import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import { useTranslation } from "react-i18next";

export default function PrinciplesSection() {
  const { t } = useTranslation();
  const principles = t("principles.list", { returnObjects: true });

  return (
    <section className="flex min-h-[55vh] w-screen items-center justify-center px-[2vw] py-[10vh]">
      <div className="flex w-[30vw] justify-center gap-[5vw] max-[1024px]:w-[50vw] max-[600px]:w-[98vw]">
        <AnimatedSplit
          key={t("principles.title")}
          text={t("principles.title")}
          className="!text-[0.875em] !font-[200] opacity-50"
          tagName="h2"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
        <div className="flex flex-col gap-[0.75em]">
          {Array.isArray(principles) &&
            principles.map((p, i) => (
              <AnimatedSplit
                key={`${p}-${i}`}
                text={p}
                className="!text-[1em] !font-[300] opacity-[0.85]"
                tagName="p"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
              />
            ))}
        </div>
      </div>
    </section>
  );
}
