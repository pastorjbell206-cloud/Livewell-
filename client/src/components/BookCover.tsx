/**
 * BookCover — one consistent cover treatment for /books.
 *
 * Renders the cover image when present and loadable; on a missing OR broken
 * image it degrades to a branded typographic placeholder (mustard rule +
 * Cormorant title + author) so a cover-less or dead-URL book reads as an
 * intentional minimal cover rather than a gap or broken-image icon.
 */
import { useState, type CSSProperties } from "react";

interface BookCoverProps {
  coverImage?: string | null;
  title: string;
  author?: string | null;
  /** Fixed 140×210 (list rows) vs. fill width at 2:3 (grids). */
  fixed?: boolean;
  style?: CSSProperties;
}

export function BookCover({ coverImage, title, author, fixed, style }: BookCoverProps) {
  const [failed, setFailed] = useState(false);

  const box: CSSProperties = fixed
    ? { width: "140px", height: "210px" }
    : { width: "100%", aspectRatio: "2 / 3" };
  const common: CSSProperties = {
    ...box,
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    ...style,
  };

  if (coverImage && !failed) {
    return (
      <img
        src={coverImage}
        alt={title}
        loading="lazy"
        onError={() => setFailed(true)}
        style={{ ...common, objectFit: "cover", display: "block" }}
      />
    );
  }

  return (
    <div
      style={{
        ...common,
        background: "var(--bone-warm)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "16px",
        gap: "12px",
      }}
    >
      <span aria-hidden style={{ width: "28px", height: "2px", background: "var(--mustard)" }} />
      <span style={{ fontFamily: "var(--F)", fontSize: fixed ? "15px" : "clamp(14px, 2.2vw, 18px)", color: "var(--ink)", lineHeight: 1.25 }}>
        {title}
      </span>
      {author && (
        <span style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
          {author}
        </span>
      )}
    </div>
  );
}

export default BookCover;
