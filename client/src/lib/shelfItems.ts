/**
 * The bookshelf: every listed ebook and booklet as one kind of thing, for
 * /downloads, /books and a book's own page. Built from data/ebooks.ts and
 * data/booklets.ts, so nothing is listed here that is not listed there, and
 * a held book cannot appear.
 */
import { FREE_EBOOKS } from "@/data/ebooks";
import { BOOKLETS } from "@/data/booklets";
import { bookCover, ebookFolder, type Cover } from "@/lib/covers";

export type ShelfGroup = "james" | "questions" | "leaders";

export interface ShelfItem {
  group: ShelfGroup;
  /** The download's id (shared/downloads.ts): "ebook:<folder>". */
  id: string;
  /** The folder under /ebook/, which never changes when a book is renamed. */
  folder: string;
  title: string;
  subtitle: string;
  /** One line on what it is and who it is for, from the book's own page. */
  line: string;
  pages?: number;
  pdf: string;
  epub?: string;
  /** The book's own page, when it has one. */
  page?: string;
  /** The title printed inside the file, when it is not the site's. */
  formerly?: string;
  cover: Cover;
}

export const SHELF_GROUPS: { id: ShelfGroup; label: string; line: string }[] = [
  { id: "james", label: "Books by James Bell", line: "The three he wrote by hand." },
  { id: "questions", label: "Hard questions", line: "One hard question to a book, worked through from Scripture." },
  { id: "leaders", label: "For church leaders", line: "Short booklets for elders, deacons and pastors on governing a local church." },
];

export const SHELF_ITEMS: ShelfItem[] = [
  ...FREE_EBOOKS.map((b): ShelfItem => {
    const folder = ebookFolder(b.pdf);
    return { group: b.group as ShelfGroup, id: `ebook:${folder}`, folder, title: b.title, subtitle: b.sub, line: b.line, pages: b.pages, pdf: b.pdf, epub: b.epub, page: b.page, formerly: b.formerly, cover: bookCover(folder) };
  }),
  ...BOOKLETS.map((b): ShelfItem => {
    const folder = ebookFolder(b.pdf);
    return { group: "leaders", id: `ebook:${folder}`, folder, title: b.title, subtitle: b.subtitle, line: b.note, pages: b.pages, pdf: b.pdf, epub: b.epub, page: "/resources/hard-issues-series", cover: bookCover(folder) };
  }),
];

/** The shelf item for a book's page slug ("blind-spots"), or undefined. */
export function shelfItemBySlug(slug: string): ShelfItem | undefined {
  const book = FREE_EBOOKS.find((b) => b.slug === slug);
  return book ? SHELF_ITEMS.find((i) => i.pdf === book.pdf) : undefined;
}

/** "495 pages · PDF and EPUB" */
export function formatLine(item: Pick<ShelfItem, "pages" | "epub">): string {
  const format = item.epub ? "PDF and EPUB" : "PDF";
  return item.pages ? `${item.pages} pages · ${format}` : format;
}
