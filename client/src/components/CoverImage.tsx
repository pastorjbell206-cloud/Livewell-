/**
 * A book cover: the WebP where the browser can take it, the JPEG where it
 * cannot. The WebP versions were already on disk (11 KB against 184 KB for
 * Believe) and nothing used them; the books page moved 613 KB of covers on a
 * phone for three books.
 */
import type { CSSProperties } from "react";

export function CoverImage({
  src,
  alt,
  width = 1600,
  height = 2560,
  eager = false,
  style,
  className,
}: {
  /** The JPEG path, e.g. /books/believe.jpg. The WebP sits beside it. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
  eager?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  const webp = src.replace(/\.jpe?g$/i, ".webp");
  return (
    <picture>
      {webp !== src && <source srcSet={webp} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : undefined}
        style={style}
        className={className}
      />
    </picture>
  );
}
