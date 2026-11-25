/**
 * The covers (client/public/covers/, drawn by scripts/build-covers.mjs from
 * client/src/data/covers.json). A book's cover is named by its folder under
 * /ebook/, which never changes when the book is renamed; a short printable
 * wears the card for its kind.
 */
import data from "@/data/covers.json";
import { downloadKind } from "@shared/downloads";

export interface Cover {
  /** 400 px wide: the shelf, a card, the gift sheet. */
  src: string;
  /** 800 px wide: a book's own page. Books only. */
  large?: string;
  /** 1200 px wide JPEG: the share image. Books only. */
  share?: string;
  width: number;
  height: number;
  /** What the picture shows. */
  alt: string;
}

const BOOK_ALT = new Map(data.books.map((b) => [b.id, b.alt] as const));
const KIND_LABEL = new Map(data.kinds.map((k) => [k.id, k.label] as const));

/** The cover of the ebook whose files are under /ebook/<folder>/. */
export function bookCover(folder: string): Cover {
  return {
    src: `/covers/${folder}-400.webp`,
    large: `/covers/${folder}-800.webp`,
    share: `/covers/${folder}.jpg`,
    width: 400,
    height: 600,
    alt: BOOK_ALT.get(folder) ?? "",
  };
}

/** True when a cover has been drawn for this ebook folder. */
export function hasBookCover(folder: string): boolean {
  return BOOK_ALT.has(folder);
}

/** The card for a kind of printable ("study-guide"), or null for a kind with no card. */
export function kindCover(kind: string): Cover | null {
  const label = KIND_LABEL.get(kind);
  return label ? { src: `/covers/kind-${kind}-400.webp`, width: 400, height: 518, alt: "" } : null;
}

/** The cover for a download id ("ebook:believe", "study-guide:lament"). */
export function coverForDownload(id: string): Cover | null {
  const kind = downloadKind(id);
  if (!kind) return null;
  const slug = id.slice(id.indexOf(":") + 1);
  if (kind === "ebook") return hasBookCover(slug) ? bookCover(slug) : null;
  return kindCover(kind);
}

/** "/ebook/believe/Believe.pdf" → "believe". */
export function ebookFolder(pdf: string): string {
  return pdf.split("/")[2] ?? "";
}
