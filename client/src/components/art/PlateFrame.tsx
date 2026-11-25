/**
 * The frame every picture hangs in: an ink rule, a paper margin, a hairline,
 * then the drawing, cropped to the frame's shape. The ratio is set here, so
 * the frame holds its size before the drawing loads. An optional caption
 * underneath names the plate ("Plate I" on the left, its title on the right).
 */
import type { CSSProperties, ReactNode } from "react";

export default function PlateFrame({
  children,
  ratio = "4 / 3",
  number,
  title,
  className,
  style,
}: {
  children?: ReactNode;
  /** The drawing's shape inside the frame, as a CSS aspect-ratio; null when a stylesheet sets it. */
  ratio?: string | null;
  /** "Plate I": the left half of the caption. */
  number?: string;
  /** "The road": the right half of the caption. */
  title?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <figure className={`lw-frame-fig${className ? ` ${className}` : ""}`} style={style}>
      <div className="lw-frame">
        <div className="lw-frame__in" style={ratio ? { aspectRatio: ratio } : undefined}>
          {children}
        </div>
      </div>
      {(number || title) && (
        <figcaption className="lw-cap">
          <span>{number}</span>
          <span>{title}</span>
        </figcaption>
      )}
    </figure>
  );
}
