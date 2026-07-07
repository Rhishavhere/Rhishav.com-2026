import { forwardRef } from "react";

const ProjectImage = forwardRef(function ProjectImage(
  {
    work,
    className = "",
    aspect = "aspect-[16/10]",
    priority = false,
    imageIndex = 0,
    useAsset = false,
  },
  ref,
) {
  const img = work.images?.[imageIndex];
  const src = useAsset && img
    ? `${work.asset}/${img.file}`
    : `/assets/banners/${work.banner}-800.webp`;

  const srcSet = useAsset
    ? undefined
    : `/assets/banners/${work.banner}-400.webp 400w, /assets/banners/${work.banner}-800.webp 800w, /assets/banners/${work.banner}-1200.webp 1200w`;

  return (
    <div
      ref={ref}
      className={`overflow-hidden bg-[var(--wb100)] ${aspect} ${className}`}
    >
      <img
        src={src}
        srcSet={srcSet}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        alt={work.project_name}
        className="h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
});

export default ProjectImage;
