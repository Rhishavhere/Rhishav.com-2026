import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import works from "@/utils/projects";

/** Turkish copy — add per-project overrides here when ready. */
const trProjects = {};

export const useProjects = () => {
  const { i18n } = useTranslation();

  const data = useMemo(() => {
    const language = i18n.language?.split("-")[0];
    if (language !== "tr") return works;

    return works.map((work) => {
      const translation = trProjects[work.link];
      if (!translation) return work;
      return { ...work, ...translation };
    });
  }, [i18n.language]);

  return { data, isLoading: false, isError: false, error: null };
};
