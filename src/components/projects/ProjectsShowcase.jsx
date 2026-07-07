import { useMemo } from "react";
import StoryCard from "@/components/projects/cards/StoryCard";

export default function ProjectsShowcase({
  projects = [],
  limit,
  className = "",
  gridClassName = "",
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
}) {
  const items = useMemo(
    () => (limit ? projects.slice(0, limit) : projects),
    [projects, limit],
  );

  const cursorProps = {
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`flex w-full flex-col gap-[12vh] px-[3vw] lg:px-[6vw] ${gridClassName}`}
      >
        {items.map((work, index) => (
          <StoryCard
            key={work.link}
            work={work}
            index={index}
            {...cursorProps}
          />
        ))}
      </div>
    </div>
  );
}
