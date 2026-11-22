/**
 * "Download free": the two buttons every ebook gets (James, 2026-11-18: every
 * ebook is free). The PDF is the main button; the EPUB, where the book has
 * one, sits beside it as the quiet one. Plain links to the static files: no
 * email asked for, no checkout. One button family (`.btn`).
 */
import { Download } from "lucide-react";
import { Link } from "wouter";
import type { Ebook } from "@/data/ebooks";

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
  /** What it sits on: the page, or a charcoal band (dark in both themes). */
  band?: "page" | "charcoal";
  /** "sm" for cards in a list. */
  size?: "md" | "sm";
}) {
  const tone = band === "charcoal" ? " btn--on-dark" : "";
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

/** The one honest line for a book whose file still carries its old title. */
export function formerlyLine(formerly: string): string {
  return `Published earlier as ${formerly}. The file still carries that title.`;
}

/** One free ebook as a card: cover, title (linked to its page when it has one), its line, the buttons. */
export function EbookCard({ book, headingLevel = 4 }: { book: Ebook; headingLevel?: 3 | 4 }) {
  const H = headingLevel === 3 ? "h3" : "h4";
  return (
    <article className="ebook-card" aria-labelledby={`eb-${book.slug}`}>
      <img className="ebook-card__cover" src={book.cover} alt="" width={96} height={144} loading="lazy" decoding="async" />
      <div>
        <H className="ebook-card__title" id={`eb-${book.slug}`}>
          {book.page ? <Link href={book.page}>{book.title}</Link> : book.title}
        </H>
        <p className="ebook-card__line">{book.line}</p>
        {book.formerly && <p className="ebook-card__formerly">{formerlyLine(book.formerly)}</p>}
        <FreeEbookButtons title={book.title} pdf={book.pdf} epub={book.epub} size="sm" />
      </div>
    </article>
  );
}
