import type { CSSProperties } from "react";

// Guide illustrations ship as <name>.webp (1280 wide) plus <name>-640.webp.
// Phones (up to 760px wide) always get the 640px file; larger screens pick by
// displayed size. Other images render as is.
export function guideImageSrcSet(src: string): string | undefined {
  if (!/^\/images\/guides\/[^/]+\.webp$/.test(src) || src.endsWith("-640.webp")) return undefined;
  return `${src.replace(/\.webp$/, "-640.webp")} 640w, ${src} 1280w`;
}

const fillStyle: CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%" };

export function GuideImage({ src, alt, sizes, fill = false, width, height, priority = false, className }: {
  src: string;
  alt: string;
  sizes: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  const srcSet = guideImageSrcSet(src);
  const img = <img
    src={src}
    srcSet={srcSet}
    sizes={sizes}
    alt={alt}
    width={width}
    height={height}
    className={className}
    style={fill ? fillStyle : undefined}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : undefined}
    decoding="async"
  />;
  // Phones always get the 640px copy. High-density screens would otherwise
  // ask for the 1280px file, which is 3 times heavier for little visible gain.
  if (!srcSet) return img;
  return <picture>
    <source media="(max-width: 760px)" srcSet={src.replace(/\.webp$/, "-640.webp")} type="image/webp" />
    {img}
  </picture>;
}
