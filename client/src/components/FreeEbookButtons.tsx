/**
 * "Download free": the two buttons every ebook gets (James, 2026-11-18: every
 * ebook is free). The PDF is the main button; the EPUB, where the book has
 * one, sits beside it as the quiet one. Plain links to the static files: no
 * email asked for, no checkout. One button family (`.btn`).
 */
import { Download } from "lucide-react";

export function FreeEbookButtons({
  title,
  pdf,
  epub,
  band = "page",
  size = "md",
}: {
  title: string;
  pdf: string;
  epub?: string;
  /** What it sits on: the page, a charcoal band (dark in both themes), or an --ink band (flips with the theme). */
  band?: "page" | "charcoal" | "ink";
  /** "sm" for cards in a list. */
  size?: "md" | "sm";
}) {
  const tone = band === "charcoal" ? " btn--on-dark" : band === "ink" ? " btn--inverse" : "";
  const sm = size === "sm" ? " btn--sm" : "";
  const main = `btn${tone}${sm}`;
  const quiet = `btn btn--quiet${tone}${sm}`;
  return (
    <div className="ebook-actions">
      <a href={pdf} download className={main} aria-label={`Download ${title} free, as a PDF`}>
        <Download size={18} strokeWidth={1.75} aria-hidden="true" />
        <span>Download free</span>
        <span className="ebook-actions__fmt">PDF</span>
      </a>
      {epub && (
        <a href={epub} download className={quiet} aria-label={`Download ${title} free, as an EPUB for e-readers`}>
          <span>EPUB</span>
        </a>
      )}
    </div>
  );
}
